import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

