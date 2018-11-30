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
import { RequestParser, ConsoleLogger } from './utils';
// import fs from 'fs';
// import logger from 'logger';
// declare var location: any;

// const MIN_PRICE: number = 60;
// const ITEM_CONDITION: {} = {};


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


// function nextPage(page: puppeteer.Page): void {}

function handlePaginationReturn(element: Element) {
  // console.log(element.innerHTML);

  let pages = element.querySelectorAll('ebayui-pagination__ol > ebayui-pagination__li, :not(ebayui-pagination__li--selected) > a');
  console.log(pages.length);
  pages.forEach(page => console.log(page.getAttribute('href')));

  // await page.click()
}

async function gotoNextPage(currentUrl: string, currentPage: number): Promise<string> {
  currentPage++;
  const parsed_url: URL = new URL(currentUrl);
  parsed_url.searchParams.set('_pgn', `${currentPage}`);
  return parsed_url.href;
}

async function StartSoldSearch(): Promise<any> {
  let foundLastItem: boolean = false;
  let currentPage: number = 1;

  browser = await puppeteer.launch();
  page = await browser.newPage();

  page.on('console', ConsoleLogger);
  page.on('request', RequestParser);

  let currentUrl: string = SOLD_ROOT;
  let itemsToProcess: any[] = [];

  // while (!foundLastItem) {
  console.log('Parsing page: ', currentPage);
  await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36');
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

  // // sold_shoes.forEach(shoe => { console.log(new URL(shoe.url)) });
  // sold_shoes.forEach(s => console.log(s.id));

  // function parseIDs(shoes: string[]): string[] {
  //   const blah: {}[] = _.map(shoes, shoe => {
  //     return {};
  //   });
  //   return blah;
  // }
  // sold_shoes = parseIDs(sold_shoes);

  itemsToProcess = [...itemsToProcess, ...sold_shoes];

  currentUrl = await gotoNextPage(currentUrl, currentPage)
  console.log(`${sold_shoes.length} items added to the processor`);
  console.log(`${itemsToProcess.length} left to process`);
  // console.log(sold_shoes);
  //    {
  //     return {
  //       children: link.children[0],
  //       id: link.querySelector('s-item__item-id.s-item__itemID'),
  //       // outer: link.outerHTML,
  //       // inner: link.innerHTML,
  //       // text: link.textContent
  //     }
  //     // return link.outerHTML;
  //   });
  // });

  // console.log(sold_shoes);




  //   gotoNextPage();
  //   currentPage++;
  // };


  // parseShoes(sold_shoes);
  // console.log(sold_shoes);


  await browser.close();
}


StartSoldSearch();