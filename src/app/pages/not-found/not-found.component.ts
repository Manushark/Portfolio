import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent, ButtonComponent],
  template: `
    <div class="min-h-screen bg-slate-900 text-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      <!-- Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-md text-center relative z-10 animate-fade-in">
        <!-- 404 Badge -->
        <div class="inline-flex mb-6">
          <app-badge variant="primary">
            ERROR 404
          </app-badge>
        </div>

        <h1 class="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 mb-4 font-mono tracking-tighter">
          404
        </h1>

        <h2 class="text-2xl font-bold text-white mb-3">Página no encontrada</h2>

        <p class="text-gray-400 text-sm mb-8 leading-relaxed">
          La ruta a la que intentas acceder no existe, ha sido movida o no se encuentra disponible.
        </p>

        <app-button
          variant="primary"
          size="lg"
          href="/">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Volver al Inicio</span>
        </app-button>
      </div>
    </div>
  `
})
export class NotFoundComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData(
      'Página No Encontrada (404) | Manuel Rivas',
      'La página que estás buscando no existe en el portfolio de Manuel Rivas.'
    );
  }
}
