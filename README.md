# Portfolio Profesional - Manuel Rivas 🚀

Sitio web portfolio moderno, responsivo y de alto rendimiento diseñado como carta de presentación profesional para postulaciones a puestos de **Junior .NET Developer**, **Backend Developer** y **QA Engineer**.

![Angular Version](https://img.shields.io/badge/Angular-19+-dd0031.svg?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178c6.svg?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06b6d4.svg?style=flat-square&logo=tailwindcss)
![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=flat-square&logo=vercel)

---

## 🛠️ Tecnologías Principales

- **Framework**: Angular 19+ (Standalone Components Architecture)
- **Lenguaje**: TypeScript (Strict Mode)
- **Estilos**: Tailwind CSS + SCSS + Glassmorphic Design Token System
- **Enrutamiento**: Angular Router (Lazy Loading & Smooth Anchor Restoration)
- **Estado & Datos**: Angular Signals & RxJS HTTP Client
- **Control de Versiones & CI/CD**: Git & Vercel Auto-Deployment

---

## 📁 Arquitectura del Proyecto

```text
src/app/
├── core/               # Servicios singleton, modelos TypeScript e interfaces globales
│   ├── models/         # Interfaces (Project, ExperienceItem, SkillCategory)
│   └── services/       # ThemeService (Dark Mode), ProjectService (JSON), SeoService
├── shared/             # Componentes, directivas y pipes reutilizables
├── components/         # Secciones modulares de la interfaz
│   ├── navbar/         # Navegación fija con blur y switch de tema
│   ├── hero/           # Presentación principal, stack clave y descargas
│   ├── about/          # Perfil profesional, formación y pilares
│   ├── skills/         # Tarjetas de competencias (Backend, Frontend, QA)
│   ├── project-card/   # Tarjetas dinámicas con enlaces a GitHub/Demo
│   ├── projects/       # Grid dinámico con filtrado por categoría
│   ├── timeline/       # Línea de tiempo de experiencia laboral
│   ├── contact/        # Formulario reactivo validado
│   └── footer/         # Pie de página y enlaces sociales
└── pages/              # Vistas principales de enrutamiento
    ├── home/           # Página de inicio ensamblada
    └── not-found/      # Vista 404 personalizada
```

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
```
Abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar archivos.

### 4. Compilar para producción
```bash
npm run build
```
Los archivos optimizados para producción se generarán en el directorio `dist/portfolio`.

---

## ⚡ Despliegue en Vercel

El proyecto está 100% configurado para despliegue continuo (CI/CD) desde GitHub en **Vercel**:

1. Sube tu código a GitHub.
2. Ingresa a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New Project"** e importa el repositorio de tu portfolio.
4. Selecciona el Preset **Angular**.
5. Haz clic en **Deploy**.

> **Nota**: El archivo `vercel.json` incluido maneja automáticamente la reescritura de rutas para Angular Single Page Application (SPA).

---

## 📄 Licencia

Desarrollado por **Manuel Rivas** (2026). Todos los derechos reservados.
