import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bank } from '../bank/bank.entity';
import { Category } from '../categories/category.entity';

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @ApiProperty({
    example: '63823b42-3430-41fa-9803-2fb3f16fd114',
    description: 'Primary key',
  })
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty({
    example: '2023-02-22 12:10:27.974312',
    description: 'created time',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  @JoinColumn()
  bank: Bank;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
