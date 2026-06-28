import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3000,
        host: '127.0.0.1',
        historyApiFallback: true,
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
              charts: ['recharts'],
              ai: ['@google/genai'],
            },
          },
        },
      },
    };
});
