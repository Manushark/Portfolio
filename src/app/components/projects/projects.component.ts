import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Category {
  label: string;
  value: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, SectionHeaderComponent, ScrollRevealDirective],
  styles: [`
    :host { display: contents; }

    /* Pill slider — active category indicator */
    .filter-btn {
      position: relative;
      transition:
        color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.2s ease;
    }

    .filter-btn:active {
      transform: scale(0.96) translateZ(0);
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      box-shadow: 0 2px 12px rgba(59,130,246,0.35);
    }

    .dark .filter-btn.active {
      background: #3b82f6;
      box-shadow: 0 2px 12px rgba(59,130,246,0.4);
    }

    /* Skeleton shimmer */
    .skeleton-card {
      background: linear-gradient(
        90deg,
        rgba(0,0,0,0.06) 0%,
        rgba(0,0,0,0.04) 40%,
        rgba(0,0,0,0.06) 80%
      );
      background-size: 200% 100%;
      animation: skeletonShimmer 1.8s ease-in-out infinite;
    }

    .dark .skeleton-card {
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0.04) 0%,
        rgba(255,255,255,0.07) 40%,
        rgba(255,255,255,0.04) 80%
      );
      background-size: 200% 100%;
    }

    @keyframes skeletonShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* Grid stagger on load */
    .project-item {
      animation: projectEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes projectEnter {
      from { opacity: 0; transform: translateY(20px) translateZ(0); }
      to { opacity: 1; transform: translateY(0) translateZ(0); }
    }
  `],
  template: `
    <section id="projects" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          titlePrefix="Proyectos"
          titleHighlight="Destacados"
          subtitle="Proyectos reales con stack .NET, Angular, React y QA">
        </app-section-header>

        <!-- Filter Buttons -->
        <div appScrollReveal direction="up" [delay]="0"
             class="flex items-center justify-center gap-2 mb-12 flex-wrap" role="tablist" aria-label="Filtrar proyectos">
          @for (cat of categories; track cat.value) {
            <button
              [class]="'filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-all ' +
                (selectedCategory() === cat.value
                  ? 'active border-transparent'
                  : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-card border-gray-200 dark:border-white/8 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400')"
              (click)="selectedCategory.set(cat.value)"
              [attr.aria-selected]="selectedCategory() === cat.value"
              role="tab">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Loading Skeletons -->
        @if (isLoading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1, 2, 3]; track i) {
              <div class="skeleton-card h-80 rounded-2xl"></div>
            }
          </div>
        } @else {
          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (project of filteredProjects(); track project.id || project.name; let i = $index) {
              <div class="project-item h-full" [style.animation-delay]="(i * 80) + 'ms'">
                <app-project-card [project]="project"></app-project-card>
              </div>
            } @empty {
              <div class="col-span-full text-center py-16">
                <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                  </svg>
                </div>
                <p class="text-sm font-mono text-gray-400 dark:text-gray-500">No hay proyectos en esta categoría.</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);

  public projects = signal<Project[]>([]);
  public isLoading = signal<boolean>(true);
  public selectedCategory = signal<string>('all');

  public categories: Category[] = [
    { label: 'Todos',      value: 'all' },
    { label: 'Backend .NET', value: 'backend' },
    { label: 'Full Stack',  value: 'fullstack' },
    { label: 'QA Testing',  value: 'qa' }
  ];

  public filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.projects();
    return this.projects().filter((p) => p.category === category);
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
