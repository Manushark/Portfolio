import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../core/models/experience.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 bg-gray-50/50 dark:bg-gray-900/40 border-y border-gray-200/60 dark:border-gray-800/60">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Línea de <span class="text-blue-500">Tiempo Profesional</span>
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
            Experiencia práctica en desarrollo de software y control de calidad
          </p>
        </div>

        <!-- Timeline Container -->
        <div class="relative border-l-2 border-blue-500/30 dark:border-blue-500/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          @for (item of experiences; track item.company) {
            <div class="relative group">
              <!-- Timeline Dot Icon -->
              <div class="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>

              <!-- Content Card -->
              <div class="bg-white dark:bg-gray-800/90 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:shadow-lg transition-all">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span class="inline-block px-3 py-1 text-xs font-mono font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
                      {{ item.year }}
                    </span>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                      {{ item.role }}
                    </h3>
                  </div>
                  <div class="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                    🏢 {{ item.company }}
                  </div>
                </div>

                <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Responsabilidades Clave:
                </h4>
                <ul class="space-y-2 mb-4">
                  @for (resp of item.responsibilities; track resp) {
                    <li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span class="text-blue-500 mt-1">▹</span>
                      <span>{{ resp }}</span>
                    </li>
                  }
                </ul>

                @if (item.skills) {
                  <div class="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    @for (skill of item.skills; track skill) {
                      <span class="px-2.5 py-0.5 text-xs font-mono rounded bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                        #{{ skill }}
                      </span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TimelineComponent {
  public experiences: ExperienceItem[] = [
    {
      year: '2026',
      role: 'QA Intern',
      company: 'Banreservas',
      responsibilities: [
        'Ejecución de pruebas funcionales end-to-end en plataformas bancarias.',
        'Pruebas exhaustivas de API REST utilizando Postman y automatización de colecciones.',
        'Validación de reglas de negocio, integridad de servicios web y reporte de incidencias.'
      ],
      skills: ['Postman', 'API Validation', 'Functional Testing', 'Bug Reporting']
    },
    {
      year: '2026',
      role: 'Backend Developer Intern',
      company: 'Tetris SRL',
      responsibilities: [
        'Desarrollo backend en C# utilizando .NET y ASP.NET Core.',
        'Creación y documentación de endpoints RESTful con Swagger.',
        'Mantenimiento, refactorización de código y optimización de módulos existentes.'
      ],
      skills: ['.NET', 'C#', 'ASP.NET Core', 'REST API', 'Entity Framework']
    }
  ];
}
