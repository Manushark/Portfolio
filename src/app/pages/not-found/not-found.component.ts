import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-dark-bg text-gray-100 flex items-center justify-center p-4">
      <div class="max-w-md text-center">
        <!-- 404 Badge -->
        <div class="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
          ERROR 404
        </div>

        <h1 class="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 mb-4 font-mono">
          404
        </h1>

        <h2 class="text-2xl font-bold text-white mb-3">Página no encontrada</h2>

        <p class="text-gray-400 text-sm mb-8 leading-relaxed">
          La ruta a la que intentas acceder no existe o fue movida.
        </p>

        <a
          routerLink="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al Inicio
        </a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
