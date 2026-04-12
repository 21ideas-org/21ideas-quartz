# 21wiki — Bitcoin Encyclopedia

A bilingual Bitcoin knowledge base built from [21ideas.org](https://21ideas.org) source material.
Available in English and Russian, published at [wiki.21ideas.org](https://wiki.21ideas.org).

[![Open in English](https://img.shields.io/badge/Open%20in%20English-%E2%86%92-blue?style=for-the-badge)](https://wiki.21ideas.org/en) [![Открыть на русском](https://img.shields.io/badge/%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D1%8C%20%D0%BD%D0%B0%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%BC-%E2%86%92-orange?style=for-the-badge)](https://wiki.21ideas.org/ru)
---

## What is 21wiki?

21wiki is a structured, navigable Bitcoin encyclopedia maintained by [Tony](https://njump.me/npub10awzknjg5r5lajnr53438ndcyjylgqsrnrtq5grs495v42qc6awsj45ys7) and the [21ideas](https://21ideas.org) project — a Russian-language Bitcoin education platform.

The wiki covers:
- **Core concepts** — money, proof of work, mining, scarcity, privacy, security, Lightning Network
- **Protocol** — UTXO, SegWit, Taproot, BIPs, difficulty adjustment, mempool
- **History** — Genesis Files, cypherpunk origins, the blocksize war, Bitcoin timeline
- **Practice** — self-custody, running a node, privacy tools, buying bitcoin
- **People** — Satoshi Nakamoto, Hal Finney, Nick Szabo, Adam Back, and others
- **Books** — summaries of key Bitcoin texts

Both language layers are independent syntheses from the same source material — not translations of each other.

## Content repository

Wiki content (markdown source files) lives in a separate repository:
[21ideas-org/21ideas-wiki](https://github.com/21ideas-org/21ideas-wiki)

This repository contains only the site engine and deployment configuration.

## Built with

- [Quartz v4](https://github.com/jackyzha0/quartz) — static site generator for Obsidian vaults
- GitHub Pages — hosting
- GitHub Actions — automated builds

## Running locally

Requires Node.js 22+.

```bash
git clone https://github.com/21ideas-org/21ideas-quartz.git
cd 21ideas-quartz

# Clone wiki content
git clone https://github.com/21ideas-org/21ideas-wiki.git ../21ideas-wiki

# Copy content into build tree
mkdir -p content/en content/ru
cp -r ../21ideas-wiki/wiki-en/. content/en/
cp -r ../21ideas-wiki/wiki-ru/. content/ru/

# Install and build
npm install
npx quartz build -d content/

# Serve locally
npx serve public -l 8080
```

Then open `http://localhost:8080`.

## Deploying

Pushes to `main` trigger an automatic build and deploy via GitHub Actions.

Manual trigger also available:
`Actions → Deploy 21wiki to GitHub Pages → Run workflow`

## Analytics

Visitor stats via [Umami](https://umami.is) (privacy-friendly, no cookies).

## License

MIT — see [LICENSE](LICENSE).

Built as part of the [21ideas](https://21ideas.org) Bitcoin education project.

## Support

⚡️ Found the wiki useful? [Zap Tony a coffee](https://zapmeacoffee.com/npub10awzknjg5r5lajnr53438ndcyjylgqsrnrtq5grs495v42qc6awsj45ys7)