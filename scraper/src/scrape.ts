import axios from 'axios';
import * as cheerio from 'cheerio';

(async () => {
  const response = await axios.get('https://www.ebay.com/b/Mens-Athletic-Shoes/15709/bn_57918?LH_ItemCondition=1500&LH_Sold=1&rt=nc&_dmd=1&_sop=13&_udlo=75&_pgn=1', {headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
  }});
  // const response = axios('https://www.ebay.com/b/Mens-Athletic-Shoes/15709/bn_57918?LH_ItemCondition=1500&LH_Sold=1&rt=nc&_dmd=1&_sop=13&_udlo=75&_pgn=1')
  console.log(response);
})();