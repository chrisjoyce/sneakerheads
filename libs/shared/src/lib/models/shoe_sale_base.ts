import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

export abstract class ShoeSaleInterface {
  @PrimaryGeneratedColumn()
  id: number;
}
