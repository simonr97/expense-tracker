import { Component, computed, ElementRef, input, model, signal, viewChild } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { FormValueControl } from '@angular/forms/signals';
import { Category } from '../categories.model';
import { CategoryBadge } from '../category-badge/category-badge';
import { IconRenderer } from '../../shared/icon-renderer/icon-renderer';

let nextId = 0;

// Select-only combobox (WAI-ARIA APG pattern): focus stays on the trigger, the open list is
// announced through aria-activedescendant. Implements FormValueControl so it binds with [formField].
@Component({
  selector: 'app-category-select',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, CategoryBadge, IconRenderer],
  templateUrl: './category-select.html',
})
export class CategorySelect implements FormValueControl<string> {
  readonly value = model('');
  readonly categories = input.required<Category[]>();
  readonly placeholder = input('Select a category...');
  // id of the visible label, since the trigger isn't a native control a <label for> can point to.
  readonly labelledBy = input<string>();
  readonly required = input(false);

  protected readonly listboxId = `category-select-${nextId++}`;
  protected readonly open = signal(false);
  protected readonly activeIndex = signal(-1);
  protected readonly triggerWidth = signal(0);

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  protected readonly selected = computed(()=>this.categories().find((c)=>c.id === this.value()));

  protected readonly activeOptionId = computed(()=>
    this.open() && this.activeIndex() >= 0 ? this.optionId(this.activeIndex()) : null
  );

  protected readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  ];

  protected optionId(index: number) {
    return `${this.listboxId}-option-${index}`;
  }

  protected toggle() {
    this.open() ? this.close() : this.openList();
  }

  protected openList() {
    if (this.categories().length === 0) return;
    this.triggerWidth.set(this.trigger().nativeElement.getBoundingClientRect().width);
    const selectedIndex = this.categories().findIndex((c)=>c.id === this.value());
    this.activeIndex.set(Math.max(selectedIndex, 0));
    this.open.set(true);
  }

  protected close() {
    this.open.set(false);
  }

  protected select(index: number) {
    const category = this.categories()[index];
    if (category) this.value.set(category.id);
    this.close();
  }

  protected onOutsideClick(event: MouseEvent) {
    // The trigger handles its own click (toggle); closing here too would reopen it right away.
    if (!this.trigger().nativeElement.contains(event.target as Node)) this.close();
  }

  protected onKeydown(event: KeyboardEvent) {
    const last = this.categories().length - 1;

    if (!this.open()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        this.openList();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i)=>Math.min(i + 1, last));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i)=>Math.max(i - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(last);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(this.activeIndex());
        break;
      case 'Escape':
        // Only close the list, not the whole modal.
        event.preventDefault();
        event.stopPropagation();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
}
