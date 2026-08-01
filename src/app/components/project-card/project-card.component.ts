import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="h-full bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group">
      <div>
        <!-- Visual Banner Header -->
        <div class="h-48 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-950 flex flex-col justify-between p-5">
          @if (project.image) {
            <img [src]="project.image" [alt]="project.name" class="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          } @else {
            <!-- Background Glow Accent fallback -->
            <div class="absolute -right-10 -top-10 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          }

          <!-- Top Category Badge & Featured Tag -->
          <div class="flex items-center justify-between z-10 relative">
            <app-badge variant="primary">
              {{ project.category | uppercase }}
            </app-badge>
            @if (project.featured) {
              <span class="inline-flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold bg-gray-900/80 px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-md shadow-sm">
                ★ Destacado
              </span>
            }
          </div>

          <!-- Project Title Banner -->
          <div class="z-10 relative">
            <h3 class="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors drop-shadow-md">
              {{ project.name }}
            </h3>
          </div>
        </div>

        <!-- Body Content -->
        <div class="p-6">
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {{ project.description }}
          </p>

          <!-- Technologies Stack Badges -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            @for (tech of project.technologies; track tech) {
              <app-badge variant="outline">
                {{ tech }}
              </app-badge>
            }
          </div>
        </div>
      </div>

      <!-- Action Links Footer -->
      <div class="px-6 pb-6 pt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 dark:border-gray-700/50">
        @if (project.github) {
          <a
            [href]="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-gray-300 dark:border-gray-600 shadow-sm transition-all">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
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
}
