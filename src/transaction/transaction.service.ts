import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Bank } from '../bank/bank.entity';

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
    const checkCategory = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    const changeBalance = await this.bankRepository.findOne({
      where: { id: dto.bankId },
    });
    if (!changeBalance || !checkCategory) {
      throw new HttpException(
        'Bank or Category do not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(dto.categoryId);
    console.log(dto.bankId);
    dto.type
      ? (changeBalance.balance += dto.amount)
      : (changeBalance.balance -= dto.amount);
    await this.bankRepository.save(changeBalance);
    return await this.transactionRepository.save(dto);
  }
}
