import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, computed, inject } from '@angular/core';
import { IconRenderer } from '../icon-renderer/icon-renderer';
import { ConfirmDialogData, HeaderText, Mode, TransactionType } from './confirm-dialog.model';

const confirmTextIcon = {
  delete: {
    expense: {
      title: 'Delete Expense',
      subtitle: (name: string) => `Are you sure you want to delete “${name}” expense?`,
    },
    icon:'trash-2'
  },
  update: {
    expense: {
      title: 'Update Expense',
      subtitle: (name: string) => `Are you sure you want to update “${name}” expense?`,
    },
    icon: 'pencil'
  }
} satisfies Record<Mode,Record<TransactionType,HeaderText> & {icon:string}>

@Component({
  selector: 'app-confirm-dialog',
  imports: [IconRenderer],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  protected readonly dialogRef = inject(DialogRef<boolean>);
  protected readonly data:ConfirmDialogData = inject(DIALOG_DATA);
  protected readonly mode: Mode = this.data.mode;

  protected readonly header = computed(()=>{
    const header = confirmTextIcon[this.mode]
    const text = header[this.data.type]
    return {
      title: text.title,
      subtitle: text.subtitle(this.data.name),
      icon: header.icon
    }
  })

  onConfirm(){
    this.dialogRef.close(true);
  }
  onCancel(){
    this.dialogRef.close(false)
  }
}
