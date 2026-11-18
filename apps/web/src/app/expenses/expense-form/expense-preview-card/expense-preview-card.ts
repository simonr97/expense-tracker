import { Component, computed, input } from '@angular/core';
import { ExpensePreview } from '../../expenses.model';
import { CategoryAvatar } from '../../../categories/category-avatar/category-avatar';
import { CategoryBadge } from '../../../categories/category-badge/category-badge';
import { IconRenderer } from '../../../shared/icon-renderer/icon-renderer';
import { formatAmount, formatCalendarDate, formatDate } from '../../../shared/field-formatter';

interface PreviewRow {
  label: string;
  icon: string;
  value: string | undefined;
}

@Component({
  selector: 'app-expense-preview-card',
  imports: [CategoryAvatar, CategoryBadge, IconRenderer],
  templateUrl: './expense-preview-card.html',
  styleUrl: './expense-preview-card.css',
})
export class ExpensePreviewCard {

  formData = input.required<ExpensePreview>()

  amount = computed(()=>{
    const { amount, currency } = this.formData();
    return amount > 0 ? formatAmount(amount,currency) : undefined;
  })


  date = computed(() => {
    const date = this.formData().date;
    return date ? formatCalendarDate(date) : undefined;
  });


  rows = computed<PreviewRow[]>(()=>{
    const data = this.formData();
    return [
      { label: 'Date', icon: 'calendar', value: this.date() },
      { label: 'Paid To', icon: 'users', value: data.merchant },
      { label: 'Account', icon: 'wallet', value: data.account },
      { label: 'Payment Method', icon: 'credit-card', value: data.paymentMethod },
    ];
  })

  isEmpty = computed(()=>{
    const data = this.formData();
    return !data.description && !this.amount() && !data.date && !data.merchant
      && !data.account && !data.paymentMethod && !data.category && !data.notes;
  })
}
