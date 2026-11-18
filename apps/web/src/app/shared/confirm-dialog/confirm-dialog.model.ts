export type TransactionType = 'expense';
export type Mode = 'delete' | 'update';

export interface ConfirmDialogData {
  name: string,
  mode: Mode,
  type: TransactionType
}

export interface HeaderText {
  title: string;
  subtitle: (name: string) => string;
}
