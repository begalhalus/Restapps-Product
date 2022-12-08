import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Com_user {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column("varchar", {
    length: 50,
  })
  @Length(2, 50)
  user_name: string;

  @Column("varchar", {
    length: 50,
  })
  @Length(4, 50)
  user_email: string;

  @Column("varchar", {
    length: 16,
  })
  @Length(4, 16)
  user_username: string;

  @Column("varchar", {
    length: 100,
  })
  @Length(4, 100)
  user_password: string;

  @Column("varchar", {
    length: 30,
  })
  @Length(1, 30)
  user_token: string;

  @Column()
  @CreateDateColumn()
  user_register: Date;

  @Column()
  @UpdateDateColumn()
  user_updated: Date;
}
