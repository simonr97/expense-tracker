import { Component, inject, signal } from '@angular/core';
import { ErrorMessage, ExpensesForm } from '../expenses.model';
import { form, FormField, min, required } from '@angular/forms/signals';
import { ExpensesService } from '../expenses';
import { CategoriesService } from '../../categories/categories';
import { CategoryQuickCreate } from '../../categories/category-quick-create/category-quick-create';
import { AccountQuickCreate } from '../../accounts/account-quick-create/account-quick-create';
import { AccountsService } from '../../accounts/accounts';
import { DialogRef } from '@angular/cdk/dialog';
import { MerchantsService } from '../../merchants/merchants';
import { Account, AccountForm } from '../../accounts/accounts.model';
import { QuickCreateForm } from '../../shared/quick-create-form/quick-create-form';
import { Merchant, MerchantForm } from '../../merchants/merchant.model';
import { QuickCreate } from '../../shared/quick-create-form/quick-create-form-model';

@Component({
  selector: 'app-expense-form',
  imports: [FormField,CategoryQuickCreate,QuickCreateForm],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  dialogRef = inject(DialogRef)

  private readonly expensesService = inject(ExpensesService)
  private readonly categoryService = inject(CategoriesService)
  private readonly accountService = inject(AccountsService)
  private readonly merchantService = inject(MerchantsService);

  expenses = this.expensesService.getExpenses;
  categories = this.categoryService.getCategories;
  accounts = this.accountService.getAccounts;
  merchants = this.merchantService.getMerchants;

  openNewCategoryForm = signal(false);
  openNewAccountForm = signal(false);
  openNewMerchantForm = signal(false);
  errorMessage = signal<ErrorMessage>({
      error: '',
      code: '',
      message: '',
      statusCode: 0,
  });
  savingExpense = signal<boolean>(false);

  readonly createAccount = (form:AccountForm) => this.accountService.postAccount(form);
  readonly createMerchant = (form: MerchantForm) => this.merchantService.postMerchant(form)

  handleNewAccountCreation = (data: Account) => {
    this.accounts.reload();
    this.openNewAccountForm.set(false);
    this.expenseFormModel.update(model=>({...model,accountId:data.id}))
  }
  handleNewMerchantCreation = (data: Merchant) => {
    this.merchants.reload();
    this.openNewMerchantForm.set(false);
    this.expenseFormModel.update(model=>({...model,merchantId:data.id}))
  }

  //--------------- FORM CREATION ---------------
  expenseFormModel = signal<ExpensesForm>({description:'',amount:0,categoryId:'',accountId:'',merchantId:'',notes:'',status:'Completed'})
  expenseForm = form(this.expenseFormModel, f => {
    required(f.description);
    required(f.amount);
    required(f.categoryId);
    required(f.accountId);
    required(f.merchantId);
    min(f.amount,0.01,{message: 'amount should be a valid number(grater than or equal to 0.01)'})
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitNewExpense(event: Event) {
    this.savingExpense.set(true)
    event.preventDefault();
    const newExpense = this.expenseFormModel();
    this.errorMessage.set({
      error: '',
      code: '',
      message: '',
      statusCode: 0,
  })
    return this.expensesService.postExpense(newExpense).subscribe({
      next: (response)=>{
        this.savingExpense.set(false)
        this.expenses.reload();
        this.dialogRef.close()
        console.log('Expense created: ',response)
      }, error: (err) =>{
        this.savingExpense.set(false)
        err.status === 400 && this.errorMessage.set(err.error);
        console.error('Failed to create a expense: ',err)
      }
    })
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
}
