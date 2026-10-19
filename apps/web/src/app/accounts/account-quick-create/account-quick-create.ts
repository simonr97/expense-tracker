import { Component, inject, output, signal } from '@angular/core';
import { AccountsService } from '../accounts';
import { form, FormField, required } from '@angular/forms/signals';
import { AccountForm } from '../accounts.model';

@Component({
  selector: 'app-account-quick-create',
  imports: [FormField],
  templateUrl: './account-quick-create.html',
  styleUrl: './account-quick-create.css',
})
export class AccountQuickCreate {
  private readonly accountService = inject(AccountsService);

  createdAccount = output<void>();

  accounts = this.accountService.getAccounts

  //--------------- FORM CREATION ---------------
  accountFormModel = signal<AccountForm>({name:''})
  accountForm = form(this.accountFormModel, f => {
    required(f.name)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitNewAccount(event: Event){
    event.preventDefault();
    const accountName = this.accountFormModel();
    console.log(accountName);
    return this.accountService.postAccount(accountName).subscribe({
      next: (response) =>{
        this.accounts.reload()
        this.createdAccount.emit()
        console.log('Account created: ',response)
      },error: (err) =>{
        console.error('Failed to create an account: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
