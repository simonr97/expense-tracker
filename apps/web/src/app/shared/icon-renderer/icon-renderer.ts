import { Component, effect, input, signal } from '@angular/core';
import { LucideDynamicIcon, LucideIconData } from '@lucide/angular';
import { lucideDynamicIconImports } from '@lucide/icons/dynamic';

@Component({
  selector: 'app-icon-renderer',
  imports: [LucideDynamicIcon],
  templateUrl: './icon-renderer.html',
  styleUrl: './icon-renderer.css',
})
export class IconRenderer {
  iconName = input.required<string>();
  iconColor = input.required<string>();
  size = input<number>(24);
  // Design system: all iconography uses a 1.75px stroke.
  strokeWidth = input<number>(1.75);

  resolvedIcon = signal<LucideIconData | null>(null);

  constructor() {
    effect(() => {
      const name = this.iconName();
      (async () => {
        const icon = await lucideDynamicIconImports[name as keyof typeof lucideDynamicIconImports]?.();
        this.resolvedIcon.set((icon as any)?.default ?? icon);
      })();
    });
  }
}
