import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "",
  clearScreen: false,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
    proxy: {
      // "/proxy": {
      //   target: "http://localhost:8000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/proxy/, "/api"),
      // },

      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      // http://localhost:8000/api -> http://localhost:3000/api
      // '/api': 'http://localhost:8000',
      // 'AMS-Frontend': {
      //   target: 'http://localhost:8000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/proxy/, ''),
      // }

      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure:false,
        // rewrite: (path) => path.replace(/^\/proxy/, ''),
      },    
    },
  },
})