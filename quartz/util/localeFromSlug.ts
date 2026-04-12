import { ValidLocale } from "../i18n"
import type { FullSlug, SimpleSlug } from "./path"

/** Use Russian UI when content lives under the `ru/` path prefix. */
export function localeFromSlug(
  slug: FullSlug | SimpleSlug | undefined,
  defaultLocale: ValidLocale,
): ValidLocale {
  if (!slug) return defaultLocale
  const s = slug as string
  if (s === "ru" || s.startsWith("ru/")) return "ru-RU"
  return defaultLocale
}
