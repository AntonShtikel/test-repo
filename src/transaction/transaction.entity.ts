import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bank } from '../bank/bank.entity';
import {Category} from "../categories/category.entity";

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @ApiProperty({
    example: '63823b42-3430-41fa-9803-2fb3f16fd114',
    description: 'Primary key',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '100',
    description: 'Transaction amount',
  })
  @Column({ nullable: false })
  amount: number;

  @ApiProperty({
    example: 'true',
    description: 'profitable - true',
  })
  @Column({ nullable: false })
  type: boolean;

  @ManyToOne(() => Bank, (bank) => bank.id)
  @JoinColumn()
  bank: Bank;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: Category;
}
