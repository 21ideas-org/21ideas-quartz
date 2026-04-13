
# 21ideas-quartz — Site Engine Handoff

This document captures the full setup, decisions, and current state of the
Quartz-based site engine for 21wiki. Read this before making any changes.

---

## Repo relationships

| Repo | Purpose |
|------|---------|
| `21ideas-org/21ideas-wiki` | Wiki content only — `wiki-en/`, `wiki-ru/`, `raw/`, tooling |
| `21ideas-org/21ideas-quartz` | Site engine only — Quartz fork, CI, deployment config |

These are **two separate repos**. The Quartz repo has no submodule pointing at
the wiki. The CI workflow clones the wiki repo at build time and copies content
into the build tree.

The Quartz repo is **not a fork** of `jackyzha0/quartz` (detached). Upstream
Quartz updates must be pulled manually when needed.

---

## Content pipeline (critical)

At build time, wiki content is copied into the Quartz `content/` tree:

wiki-en/ → content/en/ wiki-ru/ → content/ru/

`content/index.md` (language choice landing page) lives in the Quartz repo and
is **not** overwritten by the copy step.

**Why copy, not symlink:** Quartz uses `globby` with `gitignore: true`. Symlinks
are not followed, and `.gitignore` entries are respected. Both approaches
previously caused Quartz to find only 1 input file. The fix: use real `cp -r`
copies and keep `content/en/` and `content/ru/` out of `.gitignore` (they are
excluded via `.git/info/exclude` instead, which globby does not read).

**Do not add `content/en/` or `content/ru/` to `.gitignore`** — this will break
the build again. Use `.git/info/exclude` for local git ignore only.

---

## Local development setup

Requirements: Node.js 22+ (Quartz 4.5.2 requires `node>=22`, `npm>=10.9.2`).

```bash
git clone git@github.com:21ideas-org/21ideas-quartz.git
cd 21ideas-quartz

# Clone wiki content as sibling
git clone git@github.com:21ideas-org/21ideas-wiki.git ../21ideas-wiki

# Copy content into build tree (do this every time wiki content changes)
mkdir -p content/en content/ru
cp -r ../21ideas-wiki/wiki-en/. content/en/
cp -r ../21ideas-wiki/wiki-ru/. content/ru/

# Install dependencies
npm install

# Build
npx quartz build -d content/

# Serve locally
npx serve public -l 8080
````

When wiki content changes, re-run the `cp` commands and rebuild. There is no watch mode for cross-repo content.

---

## Repository structure

```
content/
  index.md          ← Language choice landing page (lives in this repo)
  en/               ← Copied from wiki-en/ at build time (not committed)
  ru/               ← Copied from wiki-ru/ at build time (not committed)
  .gitkeep          ← Keeps content/ tracked in git when en/ and ru/ are absent

.github/
  workflows/
    deploy.yml      ← Only active workflow — manual trigger, GitHub Pages deploy

quartz/
  components/
    LanguageSwitcher.tsx   ← Custom component — language toggle in header
  util/
    glob.ts         ← Quartz file globber (uses globby with gitignore: true)

quartz.config.ts    ← Site config — single ContentPage emitter, baseUrl, theme
quartz.layout.ts    ← Layout — LanguageSwitcher before PageTitle in header
```

---

## quartz.config.ts — key decisions

- **Single `Plugin.ContentPage()` emitter** — the original config had three emitters with `contentDir` and `slug` options that are not implemented in stock Quartz. These were removed. One emitter handles all content under `content/` (including `content/en/` and `content/ru/` subdirs).
- **`baseUrl: "wiki.21ideas.org"`** — set even before DNS is live; used for OG tags and canonical URLs.
- **No i18n plugin** — Quartz's i18n feature is for UI string translation, not bilingual content routing. Language routing is path-based (`/en/...`, `/ru/...`) handled naturally by the directory structure.
- **`ignorePatterns`:** `.obsidian`, `.git`, `private`, `templates` — standard.

---

## LanguageSwitcher component

Custom component at `quartz/components/LanguageSwitcher.tsx`. Placed before `PageTitle` in the header (`quartz.layout.ts`).

Detects current language by checking if `fileData.slug` starts with `ru/`. Links to `/en` and `/ru` (the index pages of each language tree).

**Known limitation:** on the root `/` page, the switcher has no language context so both links are unaffected — acceptable for a landing page.

**Deferred:** cross-language sibling page links (e.g. jumping from `/en/concepts/utxo` directly to `/ru/concepts/utxo`). Slugs are mirrored so this is straightforward to implement when needed.

---

## GitHub Actions deploy workflow

File: `.github/workflows/deploy.yml`

Trigger: **manual only** (`workflow_dispatch`) for now.

Steps:

1. Checkout `21ideas-quartz` (with `fetch-depth: 0` for git history dates)
2. Checkout `21ideas-wiki` into `wiki-content/`
3. `cp -r wiki-content/wiki-en/. content/en/` and same for `ru`
4. `npm ci`
5. `npx quartz build -d content/`
6. Upload `public/` as Pages artifact
7. Deploy to GitHub Pages

Node version: **22** (required by Quartz 4.5.2).

The upstream Quartz workflows (`ci.yaml`, `build-preview.yaml`, `deploy-preview.yaml`, `docker-build-push.yaml`) were **deleted** — they were gated to `jackyzha0/quartz` and would never run on this repo.

---

## GitHub Pages

- **Source:** GitHub Actions (not branch deploy)
- **Current URL:** `https://21ideas-org.github.io/21ideas-quartz`
- **Target URL:** `wiki.21ideas.org` (custom domain — not yet configured)

To add the custom domain when ready:

1. Add `CNAME` file to repo root containing `wiki.21ideas.org`
2. Add GitHub Pages DNS records at your DNS provider:
    
    ```
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
    ```
    
3. Set custom domain in `Settings → Pages → Custom domain`

---

## Known issues / deferred work

|Item|Status|Notes|
|---|---|---|
|Custom domain `wiki.21ideas.org`|✅ Done|DNS + CNAME configured|
|Cross-language sibling links|Deferred|Slugs are mirrored; easy to add|
| Auto-rebuild on wiki push | ✅ Done | Repository dispatch trigger configured |
|Enhanced landing page at `/`|✅ Done|`content/index.md` is minimal now|
|Umami analytics|✅ Done|`provider: "umami"` in config, analytics show in umami dashboard|
|Node.js 24 actions upgrade|Deferred|Required before September 2026|

---

## What must not change without understanding consequences

- **Do not add `content/en/` or `content/ru/` to `.gitignore`** — breaks the build (globby respects gitignore).
- **Do not restore the triple `ContentPage` emitters** — the `contentDir`/`slug` options are not implemented in stock Quartz.
- **Do not switch to symlinks for content** — Quartz glob does not follow them.
- **Node version must stay at 22+** — Quartz 4.5.2 will reject Node 20.
- **Quartz HTML-encodes attribute selectors** — page-scoped CSS must go in `quartz/styles/custom.scss` instead

Commit it:

```bash
git add QUARTZ.md
git commit -m "docs: add Quartz setup handoff document"
git push
```


### Build and run

```bash
npm run quartz -- build
npx serve public -l 8080
```