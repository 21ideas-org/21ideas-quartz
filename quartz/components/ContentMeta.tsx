import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []
      const contentMeta = i18n(cfg.locale).components.contentMeta
      const dateReadingSep = contentMeta.dateReadingSeparator
      const hasDate = Boolean(fileData.dates && getDate(cfg, fileData))
      const showReading = options.showReadingTime

      if (hasDate) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }

      if (hasDate && showReading && dateReadingSep !== undefined) {
        segments.push(
          <span>
            {" "}
            {dateReadingSep}{" "}
          </span>,
        )
      }

      if (showReading) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      const useCssComma = options.showComma && dateReadingSep === undefined

      return (
        <p show-comma={useCssComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
