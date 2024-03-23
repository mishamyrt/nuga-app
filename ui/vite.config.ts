import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
