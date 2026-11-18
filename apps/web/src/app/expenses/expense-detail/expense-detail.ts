import { Component, computed, input } from '@angular/core';
import { Expense,  } from '../expenses.model';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { CategoryBadge } from '../../categories/category-badge/category-badge';
import { CategoryAvatar } from '../../categories/category-avatar/category-avatar';
import { StatusBadge } from '../status-badge/status-badge';
import { formatAmount, formatDate, formatDateTime } from '../../shared/field-formatter';

@Component({
  selector: 'app-expense-detail',
  imports: [IconRenderer,CategoryBadge,CategoryAvatar,StatusBadge],
  templateUrl: './expense-detail.html',
  styleUrl: './expense-detail.css',
})
export class ExpenseDetail {
  expense = input.required<Expense>();

  formattedExpense = computed(()=>{
    const expense = this.expense();
    return {
      description:expense.description,
      amount: formatAmount(expense.amount,expense.currency),
      notes: expense.notes,
      status: expense.status,
      date: formatDate(expense.date),
      createdAt: formatDateTime(expense.createdAt),
      updatedAt: formatDateTime(expense.updatedAt),
      category: expense.category,
      account: expense.account.name,
      merchant: expense.merchant.name,
      paymentMethod: expense.paymentMethod.name,
    }
  })
}
