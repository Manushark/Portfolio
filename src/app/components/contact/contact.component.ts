import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent, ButtonComponent, ScrollRevealDirective],
  styles: [`
    :host { display: contents; }

    /* Floating label input */
    .input-group {
      position: relative;
    }

    .input-field {
      width: 100%;
      padding: 1rem 1rem 0.5rem;
      font-size: 0.875rem;
      background: transparent;
      border: 1.5px solid;
      border-radius: 0.75rem;
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease;
      will-change: border-color, box-shadow;
    }

    .input-label {
      position: absolute;
      left: 1rem;
      top: 0.875rem;
      font-size: 0.8125rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      pointer-events: none;
      transform-origin: top left;
      transition:
        transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
        font-size 0.25s ease,
        color 0.2s ease;
    }

    /* When focused or has value — float the label */
    .input-field:focus ~ .input-label,
    .input-field.has-value ~ .input-label {
      transform: translateY(-0.65rem) scale(0.78);
      font-size: 0.6875rem;
    }

    /* Focus state */
    .input-field:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
    }

    /* Error state */
    .input-field.invalid {
      border-color: #f43f5e;
    }

    .input-field.invalid:focus {
      box-shadow: 0 0 0 3px rgba(244,63,94,0.12);
    }

    /* Contact info card hover */
    .contact-info-item {
      transition:
        transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.2s ease;
    }

    .contact-info-item:hover {
      transform: translateX(4px) translateZ(0);
      background: rgba(255,255,255,0.12);
    }

    /* Success animation */
    .success-check {
      animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes successPop {
      0% { transform: scale(0.5) translateZ(0); opacity: 0; }
      70% { transform: scale(1.15) translateZ(0); }
      100% { transform: scale(1) translateZ(0); opacity: 1; }
    }
  `],
  template: `
    <section id="contact" class="py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          titlePrefix="Ponte en"
          titleHighlight="Contacto"
          subtitle="¿Tienes una propuesta o vacante? Escríbeme directamente">
        </app-section-header>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

          <!-- Info Sidebar -->
          <div appScrollReveal direction="left" [delay]="0"
               class="md:col-span-5 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 text-white flex flex-col justify-between shadow-glow-md">

            <!-- Subtle noise/texture overlay -->
            <div class="absolute inset-0 bg-noise opacity-20 pointer-events-none" aria-hidden="true"></div>
            <!-- Orb accent -->
            <div class="absolute -right-12 -top-12 w-40 h-40 bg-white/8 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>

            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-3">Hablemos</h3>
              <p class="text-blue-100 text-sm leading-relaxed mb-8">
                Estoy buscando activamente roles como
                <strong class="text-white">Junior .NET Developer</strong>,
                <strong class="text-white">Backend Developer</strong> o
                <strong class="text-white">QA Engineer</strong>.
                ¡Respondo rápidamente!
              </p>

              <div class="space-y-3">
                @for (info of contactInfos; track info.label) {
                  <a [href]="info.href" [target]="info.external ? '_blank' : '_self'"
                     [rel]="info.external ? 'noopener noreferrer' : ''"
                     class="contact-info-item flex items-center gap-3 p-3 rounded-xl cursor-pointer">
                    <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-white/12 flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="info.iconPath"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs text-blue-200 mb-0.5">{{ info.label }}</div>
                      <div class="text-xs font-mono text-white/90">{{ info.value }}</div>
                    </div>
                  </a>
                }
              </div>
            </div>

            <div class="relative z-10 pt-6 mt-4 border-t border-white/15">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="text-xs text-blue-200 font-mono">Disponible para incorporación inmediata</span>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div appScrollReveal direction="right" [delay]="80"
               class="md:col-span-7 bg-white dark:bg-dark-card rounded-2xl p-8 border border-black/6 dark:border-white/6 shadow-card dark:shadow-card-dark">

            @if (submittedSuccess()) {
              <div class="text-center py-12 animate-fade-in">
                <div class="success-check w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Mensaje Enviado!</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-7 max-w-xs mx-auto">
                  Gracias por contactarme. Te responderé a la brevedad posible.
                </p>
                <app-button (click)="resetForm()" variant="outline" size="sm">
                  Enviar otro mensaje
                </app-button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5" novalidate>

                <!-- Nombre -->
                <div class="input-group">
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="name"
                    autocomplete="name"
                    placeholder=" "
                    [class]="'input-field text-gray-900 dark:text-white border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/3 ' +
                      (isFieldInvalid('name') ? 'invalid' : '') +
                      (contactForm.get('name')?.value ? ' has-value' : '')"/>
                  <label for="contact-name"
                         class="input-label"
                         [class]="isFieldInvalid('name') ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'">
                    Tu Nombre *
                  </label>
                  @if (isFieldInvalid('name')) {
                    <span class="text-xs text-rose-500 mt-1.5 block font-mono" role="alert">
                      Nombre requerido (mínimo 2 caracteres).
                    </span>
                  }
                </div>

                <!-- Email -->
                <div class="input-group">
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    placeholder=" "
                    [class]="'input-field text-gray-900 dark:text-white border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/3 ' +
                      (isFieldInvalid('email') ? 'invalid' : '') +
                      (contactForm.get('email')?.value ? ' has-value' : '')"/>
                  <label for="contact-email"
                         class="input-label"
                         [class]="isFieldInvalid('email') ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'">
                    Tu Correo *
                  </label>
                  @if (isFieldInvalid('email')) {
                    <span class="text-xs text-rose-500 mt-1.5 block font-mono" role="alert">
                      Introduce un correo electrónico válido.
                    </span>
                  }
                </div>

                <!-- Mensaje -->
                <div class="input-group">
                  <textarea
                    id="contact-message"
                    rows="4"
                    formControlName="message"
                    placeholder=" "
                    [class]="'input-field text-gray-900 dark:text-white border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/3 resize-none ' +
                      (isFieldInvalid('message') ? 'invalid' : '') +
                      (contactForm.get('message')?.value ? ' has-value' : '')">
                  </textarea>
                  <label for="contact-message"
                         class="input-label"
                         [class]="isFieldInvalid('message') ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'">
                    Mensaje *
                  </label>
                  @if (isFieldInvalid('message')) {
                    <span class="text-xs text-rose-500 mt-1.5 block font-mono" role="alert">
                      El mensaje debe tener al menos 10 caracteres.
                    </span>
                  }
                </div>

                <!-- Submit -->
                <app-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  [disabled]="contactForm.invalid || isSubmitting()"
                  customClass="w-full">
                  @if (isSubmitting()) {
                    <svg class="animate-spin w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>Enviando...</span>
                  } @else {
                    <span>Enviar Mensaje</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  }
                </app-button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  public isSubmitting = signal<boolean>(false);
  public submittedSuccess = signal<boolean>(false);

  public contactForm = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public contactInfos = [
    {
      label: 'Correo Electrónico',
      value: 'manuelrivas.1023@gmail.com',
      href: 'mailto:manuelrivas.1023@gmail.com',
      external: false,
      iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      label: 'WhatsApp / Teléfono',
      value: '+1 809-698-4224',
      href: 'tel:+18096984224',
      external: false,
      iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    },
    {
      label: 'Ubicación',
      value: 'Distrito Nacional, R.D.',
      href: '#',
      external: false,
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      label: 'GitHub',
      value: 'github.com/Manushark',
      href: 'https://github.com/Manushark',
      external: true,
      iconPath: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'
    }
  ];

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.touched && control?.invalid);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submittedSuccess.set(true);
    }, 1200);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submittedSuccess.set(false);
  }
}
