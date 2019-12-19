import { PrimaryGeneratedColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id: number;
}