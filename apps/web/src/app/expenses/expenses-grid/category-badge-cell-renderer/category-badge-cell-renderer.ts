import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CategoryBadge } from '../../../categories/category-badge/category-badge';

@Component({
  selector: 'app-category-badge-cell-renderer',
  imports: [CategoryBadge],
  templateUrl: './category-badge-cell-renderer.html',
  styleUrl: './category-badge-cell-renderer.css',
})
export class CategoryBadgeCellRenderer implements ICellRendererAngularComp {

  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true
  }
}
