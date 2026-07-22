import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-gray-50/50 dark:bg-gray-900/40 border-y border-gray-200/60 dark:border-gray-800/60">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-14">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Sobre <span class="text-blue-500">Mí</span>
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
            Trayectoria académica, valores y enfoque profesional
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Main Narrative Card -->
          <div class="lg:col-span-7 bg-white dark:bg-gray-800/80 p-8 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm flex flex-col justify-between">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="text-blue-500">🧑‍💻</span> Apasionado por la Calidad y el Backend
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Soy un desarrollador de software con formación sólida enfocado en crear soluciones eficientes, escalables y bien testeadas. Mi fortaleza radica en la construcción de APIs REST robustas con <strong class="text-blue-600 dark:text-blue-400">.NET & C#</strong>, la integración con bases de datos relacionales como <strong class="text-gray-900 dark:text-white">SQL Server</strong> y la creación de interfaces web reactivas en <strong class="text-gray-900 dark:text-white">Angular</strong>.
              </p>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Gracias a mi experiencia previa en **QA Testing**, aplico un enfoque riguroso en la prevención de fallos, diseño de casos de prueba y aseguramiento de la calidad desde las etapas iniciales del desarrollo.
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
                <div class="text-xs font-semibold text-gray-800 dark:text-gray-200">Trabajo en Equipo</div>
              </div>
            </div>
          </div>

          <!-- Highlight Highlights Grid -->
          <div class="lg:col-span-5 flex flex-col justify-between gap-4">
            <!-- Practical Experience Highlights -->
            <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 font-bold">
                  🏦
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-base">Prácticas QA</h4>
                  <p class="text-xs text-blue-500 font-mono">Banreservas</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Ejecución de pruebas funcionales, validación de endpoints API con Postman y aseguramiento de criterios de aceptación en servicios financieros.
              </p>
            </div>

            <!-- Backend Experience Highlights -->
            <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/70 shadow-sm">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 font-bold">
                  ⚙️
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-base">Backend Dev Intern</h4>
                  <p class="text-xs text-purple-500 font-mono">Tetris SRL</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Desarrollo en .NET C#, construcción de endpoints RESTful, mantenimiento de módulos de negocio y trabajo bajo metodología ágil.
              </p>
            </div>

            <!-- Education -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-md">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xl">🎓</span>
                <h4 class="font-bold text-white text-base">Formación Académica</h4>
              </div>
              <p class="text-xs text-blue-100 font-medium">Tecnólogo en Desarrollo de Software</p>
              <p class="text-xs text-blue-200/80 mt-1">Enfoque en arquitectura limpia, POO y ciclo de vida del software.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}
