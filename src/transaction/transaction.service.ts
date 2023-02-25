import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Transaction } from './transaction.entity';
import { Between, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Bank } from '../bank/bank.entity';
import axios from 'axios';
import * as process from 'process';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const categories = [];
    for (const id of dto.categoryIds) {
      const category = await this.categoryRepository.findOne({
        where: { id: id },
      });
      if (category) {
        categories.push(category);
      }
    }
    const changeBalance = await this.bankRepository.findOne({
      where: { id: dto.bankId },
    });
    if (!changeBalance || !categories) {
      throw new HttpException(
        'Bank or Category do not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    dto.type
      ? (changeBalance.balance += dto.amount)
      : (changeBalance.balance -= dto.amount);
    await this.bankRepository.save(changeBalance);
    const transaction = new Transaction();
    transaction.amount = dto.amount;
    transaction.type = dto.type;
    transaction.bank = changeBalance;
    transaction.categories = categories;
    await axios.post(process.env.WEBHOOKURL, transaction);
    return await this.transactionRepository.save(transaction);
  }

  async getTransactions(page = 1, limit = 10): Promise<Transaction[]> {
    const skip = (page - 1) * limit;
    return await this.transactionRepository.find({
      skip,
      take: limit,
    });
  }

  async deleteTransaction(id: number): Promise<string> {
    if (await this.transactionRepository.delete({ id })) {
      return ` transaction  ${id} deleted`;
    }
    return 'deleting error';
  }
  async getStatistics(
    categoryId: number,
    fromPeriod: Date,
    toPeriod: Date,
  ): Promise<any[]> {
    let transactions = [];
    transactions = await this.transactionRepository.find({
      where: {
        categories: { id: categoryId },
        created_at: Between(fromPeriod, toPeriod),
      },
    });
    return transactions;
  }
}
