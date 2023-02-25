import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (category) {
      throw new HttpException('Category exist', HttpStatus.BAD_REQUEST);
    }
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
}
