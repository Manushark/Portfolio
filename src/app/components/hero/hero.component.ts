import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <!-- Background Glow Effects -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Status Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-8 animate-fade-in">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Disponible para nuevas oportunidades laborales</span>
        </div>

        <!-- Name & Title -->
        <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 animate-slide-up">
          Hola, soy <span class="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Manuel Rivas</span>
        </h1>
        <p class="text-xl sm:text-2xl font-mono font-medium text-gray-600 dark:text-gray-300 mb-6">
          Junior Software Developer &bull; .NET &bull; Angular &bull; QA
        </p>

        <!-- Description -->
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          "Desarrollador de software enfocado en backend con <strong class="text-gray-900 dark:text-gray-200">.NET</strong> y experiencia en <strong class="text-gray-900 dark:text-gray-200">QA Testing</strong>, desarrollo de APIs REST y aplicaciones web."
        </p>

        <!-- Main Technologies Tags -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
          @for (tech of mainTechs; track tech) {
            <span class="px-3 py-1 text-xs font-mono font-semibold rounded-md bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60 shadow-sm">
              {{ tech }}
            </span>
          }
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- Download CV -->
          <a
            href="assets/docs/CV_Manuel_Rivas.pdf"
            download="CV_Manuel_Rivas.pdf"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Descargar CV
          </a>

          <!-- View Projects -->
          <a
            href="#projects"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-0.5">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            Ver proyectos
          </a>

          <!-- Contact -->
          <a
            href="#contact"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60 transition-all hover:-translate-y-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contactar
          </a>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  public mainTechs: string[] = ['.NET', 'C#', 'ASP.NET Core', 'Angular', 'SQL Server', 'QA Testing'];
}
