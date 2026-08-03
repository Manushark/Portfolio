import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

interface NavLink {
  label: string;
  href: string;
  section: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: contents; }

    .navbar {
      transition:
        background-color 0.3s ease,
        backdrop-filter 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease,
        height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        padding-top 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        padding-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-link {
      position: relative;
      transition: color 0.15s ease;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1.5px;
      background: #3b82f6;
      border-radius: 100px;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    .mobile-link {
      transition:
        color 0.15s ease,
        background-color 0.15s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobile-link:active {
      transform: scale(0.98);
    }

    .logo-mark {
      transition:
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.3s ease;
    }

    .logo-mark:hover {
      transform: scale(1.08) rotate(-2deg) translateZ(0);
      box-shadow: 0 0 16px rgba(59, 130, 246, 0.4);
    }

    .theme-btn {
      transition:
        background-color 0.15s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .theme-btn:hover {
      transform: rotate(12deg) scale(1.1) translateZ(0);
    }

    .hamburger-line {
      display: block;
      width: 20px;
      height: 1.5px;
      background: currentColor;
      border-radius: 100px;
      transition:
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.2s ease,
        width 0.3s ease;
      transform-origin: center;
    }

    .mobile-menu {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobile-menu.open {
      max-height: 320px;
    }
  `],
  template: `
    <!-- Scroll Progress Bar -->
    <div
      class="scroll-progress-bar"
      [style.width]="scrollProgress() + '%'">
    </div>

    <header
      class="navbar fixed top-0 left-0 right-0 z-50 animate-slide-down"
      [class.scrolled]="isScrolled()"
      [ngClass]="{
        'bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border-b border-black/5 dark:border-white/6 shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.3)]': isScrolled(),
        'bg-transparent border-b border-transparent': !isScrolled()
      }">

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between"
             [ngClass]="isScrolled() ? 'h-14' : 'h-16'">

          <!-- Logo -->
          <a href="#hero" class="flex items-center gap-2.5 group" aria-label="Ir al inicio">
            <div class="logo-mark w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-blue-500/25">
              MR
            </div>
            <span class="font-bold text-base text-gray-900 dark:text-white tracking-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150">
              Manuel Rivas<span class="text-blue-500 font-mono">.dev</span>
            </span>
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-1" role="navigation" aria-label="Navegación principal">
            @for (link of navLinks; track link.section) {
              <a
                [href]="link.href"
                [class]="'nav-link px-3 py-1.5 text-sm font-medium rounded-lg ' +
                  (activeSection() === link.section
                    ? 'text-blue-600 dark:text-blue-400 active'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5')"
                [attr.aria-current]="activeSection() === link.section ? 'page' : null">
                {{ link.label }}
              </a>
            }
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Theme Toggle -->
            <button
              (click)="themeService.toggleTheme()"
              aria-label="Cambiar tema"
              class="theme-btn p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 border border-transparent hover:border-gray-200 dark:hover:border-white/10">
              @if (themeService.isDarkMode()) {
                <svg class="w-4.5 h-4.5 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              } @else {
                <svg class="w-4.5 h-4.5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              }
            </button>

            <!-- CTA — desktop only -->
            <a href="#contact"
               class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-btn-primary hover:shadow-btn-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Contacto
            </a>

            <!-- Mobile Hamburger -->
            <button
              (click)="toggleMobileMenu()"
              [attr.aria-expanded]="isMobileMenuOpen()"
              aria-label="Abrir menú"
              class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
              aria-controls="mobile-menu">
              <span class="hamburger-line"
                    [style.transform]="isMobileMenuOpen() ? 'translateY(5px) rotate(45deg)' : ''"></span>
              <span class="hamburger-line"
                    [style.opacity]="isMobileMenuOpen() ? '0' : '1'"
                    [style.width]="isMobileMenuOpen() ? '0' : '20px'"></span>
              <span class="hamburger-line"
                    [style.transform]="isMobileMenuOpen() ? 'translateY(-5px) rotate(-45deg)' : ''"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu"
           class="mobile-menu md:hidden bg-white/95 dark:bg-dark-surface/97 backdrop-blur-xl border-t border-black/5 dark:border-white/6"
           [class.open]="isMobileMenuOpen()">
        <nav class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Navegación móvil">
          @for (link of navLinks; track link.section; let i = $index) {
            <a
              [href]="link.href"
              (click)="isMobileMenuOpen.set(false)"
              class="mobile-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/6 hover:text-blue-600 dark:hover:text-blue-400"
              [style.animation-delay]="(i * 50) + 'ms'">
              <span class="w-1 h-1 rounded-full bg-blue-500 opacity-60"></span>
              {{ link.label }}
            </a>
          }
          <div class="mt-2 pt-2 border-t border-gray-100 dark:border-white/6">
            <a href="#contact"
               (click)="isMobileMenuOpen.set(false)"
               class="mobile-link flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Ir a Contacto
            </a>
          </div>
        </nav>
      </div>
    </header>
  `
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  public isMobileMenuOpen = signal<boolean>(false);
  public isScrolled = signal<boolean>(false);
  public scrollProgress = signal<number>(0);
  public activeSection = signal<string>('hero');

  public navLinks: NavLink[] = [
    { label: 'Sobre mí',    href: '#about',      section: 'about' },
    { label: 'Habilidades', href: '#skills',      section: 'skills' },
    { label: 'Proyectos',   href: '#projects',    section: 'projects' },
    { label: 'Experiencia', href: '#experience',  section: 'experience' },
  ];

  private scrollHandler!: () => void;
  private sectionObserver: IntersectionObserver | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      // Scroll progress + shrink
      this.scrollHandler = () => {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH > 0 ? (scrollY / docH) * 100 : 0;

        this.ngZone.run(() => {
          this.isScrolled.set(scrollY > 20);
          this.scrollProgress.set(Math.min(progress, 100));
        });
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });

      // Active section detection
      const sectionIds = ['hero', ...this.navLinks.map(l => l.section)];
      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.ngZone.run(() => {
                this.activeSection.set(entry.target.id);
              });
            }
          }
        },
        { threshold: 0.4 }
      );

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) this.sectionObserver.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.sectionObserver?.disconnect();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }
}
