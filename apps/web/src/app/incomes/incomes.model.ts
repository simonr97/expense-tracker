// Income has no category, so this icon identifies it (dialog header, type switch, preview).
export const incomeIcon = 'banknote-arrow-up';

export interface IncomesForm {
  description: string;
  amount: number;
  date: string;
  currency: 'ARS' | 'USD';
  accountId:string;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  currency: 'ARS' | 'USD';
  accountId:string;
}

export interface IncomePreview {
  description: string;
  amount: number;
  currency: 'ARS' | 'USD';
  date: string;
  account: string | undefined;
}
