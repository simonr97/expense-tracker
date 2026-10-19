import { ExpenseStatus } from '../../../generated/prisma/enums';
export declare class CreateExpenseDTO {
    description: string;
    amount: number;
    categoryId: string;
    accountId: string;
    merchantId: string;
    notes: string | undefined;
    status: ExpenseStatus;
    date: Date;
}
