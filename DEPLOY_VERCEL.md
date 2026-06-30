# Deploying to Vercel

This project is a **TanStack Start (SSR)** app, not a static SPA. It is built
with Nitro and, on Vercel, uses the `vercel` preset which emits the Vercel
Build Output API v3 directly to `.vercel/output/`. No `rewrites` to
`index.html` are needed (and would not work — there is no static HTML shell).

## About the `DEPLOYMENT_NOT_FOUND` error

`404: DEPLOYMENT_NOT_FOUND` is a **Vercel-side** error: the URL you opened
does not correspond to any deployment on your Vercel account. It is not
caused by anything in this repo. Fix it by either:

1. Importing this repo as a new Project in the Vercel dashboard, or
2. Running `vercel deploy` from a linked local checkout.

After a successful deploy, Vercel will give you a working `*.vercel.app` URL.

## Vercel Project Settings

| Setting             | Value                                |
| ------------------- | ------------------------------------ |
| Framework Preset    | Other (leave blank)                  |
| Install Command     | `npm install`                        |
| Build Command       | `DEPLOY_TARGET=vercel npm run build` |
| Output Directory    | `.vercel/output`                     |
| Node.js Version     | 20.x or 22.x                         |

These are also encoded in `vercel.json` at the repo root, so importing the
repo "as-is" should work without manual changes.

## Required Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables** for
the Production (and Preview, if used) environments:

- `DEPLOY_TARGET` = `vercel`   *(switches the Nitro preset; required)*

If/when you enable Lovable Cloud or other integrations, also add:

- `VITE_SUPABASE_URL`             *(public, prefixed with `VITE_`)*
- `VITE_SUPABASE_PUBLISHABLE_KEY` *(public)*
- `SUPABASE_URL`                  *(server)*
- `SUPABASE_PUBLISHABLE_KEY`      *(server)*
- `SUPABASE_SERVICE_ROLE_KEY`     *(server, secret)*
- `LOVABLE_API_KEY`               *(only if you use the Lovable AI Gateway)*

No secrets are hardcoded in this repo. All `process.env.*` reads happen
inside server function `.handler()` bodies or server route handlers, which is
the correct boundary.

## Routing / 404 on refresh

TanStack Start is SSR, so every URL is rendered by the server function on
each request — refresh-on-deep-link works natively. You do **not** need
SPA rewrites. The TanStack Router file-based routes under `src/routes/`
are the source of truth.

## Local verification

```bash
npm install
DEPLOY_TARGET=vercel npm run build   # produces .vercel/output/
```

## Deployment checklist

- [ ] Repo imported into Vercel
- [ ] `DEPLOY_TARGET=vercel` set in Project → Environment Variables
- [ ] Build Command set to `DEPLOY_TARGET=vercel npm run build` (or rely on `vercel.json`)
- [ ] Output Directory set to `.vercel/output` (or rely on `vercel.json`)
- [ ] First deploy succeeds; visit the assigned `*.vercel.app` URL
- [ ] Custom domain (optional) attached in Project → Domains
