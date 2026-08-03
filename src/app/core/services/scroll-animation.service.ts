import { Injectable, NgZone, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * ScrollAnimationService
 *
 * Manages a global IntersectionObserver instance that watches elements
 * registered via the ScrollRevealDirective. When an element enters the
 * viewport it receives the 'is-visible' class, triggering CSS transitions.
 *
 * Performance rationale:
 * - Single shared IntersectionObserver (not one per element)
 * - Only touches the DOM inside NgZone.runOutsideAngular() to avoid
 *   triggering unnecessary change-detection cycles
 * - After revealing an element the observer un-observes it (fire once)
 */
@Injectable({ providedIn: 'root' })
export class ScrollAnimationService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private observer: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.observer = new IntersectionObserver(
          (entries) => this.onIntersect(entries),
          {
            threshold: 0.12,
            rootMargin: '0px 0px -48px 0px',
          }
        );
      });
    }
  }

  /**
   * Register an element to be watched.
   * Call this from a directive's ngAfterViewInit.
   */
  observe(element: HTMLElement): void {
    if (!this.observer) return;
    this.observer.observe(element);
  }

  /**
   * Unregister an element.
   * Call this from a directive's ngOnDestroy.
   */
  unobserve(element: HTMLElement): void {
    if (!this.observer) return;
    this.observer.unobserve(element);
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Un-observe after first reveal (fire-once pattern)
        this.observer?.unobserve(entry.target);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
