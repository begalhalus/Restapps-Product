import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column("varchar", {
    length: 100,
  })
  @Length(1, 100)
  prod_name: string;

  @Column("varchar", {
    length: 255,
  })
  @Length(1, 255)
  prod_sku: string;

  @Column()
  @Length(1, 5)
  prod_amount: number;

  @Column()
  @Length(1, 5)
  prod_author: number;

  @Column()
  @CreateDateColumn()
  prod_register: Date;

  @Column()
  @UpdateDateColumn()
  prod_updated: Date;

  @Column()
  @DeleteDateColumn()
  prod_deleted: Date;
}
