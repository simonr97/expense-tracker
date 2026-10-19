import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Merchant, MerchantForm } from './merchant.model';
import { environment } from '../../environments/environment';

@Service()
export class MerchantsService {
  private readonly http = inject(HttpClient);

  //--------------- HTTP GET ---------------
  getMerchants = httpResource<Merchant[]>(()=>`${environment.apiUrl}/merchants`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postMerchant(newMerchant: MerchantForm){
    return this.http.post<Merchant>(`${environment.apiUrl}/merchants`,newMerchant);
  }
  //--------------- HTTP POST ---------------
}
