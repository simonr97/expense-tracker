import { Component, input, output } from '@angular/core';
import { IconRenderer } from '../icon-renderer/icon-renderer';

@Component({
  selector: 'app-side-panel',
  imports: [IconRenderer],
  templateUrl: './side-panel.html',
  styleUrl: './side-panel.css',
})
export class SidePanel {
  title = input<string>('');
  closed = output<void>();

  onClosed() {
    this.closed.emit()
  }
}
