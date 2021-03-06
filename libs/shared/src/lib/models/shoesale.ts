import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ShoeSaleInterface } from './shoe_sale_base';

@Entity()
export class ShoeSale extends ShoeSaleInterface {
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
}
