import { StartSoldSearch } from './app/scraper';
import * as redis from 'redis';
const { promisify } = require('util');

const client = redis.createClient({
  host: '10.0.0.10'
});
const getAsync = promisify(client.get).bind(client);
const lenAsync = promisify(client.llen).bind(client);
const rangeAsync = promisify(client.lrange).bind(client);

client.on('error', err => {
  console.log('Error with redis: ' + err);
});

client.on('message', (channel: string, message: string) => {
  console.log(message);
});

async function StoreShoes(results) {
  console.log(`Storing ${results.length} items`);
  // const length = await lenAsync('unprocessedItems');
  // const currentSet = await rangeAsync('unprocessedItems', 0, length);
  // console.log(`currentSet: ${currentSet.length}`);
  // const totes = await getAsync('unprocessedItems'); // client.get()
  // console.log(totes.length);
  // tslint:disable-next-line: no-console
  console.time('pushtoredis');
  results.forEach(shoe =>
    client.lpush('unprocessedItems', JSON.stringify(shoe))
  );
  // tslint:disable-next-line: no-console
  console.timeEnd('pushtoredis');
  const lastScrapedId = results[0].id;
  console.log('Storing lastScrapedId', lastScrapedId);
  client.set('lastScrapedId', results[0].id);
}

setInterval(async () => {
  console.log('Scraping');
  const lastScrapedId: number = await getAsync('lastScrapedId');
  const results = await StartSoldSearch(lastScrapedId);
  if (results.length > 0) {
    StoreShoes(results);
  }
}, 10000);

process.on('beforeExit', () => {
  console.log('leaving!');
  client.quit();
});
