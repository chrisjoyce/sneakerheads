import { Entity } from 'typeorm'

@Entity()
export class Model {
  id: number
  name: string;
}