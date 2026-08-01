import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent],
  template: `
    <section id="hero" class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <!-- Background Glow Effects -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Status Badge -->
        <div class="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <app-badge variant="primary">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Disponible para nuevas oportunidades laborales</span>
          </app-badge>
        </div>

        <!-- Name & Title -->
        <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 animate-slide-up">
          Hola, soy <span class="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Manuel de Jesús Rivas</span>
        </h1>
        <p class="text-xl sm:text-2xl font-mono font-medium text-gray-600 dark:text-gray-300 mb-6">
          Junior Software Developer &bull; Backend .NET &bull; Angular &bull; QA
        </p>

        <!-- Description -->
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          "Desarrollador de software enfocado en backend con <strong class="text-gray-900 dark:text-gray-200">.NET 8 & C#</strong>, integración con <strong class="text-gray-900 dark:text-gray-200">SQL Server & MongoDB</strong> y experiencia en <strong class="text-gray-900 dark:text-gray-200">QA Testing</strong> y desarrollo de aplicaciones web."
        </p>

        <!-- Main Technologies Tags -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
          @for (tech of mainTechs; track tech) {
            <app-badge variant="outline">
              {{ tech }}
            </app-badge>
          }
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <!-- Download CV (Español) -->
          <app-button
            variant="primary"
            size="md"
            href="assets/docs/CV_Manuel_Rivas.pdf"
            download="CV_Manuel_Rivas.pdf"
            target="_blank"
            customClass="w-full sm:w-auto shadow-md">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>Descargar CV (ES)</span>
          </app-button>

          <!-- Download CV (English) -->
          <app-button
            variant="secondary"
            size="md"
            href="assets/docs/CV_Manuel_Rivas_EN.pdf"
            download="CV_Manuel_Rivas_EN.pdf"
            target="_blank"
            customClass="w-full sm:w-auto shadow-sm">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>Download CV (EN)</span>
          </app-button>

          <!-- View Projects -->
          <app-button
            variant="outline"
            size="md"
            href="#projects"
            customClass="w-full sm:w-auto">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            <span>Ver Proyectos</span>
          </app-button>

          <!-- Contact -->
          <app-button
            variant="ghost"
            size="md"
            href="#contact"
            customClass="w-full sm:w-auto border border-gray-200 dark:border-gray-700">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>Ir a Contacto</span>
          </app-button>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  public mainTechs: string[] = ['.NET 8', 'C#', 'SQL Server', 'MongoDB', 'Angular', 'React/Vite', 'Postman', 'QA Testing'];
}
