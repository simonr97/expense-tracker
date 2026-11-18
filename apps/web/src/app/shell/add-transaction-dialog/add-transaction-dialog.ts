import { Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { ExpenseForm } from '../../expenses/expense-form/expense-form';
import { IncomeQuickCreate } from '../../incomes/income-quick-create/income-quick-create';
import { defaultCategoryLook } from '../../categories/categories.model';
import { incomeIcon } from '../../incomes/incomes.model';
import { Expense } from '../../expenses/expenses.model';

interface HeaderText {
  title: string;
  subtitle: string;
}

type TransactionType = 'expense' | 'income';
type Mode = 'create' | 'update'

const headerByType = {
  expense: {
    create:{
      title: 'Add Expense',
      subtitle: 'Record a new expense and keep your finances up to date.',
    },
    update:{
      title: 'Update your Expense',
      subtitle: 'Update your expense and keep your finances up to date.',
    },
    icon: defaultCategoryLook.icon,
  },
  income: {
    create:{
      title: 'Add Income',
      subtitle: 'Record a new income and keep your finances up to date.',
    },
    update:{
      title: 'Update your Income',
      subtitle: 'Update your income and keep your finances up to date.',
    },
    icon: incomeIcon,
  },
} satisfies Record<TransactionType,Record<Mode,HeaderText> & {icon: string}>

@Component({
  selector: 'app-add-transaction-dialog',
  imports: [IconRenderer, ExpenseForm, IncomeQuickCreate],
  templateUrl: './add-transaction-dialog.html',
})

export class AddTransactionDialog {
  protected readonly dialogRef = inject(DialogRef);
  protected readonly data = inject<Expense | null>(DIALOG_DATA);
  protected readonly mode: Mode = this.data ? 'update' : 'create';

  // TODO(simon): decide whether amount/date/description survive switching type (roadmap M.2.1).
  readonly type = signal<TransactionType>('expense');

  protected readonly header = computed(()=>{
    const entry = headerByType[this.type()]
    return {
      ...entry[this.mode],
      icon: entry.icon
    }
  });

  protected readonly types: { value: TransactionType; label: string; icon: string }[] = [
    { value: 'expense', label: 'Expense', icon: headerByType.expense.icon },
    { value: 'income', label: 'Income', icon: headerByType.income.icon }
  ];
}
