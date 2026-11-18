import { Component, computed, inject, input, signal } from '@angular/core';
import { colorCalculationBackground, colorCalculationForeground } from '../../shared/color-calculation';
import { ExpenseCategory } from '../../expenses/expenses.model';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { defaultCategoryLook } from '../categories.model';

const defaultCategoryPreview = {
  name:'defaultPreview',
  ...defaultCategoryLook,
}

// Design system sizes: box px / icon px.
const avatarSizes = {
  sm: { box: 'h-8 w-8', icon: 16 },
  md: { box: 'h-12 w-12', icon: 24 },
  lg: { box: 'h-16 w-16', icon: 32 },
};

@Component({
  selector: 'app-category-avatar',
  imports: [IconRenderer],
  templateUrl: './category-avatar.html',
  styleUrl: './category-avatar.css',
})
export class CategoryAvatar {
  category = input.required<ExpenseCategory | undefined>();
  size = input<keyof typeof avatarSizes>('md');

  dimensions = computed(()=>avatarSizes[this.size()])

  usedImage = computed(()=>this.category() ?? defaultCategoryPreview)

  displayColor = computed(()=>colorCalculationForeground(this.usedImage().color));
  backgroundColor = computed(()=>colorCalculationBackground(this.usedImage().color))
}
