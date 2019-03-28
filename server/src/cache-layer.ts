// save items to the cache
// read items from the cache
//   - process items
//   - store to db
//   - create actionable data
import redis, { RedisClient } from 'redis';
import dotenv from 'dotenv';
import { promisify } from 'util';

interface CacheConfig {
  redis: {}
}
export const UNPROCESSED_ITEM: string = 'unprocessedItems';

export class CacheLayer {
  private redisClient: RedisClient;
  private lastScrapedId: number = -1;
  private lastProcessedId: number = -1;

  private asyncGet: any; //  = promisify(this.redisClient.get).bind(this.redisClient);

  get LastScrapedID(): number {
    return this.lastScrapedId;
  }
  set LastScrapedID(value: number) {
    this.lastScrapedId = value;
  }

  get RC(): RedisClient {
    if (!this.redisClient.connected) throw new Error('There is no connection to redis client');
    return this.redisClient;
  }

  private async fetchRedisIDs() {
    this.lastScrapedId = await this.asyncGet('lastScrapedId');
    this.lastProcessedId = await this.asyncGet('lastProcessedId');
  }

  constructor(config: CacheConfig) {
    this.redisClient = new RedisClient(config.redis);
    this.asyncGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.fetchRedisIDs();
  }

  addUnprocessedItems(itemsToAdd: any[]) {
    itemsToAdd.forEach((item, index) => {
      this.redisClient.sadd(UNPROCESSED_ITEM, item);
    });
  }

}
