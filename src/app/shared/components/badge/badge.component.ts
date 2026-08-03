import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'success';

/**
 * BadgeComponent — Premium pill badges with hover glow
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: contents; }

    .badge {
      transition:
        background-color 150ms ease,
        box-shadow 150ms ease,
        border-color 150ms ease,
        transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .badge:hover {
      transform: translateY(-1px) translateZ(0);
    }
  `],
  template: `
    <span [class]="'badge inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-md ' + getVariantClasses()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';

  getVariantClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/15 hover:border-purple-500/35';
      case 'accent':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/15';
      case 'outline':
        return 'bg-gray-50 dark:bg-white/4 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-700/60 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15';
      case 'primary':
      default:
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/35';
    }
  }
}
