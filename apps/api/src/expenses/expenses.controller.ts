import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExpenseDTO } from './dto/create-expense-dto';
import { ExpensesService } from './expenses.service';
import { GetExpenseDTO } from './dto/get-expense-dto';
import { argentinaMonthRange } from '../common/argentina-date';
import { UpdateExpenseDTO } from './dto/update-expense-dto';

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

  @Get('by-year-month')
  async getExpensesByYearMonth(@Query() query: GetExpenseDTO) {
    const { start, end } = argentinaMonthRange(query.yearMonth);
    return await this.expenses.getExpensesByYearMonth(start, end);
  }

  @Delete(':id')
  async deleteExpense(@Param('id', ParseUUIDPipe) id: string) {
    return await this.expenses.deleteExpense(id);
  }

  @Patch(':id')
  async updateExpense(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateExpenseDTO,
  ) {
    return await this.expenses.updateExpense(id, dto);
  }
}
