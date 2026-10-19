import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateExpenseDTO } from './dto/create-expense-dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenses: ExpensesService) {}

  @Post()
  async createExpense(@Body() dto: CreateExpenseDTO) {
    return await this.expenses.createExpense(dto);
  }

  @Get()
  async getExpenses() {
    return await this.expenses.getExpenses();
  }

  @Get('date-range')
  async getDateRange() {
    return await this.expenses.getDateRange();
  }
}
