import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  signal,
  computed,
  PLATFORM_ID,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { BadgeComponent } from '../../components/badge/badge.component';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  styles: [`
    :host { display: contents; }

    .modal-backdrop {
      animation: backdropIn 0.2s ease forwards;
    }

    @keyframes backdropIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal-panel {
      animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes modalSlideUp {
      from { opacity: 0; transform: translateY(24px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }

    .screenshot-wrapper {
      position: relative;
      overflow: hidden;
    }

    .screenshot-img {
      transition: opacity 0.25s ease;
    }

    .screenshot-img.fading {
      opacity: 0;
    }

    .arrow-btn {
      transition:
        background-color 0.15s ease,
        transform 0.15s ease,
        opacity 0.15s ease;
    }

    .arrow-btn:hover:not(:disabled) {
      transform: scale(1.1);
    }

    .arrow-btn:active:not(:disabled) {
      transform: scale(0.95);
    }

    .dot {
      transition:
        width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.2s ease;
    }

    .close-btn {
      transition:
        background-color 0.15s ease,
        transform 0.2s ease;
    }

    .close-btn:hover {
      transform: rotate(90deg) scale(1.1);
    }

    .action-btn {
      transition:
        background-color 0.15s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.2s ease;
    }

    .action-btn:hover {
      transform: translateY(-2px);
    }

    .action-btn:active {
      transform: translateY(0) scale(0.97);
    }

    /* Thumbnail strip */
    .thumb {
      transition:
        border-color 0.15s ease,
        opacity 0.15s ease,
        transform 0.15s ease;
      cursor: pointer;
    }

    .thumb:hover {
      transform: scale(1.05);
    }

    .thumb.active {
      border-color: #3b82f6;
      opacity: 1;
    }
  `],
  template: `
    <div
      class="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      (mousedown)="onBackdropMouseDown($event)"
      (mouseup)="onBackdropMouseUp($event)"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="'Detalle del proyecto ' + project.name">

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/75 backdrop-blur-md" aria-hidden="true"></div>

      <!-- Modal Panel -->
      <div
        #modalPanel
        class="modal-panel relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-[#111318] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10">

        <!-- ===== SCREENSHOT AREA ===== -->
        <div class="screenshot-wrapper flex-shrink-0 bg-gray-950"
             [style.min-height]="hasScreenshots() ? '360px' : '240px'"
             [style.max-height]="'480px'">

          @if (hasScreenshots()) {
            <img
              [src]="currentScreenshot()"
              [alt]="project.name + ' — captura ' + (currentIndex() + 1)"
              [class]="'screenshot-img w-full h-full object-contain bg-gray-950 ' + (isFading() ? 'fading' : '')"
              (error)="onImageError()"
              style="min-height: 360px; max-height: 480px;"/>

            <!-- Gradient overlay bottom -->
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-950/60 to-transparent pointer-events-none"></div>

            <!-- Prev / Next -->
            @if (allScreenshots().length > 1) {
              <button
                (click)="prevSlide(); $event.stopPropagation()"
                [disabled]="currentIndex() === 0"
                class="arrow-btn absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-white"
                aria-label="Captura anterior">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>

              <button
                (click)="nextSlide(); $event.stopPropagation()"
                [disabled]="currentIndex() === allScreenshots().length - 1"
                class="arrow-btn absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-white"
                aria-label="Captura siguiente">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              <!-- Dot indicators -->
              <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5" role="tablist">
                @for (s of allScreenshots(); track $index) {
                  <button
                    (click)="goToSlide($index); $event.stopPropagation()"
                    [class]="'dot h-2 rounded-full ' + ($index === currentIndex() ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70')"
                    [attr.aria-selected]="$index === currentIndex()"
                    [attr.aria-label]="'Ir a captura ' + ($index + 1)"
                    role="tab">
                  </button>
                }
              </div>

              <!-- Counter -->
              <div class="absolute top-3 right-14 text-xs font-mono text-white/70 bg-black/50 px-2.5 py-1 rounded-full">
                {{ currentIndex() + 1 }} / {{ allScreenshots().length }}
              </div>
            }

          } @else if (project.image) {
            <img
              [src]="project.image"
              [alt]="project.name"
              class="w-full h-full object-contain bg-gray-950"
              style="min-height: 240px; max-height: 400px;"
              (error)="onImageError()"/>
          } @else {
            <div class="w-full flex items-center justify-center" style="min-height: 240px;">
              <div class="text-center">
                <svg class="w-16 h-16 text-gray-700 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="text-xs text-gray-600 font-mono">Sin capturas</p>
              </div>
            </div>
          }

          <!-- Close button -->
          <button
            (click)="close.emit()"
            class="close-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 flex items-center justify-center text-white z-10"
            aria-label="Cerrar">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Badges -->
          <div class="absolute top-3 left-3 flex items-center gap-2 z-10">
            @if (project.featured) {
              <span class="inline-flex items-center gap-1 text-xs font-mono text-amber-300 font-semibold bg-black/60 px-2.5 py-1 rounded-full border border-amber-400/30">
                <svg class="w-3 h-3 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Destacado
              </span>
            }
            <span class="text-xs font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded-full uppercase tracking-wide">
              {{ project.category }}
            </span>
          </div>
        </div>

        <!-- ===== THUMBNAIL STRIP (if multiple screenshots) ===== -->
        @if (allScreenshots().length > 1) {
          <div class="flex-shrink-0 px-6 py-3 bg-gray-50 dark:bg-[#0d0f14] border-b border-gray-100 dark:border-white/5 overflow-x-auto">
            <div class="flex items-center gap-2">
              @for (shot of allScreenshots(); track $index) {
                <button
                  (click)="goToSlide($index)"
                  [class]="'thumb flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 ' + ($index === currentIndex() ? 'active border-blue-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80')"
                  [attr.aria-label]="'Captura ' + ($index + 1)">
                  <img
                    [src]="shot"
                    [alt]="'Miniatura ' + ($index + 1)"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    (error)="hideThumb($event)"/>
                </button>
              }
            </div>
          </div>
        }

        <!-- ===== CONTENT (scrollable) ===== -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6 sm:p-8">

            <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              {{ project.name }}
            </h2>

            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {{ project.longDescription || project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mb-7">
              <h3 class="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Stack tecnológico
              </h3>
              <div class="flex flex-wrap gap-2">
                @for (tech of project.technologies; track tech) {
                  <app-badge variant="outline">{{ tech }}</app-badge>
                }
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-3 pt-5 border-t border-gray-100 dark:border-white/6">
              @if (project.github) {
                <a
                  [href]="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-white/8 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 border border-gray-200 dark:border-white/10">
                  <svg class="w-4.5 h-4.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Ver en GitHub
                </a>
              }

              @if (project.demo) {
                <a
                  [href]="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_2px_12px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)]">
                  <svg class="w-4.5 h-4.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Demo en Vivo
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) project!: Project;
  @Output() close = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private mouseDownOnBackdrop = false;

  public currentIndex = signal<number>(0);
  public isFading = signal<boolean>(false);

  public allScreenshots = signal<string[]>([]);

  public hasScreenshots = computed(() => this.allScreenshots().length > 0);
  public currentScreenshot = computed(() => this.allScreenshots()[this.currentIndex()] ?? '');

  ngOnInit(): void {
    // Build the screenshot list: use screenshots array, or fall back to single image
    const shots: string[] = [];

    if (this.project.screenshots?.length) {
      // Add main image first if it's not already in screenshots
      if (this.project.image && !this.project.screenshots.includes(this.project.image)) {
        shots.push(this.project.image);
      }
      shots.push(...this.project.screenshots);
    } else if (this.project.image) {
      shots.push(this.project.image);
    }

    this.allScreenshots.set(shots);

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  public goToSlide(index: number): void {
    if (index === this.currentIndex() || index < 0 || index >= this.allScreenshots().length) return;
    this.isFading.set(true);
    setTimeout(() => {
      this.currentIndex.set(index);
      this.isFading.set(false);
    }, 120);
  }

  public prevSlide(): void {
    this.goToSlide(this.currentIndex() - 1);
  }

  public nextSlide(): void {
    this.goToSlide(this.currentIndex() + 1);
  }

  /** Close only if mousedown AND mouseup both happened on the backdrop (not on the panel) */
  public onBackdropMouseDown(event: MouseEvent): void {
    this.mouseDownOnBackdrop = event.target === event.currentTarget;
  }

  public onBackdropMouseUp(event: MouseEvent): void {
    if (this.mouseDownOnBackdrop && event.target === event.currentTarget) {
      this.close.emit();
    }
    this.mouseDownOnBackdrop = false;
  }

  /** Skip broken images gracefully */
  public onImageError(): void {
    const shots = this.allScreenshots().filter((_, i) => i !== this.currentIndex());
    if (shots.length > 0) {
      this.allScreenshots.set(shots);
      this.currentIndex.set(Math.min(this.currentIndex(), shots.length - 1));
    }
  }

  /** Hide broken thumbnails */
  public hideThumb(event: Event): void {
    const el = event.target as HTMLElement;
    if (el.parentElement) {
      el.parentElement.style.display = 'none';
    }
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'Escape':     this.close.emit(); break;
      case 'ArrowLeft':  this.prevSlide(); break;
      case 'ArrowRight': this.nextSlide(); break;
    }
  };
}
