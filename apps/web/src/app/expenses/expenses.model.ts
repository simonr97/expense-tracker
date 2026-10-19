export interface ExpensesForm {
  description: string;
  amount: number;
  categoryId: string;
  accountId: string;
  merchantId: string;
  notes: string;
  status: 'Completed' | 'Pending';
}

export interface ExpenseCategory {
  name: string;
  color: string;
  icon: string;
}
export interface ExpensesAccount {
  name: string;
}
export interface ExpensesMerchant {
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: string;
  notes: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  category: ExpenseCategory;
  categoryId: string;
  account: ExpensesAccount;
  accountId: string;
  merchant: ExpensesMerchant;
  merchantId: string;
}

export interface ExpenseDateRange {
  min: string | null;
  max: string | null;
}

// Mirrors ApiErrorResponse from the API (apps/api/src/exception-filter/api-error-response.ts).
export interface ErrorMessage {
  statusCode: number;
  error: string;
  code: string;
  message: string;
  details?: {
    resource?: string;
    field?: string;
    errors?: string[];
  };
}
