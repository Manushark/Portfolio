import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (href) {
      <a
        [href]="href"
        [target]="target"
        [download]="download"
        [ngClass]="[
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all cursor-pointer select-none',
          getSizeClasses(),
          getVariantClasses(),
          customClass
        ]">
        <ng-content></ng-content>
      </a>
    } @else {
      <button
        [type]="type"
        [disabled]="disabled"
        [ngClass]="[
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none',
          getSizeClasses(),
          getVariantClasses(),
          customClass
        ]">
        <ng-content></ng-content>
      </button>
    }
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() href?: string;
  @Input() target: string = '_self';
  @Input() download?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'px-3.5 py-1.5 text-xs';
      case 'lg':
        return 'px-6 py-3.5 text-base';
      case 'md':
      default:
        return 'px-5 py-2.5 text-sm';
    }
  }

  getVariantClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:-translate-y-0.5';
      case 'outline':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60 hover:-translate-y-0.5';
      case 'ghost':
        return 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80 border border-transparent';
      case 'primary':
      default:
        return 'text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5';
    }
  }
}
