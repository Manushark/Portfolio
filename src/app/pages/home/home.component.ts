import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    TimelineComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <app-navbar></app-navbar>

      <main class="flex-grow">
        <app-hero></app-hero>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-projects></app-projects>
        <app-timeline></app-timeline>
        <app-contact></app-contact>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData(
      'Manuel Rivas | Junior Software Developer',
      'Portfolio profesional de Manuel Rivas, desarrollador .NET y Angular con experiencia en QA Testing.'
    );
  }
}
