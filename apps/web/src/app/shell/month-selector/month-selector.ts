import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ExpensesService } from '../../expenses/expenses';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { MonthOption } from '../shell.model';

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });

@Component({
  selector: 'app-month-selector',
  imports: [IconRenderer],
  templateUrl: './month-selector.html',
  styleUrl: './month-selector.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'isOpen.set(false)',
  },
})
export class MonthSelector {

  private readonly expensesService = inject(ExpensesService)

  dateRange = this.expensesService.getDateRange;

  isOpen = signal(false);

  formattedMaxDate = computed(() => {
  const max = this.dateRange.value()?.max;
  return max ? new Date(max) : null;
  });

  formattedMinDate = computed(() => {
  const min = this.dateRange.value()?.min;
  return min ? new Date(min) : null;
  });

  totalMonth = computed(()=>{
    const max = this.formattedMaxDate();
    const min = this.formattedMinDate();

    if(!max || !min) {
      return null;
    }
    else{
      return (max.getFullYear() - min.getFullYear()) * 12 + (max.getMonth() - min.getMonth())
    }
  });

  allDates = computed(()=>{
    const max = this.formattedMaxDate();
    const min = this.formattedMinDate();
    const months = this.totalMonth()
    let dates = [];
    if(months === null || !max || !min) return null;
    for (let i = 0; i <= months; i++) {
      dates.push(new Date(min.getFullYear(), min.getMonth()+i,1))
    }
    return dates;
  })

  monthOptions = computed(()=>{
    const dates = this.allDates()
    if(!dates?.length) return [];
    return [...dates].reverse().map(date => ({ date, label: monthFormatter.format(date) }))
  })

  // Keeps the user's month if it still exists after a reload; otherwise falls back to the most recent one.
  selectedMonth = linkedSignal<MonthOption[], MonthOption | null>({
    source: this.monthOptions,
    computation: (options, previous) => {
      const previousTime = previous?.value?.date.getTime();
      return options.find(option => option.date.getTime() === previousTime) ?? options[0] ?? null;
    },
  });

  toggle(){
    this.isOpen.update(open => !open);
  }

  select(option: MonthOption){
    this.selectedMonth.set(option);
    this.isOpen.set(false);
  }

  onDocumentClick(event: MouseEvent){
    const target = event.target as HTMLElement;
    if(!target.closest('app-month-selector')) this.isOpen.set(false);
  }

  calculateSelectedMonthIndex(){
    return this.monthOptions().findIndex((option)=>
      option.date.getTime() === this.selectedMonth()?.date.getTime()
    )
  }

  goToPreviousMonth(){
    const i = this.calculateSelectedMonthIndex()
    this.selectedMonth.set(this.monthOptions()[i+1])
  }

  goToNextMonth(){
    const i = this.calculateSelectedMonthIndex()
    this.selectedMonth.set(this.monthOptions()[i-1])
  }

  isOldestMonth = computed(()=>{
    return this.calculateSelectedMonthIndex() === this.monthOptions().length-1;
  })

  isLatestMonth = computed(()=>{
    return this.calculateSelectedMonthIndex() === 0;
  })
}
