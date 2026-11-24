import { defineConfig } from 'vite'

// Relative asset paths make this starter work on a GitHub Pages project URL.
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
  },
})
