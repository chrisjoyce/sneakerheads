import * as redis from 'redis';
import { promisify } from 'util';
import * as cheerio from 'cheerio';

const client = redis.createClient();
const lenAsync = promisify(client.llen).bind(client);

const getAsync = promisify(client.get).bind(client);
const indexAsync = promisify(client.lindex).bind(client);

async function startProcessing() {
  let moreToProcess: boolean = true;
  let itemToProcess: {};


  let itemsToProcess: number = await lenAsync('unprocessedItems');
  console.log(`${itemsToProcess} left to process`);

  let currentProccessing: number = 0;
  while (currentProccessing < itemsToProcess) {
    let item: { id: string, outer: string } = JSON.parse(await indexAsync('unprocessedItems', currentProccessing));
    // console.log(item.outer);
    const $ = cheerio.load(item.outer);

    const price: string = $('.s-item__price').text();
    const endDate: string = $('.s-item__ended-date.s-item__endedDate').text();
    const shippingCost: string = $('.s-item__shipping.s-item__logisticsCost').text().replace(' shipping', '');
    const freeShipping: boolean = shippingCost.toLowerCase().indexOf('free') !== -1;
    const brand: string = $('.s-item__dynamicAttributes1').text().replace('Brand: ', '');
    const summary: string = $('.s-item__summary').text();


    console.table({ id: item.id, brand, price, endDate, shippingCost, freeShipping, s: summary });

    currentProccessing++;
  }

  console.log('Finished processing');
}

// setInterval(startProcessing, 10000);

startProcessing();