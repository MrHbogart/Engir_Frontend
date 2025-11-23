# Engir Frontend

A Vue 3 + Vite single-page app that consumes the Engir Backend API. It lists classrooms, displays session info, and lets learners join classes via invite codes while hosts can schedule and manage sessions.

## Tech stack
- [Vue 3](https://vuejs.org/) with `<script setup>`, `<style scoped>`, and Tailwind utility classes
- [Pinia](https://pinia.vuejs.org/) for lightweight state management
- [Vue Router](https://router.vuejs.org/) for view-level routing
- [Axios](https://axios-http.com/) for API calls
- [Vite](https://vitejs.dev/) dev/build tooling

## Getting started
```bash
cd Engir_Frontend
npm install
npm run dev
```
Navigate to http://localhost:5173 and ensure the backend runs at http://127.0.0.1:8000 (or set `VITE_API_BASE_URL`).

Build for production:
```bash
npm run build
npm run preview
```

## Environment variables
Create `.env.local` for overrides.
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Directory layout
```
src/
  api/           Axios client + auth/dashboard helpers
  components/    Reusable UI building blocks (e.g., ClassCard)
  router/        Route config using the @ alias
  state/         Pinia stores (auth, dashboards, classrooms)
  views/         Landing, Login, Explore, TeacherDashboard, StudentDashboard
  styles.css     Tailwind entry + base tokens
public/          Favicons and responsive imagery
dist/            Build output
```

The SPA now exposes landing/login flows, a sessions explorer, and role-aware dashboards. Update the API helpers if backend routes change; the frontend expects the Engir backend described in the root repository.
