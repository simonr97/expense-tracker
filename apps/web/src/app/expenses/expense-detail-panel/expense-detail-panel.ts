import { Component, inject, signal } from '@angular/core';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { SidePanel } from '../../shared/side-panel/side-panel';
import { ExpensesService } from '../expenses';
import { ExpenseDetail } from '../expense-detail/expense-detail';
import { Dialog } from '@angular/cdk/dialog';
import { AddTransactionDialog } from '../../shell/add-transaction-dialog/add-transaction-dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog.model';

@Component({
  selector: 'app-expense-detail-panel',
  imports: [IconRenderer,SidePanel,ExpenseDetail],
  templateUrl: './expense-detail-panel.html',
  styleUrl: './expense-detail-panel.css',
})
export class ExpenseDetailPanel {
  private readonly expensesService = inject(ExpensesService)
  private readonly dialog = inject(Dialog)

  expense = this.expensesService.selectExpense;
  expensesByYearMonth = this.expensesService.getExpensesByYearMonth
  dateRange = this.expensesService.getDateRange;
  modifySelectedRowId = this.expensesService.modifySelectedRowId

  deletingExpense = signal<boolean>(false);

  onSidePanelClose(){
    this.expensesService.modifySelectedRowId(undefined);
  }

  onDeleteClicked(){
    const expense = this.expense();
    if(!expense) return;
    const confirmDelete = this.dialog.open<boolean,ConfirmDialogData>(ConfirmDialog,{
      data: {name: expense.description, mode:'delete', type:'expense'},
      role: 'alertdialog',
      ariaLabelledBy:'confirm-dialog-title',
      autoFocus:'[data-confirm-cancel]',
      ariaDescribedBy: 'confirm-dialog-message',
    })
    confirmDelete.closed.subscribe(closed => {
      if(closed) this.deleteExpense(expense.id);
    })
  }

  private deleteExpense(id:string){
    this.deletingExpense.set(true);
    this.expensesService.deleteExpense(id).subscribe({
      next: ()=>{
        this.deletingExpense.set(false)
        this.modifySelectedRowId(undefined);
        this.expensesByYearMonth.reload();
        this.dateRange.reload()
      }, error: (err) =>{
        this.deletingExpense.set(false)
        //err.status === 400 && this.errorMessage.set(err.error);
        console.error('Failed to delete: ',err)
      }
    })
  }

  onUpdateClicked(){
    const expense = this.expense();
    if(!expense) return;
    this.dialog.open(AddTransactionDialog, {data: expense, ariaLabelledBy: 'add-transaction-title'});
  }
}
