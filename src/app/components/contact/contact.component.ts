import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-14">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Ponte en <span class="text-blue-500">Contacto</span>
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
            ¿Tienes alguna propuesta o vacante? Escríbeme directamente
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Info Sidebar -->
          <div class="md:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg">
            <div>
              <h3 class="text-2xl font-bold mb-4">Hablemos 👋</h3>
              <p class="text-blue-100 text-sm leading-relaxed mb-8">
                Estoy buscando activamente roles como **Junior .NET Developer**, **Backend Developer** o **QA Engineer**. ¡Respondo rápidamente!
              </p>

              <div class="space-y-4 text-sm font-medium">
                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-lg bg-white/10 backdrop-blur-md">📧</div>
                  <div>
                    <div class="text-xs text-blue-200">Email Directo</div>
                    <a href="mailto:manuel.rivas.dev@gmail.com" class="hover:underline font-mono text-xs">manuel.rivas.dev&#64;gmail.com</a>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-lg bg-white/10 backdrop-blur-md">📍</div>
                  <div>
                    <div class="text-xs text-blue-200">Ubicación</div>
                    <div class="text-xs">Santo Domingo, Rep. Dominicana</div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-lg bg-white/10 backdrop-blur-md">💻</div>
                  <div>
                    <div class="text-xs text-blue-200">Modalidad</div>
                    <div class="text-xs">Remoto / Presencial / Híbrido</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Badge -->
            <div class="pt-8 border-t border-white/20 text-xs text-blue-200 font-mono">
              Disponible para incorporación inmediata.
            </div>
          </div>

          <!-- Form Area -->
          <div class="md:col-span-7 bg-white dark:bg-gray-800/90 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/80 shadow-sm">
            @if (submittedSuccess()) {
              <div class="text-center py-12 animate-fade-in">
                <div class="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Mensaje Enviado!</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Gracias por comunicarte conmigo, Manuel Rivas te responderá a la brevedad.
                </p>
                <button
                  (click)="resetForm()"
                  class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors">
                  Enviar otro mensaje
                </button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5" data-netlify="true">
                <!-- Nombre -->
                <div>
                  <label for="name" class="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Tu Nombre *
                  </label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="Ej. Carlos Mendoza"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                  @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                    <span class="text-xs text-red-500 mt-1 block">El nombre es requerido (mínimo 2 caracteres).</span>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Tu Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="carlos@empresa.com"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                  @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                    <span class="text-xs text-red-500 mt-1 block">Introduce un correo electrónico válido.</span>
                  }
                </div>

                <!-- Mensaje -->
                <div>
                  <label for="message" class="block text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    formControlName="message"
                    placeholder="Escribe tu propuesta o consulta..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                  ></textarea>
                  @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                    <span class="text-xs text-red-500 mt-1 block">El mensaje no puede estar vacío (mínimo 10 caracteres).</span>
                  }
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  [disabled]="contactForm.invalid || isSubmitting()"
                  class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2">
                  @if (isSubmitting()) {
                    <svg class="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>Enviando mensaje...</span>
                  } @else {
                    <span>Enviar Mensaje</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  }
                </button>
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
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting.set(true);

    // Form submission processing logic
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
