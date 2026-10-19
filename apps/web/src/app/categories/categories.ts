import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Category, CategoryForm } from './categories.model';
import { environment } from '../../environments/environment';

@Service()
export class CategoriesService {

  private readonly http = inject(HttpClient);

  //--------------- HTTP GET ---------------
  getCategories = httpResource<Category[]>(()=>`${environment.apiUrl}/categories`)
  //--------------- HTTP GET ---------------

  //--------------- HTTP POST ---------------
  postCategory(newCategory: CategoryForm) {
    return this.http.post<Category>(`${environment.apiUrl}/categories`,newCategory)
  }
  //--------------- HTTP POST ---------------
}
