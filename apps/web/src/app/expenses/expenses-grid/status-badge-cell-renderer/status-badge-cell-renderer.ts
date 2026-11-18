import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { StatusBadge } from '../../status-badge/status-badge';

@Component({
  selector: 'app-status-badge-cell-renderer',
  imports: [StatusBadge],
  templateUrl: './status-badge-cell-renderer.html',
  styleUrl: './status-badge-cell-renderer.css',
})
export class StatusBadgeCellRenderer implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true
  }

}
