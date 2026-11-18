import { Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { colorCalculationBackground, colorCalculationForeground } from '../../shared/color-calculation';

let nextGroupId = 0;

// Styled radio group of Lucide icons. Implements FormValueControl so it binds with [formField].
@Component({
  selector: 'app-icon-grid-picker',
  imports: [IconRenderer],
  templateUrl: './icon-grid-picker.html',
})
export class IconGridPicker implements FormValueControl<string> {
  readonly value = model('');
  readonly icons = input.required<string[]>();
  // Category color for the selected cell. Empty until the user picks one: the cell falls back to primary.
  readonly accentColor = input('');
  readonly label = input('Icon');
  readonly required = input(false);

  protected readonly groupName = `icon-grid-${nextGroupId++}`;

  protected readonly accentTones = computed(()=>{
    const color = this.accentColor();
    return color
      ? { background: colorCalculationBackground(color), foreground: colorCalculationForeground(color), border: color }
      : undefined;
  })

  // 'car-front' -> 'car front', used as the accessible name.
  protected readableName(icon: string) {
    return icon.replaceAll('-', ' ');
  }
}
