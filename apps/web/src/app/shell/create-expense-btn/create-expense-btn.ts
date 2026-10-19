import { Component, inject } from '@angular/core';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { Dialog } from "@angular/cdk/dialog";
import { ExpenseForm } from '../../expenses/expense-form/expense-form';
import { ExpensesForm } from '../../expenses/expenses.model';

@Component({
  selector: 'app-create-expense-btn',
  imports: [IconRenderer],
  templateUrl: './create-expense-btn.html',
  styleUrl: './create-expense-btn.css',
})
export class CreateExpenseBtn {
  dialog = inject(Dialog)

  openExpenseForm(): void {
    this.dialog.open<ExpensesForm>(ExpenseForm);
  }
}
