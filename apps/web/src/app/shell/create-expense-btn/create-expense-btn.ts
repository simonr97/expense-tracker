import { Component, inject } from '@angular/core';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { Dialog } from "@angular/cdk/dialog";
import { AddTransactionDialog } from '../add-transaction-dialog/add-transaction-dialog';

@Component({
  selector: 'app-create-expense-btn',
  imports: [IconRenderer],
  templateUrl: './create-expense-btn.html',
  styleUrl: './create-expense-btn.css',
})
export class CreateExpenseBtn {
  dialog = inject(Dialog)

  openExpenseForm(): void {
    this.dialog.open(AddTransactionDialog, { ariaLabelledBy: 'add-transaction-title' });
  }
}
