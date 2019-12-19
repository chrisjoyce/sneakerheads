import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Model } from './model'
import { Style } from './style';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: Model;

  @Column()
  style: Style;
}
