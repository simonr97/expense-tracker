import { Component, effect, inject, signal } from '@angular/core';
import { ExpensesService } from '../expenses';
import { ClientSideRowModelModule, ColDef, ModuleRegistry, RowSelectionModule, RowSelectionOptions, themeQuartz, SelectionChangedEvent, GetRowIdParams  } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CategoryBadgeCellRenderer } from './category-badge-cell-renderer/category-badge-cell-renderer';
import { Expense } from '../expenses.model';

ModuleRegistry.registerModules([ClientSideRowModelModule,RowSelectionModule]);

const gastoProGridTheme = themeQuartz.withParams({
  backgroundColor: '#FFFFFF',
  chromeBackgroundColor: '#F8FAFC',
  borderColor: '#E5EAF1',
  rowHoverColor: '#F1F6FF',
  // primary-selected: same as every other selected element (primary-soft was indistinguishable from hover).
  selectedRowBackgroundColor: '#D6E9FF',
  fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
  fontSize: 13,
  rowHeight: 44,
  headerHeight: 42,
  // The grid sits inside a parent card, which already provides the border.
  wrapperBorder: false,
});

@Component({
  selector: 'app-expenses-grid',
  imports: [AgGridAngular],
  templateUrl: './expenses-grid.html',
  styleUrl: './expenses-grid.css',
})
export class ExpensesGrid {
  private readonly expensesService = inject(ExpensesService);

  expenses = this.expensesService.getExpenses;

  protected readonly gridTheme = gastoProGridTheme;

  rowId = (params: GetRowIdParams<Expense>) => params.data.id

  columnDefs: ColDef[] = [
    {field: 'description'},
    {field: 'amount'},
    {field: 'date'},
    {field: 'notes'},
    {field: 'status'},
    {field: 'account.name', headerName: 'Account'},
    {field: 'category', headerName: 'Category', cellRenderer: CategoryBadgeCellRenderer },
    {field: 'merchant.name', headerName: 'Merchant'}
  ];


  rowSelection: RowSelectionOptions = {
    mode: "singleRow",
    enableClickSelection: true
  };

  onSelectionChanged(event: SelectionChangedEvent) {
    const [selectedRow] = event.api.getSelectedRows();
    this.expensesService.modifySelectedRowId(selectedRow?.id);
    console.log(this.expensesService.selectExpense(),this.expensesService._selectedId())
  }

  // constructor(){
  //   effect(()=>{
  //         console.log(this.expenses.value())
  //   })
  // }
}
