import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves project sites from /<repo-name>/. Override with the
// VITE_BASE env var when deploying to a custom domain or a user-root site.
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE ?? (command === 'build' ? '/BlazesWorld/' : '/'),
}))
