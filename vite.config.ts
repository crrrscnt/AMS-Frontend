import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/proxy": {
        target: "http://localhost:8000/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, "/"),
      },
    },
  },
})
