import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Using PostCSS tailwindcss plugin via postcss.config.js instead of the Vite-specific plugin
  ],
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "#F0CF29",   
  //       secondary: "#FACC15", 
  //       accent: "#06B6D4",    
  //       dark: "#0F172A",     
  //       light: "#F9FAFB",    
  //     },
  //   },
  // },
})