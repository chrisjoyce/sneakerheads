import * as puppeteer from 'puppeteer';

export function RequestParser(req: any): void {
  if (['stylesheet', 'font', 'image'].indexOf(req.resourceType()) !== -1) { // || req.resourceType() === 'font') {
    req.abort();
  } else {
    req.continue();
  }
}

export function ConsoleLogger(msg: puppeteer.ConsoleMessage) {
  if (msg.type() !== 'error') {
    console.log('PAGE LOG:', msg.text());
  }
}