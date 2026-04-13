import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import type { JSX } from "preact"
import { h } from "preact"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "21wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
      websiteId: "83e4cbf2-6146-44a2-a2d5-75438a86705b",
      host: "https://cloud.umami.is",
    },
    locale: "en-US",
    baseUrl: "wiki.21ideas.org",
    ignorePatterns: [".obsidian", ".git", "private", "templates"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f0e8",        // parchment page bg (not pure white)
          lightgray: "#ddd5c8",    // borders, dividers
          gray: "#a09080",         // muted text, icons
          darkgray: "#3a3530",     // body text
          dark: "#1a1612",         // headings
          secondary: "#c94d0f",    // links, active nav — vibrant clay orange
          tertiary: "#a06030",     // wikilinks — slightly browner, visually distinct
          highlight: "rgba(201, 77, 15, 0.08)",
          textHighlight: "rgba(201, 77, 15, 0.20)",
        },
        darkMode: {
          light: "#16181e",        // slightly blue-grey, not warm-dark
          lightgray: "#22252e",    // borders
          gray: "#505870",         // muted text
          darkgray: "#9098a8",     // body text — cool grey
          dark: "#d8dce8",         // headings — slightly blue-white
          secondary: "#d4722a",    // accent — burnt sienna
          tertiary: "#b5622a",     // wikilinks — saddle, slightly browner, visually distinct
          highlight: "rgba(212, 114, 42, 0.08)",
          textHighlight: "rgba(212, 114, 42, 0.20)",
        },
      },
    },
  },

  plugins: {
    transformers: [
      (() => ({
        name: "JsonLd",
        externalResources: (ctx) => ({
          additionalHead: [
            (fileData: any): JSX.Element => {
              const slug = fileData?.slug as string | undefined

              if (!slug) return null as unknown as JSX.Element
              if (slug.startsWith("tags/")) return null as unknown as JSX.Element
              if (slug !== "index" && slug.endsWith("/index")) return null as unknown as JSX.Element
              if (slug === "404") return null as unknown as JSX.Element
              if (!ctx.cfg.configuration.baseUrl) return null as unknown as JSX.Element

              const inLanguage =
                fileData?.frontmatter?.language ?? (slug.startsWith("ru/") ? "ru" : "en")

              const url = `https://${ctx.cfg.configuration.baseUrl}/${slug === "index" ? "" : slug}`

              const jsonLd: Record<string, unknown> = {
                "@context": "https://schema.org",
                "@type": slug === "index" ? "WebSite" : "Article",
                name: fileData?.frontmatter?.title ?? slug,
                headline: fileData?.frontmatter?.title ?? slug,
                description: fileData?.description,
                url,
                inLanguage,
                publisher: {
                  "@type": "Organization",
                  name: "21ideas",
                  url: "https://21ideas.org",
                },
              }

              if (fileData?.frontmatter?.synthesized_date) {
                jsonLd.datePublished = fileData.frontmatter.synthesized_date
              }

              const modified =
                fileData?.frontmatter?.updated ?? fileData?.frontmatter?.synthesized_date
              if (modified) {
                jsonLd.dateModified = modified
              }

              if (Array.isArray(fileData?.frontmatter?.tags) && fileData.frontmatter.tags.length) {
                jsonLd.keywords = fileData.frontmatter.tags.join(", ")
              }

              return h("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) },
              })
            },
          ],
        }),
      }))(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config