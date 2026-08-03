import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../core/models/skill.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, BadgeComponent, ScrollRevealDirective],
  styles: [`
    :host { display: contents; }

    .skill-card {
      position: relative;
      transition:
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.35s ease,
        border-color 0.2s ease;
      will-change: transform;
    }

    .skill-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: linear-gradient(135deg, transparent 60%, rgba(59,130,246,0.15) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 0;
    }

    .skill-card:hover {
      transform: translateY(-5px) translateZ(0);
    }

    .skill-card:hover::before {
      opacity: 1;
    }

    .card-icon-bg {
      transition:
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.3s ease;
      will-change: transform;
    }

    .skill-card:hover .card-icon-bg {
      transform: scale(1.12) rotate(-4deg) translateZ(0);
    }

    .skill-count {
      transition: color 0.2s ease;
    }
  `],
  template: `
    <section id="skills" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          titlePrefix="Habilidades"
          titleHighlight="Técnicas"
          subtitle="Stack tecnológico especializado en Backend, Frontend y QA">
        </app-section-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (category of skillCategories; track category.title; let i = $index) {
            <div
              appScrollReveal direction="up" [delay]="i * 100"
              class="skill-card bg-white dark:bg-dark-card rounded-2xl p-7 border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:border-blue-200/80 dark:hover:border-blue-800/50 flex flex-col justify-between">

              <div class="relative z-10">
                <!-- Header -->
                <div class="flex items-start gap-4 mb-6">
                  <div [class]="'card-icon-bg flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ' + getIconBg(i)">
                    <svg [class]="'w-5 h-5 ' + getIconColor(i)" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="category.iconPath"/>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-0.5">{{ category.title }}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ category.description }}</p>
                  </div>
                </div>

                <!-- Skill Badges -->
                <div class="flex flex-wrap gap-1.5">
                  @for (skill of category.skills; track skill) {
                    <app-badge variant="outline">{{ skill }}</app-badge>
                  }
                </div>
              </div>

              <!-- Footer accent -->
              <div class="relative z-10 mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <span class="text-xs font-mono text-gray-400 dark:text-gray-500">Dominio técnico</span>
                <span [class]="'text-xs font-mono font-semibold skill-count ' + getIconColor(i)">
                  {{ category.skills.length }} tecnologías
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  private iconBgs = [
    'bg-blue-500/10 dark:bg-blue-500/15',
    'bg-emerald-500/10 dark:bg-emerald-500/15',
    'bg-purple-500/10 dark:bg-purple-500/15',
  ];

  private iconColors = ['text-blue-500', 'text-emerald-500', 'text-purple-500'];

  getIconBg(i: number): string { return this.iconBgs[i % this.iconBgs.length]; }
  getIconColor(i: number): string { return this.iconColors[i % this.iconColors.length]; }

  public skillCategories: (SkillCategory & { iconPath: string })[] = [
    {
      title: 'Backend .NET',
      description: 'Arquitectura de servidores y APIs REST',
      icon: '⚙️',
      iconPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      skills: ['C#', '.NET 8', 'Entity Framework Core', 'Clean Architecture', 'CQRS', 'SQL Server', 'MongoDB', 'REST API']
    },
    {
      title: 'Frontend Web',
      description: 'Interfaces modernas y reactivas',
      icon: '🌐',
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      skills: ['Angular', 'React', 'Vite', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      title: 'QA & DevOps',
      description: 'Calidad, pruebas y gestión ágil',
      icon: '🧪',
      iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      skills: ['Postman', 'cURL', 'API Testing', 'Testing Funcional', 'Azure DevOps', 'Jira', 'Git & GitHub', 'Scrum']
    }
  ];
}
