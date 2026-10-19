import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDTO } from './dto/create-expense-dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async createExpense(expense: CreateExpenseDTO) {
    const expenseCreation = await this.prisma.expense.create({
      data: { ...expense },
    });
    return expenseCreation;
  }

  async getExpenses() {
    const expenses = await this.prisma.expense.findMany({
      include: {
        category: {
          select: {
            name: true,
            color: true,
            icon: true,
          },
        },
        account: {
          select: {
            name: true,
          },
        },
        merchant: {
          select: {
            name: true,
          }
        }
      },
    });
    return expenses;
  }

  async getDateRange() {
    const range = await this.prisma.expense.aggregate({
      _min: {
        date: true,
      },
      _max: {
        date: true,
      },
    });
    const fromatedRange = {
      min: range._min.date,
      max: range._max.date,
    };
    return fromatedRange;
  }
}
