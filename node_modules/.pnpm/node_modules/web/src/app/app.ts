import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesGrid } from './expenses/expenses-grid/expenses-grid';
import { Sidebar } from './shell/sidebar/sidebar';
import { Topbar } from './shell/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExpensesGrid,Sidebar,Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
