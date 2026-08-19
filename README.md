# Portfolio Profesional - Manuel Rivas

Sitio web portfolio moderno, limpio, rápido y de alto rendimiento diseñado como carta de presentación profesional para postulaciones a puestos de **Junior .NET Developer**, **Backend Developer** y **QA Engineer**.

🌐 <strong>Live Demo:</strong><br/> <a href="https://portfolio-gamma-ten-aai55z7ve8.vercel.app/" target="_blank">
Portfolio</a>

![Angular Version](https://img.shields.io/badge/Angular-19+-dd0031.svg?style=flat-square\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178c6.svg?style=flat-square\&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06b6d4.svg?style=flat-square\&logo=tailwindcss)
![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=flat-square\&logo=vercel)

---

## 🛠️ Tecnologías Principales

* **Framework**: Angular 19+ (Standalone Components Architecture)
* **Lenguaje**: TypeScript (Strict Mode, Interfaces tipadas sin `any`)
* **Estilos**: SCSS + Tailwind CSS + Glassmorphism Design System
* **Enrutamiento**: Angular Router (Lazy Loading & Smooth Anchor Scrolling)
* **Gestión de Estado**: Angular Signals & RxJS HTTP Client
* **Servicios Core**: `ThemeService` (Dark Mode), `ProjectService` (JSON), `SeoService` (SEO & Metatags)
* **Control de Versiones & CI/CD**: Git & Vercel Auto-Deployment desde GitHub

---

## 📁 Arquitectura del Proyecto

```text
src/app/
├── core/               # Servicios singleton, modelos TypeScript e interfaces globales
│   ├── models/         # Interfaces TypeScript (Project, ExperienceItem, SkillCategory)
│   └── services/       # ThemeService (Dark Mode), ProjectService (JSON), SeoService
├── shared/             # Componentes UI reutilizables
│   └── components/     # BadgeComponent, ButtonComponent, SectionHeaderComponent
├── components/         # Secciones modulares de la interfaz
│   ├── navbar/         # Navegación fija glassmorphism, switch de tema y menú móvil
│   ├── hero/           # Presentación principal, stack clave y botones de acción
│   ├── about/          # Perfil profesional, formación y pilares de trabajo
│   ├── skills/         # Tarjetas de competencias agrupadas (Backend, Frontend, QA)
│   ├── project-card/   # Tarjetas dinámicas con enlaces a GitHub/Demo y badges de stack
│   ├── projects/       # Grid dinámico con filtrado por categoría cargado desde JSON
│   ├── timeline/       # Línea de tiempo interactiva de experiencia laboral
│   ├── contact/        # Formulario reactivo validado con ReactiveFormsModule
│   └── footer/         # Pie de página y enlaces sociales (GitHub, LinkedIn, Email)
└── pages/              # Vistas principales de enrutamiento
    ├── home/           # Página de inicio principal ensamblada
    └── not-found/      # Vista 404 personalizada y responsiva
```

---

## ✨ Características Principales

* 🌙 **Dark Mode nativo con persistencia**: Switch de tema oscuro/claro impulsado por Angular Signals y sincronizado con `localStorage` y preferencias del sistema.
* ⚡ **Rendimiento optimizado & Carga perezosa**: Enrutamiento mediante Lazy Loading y generación de paquetes livianos.
* 🎨 **Diseño Moderno & Glassmorphism**: Estética limpia inspirada en GitHub, Linear y Vercel con micro-animaciones en hover y transiciones suaves.
* 📊 **Carga de Proyectos Dinámica**: Los proyectos se consumen desde `assets/data/projects.json` mediante un servicio inyectable `ProjectService`.
* 📱 **Diseño 100% Responsivo**: Adaptado perfectamente para pantallas de Móvil, Tablet y Desktop.
* 🔍 **SEO & Meta Tags**: Título y descripciones dinámicas para motores de búsqueda y vista previa en redes sociales (OpenGraph & Twitter Cards).

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ManuelRivasDev/portfolio.git
cd portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm start
# o
npx ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al realizar cambios.

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados y optimizados se generarán en el directorio `dist/portfolio`.

---

## ⚡ Despliegue en Vercel

El proyecto está configurado para desplegarse automáticamente en **Vercel** mediante integración con GitHub.

🔗 **Portfolio en producción:**
https://portfolio-gamma-ten-aai55z7ve.vercel.app/

---

## 📄 Licencia

Desarrollado por **Manuel Rivas** (2026). Todos los derechos reservados.
