import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true, //允许跨域
    proxy: {
      "/api1": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      },
      "/api": {
        target: "https://pic.starrylsi.top",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
