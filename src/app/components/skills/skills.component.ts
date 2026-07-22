import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Habilidades <span class="text-blue-500">Técnicas</span>
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-400 font-mono">
            Stack tecnológico especializado en desarrollo Backend, Frontend y QA
          </p>
        </div>

        <!-- Skills Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (category of skillCategories; track category.title) {
            <div class="bg-white dark:bg-gray-800/90 rounded-2xl p-7 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all group flex flex-col justify-between">
              <div>
                <!-- Header Icon & Title -->
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {{ category.icon }}
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {{ category.title }}
                    </h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ category.description }}
                    </p>
                  </div>
                </div>

                <!-- Skill Badges -->
                <div class="flex flex-wrap gap-2.5">
                  @for (skill of category.skills; track skill) {
                    <span class="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-gray-100 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-600/50 hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30 transition-all cursor-default">
                      {{ skill }}
                    </span>
                  }
                </div>
              </div>

              <!-- Card Accent Bar -->
              <div class="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Dominio técnico</span>
                <span class="text-blue-500 font-semibold">{{ category.skills.length }} tecnologías</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  public skillCategories: SkillCategory[] = [
    {
      title: 'Backend .NET',
      description: 'Arquitectura de servidores y APIs REST',
      icon: '⚙️',
      skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'LINQ', 'REST API', 'SQL Server']
    },
    {
      title: 'Frontend Web',
      description: 'Interfaces modernas y reactivas',
      icon: '🌐',
      skills: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      title: 'QA & Testing',
      description: 'Aseguramiento de calidad y validación',
      icon: '🧪',
      skills: ['Postman', 'API Testing', 'Testing Funcional', 'Casos de Prueba', 'Selenium']
    }
  ];
}
