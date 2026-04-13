import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/footer.scss"

const repoUrl = "https://github.com/21ideas-org/21ideas-wiki"
const starBadgeUrl =
  "https://img.shields.io/github/stars/21ideas-org/21ideas-wiki?style=social"

export default (() => {
  const Footer: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const isRu = fileData.slug?.startsWith("ru/") ?? false

    const contributeHref = isRu ? "/ru/contribute" : "/en/contribute"
    const contributeLabel = isRu ? "Принять участие" : "Contribute"

    const supportHref = isRu ? "/ru/support" : "/en/support"
    const supportLabel = isRu ? "Поддержать" : "Support"

    return (
      <footer class={classNames(displayClass, "site-footer")}>
        <ul class="site-footer-links">
          <li class="site-footer-badge">
            <a href={repoUrl} aria-label="GitHub repository stars">
              <img src={starBadgeUrl} alt="GitHub stars" loading="lazy" />
            </a>
          </li>
          <li>
            <a href={contributeHref}>{contributeLabel}</a>
          </li>
          <li>
            <a href={supportHref}>{supportLabel}</a>
          </li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
