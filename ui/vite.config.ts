import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

const testExclude = [
  '**/node_modules/**',
  'src/vite-env.d.ts',
  'scripts/**/*',
  '**/*.{js,svelte}',
  '**/@x/*.ts',
  'eslint/*',
  'src/wailsjs/**/*',
  '**/api/*.ts',
  '**/*.types.ts',
  '**/index.ts',
  '**/.svelte-kit/**',
  '**/.pnpm/**'
]

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ...testExclude],
    include: ['src/**/__tests__/*.ts'],
    environment: 'happy-dom',
    coverage: {
      exclude: [...testExclude],
      enabled: true,
      provider: 'v8',
      reporter: ['html']
    }
  },
  resolve: {
    alias: {
      $features: resolve(__dirname, './src/features'),
      $shared: resolve(__dirname, './src/shared'),
      $entities: resolve(__dirname, './src/entities'),
      $widgets: resolve(__dirname, './src/widgets'),
      $pages: resolve(__dirname, './src/pages'),
      '$wails/runtime': resolve(__dirname, './src/wailsjs/runtime/runtime'),
      '$wails/go': resolve(__dirname, './src/wailsjs/go')
    }
  },
  plugins: [svelte()]
})
