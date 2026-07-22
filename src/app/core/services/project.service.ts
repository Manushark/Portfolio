import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private projectsUrl = 'assets/data/projects.json';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      catchError((error) => {
        console.error('Error al cargar los proyectos desde JSON:', error);
        return of([]);
      })
    );
  }
}
