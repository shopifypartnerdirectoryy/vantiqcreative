// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Build target is controlled by DEPLOY_TARGET env var:
//   - DEPLOY_TARGET=vercel  -> Nitro "vercel" preset (Vercel Build Output API v3)
//   - unset / anything else -> Lovable default (Cloudflare Workers module)
// On Vercel, set DEPLOY_TARGET=vercel in Project Settings → Environment Variables.
const isVercel =
  process.env.DEPLOY_TARGET === "vercel" ||
  process.env.VERCEL === "1" ||
  !!process.env.VERCEL_ENV;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  ...(isVercel
    ? {
        nitro: {
          preset: "vercel",
          output: {
            dir: ".vercel/output",
          },
        },
      }
    : {}),
});
