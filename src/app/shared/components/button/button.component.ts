import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * ButtonComponent — Apple & Linear inspired capsule/pill design
 *
 * • Single ng-template declaration for ng-content via ngTemplateOutlet
 * • Primary: Vibrant blue gradient with ambient glow shadow
 * • Secondary: Glassmorphic soft grey/white pill with refined border
 * • Outline: Sleek glowing blue outline pill
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
        box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1),
        background-color 200ms ease,
        border-color 200ms ease,
        color 200ms ease;
      will-change: transform;
    }

    .btn-base::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 35%,
        rgba(255, 255, 255, 0.28) 50%,
        transparent 65%
      );
      transform: translateX(-100%);
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      pointer-events: none;
      z-index: 1;
    }

    .btn-base:hover::before {
      transform: translateX(100%);
    }

    .btn-base:hover {
      transform: translateY(-2px) translateZ(0);
    }

    .btn-base:active {
      transform: translateY(0) scale(0.97) translateZ(0);
    }

    .btn-base:disabled::before {
      display: none;
    }

    .btn-content {
      position: relative;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
  `],
  template: `
    @if (href) {
      <a
        [href]="href"
        [target]="target"
        [download]="download"
        (click)="onAnchorClick($event)"
        [class]="'btn-base inline-flex items-center justify-center font-semibold rounded-full select-none whitespace-nowrap ' + getSizeClasses() + ' ' + getVariantClasses() + ' ' + customClass">
        <span class="btn-content">
          <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
        </span>
      </a>
    } @else {
      <button
        [type]="type"
        [disabled]="disabled"
        [class]="'btn-base inline-flex items-center justify-center font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed select-none whitespace-nowrap ' + getSizeClasses() + ' ' + getVariantClasses() + ' ' + customClass">
        <span class="btn-content">
          <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
        </span>
      </button>
    }

    <ng-template #buttonContent>
      <ng-content></ng-content>
    </ng-template>
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

  onAnchorClick(event: MouseEvent): void {
    if (this.href && this.href.startsWith('#')) {
      event.preventDefault();
      const targetId = this.href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':  return 'px-4 py-2 text-xs';
      case 'lg':  return 'px-8 py-3.5 text-base';
      case 'md':
      default:    return 'px-6 py-2.5 text-sm';
    }
  }

  getVariantClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'text-gray-800 dark:text-gray-100 bg-gray-100/90 dark:bg-white/10 hover:bg-gray-200/90 dark:hover:bg-white/18 border border-gray-300/80 dark:border-white/15 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-white/30 backdrop-blur-md';
      case 'outline':
        return 'text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 hover:bg-blue-500/15 border-2 border-blue-500/50 dark:border-blue-400/40 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md';
      case 'ghost':
        return 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/8 border border-transparent hover:border-gray-200 dark:hover:border-white/10';
      case 'primary':
      default:
        return 'text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.6)] border border-white/20';
    }
  }
}
