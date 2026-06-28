import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Meshwary/",
  plugins: [react()],
  server: {
    proxy: {
      "/chat": {
        target: "https://meshwary-chatbot-production.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
      "/chat/stream": {
        target: "https://meshwary-chatbot-production.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
