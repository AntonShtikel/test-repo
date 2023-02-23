import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Between, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Transaction } from '../transaction/transaction.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(dto);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getOneCategory(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }
  async deleteCategory(name: string): Promise<string> {
    if (await this.categoryRepository.delete({ name })) {
      return `${name} deleted`;
    }
    return 'deleting error';
  }

  async editCategory(
    id,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<UpdateResult> {
    const checkCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!checkCategory) {
      throw new HttpException('Bank does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async getStatistics(
    categoryId: number,
    fromPeriod: Date,
    toPeriod: Date,
  ): Promise<any[]> {
    let transactions = [];
    transactions = await this.transactionRepository.find({
      where: {
        category: { id: categoryId },
        created_at: Between(fromPeriod, toPeriod),
      },
      relations: ['bank', 'category'],
    });
    console.log(transactions);
    return transactions;
  }
}
