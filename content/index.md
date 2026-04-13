---
title: ""
---

<style>
  /* Landing page */
  .landing {
    max-width: 62rem;
    margin: 0 auto;
  }

  .landing-hero {
    margin: 0 0 1.5rem 0;
  }

  .landing-title {
    font-size: 2.25rem;
    line-height: 1.1;
    margin: 0;
    color: var(--dark);
    letter-spacing: -0.02em;
  }

  .landing-subtitle {
    margin: 0.5rem 0 0 0;
    color: var(--darkgray);
    font-size: 1.1rem;
  }

  .landing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0 0 0;
  }

  .tile {
    display: block;
    text-decoration: none;
    border: 1px solid var(--lightgray);
    border-radius: 0.75rem;
    padding: 1.75rem 1.5rem;
    background: var(--light);
    color: var(--dark);
    transition: border-color 0.1s ease, transform 0.1s ease;
  }

  .tile:hover {
    border-color: var(--gray);
    transform: translateY(-1px);
  }

  .tile-kicker {
    color: var(--gray);
    font-size: 0.9rem;
    margin: 0 0 0.4rem 0;
    display: block;
  }

  .tile-title {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--dark);
    display: block;
  }

  .tile-meta {
    margin: 0.5rem 0 0 0;
    color: var(--darkgray);
    font-size: 0.95rem;
    display: block;
  }

  .landing-stats {
    margin: 1rem 0 0 0;
    color: var(--gray);
    font-size: 0.95rem;
  }

  .landing-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 1.25rem 0 0 0;
  }

  .meta-tile {
    display: block;
    text-decoration: none;
    border: 1px solid var(--lightgray);
    border-radius: 0.75rem;
    padding: 1.1rem 1.25rem;
    background: transparent;
    color: var(--dark);
    transition: border-color 0.1s ease;
  }

  .meta-tile:hover {
    border-color: var(--gray);
  }

  .meta-title {
    margin: 0 0 0.2rem 0;
    font-size: 1.05rem;
    color: var(--dark);
    display: block;
  }

  .meta-subtitle {
    margin: 0.25rem 0 0 0;
    color: var(--gray);
    font-size: 0.9rem;
    display: block;
  }

  @media (max-width: 50rem) {
    .landing-grid {
      grid-template-columns: 1fr;
    }
    .landing-meta {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="landing">
  <div class="landing-hero">
    <div class="landing-title" role="heading" aria-level="1">21wiki</div>
    <div class="landing-subtitle">A free, open Bitcoin encyclopedia by 21ideas</div>
  </div>

  <div class="landing-grid" role="navigation" aria-label="Choose language">
    <a class="tile" href="/en">
      <span class="tile-kicker">Language</span>
      <span class="tile-title">English</span>
      <span class="tile-meta">Browse the encyclopedia in English</span>
    </a>
    <a class="tile" href="/ru">
      <span class="tile-kicker">Язык</span>
      <span class="tile-title">Русский</span>
      <span class="tile-meta">Читать энциклопедию на русском</span>
    </a>
  </div>

  <div class="landing-stats">76 pages · 2 languages · built from 21ideas.org source material</div>

  <div class="landing-meta" role="navigation" aria-label="Site links">
    <a class="meta-tile" href="/en/contribute">
      <span class="meta-title">Contribute</span>
      <span class="meta-subtitle">Fix issues, add pages, improve translations</span>
    </a>
    <a class="meta-tile" href="/en/support">
      <span class="meta-title">Support</span>
      <span class="meta-subtitle">Help keep 21wiki free and open</span>
    </a>
  </div>
</div>
