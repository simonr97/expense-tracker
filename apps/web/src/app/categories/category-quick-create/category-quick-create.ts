import { Component, computed, inject, output, signal } from '@angular/core';
import { CategoriesService } from '../categories';
import { Category, CategoryForm, defaultCategoryLook } from '../categories.model';
import { CategoryBadge } from '../category-badge/category-badge';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { form, FormField, required } from '@angular/forms/signals';
import { ColorSwatchPicker } from '../color-swatch-picker/color-swatch-picker';
import { IconGridPicker } from '../icon-grid-picker/icon-grid-picker';

function emptyCategoryForm(): CategoryForm {
  return {
    name:'',
    color:'',
    icon:'',
  }
}

function preSetIcons() {
  return ['utensils','car-front','house','shopping-cart','paw-print','gamepad-2','heart-pulse','dumbbell','gift','tv-minimal-play']
}

function preSetColors(){
  return ['#F43F5E','#3B82F6','#10B981','#8B5CF6','#F59E0B','#14B8A6','#64748B','#D946EF','#84CC16','#92400E']
}

@Component({
  selector: 'app-category-quick-create',
  imports: [FormField, ColorSwatchPicker, IconGridPicker, CategoryBadge, IconRenderer],
  templateUrl: './category-quick-create.html',
  styleUrl: './category-quick-create.css',
})
export class CategoryQuickCreate {
  private readonly categorieService = inject(CategoriesService)

  // Emits the created category so the parent can reload the list and autoselect it.
  createdCategory = output<Category>();
  closed = output<void>();

  categories = this.categorieService.getCategories

  readonly colors = preSetColors();
  readonly icons = preSetIcons();

  // Live preview of the badge; fills the gaps with placeholders until the user picks each value.
  preview = computed(()=>{
    const { name, color, icon } = this.categoryFormModel();
    return {
      name: name.trim() || 'Category name',
      color: color || defaultCategoryLook.color,
      icon: icon || defaultCategoryLook.icon,
    };
  })

  onClosed(){
    this.closed.emit()
  }

  //--------------- FORM CREATION ---------------
  categoryFormModel = signal<CategoryForm>(emptyCategoryForm())
  categoryForm = form(this.categoryFormModel, f => {
    required(f.name)
    required(f.color)
    required(f.icon)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitNewCategory(event: Event){
    event.preventDefault();
    const categoryName = this.categoryFormModel();
    console.log(categoryName);
    return this.categorieService.postCategory(categoryName).subscribe({
      next: (response) =>{
        this.createdCategory.emit(response)
        console.log('Category created: ',response)
      },error: (err) =>{
        console.error('Failed to create a category: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
