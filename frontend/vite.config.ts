import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base is set via VERCEL_GIT_URL or defaults to root for Vercel deployment
  base: process.env.VERCEL ? '/' : '/qullamaggie_scanner/',
})
