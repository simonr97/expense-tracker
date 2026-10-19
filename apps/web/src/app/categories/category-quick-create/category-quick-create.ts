import { Component, inject, output, signal } from '@angular/core';
import { CategoriesService } from '../categories';
import { CategoryForm } from '../categories.model';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-category-quick-create',
  imports: [FormField],
  templateUrl: './category-quick-create.html',
  styleUrl: './category-quick-create.css',
})
export class CategoryQuickCreate {
  private readonly categorieService = inject(CategoriesService)

  createdCategory = output<void>();

  categories = this.categorieService.getCategories

  //--------------- FORM CREATION ---------------
  categoryFormModel = signal<CategoryForm>({name:'',icon:'circle',color:'#00b8e6'})
  categoryForm = form(this.categoryFormModel, f => {
    required(f.name)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitNewCategory(event: Event){
    event.preventDefault();
    const categoryName = this.categoryFormModel();
    console.log(categoryName);
    return this.categorieService.postCategory(categoryName).subscribe({
      next: (response) =>{
        this.categories.reload()
        this.createdCategory.emit()
        console.log('Category created: ',response)
      },error: (err) =>{
        console.error('Failed to create a category: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
