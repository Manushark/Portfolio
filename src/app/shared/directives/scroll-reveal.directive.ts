import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  Renderer2,
} from '@angular/core';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

export type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade';

/**
 * ScrollRevealDirective
 *
 * Declarative scroll-triggered animation for any host element.
 *
 * Usage:
 *   <div appScrollReveal direction="up" delay="200"></div>
 *   <div appScrollReveal direction="left" delay="100"></div>
 *   <div appScrollReveal direction="scale"></div>
 *
 * The directive:
 * 1. Applies the correct CSS class (reveal / reveal-left / etc.)
 * 2. Applies an optional delay class (reveal-delay-1 through reveal-delay-5)
 * 3. Registers the element with the global ScrollAnimationService
 *
 * Animation happens via CSS transitions in styles.scss (no JS animation frames).
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() direction: RevealDirection = 'up';

  /** Delay in milliseconds (will be mapped to a CSS class) */
  @Input() delay: number = 0;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private animationService = inject(ScrollAnimationService);

  ngOnInit(): void {
    // Apply reveal class immediately so element is hidden before entering viewport
    const cssClass = this.getRevealClass();
    this.renderer.addClass(this.el.nativeElement, cssClass);

    // Apply stagger delay if provided
    if (this.delay > 0) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition-delay',
        `${this.delay}ms`
      );
    }
  }

  ngAfterViewInit(): void {
    this.animationService.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationService.unobserve(this.el.nativeElement);
  }

  private getRevealClass(): string {
    switch (this.direction) {
      case 'left':  return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'scale': return 'reveal-scale';
      case 'fade':  return 'reveal-fade';
      case 'up':
      default:      return 'reveal';
    }
  }
}
