import { Module } from '@nestjs/common';
import { expenseController } from './expenses.controller';

@Module({
  controllers: [expenseController],
})
export class ExpenseModule {}
