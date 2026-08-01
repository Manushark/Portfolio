import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="about" class="py-20 bg-gray-50/50 dark:bg-gray-900/40 border-y border-gray-200/60 dark:border-gray-800/60">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <app-section-header
          titlePrefix="Sobre"
          titleHighlight="Mí"
          subtitle="Trayectoria académica, valores y enfoque profesional">
        </app-section-header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Main Narrative Card -->
          <div class="lg:col-span-7 bg-white dark:bg-gray-800/80 p-8 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm flex flex-col justify-between">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="text-blue-500">🧑‍💻</span> Desarrollador Jr Backend .NET & QA
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Soy un desarrollador de software junior con experiencia práctica en desarrollo backend y pruebas de software adquirida durante pasantías profesionales. Manejo tecnologías clave como <strong class="text-blue-600 dark:text-blue-400">C#, .NET 8, Entity Framework Core, SQL Server y MongoDB</strong>, aplicando arquitecturas como <strong class="text-gray-900 dark:text-white">Clean Architecture</strong> y patrones <strong class="text-gray-900 dark:text-white">CQRS</strong>.
              </p>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Cuento además con sólidos conocimientos en herramientas de automatización y pruebas de APIs con <strong class="text-gray-900 dark:text-white">Postman & cURL</strong>, colaboración bajo metodología <strong class="text-gray-900 dark:text-white">Scrum</strong> y gestión de tareas en <strong class="text-gray-900 dark:text-white">Azure DevOps & Jira</strong>.
              </p>
            </div>

            <!-- Pillars -->
            <div class="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-gray-700/60">
              <div class="text-center">
                <div class="text-blue-500 font-bold text-xl mb-1">🚀</div>
                <div class="text-xs font-semibold text-gray-800 dark:text-gray-200">Aprendizaje Continuo</div>
              </div>
              <div class="text-center">
                <div class="text-indigo-500 font-bold text-xl mb-1">🛡️</div>
                <div class="text-xs font-semibold text-gray-800 dark:text-gray-200">Buenas Prácticas</div>
              </div>
              <div class="text-center">
                <div class="text-purple-500 font-bold text-xl mb-1">🤝</div>
                <div class="text-xs font-semibold text-gray-800 dark:text-gray-200">Trabajo Colaborativo</div>
              </div>
            </div>
          </div>

          <!-- Highlights Grid -->
          <div class="lg:col-span-5 flex flex-col justify-between gap-4">
            <!-- Experience 1 -->
            <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm">
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 font-bold">
                  ⚙️
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-base">Backend Dev Intern</h4>
                  <p class="text-xs text-purple-500 font-mono">Tectrics SRL &bull; AppSalud</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Desarrollo de módulos clínicos con .NET 8, React/Vite, SQL Server y MongoDB utilizando Clean Architecture y CQRS.
              </p>
            </div>

            <!-- Experience 2 -->
            <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm">
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 font-bold">
                  🏦
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-base">Pasante QA</h4>
                  <p class="text-xs text-blue-500 font-mono">CTB Banreservas</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Pruebas funcionales y de integración de APIs con Postman y cURL. Validación de flujos del sistema core bancario.
              </p>
            </div>

            <!-- Education -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-md">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xl">🎓</span>
                <div>
                  <h4 class="font-bold text-white text-base">Tecnólogo en Software</h4>
                  <p class="text-xs text-blue-100 font-mono">ITLA &bull; Promedio: 3.7 / 4.0</p>
                </div>
              </div>
              <p class="text-xs text-blue-200/80 mt-1">Instituto Tecnológico de las Américas (2023 - 2025).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}
