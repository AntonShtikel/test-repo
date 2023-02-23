import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Transaction } from '../transaction/transaction.entity';
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Category creation' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
  @ApiOperation({ summary: 'Get one category' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:id')
  getOneCategory(@Param('id') id: number) {
    return this.categoryService.getOneCategory(id);
  }
  @ApiOperation({ summary: 'Delete one category' })
  @ApiResponse({ status: 200, description: `Spotify subscription deleted` })
  @Delete('/:name')
  deleteCategory(@Param('name') name: string) {
    return this.categoryService.deleteCategory(name);
  }
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: Category })
  @Put('/:id')
  editCategory(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoryService.editCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Transactions statistic' })
  @ApiResponse({ status: 200, type: Transaction })
  @Get(':categoryId/:fromPeriod/:toPeriod')
  async getCategoryStatistic(
    @Param('categoryId') categoryId: number,
    @Param('fromPeriod') fromPeriod: string,
    @Param('toPeriod') toPeriod: string,
  ): Promise<Transaction[]> {
    return await this.categoryService.getStatistics(
      categoryId,
      new Date(fromPeriod),
      new Date(toPeriod),
    );
  }
}
