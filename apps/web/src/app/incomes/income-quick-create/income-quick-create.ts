import { Component, computed, inject, signal } from '@angular/core';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { QuickCreateForm } from '../../shared/quick-create-form/quick-create-form';
import { AccountsService } from '../../accounts/accounts';
import { Account, AccountForm } from '../../accounts/accounts.model';
import { IncomePreview, IncomesForm } from '../incomes.model';
import { form, FormField, min, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { Incomes } from '../incomes';
import { IncomePreviewCard } from '../income-preview-card/income-preview-card';

function emptyIncomeForm(): IncomesForm {
  return {
      description: '',
      amount: 0,
      date: '',
      currency: 'ARS',
      accountId:'',
  }
}

@Component({
  selector: 'app-income-quick-create',
  imports: [IconRenderer, QuickCreateForm,FormField,IncomePreviewCard],
  templateUrl: './income-quick-create.html',
  styleUrl: './income-quick-create.css',
})
export class IncomeQuickCreate {
  private readonly accountService = inject(AccountsService);
  private readonly incomeService = inject(Incomes)
  dialogRef = inject(DialogRef)

  accounts = this.accountService.getAccounts;
  currencys = ['ARS','USD']

  // Same pattern as ExpenseForm: one signal says which panel the right column shows.
  openCreationForm = signal<'account' | 'preview'>('preview');
  savingIncome = signal<boolean>(false);

  readonly createAccount = (form: AccountForm) => this.accountService.postAccount(form);

  handleNewAccountCreation = (data: Account) => {
    this.accounts.reload();
    this.openCreationForm.set('preview');
    this.incomeFormModel.update(model=>({...model,accountId:data.id}))
  }
  onQuickCreateClosed(){
    this.openCreationForm.set('preview');
  }

  //--------------- FORM CREATION ---------------
  incomeFormModel = signal<IncomesForm>(emptyIncomeForm())
  incomeForm = form(this.incomeFormModel, f =>{
    required(f.description),
    required(f.amount),
    required(f.currency),
    required(f.date),
    required(f.accountId),
    min(f.amount,0.01,{message: 'amount should be a valid number(grater than or equal to 0.01)'})
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitNewIncome(event: Event) {
    this.savingIncome.set(true)
    event.preventDefault();
    const newIncome = this.incomeFormModel();
    console.log(newIncome)
    return this.incomeService.postIncomes(newIncome).subscribe({
      next: (response)=>{
        this.savingIncome.set(false);
        this.dialogRef.close()
        console.log('Income Created: ',response)
      }, error:(err) =>{
        this.savingIncome.set(false);
        console.error('Failed to create Income: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  previewData = computed<IncomePreview>(()=>{
    const form = this.incomeFormModel();

    const preview = {
      description: form.description,
      amount: form.amount,
      currency: form.currency,
      date: form.date,
      account: this.resolveAccount(form.accountId)
    }

    return preview;
  })

  private resolveAccount(id: string): string | undefined {
    return this.accounts.value()?.find((a)=>a.id === id)?.name;
  }

}
