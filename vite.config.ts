import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/minimax-m3-test/" : "/",
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset({ compilationMode: "infer" })] }),
  ],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    target: "es2022",
    cssTarget: "chrome120",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
