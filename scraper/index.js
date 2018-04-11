// const Nick = require('nickjs')
// const nick = new Nick()
// const cookie = require('@/config/test.json')
// console.log(cookie)

// require('dotenv').config()

// // ;(async () => {
// //   // await nick.setCookie(cookies);
// //   const tab = await nick.newTab()
// //   await tab.open("ebay.com")
// //   await tab.untilVisible("#balance")

// // })()
// // .then(() => {})
// // .catch((err) => {
// //   console.log(`Error found: ${err}` );
// // })

import Nick from 'nickjs'
const nick = new Nick({
  // headless: true
})

const minPrice = 75

const ebay_sold_root = 'https://www.ebay.com/b/Mens-Athletic-Shoes/15709/bn_57918?LH_ItemCondition=1500&LH_Sold=1&rt=nc&_dmd=1&_sop=13&_udlo=75'
const resultSelector = '.srp-controls__count-heading'
const listStartSelector = '.b-list__items_nofooter'
const soldPriceSelector = ''
const shippingSelector = ''


const pageLoadTimeout = 5000

const grabFirstPage = async (tab) => {
  // try {
  //   const path = await tab.screenshot('ebay-searchresults-1.jpg')    
  //   console.log(`Screenshot saved @ ${path}`)
  // } catch (error) {
  //   console.error('Failed to grab screenshot');
  // }

  try {
    await tab.inject('https://code.jquery.com/jquery-3.1.1.slim.min.js')
    console.log('jquery injected')
    const shoeResults = await tab.evaluate((arg, callback) => {
      console.log("trying to eval")      
      let data = [];
      $('.s-item').each((index, element) => {
        data.push({
          index,
          imageUrl: $(element).find('.s-item__image-img').attr('href')
        })
      });
      callback(null, data)
    });
    console.log(shoeResults)
      //   console.log("in page evaluating")
    //   // console.log(typeof jQuery)
    //   // console.log($)
    //   const data = []
    //   console.log($)
    //   // data = jQuery('')
    //   callback(null, data);
    // });
  } catch (e) {
    console.log('TAB 1 inject exception: ' + e)
  }
};

const startEbaySearch = async () => {
  console.log('startEbaySearch');

  //TODO:  set cookies
  try {
    const tab = await nick.newTab();

    const [status, statusText, newUrl] = await tab.open(ebay_sold_root)
    console.log(`OPEN RET: ${status}, ${statusText}, ${newUrl}`)

    await tab.waitUntilVisible(resultSelector, pageLoadTimeout)
    await grabFirstPage(tab)
    await tab.close()
    nick.exit()
    console.log('end of search')  
  } catch (error) {
    console.error(`Failed to do something awesome: ${error}`);
  }
}

startEbaySearch()
