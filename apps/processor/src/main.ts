import 'reflect-metadata';
import { ShoeSale } from '@sneakerheads.io/shared';
import { startProcessing } from './app/processor';
import { createConnection } from 'typeorm';

// setInterval(() => {
//   console.log('Processing');

//   startProcessing();
// }, 10000);

setImmediate(async () => {
  const db = await createConnection({
    type: 'postgres',
    host: '10.0.0.10',
    username: 'postgres',
    password: 'postgres',
    database: 'sneakerheads',
    entities: [ShoeSale],
    logging: false,
    synchronize: true,
    name: 'test'
  });

  db.manager.clear(ShoeSale);
  await startProcessing();

  const savedShoes: ShoeSale[] = await db.manager.find(ShoeSale, {
    order: {
      id: 'DESC'
    }
  });
  console.log(savedShoes[0].price + savedShoes[1].price);
});
