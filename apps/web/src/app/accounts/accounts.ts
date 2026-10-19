import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Account, AccountForm } from './accounts.model';
import { environment } from '../../environments/environment';
import { CategoryForm } from '../categories/categories.model';

@Service()
export class AccountsService {
  private readonly http = inject(HttpClient);

  //--------------- HTTP GET ---------------
  getAccounts = httpResource<Account[]>(()=>`${environment.apiUrl}/accounts`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postAccount(newAccount: AccountForm){
    return this.http.post<Account>(`${environment.apiUrl}/accounts`,newAccount)
  }
  //--------------- HTTP POST ---------------

}
