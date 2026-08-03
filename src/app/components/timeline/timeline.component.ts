import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  NgZone,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ExperienceItem } from '../../core/models/experience.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, BadgeComponent, ScrollRevealDirective],
  styles: [`
    :host { display: contents; }

    /* The vertical line draws itself when .is-visible is added */
    .timeline-line-el {
      transform-origin: top;
      transform: scaleY(0) translateZ(0);
      transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }

    .timeline-line-el.line-visible {
      transform: scaleY(1) translateZ(0);
    }

    /* Timeline dot pulse ring */
    .dot-ring {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 1.5px solid #3b82f6;
      opacity: 0;
      transform: scale(0.6);
      transition:
        opacity 0.3s ease,
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .timeline-item:hover .dot-ring {
      opacity: 0.6;
      transform: scale(1.4);
    }

    /* Accent left border revealed on hover */
    .timeline-card {
      transition:
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.35s ease,
        border-color 0.2s ease;
      will-change: transform;
      border-left: 2px solid transparent;
    }

    .timeline-card:hover {
      transform: translateX(4px) translateZ(0);
      border-left-color: #3b82f6;
    }

    /* Responsibility list item entrance */
    .resp-item {
      transition:
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        color 0.2s ease;
    }

    .resp-item:hover {
      transform: translateX(3px) translateZ(0);
      color: #1e40af;
    }

    .dark .resp-item:hover {
      color: #93c5fd;
    }

    .resp-bullet {
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }

    .resp-item:hover .resp-bullet {
      transform: scale(1.3) translateZ(0);
    }
  `],
  template: `
    <section id="experience" class="py-24 bg-gray-50/60 dark:bg-dark-surface/40 border-y border-black/5 dark:border-white/5">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          titlePrefix="Línea de"
          titleHighlight="Tiempo Profesional"
          subtitle="Experiencia práctica en desarrollo backend .NET y aseguramiento de calidad">
        </app-section-header>

        <div class="relative">
          <!-- The animated vertical line -->
          <div
            #timelineLineEl
            [class]="'timeline-line-el absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-400/40 to-transparent ' + (lineVisible() ? 'line-visible' : '')">
          </div>

          <div class="space-y-8 ml-10 sm:ml-16">
            @for (item of experiences; track item.company; let i = $index) {
              <div appScrollReveal direction="right" [delay]="i * 120"
                   class="timeline-item relative group">

                <!-- Timeline Dot -->
                <div class="absolute -left-[38px] sm:-left-[54px] top-6 flex items-center justify-center">
                  <div class="relative w-6 h-6 rounded-full bg-white dark:bg-dark-surface border-2 border-blue-500 shadow-glow-sm flex items-center justify-center">
                    <div class="dot-ring"></div>
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                </div>

                <!-- Card -->
                <div class="timeline-card bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover">

                  <!-- Header -->
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div>
                      <div class="mb-2">
                        <app-badge variant="primary">{{ item.period }}</app-badge>
                      </div>
                      <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {{ item.role }}
                      </h3>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <div class="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                        <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                      </div>
                      <span class="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">{{ item.company }}</span>
                    </div>
                  </div>

                  <!-- Responsibilities -->
                  <div class="mb-5">
                    <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                      Responsabilidades &amp; Logros
                    </h4>
                    <ul class="space-y-2.5">
                      @for (resp of item.responsibilities; track resp) {
                        <li class="resp-item flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          <span class="resp-bullet mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                          <span>{{ resp }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Skills -->
                  @if (item.skills) {
                    <div class="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 dark:border-white/5">
                      @for (skill of item.skills; track skill) {
                        <app-badge variant="outline">#{{ skill }}</app-badge>
                      }
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  public lineVisible = signal<boolean>(false);
  private lineObserver: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      const lineEl = document.querySelector('.timeline-line-el') as HTMLElement;
      if (!lineEl) return;

      this.lineObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.ngZone.run(() => this.lineVisible.set(true));
            this.lineObserver?.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      this.lineObserver.observe(lineEl);
    });
  }

  ngOnDestroy(): void {
    this.lineObserver?.disconnect();
  }

  public experiences: ExperienceItem[] = [
    {
      year: '2026',
      period: 'Abril – Junio 2026',
      role: 'Pasante QA | Garantía de Calidad del Software',
      company: 'Banreservas (CTB)',
      responsibilities: [
        'Ejecución de pruebas funcionales y de integración de APIs mediante Postman y cURL, verificando el cumplimiento estricto de requerimientos funcionales.',
        'Configuración de datos de prueba y tarjetas de prueba en el sistema core bancario para validar flujos transaccionales de productos de tarjetas de crédito.'
      ],
      skills: ['Postman', 'cURL', 'API Testing', 'Pruebas Funcionales', 'Core Banking', 'QA']
    },
    {
      year: '2026',
      period: 'Ene – Mar 2026',
      role: 'Pasante Desarrollador Backend (AppSalud)',
      company: 'Tectrics SRL',
      responsibilities: [
        'Desarrollo e implementación de módulos clínicos del sistema AppSalud utilizando .NET 8, React/Vite, SQL Server y MongoDB estructurado bajo Clean Architecture y patrón CQRS.',
        'Colaboración activa en equipo Scrum utilizando Azure DevOps para la gestión de tareas, sprints y control de versiones con Git.'
      ],
      skills: ['.NET 8', 'C#', 'Clean Architecture', 'CQRS', 'SQL Server', 'MongoDB', 'React/Vite', 'Azure DevOps', 'Scrum']
    }
  ];
}
