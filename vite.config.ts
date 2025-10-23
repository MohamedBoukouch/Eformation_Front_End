import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
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