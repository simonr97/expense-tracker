import { Component, computed, input } from '@angular/core';
import { Category } from '../categories.model';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';
import { colorCalculationBackground, colorCalculationForeground } from '../../shared/color-calculation';

const badgeSizes = {
  sm: { padding: 'gap-1.5 px-3 py-1', icon: 15, text: 13 },
  lg: { padding: 'gap-2.5 px-4 py-2.5', icon: 22, text: 16 },
};

@Component({
  selector: 'app-category-badge',
  imports: [IconRenderer],
  templateUrl: './category-badge.html',
  styleUrl: './category-badge.css',
})
export class CategoryBadge {
  // Only what the badge draws, so the grid (full Category) and the preview (no id) can both pass one.
  category = input.required<Pick<Category, 'name' | 'color' | 'icon'>>();
  // sm: grid and lists. lg: the category preview in the create panel.
  size = input<keyof typeof badgeSizes>('sm');

  dimensions = computed(()=>badgeSizes[this.size()])
  displayColor = computed(()=>colorCalculationForeground(this.category().color));
  backgroundColor = computed(()=>colorCalculationBackground(this.category().color))
}
