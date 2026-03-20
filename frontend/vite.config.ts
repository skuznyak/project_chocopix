import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_URL ?? 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              query: ['@tanstack/react-query'],
              icons: ['lucide-react'],
              utils: ['axios', 'zustand', 'zod', 'clsx'],
            },
          },
        },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
