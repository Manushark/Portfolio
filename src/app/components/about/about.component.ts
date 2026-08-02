import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, ScrollRevealDirective],
  styles: [`
    :host { display: contents; }

    .pillar-icon {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .pillar:hover .pillar-icon {
      transform: translateY(-4px) scale(1.1) translateZ(0);
    }

    .highlight-card {
      transition:
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.3s ease,
        border-color 0.2s ease;
      will-change: transform;
    }

    .highlight-card:hover {
      transform: translateY(-3px) translateZ(0);
    }
  `],
  template: `
    <section id="about" class="py-24 bg-gray-50/60 dark:bg-dark-surface/40 border-y border-black/5 dark:border-white/5">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          titlePrefix="Sobre"
          titleHighlight="Mí"
          subtitle="Trayectoria académica, valores y enfoque profesional">
        </app-section-header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          <!-- Main Narrative Card -->
          <div appScrollReveal direction="left" [delay]="0"
               class="highlight-card lg:col-span-7 bg-white dark:bg-dark-card p-8 rounded-2xl border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark flex flex-col justify-between hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:border-blue-200 dark:hover:border-blue-900/50">
            <div>
              <div class="flex items-center gap-3 mb-5">
                <!-- Dev icon -->
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  Desarrollador Backend .NET &amp; QA
                </h3>
              </div>

              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                Soy un desarrollador de software junior con experiencia práctica en backend y pruebas de software adquirida durante pasantías profesionales. Manejo
                <strong class="text-blue-600 dark:text-blue-400 font-medium">C#, .NET 8, Entity Framework Core, SQL Server y MongoDB</strong>,
                aplicando arquitecturas como <strong class="text-gray-900 dark:text-white font-medium">Clean Architecture</strong> y el patrón <strong class="text-gray-900 dark:text-white font-medium">CQRS</strong>.
              </p>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                Cuento además con conocimientos en automatización y pruebas de APIs con
                <strong class="text-gray-900 dark:text-white font-medium">Postman &amp; cURL</strong>,
                metodología <strong class="text-gray-900 dark:text-white font-medium">Scrum</strong>
                y gestión en <strong class="text-gray-900 dark:text-white font-medium">Azure DevOps &amp; Jira</strong>.
              </p>
            </div>

            <!-- Value Pillars -->
            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-white/6">
              @for (pillar of pillars; track pillar.label) {
                <div class="pillar text-center group cursor-default">
                  <div class="pillar-icon w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center"
                       [class]="'bg-' + pillar.color + '/10 dark:bg-' + pillar.color + '/15'">
                    <svg [class]="'w-5 h-5 text-' + pillar.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="pillar.icon"/>
                    </svg>
                  </div>
                  <div class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ pillar.label }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-5 flex flex-col gap-4">

            <!-- Experience 1 -->
            <div appScrollReveal direction="right" [delay]="80"
                 class="highlight-card bg-white dark:bg-dark-card p-6 rounded-2xl border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:border-purple-200 dark:hover:border-purple-900/50">
              <div class="flex items-start gap-3 mb-3">
                <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center">
                  <svg class="w-4.5 h-4.5 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm">Backend Dev Intern</h4>
                  <p class="text-xs text-purple-500 dark:text-purple-400 font-mono mt-0.5">Tectrics SRL · AppSalud</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Desarrollo de módulos clínicos con .NET 8, React/Vite, SQL Server y MongoDB bajo Clean Architecture y CQRS.
              </p>
            </div>

            <!-- Experience 2 -->
            <div appScrollReveal direction="right" [delay]="160"
                 class="highlight-card bg-white dark:bg-dark-card p-6 rounded-2xl border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:border-blue-200 dark:hover:border-blue-900/50">
              <div class="flex items-start gap-3 mb-3">
                <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                  <svg class="w-4.5 h-4.5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm">Pasante QA</h4>
                  <p class="text-xs text-blue-500 dark:text-blue-400 font-mono mt-0.5">CTB Banreservas</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Pruebas funcionales y de integración de APIs con Postman y cURL. Validación de flujos del sistema core bancario.
              </p>
            </div>

            <!-- Education -->
            <div appScrollReveal direction="right" [delay]="240"
                 class="highlight-card relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-glow-sm flex-1">
              <!-- Subtle noise texture -->
              <div class="absolute inset-0 opacity-20 bg-noise pointer-events-none" aria-hidden="true"></div>
              <div class="relative z-10">
                <div class="flex items-start gap-3 mb-3">
                  <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                    <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-white text-sm">Tecnólogo en Software</h4>
                    <p class="text-xs text-blue-100 font-mono mt-0.5">ITLA · GPA: 3.7 / 4.0</p>
                  </div>
                </div>
                <p class="text-xs text-blue-100/80 leading-relaxed">
                  Instituto Tecnológico de las Américas — 2023 a 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  public pillars = [
    {
      label: 'Aprendizaje Continuo',
      color: 'blue-500',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      label: 'Buenas Prácticas',
      color: 'indigo-500',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      label: 'Trabajo Colaborativo',
      color: 'purple-500',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
    }
  ];
}
