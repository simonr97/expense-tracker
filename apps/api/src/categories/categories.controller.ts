import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category-dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Post()
  async createCategory(@Body() dto: CreateCategoryDTO) {
    return await this.categories.createCategory(dto);
  }

  @Get()
  async getCategories() {
    return await this.categories.getCategories();
  }
}
