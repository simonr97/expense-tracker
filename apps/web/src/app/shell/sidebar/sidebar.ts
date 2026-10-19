import { Component, effect, signal } from '@angular/core';
import { sidebarOptionsFormatted } from './sidebar.constants';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';

@Component({
  selector: 'app-sidebar',
  imports: [IconRenderer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  sidebarOptions = sidebarOptionsFormatted;
  selectedOption = signal(1)
}
