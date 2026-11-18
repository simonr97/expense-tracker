import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDTO } from './dto/create-expense-dto';
import { Prisma } from '../../generated/prisma/client';
import { UpdateExpenseDTO } from './dto/update-expense-dto';

const expenseRelations = {
  category: { select: { name: true, color: true, icon: true } },
  account: { select: { name: true } },
  merchant: { select: { name: true } },
  paymentMethod: { select: { name: true } },
} satisfies Prisma.ExpenseInclude;

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
      include: expenseRelations,
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

  async getExpensesByYearMonth(start: Date, end: Date) {
    const where = { date: { gte: start, lt: end } };
    const expensesFiltered = await this.prisma.expense.findMany({
      where: where,
      include: expenseRelations,
      orderBy: { date: 'desc' },
    });
    return expensesFiltered;
  }

  async deleteExpense(id: string) {
    const deletedExpense = await this.prisma.expense.delete({
      where: { id },
    });
    return deletedExpense;
  }

  async updateExpense(id: string, expense: UpdateExpenseDTO) {
    const updatedExpense = await this.prisma.expense.update({
      where: { id },
      data: expense,
      include: expenseRelations,
    });
    return updatedExpense;
  }
}
