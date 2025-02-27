import { defineConfig } from "vite"
import { vitePlugin as remix } from "@remix-run/dev"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
})
