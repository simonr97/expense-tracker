import { afterNextRender, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { QuickCreate, QuickCreateModel } from './quick-create-form-model';
import { ErrorMessage } from '../../expenses/expenses.model';
import { IconRenderer } from '../icon-renderer/icon-renderer';

@Component({
  selector: 'app-quick-create-form',
  imports: [FormField, IconRenderer],
  templateUrl: './quick-create-form.html',
  styleUrl: './quick-create-form.css',
})
export class QuickCreateForm {
  label = input<string>('');
  // Panel copy, per entity. Both optional: without them the header shows only the title.
  subtitle = input<string>('');
  info = input<string>('');
  saveNew = input.required<(form: QuickCreateModel) => Observable<QuickCreate>>();
  created = output<QuickCreate>();
  closed = output<void>();

  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');

  // null = no error. Not statusCode 0, which is also what a network failure reports.
  errorMessage = signal<ErrorMessage | null>(null);
  savingField = signal<boolean>(false);

  constructor(){
    // The form is rendered inside an @if, so this runs every time it opens.
    afterNextRender(() => this.nameInput().nativeElement.focus());
  }

  onClosed() {
    this.closed.emit()
  }

  //--------------- FORM CREATION ---------------
  formModel = signal<QuickCreateModel>({name:''});
  formCreation = form(this.formModel,f=>{
    required(f.name)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitForm(event: Event){
    this.savingField.set(true);
    this.errorMessage.set(null);
    event.preventDefault();
    const name = this.formModel()
    this.saveNew()(name).subscribe({
      next: (response) =>{
        this.savingField.set(false);
        this.created.emit(response)
        console.log(`${this.label()} created`,response)
      },error: (err) =>{
        this.savingField.set(false);
        err.status === 400 && this.errorMessage.set(err.error);
        console.error(`${this.label()} error on creation`,err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
