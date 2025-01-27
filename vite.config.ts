import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react"; 
import {
  expressPlugin,
  expressPluginInit,
  runAction,
} from "vite-express-plugin";

import mkcert from "vite-plugin-mkcert";

import { config } from "./express.config";

const action = process.env.ACTION;
const mode = process.env.MODE || "";

if (action) runAction(config, action);
expressPluginInit(mode);

export default defineConfig({
  define: {
    "process.env.HMR_PORT": JSON.stringify(config.hmrPort),
  },
  plugins: [
    react(), 
    //@ts-ignore
    expressPlugin(config, mode),
    mkcert(),
  ],
  base: "./",
  build: {
    outDir: ".tmp",
    emptyOutDir: false,
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        api: "modern",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  server: {
    port: config.hmrPort,
  },
});
