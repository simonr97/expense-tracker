import { Component, effect, inject, signal } from '@angular/core';
import { ExpensesService } from '../expenses';
import { ClientSideRowModelModule, ColDef, ModuleRegistry, RowSelectionModule, RowSelectionOptions, themeQuartz, SelectionChangedEvent, GetRowIdParams, GridApi, GridReadyEvent, CellStyleModule  } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CategoryBadgeCellRenderer } from './category-badge-cell-renderer/category-badge-cell-renderer';
import { Expense } from '../expenses.model';
import { StatusBadgeCellRenderer } from './status-badge-cell-renderer/status-badge-cell-renderer';
import { formatAmount, formatDate } from '../../shared/field-formatter';

ModuleRegistry.registerModules([ClientSideRowModelModule,RowSelectionModule,CellStyleModule]);

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
  private readonly gridApi = signal<GridApi | undefined>(undefined);

  onGridReady(event: GridReadyEvent) {
    this.gridApi.set(event.api);
  }

  expensesByYearMonth = this.expensesService.getExpensesByYearMonth;
  expensesOfMonth = this.expensesService.expensesOfMonth;

  protected readonly gridTheme = gastoProGridTheme;

  rowId = (params: GetRowIdParams<Expense>) => params.data.id

  columnDefs: ColDef<Expense>[] = [
    {field: 'description'},
    {
      field: 'amount',
      valueGetter: (p)=>p.data? Number(p.data.amount): null,
      valueFormatter: (p)=>p.data? formatAmount(p.data.amount,p.data.currency) : '',
    },
    {
      field: 'date',
      valueFormatter: (p)=>p.value? formatDate(p.value) : '',
    },
    {field: 'notes'},
    {
      field: 'status',
      cellRenderer: StatusBadgeCellRenderer,
    },
    {field: 'account.name', headerName: 'Account'},
    {
      field: 'category',
      valueFormatter: (p)=>p.value?.name ?? '',
      headerName: 'Category',
      cellRenderer: CategoryBadgeCellRenderer,
    },
    {
      field: 'merchant.name',
      headerName: 'Merchant',
    },
    {
      field: 'paymentMethod.name',
      headerName: 'Payment Method',
    },
  ];

  // Relative widths that fill the card; below minWidth the grid scrolls horizontally instead of squeezing columns.
  defaultColDef: ColDef = { flex: 1, minWidth: 120 };

  rowSelection: RowSelectionOptions = {
    mode: "singleRow",
    enableClickSelection: true
  };

  onSelectionChanged(event: SelectionChangedEvent) {
    const [selectedRow] = event.api.getSelectedRows();
    this.expensesService.modifySelectedRowId(selectedRow?.id);
  }

  constructor(){
    effect(()=>{
      const api = this.gridApi();
      const id = this.expensesService.selectedId();
      if(api && !id) api.deselectAll();
    })
  }
}
