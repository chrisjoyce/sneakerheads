import { VERSION } from '@sneakerheads.io/shared';
console.log(VERSION);
import * as redis from 'redis';
import { startProcessing } from './app/processor';

setInterval(() => {
  console.log('Processing');

  startProcessing();
}, 10000);
