import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // require('tw-animate-css'),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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