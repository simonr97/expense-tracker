import { SelectedYearMonth } from '../shared/selected-year-month/selected-year-month';
import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Expense, ExpenseDateRange, ExpenseFormModel } from './expenses.model';

@Service()
export class ExpensesService {

  private readonly http = inject(HttpClient);

  private selectedYearMonthService = inject(SelectedYearMonth)

  private readonly selectedRowId = signal<string | undefined>(undefined);

  readonly selectedId = this.selectedRowId.asReadonly()

  readonly expensesOfMonth = computed(()=>{
    const resource = this.getExpensesByYearMonth;
    return resource.hasValue() ? resource.value() : [];
  })

  modifySelectedRowId = (id:string|undefined) => this.selectedRowId.set(id);

  selectExpense = computed(()=>{

    const id = this.selectedRowId()
    if(!id) return undefined;

    return this.expensesOfMonth().find(e => e.id === id)

  })

  //--------------- HTTP GET ---------------
  //getExpenses = httpResource<Expense[]>(()=>`${environment.apiUrl}/expenses`)

  getDateRange = httpResource<ExpenseDateRange>(()=>`${environment.apiUrl}/expenses/date-range`)

  getExpensesByYearMonth = httpResource<Expense[]>(()=>{
    const yearMonth = this.selectedYearMonthService.yearMonth();
    if(!yearMonth) return;
    return {url:`${environment.apiUrl}/expenses/by-year-month`,params:{yearMonth}}
  })
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postExpense(newExpense: ExpenseFormModel){
    return this.http.post<Expense>(`${environment.apiUrl}/expenses`,newExpense)
  }
  //--------------- HTTP POST ---------------

  //--------------- HTTP DELETE ---------------
  deleteExpense(id:string){
    return this.http.delete<Expense>(`${environment.apiUrl}/expenses/${id}`)
  }
  //--------------- HTTP DELETE ---------------

  //--------------- HTTP PATCH ---------------
  updateExpense(id:string, updateExpense: ExpenseFormModel){
    return this.http.patch<Expense>(`${environment.apiUrl}/expenses/${id}`,updateExpense)
  }
  //--------------- HTTP PATCH ---------------
}
