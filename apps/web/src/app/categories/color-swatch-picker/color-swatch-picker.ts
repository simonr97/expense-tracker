import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';

let nextGroupId = 0;

// Styled radio group. Implements FormValueControl so it binds with [formField] like a native input.
@Component({
  selector: 'app-color-swatch-picker',
  imports: [IconRenderer],
  templateUrl: './color-swatch-picker.html',
})
export class ColorSwatchPicker implements FormValueControl<string> {
  readonly value = model('');
  readonly colors = input.required<string[]>();
  readonly label = input('Color');
  readonly required = input(false);

  // Native radios need a shared name to behave as one group (arrow keys move between them).
  protected readonly groupName = `color-swatch-${nextGroupId++}`;
}
