import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group">
      <div>
        <!-- Visual Banner Header -->
        <div class="h-44 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-950 p-6 flex flex-col justify-between relative overflow-hidden">
          <!-- Background Glow Accent -->
          <div class="absolute -right-10 -top-10 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

          <!-- Top Badge Category -->
          <div class="flex items-center justify-between z-10">
            <span class="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {{ project.category | uppercase }}
            </span>
            @if (project.featured) {
              <span class="inline-flex items-center gap-1 text-xs font-mono text-amber-400 font-medium">
                ★ Destacado
              </span>
            }
          </div>

          <!-- Project Title Banner -->
          <div class="z-10">
            <h3 class="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
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
              <span class="px-2.5 py-1 text-xs font-mono rounded bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600/50">
                {{ tech }}
              </span>
            }
          </div>
        </div>
      </div>

      <!-- Action Links Footer -->
      <div class="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-gray-100 dark:border-gray-700/50">
        @if (project.github) {
          <a
            [href]="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Repo
          </a>
        }
        @if (project.demo) {
          <a
            [href]="project.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center p-2.5 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-all"
            title="Ver demo en vivo">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        }
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
