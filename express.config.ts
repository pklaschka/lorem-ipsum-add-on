import type {
  ExpressConfig,
  PluginManifest,
} from "vite-express-plugin/lib/types";
import { version } from "./package.json";

export const manifest: PluginManifest = {
  testId: "de.zuriklaschka.express.lorem-ipsum", 
  name: "Lorem Ipsum", 
  version,
  manifestVersion: 2,
  requirements: {
    apps: [
      {
        name: "Express",
        apiVersion: 1,
      },
    ],
  },
  entryPoints: [
    {
      type: "panel",
      id: "panel1",
      main: "index.html",
      documentSandbox: "code.js",
      permissions: {
        sandbox: [
          // "allow-popups",
          // "allow-popups-to-escape-sandbox",
          // "allow-presentation",
          // "allow-downloads",
        ],
        // oauth: ["*"],
      },
    },
  ],
};

const extraPrefs = {
  copyZipAssets: ["public-zip/*"],
  servePort: 5241,
  hmrPort: 5174,
};

export const config: ExpressConfig = {
  manifest,
  version,
  ...extraPrefs,
};
