import { CreateExpenseDTO } from './create-expense-dto';
export declare class expenseController {
    create(dto: CreateExpenseDTO): {
        description: string;
        amount: number;
        id: number;
    };
}
