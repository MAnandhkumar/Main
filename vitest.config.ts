import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./jest.setup.tsx'],
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/components/ui/**',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        'src/proxy.ts',
        'src/app/globals.css',
        'next.config.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 89,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
