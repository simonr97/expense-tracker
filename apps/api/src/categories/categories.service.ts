import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category-dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(category: CreateCategoryDTO) {
    const categoryCreation = await this.prisma.category.create({
      data: { ...category },
    });
    return categoryCreation;
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
