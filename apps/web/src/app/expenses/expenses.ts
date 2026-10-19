import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Expense, ExpenseDateRange, ExpensesForm } from './expenses.model';

@Service()
export class ExpensesService {

  private readonly http = inject(HttpClient);

  private readonly selectedRowId = signal<string | undefined>(undefined);

  readonly _selectedId = this.selectedRowId.asReadonly()

  modifySelectedRowId = (id:string|undefined) => this.selectedRowId.set(id);

  selectExpense = computed(()=>{

    const id = this.selectedRowId()
    if(!id) return undefined;

    return this.getExpenses.value()?.find(e => e.id === id)

  })

  //--------------- HTTP GET ---------------
  getExpenses = httpResource<Expense[]>(()=>`${environment.apiUrl}/expenses`)

  getDateRange = httpResource<ExpenseDateRange>(()=>`${environment.apiUrl}/expenses/date-range`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postExpense(newExpense: ExpensesForm){
    return this.http.post<Expense>(`${environment.apiUrl}/expenses`,newExpense)
  }
  //--------------- HTTP POST ---------------
}
