import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'success';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [ngClass]="[
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-lg transition-colors cursor-default',
        getVariantClasses()
      ]">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';

  getVariantClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
      case 'accent':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20';
      case 'outline':
        return 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60 shadow-sm';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
      case 'primary':
      default:
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
    }
  }
}
