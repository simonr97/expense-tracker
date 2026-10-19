import { CreateExpenseDTO } from './dto/create-expense-dto';
import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private readonly expenses;
    constructor(expenses: ExpensesService);
    createExpense(dto: CreateExpenseDTO): Promise<{
        description: string;
        amount: import("@prisma/client/runtime/index-browser").Decimal;
        categoryId: string;
        accountId: string;
        merchantId: string;
        notes: string | null;
        status: import("../../generated/prisma/enums").ExpenseStatus;
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getExpenses(): Promise<({
        category: {
            name: string;
            color: string;
            icon: string;
        };
        account: {
            name: string;
        };
        merchant: {
            name: string;
        };
    } & {
        description: string;
        amount: import("@prisma/client/runtime/index-browser").Decimal;
        categoryId: string;
        accountId: string;
        merchantId: string;
        notes: string | null;
        status: import("../../generated/prisma/enums").ExpenseStatus;
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getDateRange(): Promise<{
        min: Date | null;
        max: Date | null;
    }>;
}
