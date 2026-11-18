import { Component, computed, input } from '@angular/core';

const statusStyles = {
  Completed: { pill: 'bg-success-soft', dot: 'bg-success' },
  Pending:   { pill: 'bg-warning-soft', dot: 'bg-warning' },
} satisfies Record<'Completed' | 'Pending', { pill: string; dot: string }>;


@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  status = input<'Completed' | 'Pending'>('Pending');

  style = computed(()=>statusStyles[this.status()])
}
