// SCRAPING STEPS
// ------------------------------------
// Get last stored item from cache or db
// 
// Navigate to the sold url
// Fetch item list information from page
// store in db or memory 
//  -- later full parsing of information from stored link data
// 
// 
// continue until reach the last item parsed from last search
// store last item parsed in db


// PARSING STEPS
// ------------------------------------

import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';
import * as redis from 'redis';

const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const lenAsync = promisify(client.llen).bind(client);

import { RequestParser, ConsoleLogger } from './utils';

client.on('error', (err) => {
  console.log('Error with redis: ' + err);
});
// const MIN_PRICE: number = 60;
// const ITEM_CONDITION: {} = {};


const unprocessedItems: string = 'unprocessedItems';
const SOLD_ROOT: string =
  'https://www.ebay.com/b/Mens-Athletic-Shoes/15709/bn_57918?LH_ItemCondition=1500&LH_Sold=1&rt=nc&_dmd=1&_sop=13&_udlo=75&_pgn=1';
//example of an "view original link"
//https://www.ebay.com/itm/New-Balance-Fresh-Foam-Paradox-Gore-Tex-Black-Leather-Boots-10-5-HFLPXBL-/263964287745?nordt=true&orig_cvip=true&rt=nc&_trksid=p2047675.m43663.l10137
//-- this is the link that you get in the main "sold" list
//   https://www.ebay.com/itm/New-Balance-Fresh-Foam-Paradox-Gore-Tex-Leather-Mid-Boot-Shoes-Men-Sz-9-HFLPXBL-/253853332031?oid=263964287745

// want to add whatevers in original link to link from sold list so that can skip secondary click/interaction

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const paginationSelector: string = '.ebayui-pagination__ol';
const pageIdentifier: string = '&_pgn='
const priceIdentifier: string = '&_udlo=';


function nextPage(page: puppeteer.Page): void { }

function handlePaginationReturn(element: Element) {
  // console.log(element.innerHTML);

  let pages = element.querySelectorAll('ebayui-pagination__ol > ebayui-pagination__li, :not(ebayui-pagination__li--selected) > a');
  console.log(pages.length);
  pages.forEach(page => console.log(page.getAttribute('href')));

  // await page.click()
}

function gotoNextPage(currentUrl: string, currentPage: number): string {
  const parsed_url: URL = new URL(currentUrl);
  parsed_url.searchParams.set('_pgn', `${currentPage}`);
  return parsed_url.href;
}

async function fetchLastItemFound(): Promise<string> {
  return await getAsync('lastProcessedItemId');
}

async function DEBUG_override(): Promise<void> {
  await client.set('lastProcessedItemId', '163409080976', redis.print);
}

async function StartSoldSearch(): Promise<any> {
  let foundLastItemIndex: number = -1;
  let currentPage: number = 1;

  // await DEBUG_override();
  let lastProcessedItemId: string = await fetchLastItemFound();
  let currentEndId: string;

  console.log(`Last processed item retrieved: ${lastProcessedItemId}`);


  browser = await puppeteer.launch();
  page = await browser.newPage();

  page.on('console', ConsoleLogger);
  page.on('request', RequestParser);

  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36');
  await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);

  let currentUrl: string = SOLD_ROOT;
  let itemsToProcess: any[] = [];
  let finishedParsing: boolean = false;

  while (!finishedParsing && currentPage < 5) {

    console.log('Parsing page: ', currentPage);
    console.log(`url: ${currentUrl}`);
    await page.goto(currentUrl, { waitUntil: 'networkidle2' });


    let sold_shoes: any[] = await page.$$eval('.s-item', (links) => {
      return links.map(link => {
        const el = link.querySelector('.s-item__image > a');
        const url: URL = new URL(el.getAttribute('href'));
        const id: string = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
        return {
          id,
          outer: link.outerHTML
        }
      })
    });

    foundLastItemIndex = sold_shoes.findIndex(shoe => {
      console.log(`${shoe.id} - ${lastProcessedItemId}`);
      return shoe.id === lastProcessedItemId
    });


    console.log(`Last Item: ${lastProcessedItemId} was found: ${foundLastItemIndex}`);

    if (foundLastItemIndex !== -1) {
      finishedParsing = true;
      sold_shoes.splice(foundLastItemIndex);
    }

    if (currentPage === 1 && sold_shoes.length > 0) {
      currentEndId = sold_shoes[0].id;
      client.set('lastProcessedItemId', currentEndId, redis.print);
    }


    sold_shoes.forEach(item => {
      client.rpush(unprocessedItems, JSON.stringify(item));
    });


    // let numberOfItems: number = await lenAsync(unprocessedItems);
    // console.log(`Items left to process: ${numberOfItems}`);

    // client.llen('unprocessedItems', (err: any, numberOfItems: number) => {
    // });

    console.log(`${sold_shoes.length} items added to the processor`);

    currentUrl = gotoNextPage(currentUrl, ++currentPage)
  };


  // parseShoes(sold_shoes);
  // console.log(sold_shoes);


  await browser.close();
  client.quit();
}


StartSoldSearch();