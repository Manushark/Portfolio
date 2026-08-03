import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <div class="text-center mb-16">
      <!-- Eyebrow label -->
      <div appScrollReveal direction="fade" [delay]="0"
           class="inline-flex items-center gap-2 mb-5">
        <span class="w-5 h-px bg-brand-primary opacity-60"></span>
        <span class="text-xs font-mono font-semibold tracking-widest uppercase text-brand-primary opacity-80">
          {{ titlePrefix || titleHighlight }}
        </span>
        <span class="w-5 h-px bg-brand-primary opacity-60"></span>
      </div>

      <!-- Heading -->
      <h2 appScrollReveal direction="up" [delay]="80"
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tightest leading-tight">
        @if (titlePrefix) {
          <span class="text-gray-900 dark:text-white">{{ titlePrefix }} </span>
        }
        <span class="gradient-text">{{ titleHighlight }}</span>
        @if (titleSuffix) {
          <span class="text-gray-900 dark:text-white"> {{ titleSuffix }}</span>
        }
      </h2>

      <!-- Subtitle -->
      @if (subtitle) {
        <p appScrollReveal direction="up" [delay]="160"
           class="mt-4 text-base text-gray-500 dark:text-gray-400 font-mono max-w-xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      }

      <!-- Decorative line -->
      <div appScrollReveal direction="scale" [delay]="240"
           class="mt-6 flex items-center justify-center gap-2">
        <span class="w-8 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-60"></span>
        <span class="w-8 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50"></span>
      </div>
    </div>
  `
})
export class SectionHeaderComponent {
  @Input() titlePrefix: string = '';
  @Input({ required: true }) titleHighlight: string = '';
  @Input() titleSuffix: string = '';
  @Input() subtitle?: string;
}
