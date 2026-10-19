import { Component, computed, input } from '@angular/core';
import { Category } from '../categories.model';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';

@Component({
  selector: 'app-category-badge',
  imports: [IconRenderer],
  templateUrl: './category-badge.html',
  styleUrl: './category-badge.css',
})
export class CategoryBadge {
  protected readonly iconSizePx = 15;
  protected readonly textSizePx = 13;

  category = input.required<Category>();
  displayColor = computed(() => `color-mix(in srgb, ${this.category().color} 80%, black 20%)`);
}
