import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { ErrorMessage, Expense, ExpenseCategory, ExpensePreview, ExpenseFormModel } from '../expenses.model';
import { form, FormField, maxLength, min, required } from '@angular/forms/signals';
import { ExpensesService } from '../expenses';
import { CategoriesService } from '../../categories/categories';
import { CategoryQuickCreate } from '../../categories/category-quick-create/category-quick-create';
import { AccountsService } from '../../accounts/accounts';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MerchantsService } from '../../merchants/merchants';
import { Account, AccountForm } from '../../accounts/accounts.model';
import { QuickCreateForm } from '../../shared/quick-create-form/quick-create-form';
import { Merchant, MerchantForm } from '../../merchants/merchant.model';
import { PaymentMethodsService } from '../../payment-methods/payment-methods';
import { PaymentMethod, PaymentMethodForm } from '../../payment-methods/payment-methods.model';
import { ExpensePreviewCard } from './expense-preview-card/expense-preview-card';
import { CategorySelect } from '../../categories/category-select/category-select';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { Category } from '../../categories/categories.model';
import { formatISODate } from '../../shared/field-formatter';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog.model';

// A function, not a const, so each call returns a fresh object (and a future "today" default is computed at call time).
function emptyExpenseForm(): ExpenseFormModel {
  return {
    description:'',
    amount:0,
    categoryId:'',
    accountId:'',
    merchantId:'',
    paymentMethodId:'',
    notes:'',
    status:'Completed',
    currency:'ARS',
    date:''
  };
}

@Component({
  selector: 'app-expense-form',
  imports: [FormField,CategoryQuickCreate,QuickCreateForm,ExpensePreviewCard,CategorySelect,IconRenderer],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})

export class ExpenseForm {
  protected readonly dialogRef = inject(DialogRef);
  private readonly dialog = inject(Dialog);

  private readonly expensesService = inject(ExpensesService);
  private readonly categoryService = inject(CategoriesService);
  private readonly accountService = inject(AccountsService);
  private readonly merchantService = inject(MerchantsService);
  private readonly paymentMethodService = inject(PaymentMethodsService);

  expensesByYearMonth = this.expensesService.getExpensesByYearMonth;
  dateRange = this.expensesService.getDateRange;
  categories = this.categoryService.getCategories;
  accounts = this.accountService.getAccounts;
  merchants = this.merchantService.getMerchants;
  paymentMethods = this.paymentMethodService.getPaymentMethods;
  currencys = ['ARS','USD']
  readonly notesMaxLength = 200;

  openCreationForm = signal<'category' | 'account' | 'merchant' | 'payment' | 'preview'>('preview')

  errorMessage = signal<ErrorMessage | null>(null);
  savingExpense = signal<boolean>(false);

  expenseToUpdate = input<Expense | null>(null)
  updateFormValue = computed<ExpenseFormModel | undefined>(()=>{
    const expense = this.expenseToUpdate();
    if(!expense) return;
    return {
      description: expense.description,
      amount: Number(expense.amount),
      categoryId: expense.categoryId,
      accountId: expense.accountId,
      merchantId: expense.merchantId,
      paymentMethodId: expense.paymentMethodId,
      notes: expense.notes ?? '',
      status: expense.status,
      currency: expense.currency,
      date:formatISODate(expense.date),
    }
  })


  readonly createAccount = (form:AccountForm) => this.accountService.postAccount(form);
  readonly createMerchant = (form: MerchantForm) => this.merchantService.postMerchant(form)
  readonly createPaymentMethod = (form: PaymentMethodForm) => this.paymentMethodService.postPaymentMethods(form)

  handleNewAccountCreation = (data: Account) => {
    this.accounts.reload();
    this.openCreationForm.set('preview');
    this.expenseFormModel.update(model=>({...model,accountId:data.id}))
  }
  handleNewMerchantCreation = (data: Merchant) => {
    this.merchants.reload();
    this.openCreationForm.set('preview');
    this.expenseFormModel.update(model=>({...model,merchantId:data.id}))
  }
  handleNewPaymentMethodCreation = (data: PaymentMethod) => {
    this.paymentMethods.reload();
    this.openCreationForm.set('preview');
    this.expenseFormModel.update(model=>({...model,paymentMethodId:data.id}))
  }
  handleNewCategoryCreation = (data: Category) => {
    this.categories.reload();
    this.openCreationForm.set('preview');
    this.expenseFormModel.update(model=>({...model,categoryId:data.id}))
  }
  onQuickCreateClosed(){
    this.openCreationForm.set('preview');
  }

  private confirmUpdate(){
    const expense = this.expenseToUpdate()
    if(!expense) return;
    const confirmUpdate = this.dialog.open<boolean,ConfirmDialogData >(ConfirmDialog,{
      data: {name: expense.description, mode:'update', type: 'expense'},
      role: 'alertdialog',
      ariaLabelledBy:'confirm-dialog-title',
      autoFocus:'[data-confirm-cancel]',
      ariaDescribedBy: 'confirm-dialog-message'
    })
    confirmUpdate.closed.subscribe(closed => {
      if(closed) {
        this.saveExpense()
      }
    })
  }

  private saveExpense(): void {
    this.savingExpense.set(true)
    this.errorMessage.set(null)
    const expenseModel = this.expenseFormModel();
    const updatedExpenseId = this.expenseToUpdate()?.id
    const expenseRequest =
      updatedExpenseId?
        this.expensesService.updateExpense(updatedExpenseId,expenseModel) :
        this.expensesService.postExpense(expenseModel);
    expenseRequest.subscribe({
      next: (response)=>{
        this.savingExpense.set(false)
        this.expensesByYearMonth.reload();
        this.dateRange.reload()
        this.dialogRef.close()
        console.log('Expense created or updated: ',response)
      }, error: (err) =>{
        this.savingExpense.set(false)
        err.status === 400 && this.errorMessage.set(err.error);
        console.error('Failed to create or update an expense: ',err)
      }
    })
  }

  //--------------- FORM CREATION ---------------
  expenseFormModel = linkedSignal<ExpenseFormModel | undefined, ExpenseFormModel>({
    source: this.updateFormValue,
    computation:(expenseData) =>{
      return expenseData ? expenseData : emptyExpenseForm()
    }
  })
  expenseForm = form(this.expenseFormModel, f => {
    required(f.description);
    required(f.amount);
    required(f.categoryId);
    required(f.accountId);
    required(f.merchantId);
    required(f.paymentMethodId);
    required(f.currency);
    required(f.date);
    min(f.amount,0.01,{message: 'amount should be a valid number(grater than or equal to 0.01)'})
    maxLength(f.notes, this.notesMaxLength)
  })
  //--------------- FORM CREATION ---------------

  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------
  onSubmitExpense(event: Event) {
    event.preventDefault();
    if(this.expenseToUpdate()){
      this.confirmUpdate();
    } else {
      this.saveExpense();
    }
  }
  //--------------- FORM ONSUBMIT BEHAVIOUR ---------------

  previewData = computed<ExpensePreview>(()=>{

    const form = this.expenseFormModel()

    const preview = {
    description:form.description,
    amount:form.amount,
    category:this.resolveCategory(form.categoryId),
    account:this.resolveAccount(form.accountId),
    merchant:this.resolveMerchant(form.merchantId),
    paymentMethod:this.resolvePaymentMethod(form.paymentMethodId),
    notes:form.notes,
    status:form.status,
    currency:form.currency,
    date:form.date,
  }

  return preview;

  })

  //--------------- PREVIEW RESOLVERS ---------------
  // Each one returns only what the preview shows, or undefined when nothing is selected
  // or the list hasn't loaded yet.
  private resolveCategory(id: string): ExpenseCategory | undefined {
    const category = this.categories.value()?.find((c)=>c.id === id);
    return category && { name: category.name, color: category.color, icon: category.icon };
  }

  private resolveAccount(id: string): string | undefined {
    return this.accounts.value()?.find((a)=>a.id === id)?.name;
  }

  private resolveMerchant(id: string): string | undefined {
    return this.merchants.value()?.find((m)=>m.id === id)?.name;
  }

  private resolvePaymentMethod(id: string): string | undefined {
    return this.paymentMethods.value()?.find((pm)=>pm.id === id)?.name;
  }
  //--------------- PREVIEW RESOLVERS ---------------
}
