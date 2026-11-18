import { Component, inject } from '@angular/core';
import { MonthSelector } from '../month-selector/month-selector';
import { SearchInput } from '../search-input/search-input';
import { CreateExpenseBtn } from '../create-expense-btn/create-expense-btn';
import { SelectedYearMonth } from '../../shared/selected-year-month/selected-year-month';

@Component({
  selector: 'app-topbar',
  imports: [MonthSelector, SearchInput,CreateExpenseBtn],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  protected readonly selectedYearMonthService = inject(SelectedYearMonth)
}
