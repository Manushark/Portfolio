import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  label: string;
  href: string;
  iconPath: string;
  fill?: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: contents; }

    .footer-link {
      transition:
        color 0.15s ease,
        transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .footer-link:hover {
      transform: translateY(-2px) translateZ(0);
    }

    .social-btn {
      transition:
        color 0.15s ease,
        background-color 0.15s ease,
        transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.25s ease;
      will-change: transform;
    }

    .social-btn:hover {
      transform: translateY(-3px) translateZ(0);
    }

    .logo-mark {
      transition:
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.3s ease;
    }

    .logo-mark:hover {
      transform: scale(1.08) rotate(-2deg) translateZ(0);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.45);
    }
  `],
  template: `
    <footer class="bg-slate-200/60 dark:bg-dark-bg border-t border-slate-300/80 dark:border-white/10 transition-colors duration-300">
      <!-- Gradient top accent -->
      <div class="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">

          <!-- Brand -->
          <div class="flex items-center gap-3">
            <div class="logo-mark w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-blue-500/25 cursor-pointer">
              MR
            </div>
            <div>
              <div class="text-slate-900 dark:text-white font-bold tracking-tight text-base">Manuel de Jesús Rivas</div>
              <p class="text-xs text-slate-500 dark:text-gray-400 font-mono mt-0.5">Backend .NET · Angular · QA</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-3">
            @for (social of socials; track social.label) {
              <a
                [href]="social.href"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="social.label"
                class="social-btn w-10 h-10 rounded-xl bg-slate-300/60 dark:bg-white/5 hover:bg-blue-600 dark:hover:bg-blue-600 border border-slate-400/40 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center justify-center shadow-sm">
                <svg class="w-4.5 h-4.5" [attr.fill]="social.fill ? 'currentColor' : 'none'" stroke="currentColor" [attr.stroke-width]="social.fill ? '0' : '2'" viewBox="0 0 24 24" aria-hidden="true">
                  <path [attr.stroke-linecap]="social.fill ? null : 'round'" [attr.stroke-linejoin]="social.fill ? null : 'round'" [attr.d]="social.iconPath"/>
                </svg>
              </a>
            }
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-10 pt-6 border-t border-slate-300/80 dark:border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-gray-500">
          <span>© {{ currentYear }} Manuel de Jesús Rivas Tavárez. Todos los derechos reservados.</span>
          <div class="flex items-center gap-1.5">
            <span>Construido con</span>
            <span class="text-blue-600 dark:text-blue-500 font-semibold">Angular 19</span>
            <span>·</span>
            <span class="text-blue-600 dark:text-blue-500 font-semibold">Tailwind CSS</span>
            <span>·</span>
            <span class="text-blue-600 dark:text-blue-500 font-semibold">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();

  public socials: SocialLink[] = [
    {
      label: 'GitHub',
      href: 'https://github.com/Manushark',
      fill: true,
      iconPath: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'
    },
    {
      label: 'Correo Electrónico',
      href: 'mailto:manuelrivas.1023@gmail.com',
      fill: false,
      iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/manuel-rivas',
      fill: true,
      iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'
    }
  ];
}
