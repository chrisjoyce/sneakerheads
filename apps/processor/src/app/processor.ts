import * as redis from 'redis';
import { promisify } from 'util';
import * as cheerio from 'cheerio';
import { ShoeSale, UnprocessedShoeSale } from '@sneakerheads.io/shared';
import { createConnection } from 'typeorm';

export async function startProcessing() {
  const client = redis.createClient({
    host: '10.0.0.10'
  });

  const db = await createConnection({
    type: 'postgres',
    host: '10.0.0.10',
    username: 'postgres',
    password: 'postgres',
    database: 'sneakerheads',
    entities: [ShoeSale, UnprocessedShoeSale],
    logging: true,
    synchronize: true
  });

  const lenAsync = promisify(client.llen).bind(client);

  const getAsync = promisify(client.get).bind(client);
  const indexAsync = promisify(client.lindex).bind(client);
  const leftPopAsync = promisify(client.lpop).bind(client);
  const itemsToProcess: number = await lenAsync('unprocessedItems');
  console.log(`${itemsToProcess} left to process`);

  let currentProccessing: number = 0;
  while (currentProccessing < itemsToProcess) {
    // const item = JSON.parse(await leftPopAsync('unprocessedItems'));
    const item: { id: string; outer: string } = JSON.parse(
      await indexAsync('unprocessedItems', currentProccessing)
    );
    const $ = cheerio.load(item.outer);

    const price: string = $('.s-item__price')
      .text()
      .replace('$', '');
    const endDate: string = $('.s-item__ended-date.s-item__endedDate').text();
    const shippingCost: string = $('.s-item__shipping.s-item__logisticsCost')
      .text()
      .replace('$', '')
      .replace(' shipping', '');
    const freeShipping: boolean =
      shippingCost.toLowerCase().indexOf('free') !== -1;
    const brand: string = $('.s-item__dynamicAttributes1')
      .text()
      .replace('Brand: ', '');
    const summary: string = $('.s-item__summary').text();
    const title: string = $('.s-item__title').text();
    const styleRegex: RegExp = /(?<=\s|\()([\w]{6})([\s-])([\w]{3})(?= |\))/g;

    const newStyleRegEx: RegExp = /(?<=_)([A-Z0-9]{6})([_])([\d]{3})(?=[\s_])/g;

    let data_image_url = $('img.s-item__image-img').data('src');

    if (!data_image_url) {
      data_image_url = $('img.s-item__image-img').attr('src');
    }

    const original_url: string = $('a.s-item__link').attr('href');

    let st = title.replace(/-/g, '_');
    st = st.replace(/\s|\(/g, '_');
    st = st.replace(/\W+/g, '_');

    // console.time('execstart');
    const blah = newStyleRegEx.exec(st);
    // console.timeEnd('execstart');

    currentProccessing++;

    const ebayId = item.id;
    const salePrice: number = parseFloat(price);

    const sale = {
      ebayId,
      brand,
      price: salePrice,
      endDate,
      shippingCost: freeShipping ? 0.0 : parseFloat(shippingCost),
      freeShipping,
      title,
      styleNumber: blah ? blah[1] : '',
      colorWay: blah ? blah[3] : '',
      sold_date: new Date(endDate),
      image_url: data_image_url,
      original_url
    };
    let shoeSale;
    if (sale.styleNumber === '') {
      try {
        shoeSale = new UnprocessedShoeSale();
      } catch (e) {
        console.log(e);
      }
    } else {
      shoeSale = new ShoeSale();
    }
    Object.assign(shoeSale, sale);
    db.manager.save(shoeSale);
  }

  console.log('Finished processing');
}
