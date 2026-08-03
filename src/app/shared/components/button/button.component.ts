import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * ButtonComponent — Premium microinteractions
 *
 * • Shimmer sweep on hover (primary)
 * • scale(0.97) on active press (all)
 * • Shadow elevation on hover
 * • Arrow slide animation (ghost/outline)
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: contents; }

    .btn-base {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      transition:
        transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1),
        background-color 150ms ease,
        border-color 150ms ease,
        color 150ms ease;
      will-change: transform;
    }

    .btn-base::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(255, 255, 255, 0.18) 50%,
        transparent 60%
      );
      transform: translateX(-100%);
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      pointer-events: none;
      z-index: 1;
    }

    .btn-base:hover::before {
      transform: translateX(100%);
    }

    .btn-base:active {
      transform: scale(0.97) translateZ(0);
    }

    .btn-base:disabled::before {
      display: none;
    }
  `],
  template: `
    @if (href) {
      <a
        [href]="href"
        [target]="target"
        [download]="download"
        [class]="'btn-base inline-flex items-center justify-center gap-2 font-semibold rounded-xl select-none ' + getSizeClasses() + ' ' + getVariantClasses() + ' ' + customClass">
        <ng-content></ng-content>
      </a>
    } @else {
      <button
        [type]="type"
        [disabled]="disabled"
        [class]="'btn-base inline-flex items-center justify-center gap-2 font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed select-none ' + getSizeClasses() + ' ' + getVariantClasses() + ' ' + customClass">
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
      case 'sm':  return 'px-3.5 py-1.5 text-xs';
      case 'lg':  return 'px-7 py-3.5 text-base';
      case 'md':
      default:    return 'px-5 py-2.5 text-sm';
    }
  }

  getVariantClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 hover:shadow-md';
      case 'outline':
        return 'text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 hover:-translate-y-0.5 hover:shadow-glow-sm';
      case 'ghost':
        return 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/6 border border-transparent hover:border-gray-200 dark:hover:border-white/10';
      case 'primary':
      default:
        return 'text-white bg-blue-600 hover:bg-blue-500 shadow-btn-primary hover:-translate-y-0.5 hover:shadow-btn-primary-hover active:translate-y-0';
    }
  }
}
