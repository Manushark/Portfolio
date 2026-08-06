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

                <!-- Skill Badges with Brand SVG Logos -->
                <div class="flex flex-wrap gap-1.5">
                  @for (skill of category.skills; track skill) {
                    <app-badge variant="outline">
                      @switch (skill) {
                        @case ('C#') {
                          <svg class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.5 3L3.5 7.5v9L11.5 21l8-4.5v-9L11.5 3zm0 2.3l5.7 3.2v6.4l-5.7 3.2-5.7-3.2v-6.4l5.7-3.2z"/>
                          </svg>
                        }
                        @case ('.NET 8') {
                          <svg class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                          </svg>
                        }
                        @case ('Entity Framework Core') {
                          <svg class="w-3.5 h-3.5 text-purple-500 dark:text-purple-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                          </svg>
                        }
                        @case ('Clean Architecture') {
                          <svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        }
                        @case ('CQRS') {
                          <svg class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                          </svg>
                        }
                        @case ('SQL Server') {
                          <svg class="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                          </svg>
                        }
                        @case ('MongoDB') {
                          <svg class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2c-.3 1.5-4 5.5-4 9.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-3.7-8-4-9.5z"/>
                            <path d="M12 15.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                          </svg>
                        }
                        @case ('REST API') {
                          <svg class="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <circle cx="12" cy="12" r="9"/>
                            <path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"/>
                          </svg>
                        }
                        @case ('Angular') {
                          <svg class="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 5.5l1.5 13L12 22l8.5-3.5 1.5-13L12 2zm0 3.8l5.2 11.7h-2.1l-1.1-2.6H10l-1.1 2.6H6.8L12 5.8zm-1.2 7.1h2.4L12 9.9l-1.2 3z"/>
                          </svg>
                        }
                        @case ('React') {
                          <svg class="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
                            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
                            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
                            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                          </svg>
                        }
                        @case ('Vite') {
                          <svg class="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2 3l10 18L22 3l-8.5 2.5L12 11 10.5 5.5 2 3z"/>
                          </svg>
                        }
                        @case ('TypeScript') {
                          <svg class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h18v18H3V3zm11 10h-2v4h-1.5v-4H8.5V11.5H14V13zm4.5 2.5c0 .8-.7 1.5-1.5 1.5h-3v-1.5h3v-1h-2a1.5 1.5 0 01-1.5-1.5v-1.5c0-.8.7-1.5 1.5-1.5h3v1.5h-3v1h2a1.5 1.5 0 011.5 1.5v1.5z"/>
                          </svg>
                        }
                        @case ('HTML5') {
                          <svg class="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L3 5l1.5 13.5L12 22l7.5-3.5L21 5 12 2zm5 5H8.2l.2 2.5h8.2l-.6 7-3.8 1.1-3.8-1.1-.3-3.2h2.4l.2 1.4 1.5.4 1.5-.4.2-2.2H7.8L7.2 7h9.8z"/>
                          </svg>
                        }
                        @case ('CSS3') {
                          <svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L3 5l1.5 13.5L12 22l7.5-3.5L21 5 12 2zm5 5H8.2l.2 2.5h8.2l-.6 7-3.8 1.1-3.8-1.1-.3-3.2h2.4l.2 1.4 1.5.4 1.5-.4.2-2.2H7.8L7.2 7h9.8z"/>
                          </svg>
                        }
                        @case ('Tailwind CSS') {
                          <svg class="w-3.5 h-3.5 text-sky-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 6c-3.3 0-5.3 1.6-6 4.9 1.3-1.6 2.8-2.1 4.5-1.4 1 0.4 1.7 1.2 2.5 2.1C14.3 13 16 14.8 20 14.8c3.3 0 5.3-1.6 6-4.9-1.3 1.6-2.8 2.1-4.5 1.4-1-0.4-1.7-1.2-2.5-2.1C17.7 7.8 16 6 12 6zM6 14.8c-3.3 0-5.3 1.6-6 4.9 1.3-1.6 2.8-2.1 4.5-1.4 1 .4 1.7 1.2 2.5 2.1C8.3 21.8 10 23.6 14 23.6c3.3 0 5.3-1.6 6-4.9-1.3 1.6-2.8 2.1-4.5 1.4-1-.4-1.7-1.2-2.5-2.1C11.7 16.6 10 14.8 6 14.8z"/>
                          </svg>
                        }
                        @case ('Postman') {
                          <svg class="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                          </svg>
                        }
                        @case ('cURL') {
                          <svg class="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M4 17l6-6-6-6M12 19h8"/>
                          </svg>
                        }
                        @case ('API Testing') {
                          <svg class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M9 12l2 2 4-4"/>
                          </svg>
                        }
                        @case ('Testing Funcional') {
                          <svg class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                          </svg>
                        }
                        @case ('Azure DevOps') {
                          <svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 6.5L10 2v5L4 9v6l6 2.5v5.5l8-4.5v-12z"/>
                          </svg>
                        }
                        @case ('Jira') {
                          <svg class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.5 2L2 11.5l9.5 9.5 9.5-9.5L11.5 2zm0 4.2l5.3 5.3-5.3 5.3-5.3-5.3 5.3-5.3z"/>
                          </svg>
                        }
                        @case ('Git & GitHub') {
                          <svg class="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        }
                        @case ('Scrum') {
                          <svg class="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/>
                          </svg>
                        }
                      }
                      <span>{{ skill }}</span>
                    </app-badge>
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
      iconPath: 'M19.428 15.428a2 2 0 01-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      skills: ['Postman', 'cURL', 'API Testing', 'Testing Funcional', 'Azure DevOps', 'Jira', 'Git & GitHub', 'Scrum']
    }
  ];
}
