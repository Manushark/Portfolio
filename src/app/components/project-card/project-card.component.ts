import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';

/**
 * ProjectCardComponent — Emits (viewDetails) to parent
 *
 * The modal is rendered by ProjectsComponent at a higher DOM level
 * to avoid the `will-change: transform` containment bug that breaks
 * `position: fixed` inside transformed elements.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: contents; }

    .project-card {
      transition:
        transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.4s ease;
      will-change: transform;
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-6px) translateZ(0);
    }

    .project-card::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.5) 50%, rgba(139,92,246,0.4) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
      z-index: -1;
    }

    .project-card:hover::after {
      opacity: 1;
    }

    .card-image {
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }

    .project-card:hover .card-image {
      transform: scale(1.05) translateZ(0);
    }

    .details-overlay {
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .project-card:hover .details-overlay {
      opacity: 1;
    }

    .action-links {
      transform: translateY(4px);
      opacity: 0.85;
      transition:
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.3s ease;
    }

    .project-card:hover .action-links {
      transform: translateY(0);
      opacity: 1;
    }

    .featured-badge {
      animation: shimmerBadge 3s linear infinite;
      background-size: 200% auto;
    }

    @keyframes shimmerBadge {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }

    .link-btn {
      transition:
        background-color 0.15s ease,
        color 0.15s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.2s ease;
    }

    .link-btn:hover {
      transform: translateY(-1px) translateZ(0);
    }

    .link-btn:active {
      transform: scale(0.97) translateZ(0);
    }
  `],
  template: `
    <div
      class="project-card relative h-full bg-white dark:bg-dark-card rounded-2xl border border-black/6 dark:border-white/6 overflow-hidden shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover flex flex-col group"
      (click)="viewDetails.emit(project)"
      role="button"
      [attr.aria-label]="'Ver detalles de ' + project.name"
      tabindex="0"
      (keydown.enter)="viewDetails.emit(project)"
      (keydown.space)="viewDetails.emit(project)">

      <!-- Banner — Tall enough for recruiter impact -->
      <div class="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-950 flex flex-col justify-between p-5">
        @if (project.image) {
          <img
            [src]="project.image"
            [alt]="project.name"
            class="card-image absolute inset-0 w-full h-full object-cover object-top opacity-70"
            loading="lazy"/>
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/25 to-transparent"></div>
        } @else {
          <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150"></div>
            <div class="absolute -left-4 bottom-0 w-24 h-24 bg-purple-500/15 rounded-full blur-xl transition-transform duration-700 group-hover:scale-125"></div>
          </div>
        }

        <!-- Hover overlay: "Ver detalles" -->
        <div class="details-overlay absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]" aria-hidden="true">
          <div class="flex items-center gap-2 text-white text-sm font-semibold bg-white/15 border border-white/25 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Ver detalles
          </div>
        </div>

        <!-- Top: category + featured -->
        <div class="flex items-center justify-between z-10 relative">
          <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/20 backdrop-blur-sm">
            {{ project.category | uppercase }}
          </span>
          @if (project.featured) {
            <span class="featured-badge inline-flex items-center gap-1 text-xs font-mono text-amber-300 font-semibold bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-sm">
              <svg class="w-3 h-3 fill-amber-400" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Destacado
            </span>
          }
        </div>

        <!-- Screenshots count -->
        @if (project.screenshots && project.screenshots.length > 1) {
          <div class="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-xs font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ project.screenshots.length }} fotos
          </div>
        }

        <!-- Project title -->
        <div class="z-10 relative">
          <h3 class="text-xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-200 drop-shadow-md">
            {{ project.name }}
          </h3>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 flex-1">
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
          {{ project.description }}
        </p>

        <!-- Tech badges with high contrast slate styling in dark mode -->
        <div class="flex flex-wrap gap-1.5">
          @for (tech of project.technologies.slice(0, 4); track tech) {
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700/80">
              {{ tech }}
            </span>
          }
          @if (project.technologies.length > 4) {
            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-slate-700/80">
              +{{ project.technologies.length - 4 }}
            </span>
          }
        </div>
      </div>

      <!-- Action Footer -->
      <div class="action-links px-6 pb-6 pt-3 flex flex-wrap items-center gap-2.5 border-t border-gray-100 dark:border-white/5">
        @if (project.github) {
          <a
            [href]="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="link-btn flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 transition-all duration-200"
            (click)="$event.stopPropagation()"
            aria-label="Ver código en GitHub">
            <svg class="w-4 h-4 fill-current text-slate-800 dark:text-slate-100 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        }

        @if (project.demo) {
          <a
            [href]="project.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="link-btn flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-btn-primary hover:shadow-btn-primary-hover"
            (click)="$event.stopPropagation()"
            aria-label="Ver demo en vivo">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            <span>Demo en Vivo</span>
          </a>
        }
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() viewDetails = new EventEmitter<Project>();
}
