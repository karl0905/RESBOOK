import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePlugin as remix } from "@remix-run/dev";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],
});
