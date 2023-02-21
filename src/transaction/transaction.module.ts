import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from './transaction.entity';
import { Bank } from '../bank/bank.entity';
import { Category } from '../categories/category.entity';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([Bank]),
    TypeOrmModule.forFeature([Category]),
  ],
})
export class TransactionModule {}
