import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, SectionHeaderComponent, ButtonComponent],
  template: `
    <section id="projects" class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <app-section-header
          titlePrefix="Proyectos"
          titleHighlight="Destacados"
          subtitle="Proyectos reales cargados dinámicamente desde JSON con stack .NET, Angular y QA">
        </app-section-header>

        <!-- Filter Buttons -->
        <div class="flex items-center justify-center gap-2 mb-12 flex-wrap">
          @for (cat of categories; track cat.value) {
            <app-button
              [variant]="selectedCategory() === cat.value ? 'primary' : 'secondary'"
              size="sm"
              (click)="selectedCategory.set(cat.value)">
              {{ cat.label }}
            </app-button>
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
