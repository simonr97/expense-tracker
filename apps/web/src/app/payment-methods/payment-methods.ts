import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaymentMethod, PaymentMethodForm } from './payment-methods.model';

@Service()
export class PaymentMethodsService {
  private readonly http = inject(HttpClient)

  //--------------- HTTP GET ---------------
  getPaymentMethods = httpResource<PaymentMethod[]>(()=>`${environment.apiUrl}/payment-methods`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postPaymentMethods (newPaymentMethod: PaymentMethodForm) {
    return this.http.post<PaymentMethod>(`${environment.apiUrl}/payment-methods`,newPaymentMethod)
  }
  //--------------- HTTP POST ---------------
}
