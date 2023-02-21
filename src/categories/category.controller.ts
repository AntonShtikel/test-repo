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
  getAllBanks() {
    return this.categoryService.getAllCategories();
  }
  @ApiOperation({ summary: 'Get one category' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:id')
  getOneBank(@Param('id') id: number) {
    return this.categoryService.getOneCategory(id);
  }
  @ApiOperation({ summary: 'Delete one category' })
  @ApiResponse({ status: 200, description: `Spotify subscription deleted` })
  @Delete('/:name')
  deleteBank(@Param('name') name: string) {
    return this.categoryService.deleteCategory(name);
  }
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: Category })
  @Put('/:id')
  editBank(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoryService.editCategory(id, updateCategoryDto);
  }
}
