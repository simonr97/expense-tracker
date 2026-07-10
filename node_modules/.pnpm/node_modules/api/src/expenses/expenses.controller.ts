import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseDTO } from './dto/create-expense-dto';

@Controller('expenses')
export class expenseController {
  @Post()
  create(@Body() dto: CreateExpenseDTO) {
    return { id: 1, ...dto };
  }
}
