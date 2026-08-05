import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent],
  styles: [`
    :host { display: contents; }

    .hero-section {
      position: relative;
      overflow: hidden;
    }

    /* Staggered entrance animations */
    .hero-item {
      opacity: 0;
      transform: translateY(20px) translateZ(0);
      animation: heroEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .hero-item:nth-child(1) { animation-delay: 100ms; }
    .hero-item:nth-child(2) { animation-delay: 200ms; }
    .hero-item:nth-child(3) { animation-delay: 300ms; }
    .hero-item:nth-child(4) { animation-delay: 400ms; }
    .hero-item:nth-child(5) { animation-delay: 500ms; }
    .hero-item:nth-child(6) { animation-delay: 600ms; }

    @keyframes heroEnter {
      to {
        opacity: 1;
        transform: translateY(0) translateZ(0);
      }
    }

    /* Typewriter cursor */
    .typewriter-cursor {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: #3b82f6;
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Scroll indicator */
    .scroll-indicator {
      animation: bounceDown 2.4s ease-in-out infinite;
      will-change: transform;
    }

    @keyframes bounceDown {
      0%, 100% { transform: translateY(0) translateZ(0); opacity: 0.6; }
      50% { transform: translateY(8px) translateZ(0); opacity: 1; }
    }

    /* Orb animations */
    .orb-1 {
      animation: float1 10s ease-in-out infinite;
      will-change: transform;
    }
    .orb-2 {
      animation: float2 13s ease-in-out 2s infinite;
      will-change: transform;
    }
    .orb-3 {
      animation: float3 9s ease-in-out 1s infinite;
      will-change: transform;
    }

    @keyframes float1 {
      0%, 100% { transform: translate(0, 0) translateZ(0); }
      50% { transform: translate(16px, -20px) translateZ(0); }
    }
    @keyframes float2 {
      0%, 100% { transform: translate(0, 0) translateZ(0); }
      50% { transform: translate(-12px, -16px) translateZ(0); }
    }
    @keyframes float3 {
      0%, 100% { transform: translate(0, 0) translateZ(0); }
      50% { transform: translate(8px, 12px) translateZ(0); }
    }

    /* Status dot pulse ring */
    .status-ring {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .status-ring::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.3);
      animation: statusPulse 2s ease-out infinite;
    }
    @keyframes statusPulse {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }
  `],
  template: `
    <section id="hero" class="hero-section pt-32 pb-24 md:pt-40 md:pb-32">

      <!-- Background: Grid + Orbs -->
      <div class="absolute inset-0 bg-grid-pattern pointer-events-none" aria-hidden="true"></div>

      <!-- Gradient orbs -->
      <div aria-hidden="true">
        <div class="orb-1 absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/8 dark:bg-blue-500/12 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div class="orb-2 absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/8 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
        <div class="orb-3 absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-cyan-500/6 dark:bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <!-- 1. Status Badge -->
        <div class="hero-item inline-flex items-center gap-2 mb-8">
          <app-badge variant="success">
            <span class="status-ring">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 relative z-10"></span>
            </span>
            <span>Disponible para nuevas oportunidades</span>
          </app-badge>
        </div>

        <!-- 2. Name -->
        <h1 class="hero-item text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tightest leading-[1.04] mb-5">
          Hola, soy<br>
          <span class="gradient-text">Manuel de Jesús Rivas</span>
        </h1>

        <!-- 3. Typewriter Role -->
        <p class="hero-item text-lg sm:text-xl font-mono font-medium text-gray-500 dark:text-gray-400 mb-5">
          <span>{{ currentRole() }}</span>
          <span class="typewriter-cursor" aria-hidden="true"></span>
        </p>

        <!-- 4. Description -->
        <p class="hero-item text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Desarrollador enfocado en backend con
          <strong class="text-gray-900 dark:text-gray-100 font-semibold">.NET 8 &amp; C#</strong>,
          integración con
          <strong class="text-gray-900 dark:text-gray-100 font-semibold">SQL Server &amp; MongoDB</strong>
          y experiencia en
          <strong class="text-gray-900 dark:text-gray-100 font-semibold">QA Testing</strong>
          y aplicaciones web con Angular.
        </p>

        <!-- 5. Tech Tags -->
        <div class="hero-item flex flex-wrap items-center justify-center gap-2 mb-10">
          @for (tech of mainTechs; track tech) {
            <app-badge variant="outline">{{ tech }}</app-badge>
          }
        </div>

        <!-- 6. Action Buttons -->
        <div class="hero-item flex flex-wrap items-center justify-center gap-3">
          <!-- Download CV (Español) -->
          <app-button
            variant="primary"
            size="md"
            href="assets/docs/CV_Manuel_Rivas.pdf"
            download="CV_Manuel_Rivas.pdf"
            target="_blank"
            customClass="w-full sm:w-auto">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Descargar CV (ES)</span>
            <span class="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded font-semibold text-white">PDF</span>
          </app-button>

          <!-- Download CV (English) -->
          <app-button
            variant="secondary"
            size="md"
            href="assets/docs/CV_Manuel_Rivas_EN.pdf"
            download="CV_Manuel_Rivas_EN.pdf"
            target="_blank"
            customClass="w-full sm:w-auto">
            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Download CV (EN)</span>
            <span class="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-gray-200 dark:bg-white/15 rounded font-semibold text-gray-700 dark:text-gray-300">PDF</span>
          </app-button>

          <!-- View Projects -->
          <app-button
            variant="outline"
            size="md"
            href="#projects"
            customClass="w-full sm:w-auto">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            <span>Ver Proyectos</span>
          </app-button>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-16 flex flex-col items-center gap-2" aria-hidden="true">
          <span class="text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase">scroll</span>
          <div class="scroll-indicator w-5 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-start justify-center pt-1.5">
            <span class="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  public currentRole = signal<string>('');
  public mainTechs: string[] = ['.NET 8', 'C#', 'SQL Server', 'MongoDB', 'Angular', 'React/Vite', 'Postman', 'QA Testing'];

  private roles: string[] = [
    'Junior Software Developer',
    'Backend .NET Engineer',
    'Angular Developer',
    'QA Engineer',
  ];

  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypewriter();
    }
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }

  private startTypewriter(): void {
    const role = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.currentRole.set(role.substring(0, this.charIndex));

    let delay = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === role.length) {
      delay = 2200; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 400; // Pause before next
    }

    this.typeTimer = setTimeout(() => this.startTypewriter(), delay);
  }
}
