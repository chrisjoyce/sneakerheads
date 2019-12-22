import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ShoeSale } from './shoesale';

@Entity()
export class UnprocessedShoeSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ebayId: string;

  @Column()
  brand: string;

  @Column({ type: 'real', default: 0.0 })
  price: number;

  @Column({ type: 'real', default: 0.0 })
  shippingCost: number;

  @Column({ default: false })
  freeShipping: boolean;

  @Column()
  title: string;

  @Column()
  styleNumber: string;

  @Column()
  colorWay: string;

  @Column({ nullable: true })
  sold_date: Date;

  @Column()
  original_url: string;

  @Column()
  image_url: string;

  @Column({
    nullable: true
  })
  size: number;
}
