"use strict";
// import * as puppeteer from 'puppeteer';
// declare var location: any;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({path: 'example.png'});
//   page.on('console', msg => console.log('PAGE LOG:', msg.text()));
//   await page.evaluate(() => console.log(`url is ${location.href}`));
//   await browser.close();
// })();
const puppeteer = require("puppeteer");
// declare var location: any;
const STARTING_URL = '';
const SOLD_ROOT = 'https://www.ebay.com/b/Mens-Athletic-Shoes/15709/bn_57918?LH_ItemCondition=1500&LH_Sold=1&rt=nc&_dmd=1&_sop=13&_udlo=75';
let browser;
let page;
function StartSoldSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield puppeteer.launch();
        page = yield browser.newPage();
        yield page.goto(SOLD_ROOT);
        yield page.screenshot({ path: 'ebay.png' });
        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        // await page.evaluate(() => console.log(`url is ${location.href}`));
        yield browser.close();
    });
}
// async function ParseEntry(): Promise<any> {}
StartSoldSearch();
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({path: 'example.png'});
//   page.on('console', msg => console.log('PAGE LOG:', msg.text()));
//   await page.evaluate(() => console.log(`url is ${location.href}`));
//   await browser.close();
// })();
//# sourceMappingURL=scraper.js.map