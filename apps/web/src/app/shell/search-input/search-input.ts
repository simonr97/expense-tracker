import { Component, input, model } from '@angular/core';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';

@Component({
  selector: 'app-search-input',
  imports: [IconRenderer],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

  inputPlaceHolder = input<string>('Search for an Expense');

  inputText = model<string>('');
}
