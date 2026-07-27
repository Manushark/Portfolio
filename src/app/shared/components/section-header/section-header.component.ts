import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-14">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
        {{ titlePrefix }} <span class="text-blue-500">{{ titleHighlight }}</span> {{ titleSuffix }}
      </h2>
      @if (subtitle) {
        <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
          {{ subtitle }}
        </p>
      }
    </div>
  `
})
export class SectionHeaderComponent {
  @Input() titlePrefix: string = '';
  @Input({ required: true }) titleHighlight: string = '';
  @Input() titleSuffix: string = '';
  @Input() subtitle?: string;
}
