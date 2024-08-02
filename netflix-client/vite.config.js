import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      },
    },
  },
  define: {
    "process.env.CLIENT_URL": JSON.stringify(process.env.CLIENT_URL),
  },
});
