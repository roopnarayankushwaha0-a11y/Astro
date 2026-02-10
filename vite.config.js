import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'icons/*.png',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'AI Palm Reader – Tarot & Astrology Guidance',
        short_name: 'Palm Reader',
        description: 'Discover your destiny through AI-powered palm reading, tarot cards, and personalized astrology guidance.',
        theme_color: '#1a1a2e',
        background_color: '#0f0f1a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        dir: 'ltr',
        lang: 'en',
        categories: ['lifestyle', 'entertainment', 'personalization'],
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/home.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Home Screen'
          },
          {
            src: '/screenshots/palm-scan.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Palm Scan'
          }
        ],
        shortcuts: [
          {
            name: 'Palm Scan',
            short_name: 'Scan',
            description: 'Scan your palm for AI reading',
            url: '/?feature=palm-scan',
            icons: [{ src: '/icons/shortcut-palm.png', sizes: '96x96' }]
          },
          {
            name: 'Daily Guidance',
            short_name: 'Today',
            description: 'Get your daily spiritual guidance',
            url: '/?feature=daily-guidance',
            icons: [{ src: '/icons/shortcut-daily.png', sizes: '96x96' }]
          },
          {
            name: 'Tarot Reading',
            short_name: 'Tarot',
            description: 'Draw your tarot cards',
            url: '/?feature=tarot',
            icons: [{ src: '/icons/shortcut-tarot.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/openrouter\.ai\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@screens': '/src/screens',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@context': '/src/context',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@locales': '/src/locales'
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true
  },
  preview: {
    port: 4173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          utilities: ['date-fns', 'zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand']
  }
});
