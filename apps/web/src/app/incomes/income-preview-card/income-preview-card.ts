import { required } from '@angular/forms/signals';
import { Component, computed, input } from '@angular/core';
import { incomeIcon, IncomePreview } from '../incomes.model';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { formatAmount, formatCalendarDate } from '../../shared/field-formatter';

interface PreviewRow {
  label: string;
  icon: string;
  value: string | undefined;
}

@Component({
  selector: 'app-income-preview-card',
  imports: [IconRenderer],
  templateUrl: './income-preview-card.html',
  styleUrl: './income-preview-card.css',
})
export class IncomePreviewCard {
  formData = input.required<IncomePreview>()

  readonly icon = incomeIcon;

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
      { label: 'Account', icon: 'wallet', value: data.account },
    ];
  })

  isEmpty = computed(()=>{
    const data = this.formData();
    return !data.description && !this.amount() && !data.date && !data.account;
  })
}
