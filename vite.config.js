import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host: '127.0.0.1',
    // port: '3000',
    proxy: {
      '/api' : {
        target: "https://backend-5gq2jv5m7e5d2cac-1300058219.ap-shanghai.app.tcloudbase.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  }
})
