import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeDTO } from './dto/create-income-dto';

@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}

  async createIncome(income: CreateIncomeDTO) {
    const incomeCreation = this.prisma.income.create({
      data: { ...income },
    });
    return incomeCreation;
  }

  async getIncome() {
    const incomes = this.prisma.income.findMany();
    return incomes;
  }
}
