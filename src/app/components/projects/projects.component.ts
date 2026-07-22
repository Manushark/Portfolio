import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section id="projects" class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Proyectos <span class="text-blue-500">Destacados</span>
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
            Proyectos reales cargados dinámicamente desde JSON con stack .NET, Angular y QA
          </p>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center justify-center gap-2 mb-12 flex-wrap">
          @for (cat of categories; track cat.value) {
            <button
              (click)="selectedCategory.set(cat.value)"
              [class.bg-blue-600]="selectedCategory() === cat.value"
              [class.text-white]="selectedCategory() === cat.value"
              [class.bg-gray-100]="selectedCategory() !== cat.value"
              [class.dark:bg-gray-800]="selectedCategory() !== cat.value"
              [class.text-gray-700]="selectedCategory() !== cat.value"
              [class.dark:text-gray-300]="selectedCategory() !== cat.value"
              class="px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border border-gray-200 dark:border-gray-700">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Loading Skeletons -->
        @if (isLoading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (i of [1, 2, 3]; track i) {
              <div class="h-80 bg-gray-200 dark:bg-gray-800/60 rounded-2xl animate-pulse"></div>
            }
          </div>
        } @else {
          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (project of filteredProjects(); track project.id || project.name) {
              <app-project-card [project]="project"></app-project-card>
            } @empty {
              <div class="col-span-full text-center py-12 text-gray-500 font-mono text-sm">
                No hay proyectos en esta categoría por el momento.
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

  public categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Backend .NET', value: 'backend' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'QA Testing', value: 'qa' }
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
