import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon-32.png',
        'favicon-48.png',
        'apple-touch-icon.png',
        'pwa-192.png',
        'pwa-512.png',
        'pwa-512-maskable.png',
        'assets/branding/bon-appetit-logo.png',
      ],
      manifest: {
        name: 'Bon Appetit',
        short_name: 'Bon Appetit',
        description:
          'Asistente personal para decidir qué comer según tu cocina, tiempo y preferencias.',
        theme_color: '#0f1410',
        background_color: '#0f1410',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        lang: 'es',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // JS/CSS/HTML + iconos/splash. Sin precache masivo de Pepper (~assets/pepper).
        globPatterns: [
          '**/*.{js,css,html,ico,svg,woff2}',
          'pwa-*.png',
          'favicon-*.png',
          'apple-touch-icon.png',
          'assets/branding/bon-appetit-logo.png',
        ],
        globIgnores: ['**/assets/pepper/**', '**/assets/branding/bon-appetit-app-icon.png'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
});
