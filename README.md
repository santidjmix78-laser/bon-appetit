# Bon Appetit

Asistente personal mobile-first para decidir qué comer según tu cocina, el tiempo disponible, lo que ya has comido y tus preferencias. Orientación FODMAP informativa (semáforo), sin diagnóstico ni prohibiciones.

## Stack

- React + Vite + TypeScript
- React Router
- Persistencia local (`localStorage`)
- PWA (`vite-plugin-pwa`)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`). En el móvil de la misma red puedes usar la IP local del PC.

## Build

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub (o conecta el proyecto).
2. En Vercel: **New Project** → importa el repo.
3. Framework preset: **Vite** (detectado automáticamente).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

No hace falta configurar variables de entorno en esta V1 (todo es local en el navegador).

## Notas V1

- Sin cuentas, backend ni IA externa.
- Los valores FODMAP de las recetas son orientativos / de demostración.
- Los datos viven en el dispositivo; borrar datos del sitio los elimina.
