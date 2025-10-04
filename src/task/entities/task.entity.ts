import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Task{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({length:50})
  title:string;
  @Column({type:'text'})
  content:string;
  @CreateDateColumn()
  createdAt:Date;
  @UpdateDateColumn()
  updatedAt:Date;
}