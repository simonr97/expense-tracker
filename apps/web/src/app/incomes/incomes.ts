import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Income, IncomesForm } from './incomes.model';
import { environment } from '../../environments/environment';

@Service()
export class Incomes {
  private readonly http = inject(HttpClient);

  //--------------- HTTP GET ---------------
  getIncomes = httpResource<Incomes[]>(()=>`${environment.apiUrl}/incomes`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postIncomes(newIncome: IncomesForm) {
    return this.http.post<Incomes>(`${environment.apiUrl}/incomes`,newIncome)
  }
  //--------------- HTTP POST ---------------
}
