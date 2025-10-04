import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole{
  EMPLOYEE='employee',
  ADMIN='admin'
}
@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  email:string;
  @Column()
  name:string;
  @Column()
  password:string;
  @Column({
    type:'enum',
    enum:UserRole,
    default:UserRole.EMPLOYEE
  })
  role:UserRole;
  @CreateDateColumn()
  createdAt:Date;
  @UpdateDateColumn()
  updatedAt:Date;
}