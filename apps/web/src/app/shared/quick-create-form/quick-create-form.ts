import { afterNextRender, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { QuickCreate, QuickCreateModel } from './quick-create-form-model';

@Component({
  selector: 'app-quick-create-form',
  imports: [FormField],
  templateUrl: './quick-create-form.html',
  styleUrl: './quick-create-form.css',
})
export class QuickCreateForm {
  label = input<string>('');
  saveNew = input.required<(form: QuickCreateModel) => Observable<QuickCreate>>();
  created = output<QuickCreate>();

  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');

  constructor(){
    // The form is rendered inside an @if, so this runs every time it opens.
    afterNextRender(() => this.nameInput().nativeElement.focus());
  }

  //--------------- FORM CREATION ---------------
  formModel = signal<QuickCreateModel>({name:''});
  formCreation = form(this.formModel,f=>{
    required(f.name)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitForm(event: Event){
    event.preventDefault();
    const name = this.formModel()
    this.saveNew()(name).subscribe({
      next: (response) =>{
        this.created.emit(response)
        console.log('Account or Merchant created: ',response)
      },error: (err) =>{
        console.error('Failed to create an account or merchant: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
