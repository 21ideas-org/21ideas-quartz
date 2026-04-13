import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LanguageSwitcher: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      class={classNames(displayClass, "lang-switcher")}
      aria-label="Switch language"
      data-lang-switcher
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.93 6h-2.649a15.716 15.716 0 0 0-1.378-3.566A8.02 8.02 0 0 1 18.929 8zM12 4.062c.74 1.055 1.676 2.53 2.198 3.938H9.802C10.324 6.592 11.26 5.117 12 4.062zM4.062 14a8.09 8.09 0 0 1 0-4h3.2a16.4 16.4 0 0 0-.124 2c0 .693.045 1.362.124 2H4.062zm.943 2h2.67c.322 1.287.823 2.508 1.482 3.622A8.022 8.022 0 0 1 5.005 16zm2.67-8H5.005a8.022 8.022 0 0 1 4.152-3.622A15.77 15.77 0 0 0 7.675 8zM12 19.938c-.74-1.055-1.676-2.53-2.198-3.938h4.396c-.522 1.408-1.458 2.883-2.198 3.938zM9.574 14a14.406 14.406 0 0 1-.136-2c0-.695.05-1.364.136-2h4.852c.086.636.136 1.305.136 2s-.05 1.364-.136 2H9.574zm4.902 5.622a15.716 15.716 0 0 0 1.378-3.622h2.649a8.02 8.02 0 0 1-4.027 3.622zM16.738 14c.079-.638.124-1.307.124-2s-.045-1.362-.124-2h3.2a8.09 8.09 0 0 1 0 4h-3.2z"
        />
      </svg>
    </button>
  )
}

LanguageSwitcher.afterDOMLoaded = `
(function() {
  function setupLanguageSwitcher() {
    const btn = document.querySelector('[data-lang-switcher]')
    if (!btn) return

    const slug = document.body.dataset.slug || window.location.pathname
    const isRu = slug.startsWith("/ru") || slug.startsWith("ru/") || slug === "ru"

    let sibling = null
    if (slug.startsWith("ru/")) sibling = slug.slice(3)
    else if (slug.startsWith("en/")) sibling = slug.slice(3)
    else if (slug.startsWith("/ru/")) sibling = slug.slice(4)
    else if (slug.startsWith("/en/")) sibling = slug.slice(4)

    const targetLang = isRu ? "en" : "ru"
    const targetUrl = sibling ? "/" + targetLang + "/" + sibling : "/" + targetLang

    btn.setAttribute("title", isRu ? "Read in English" : "Читать на русском")

    const onClick = function() {
      window.location.href = targetUrl
    }

    btn.addEventListener("click", onClick)
    window.addCleanup && window.addCleanup(() => btn.removeEventListener("click", onClick))
  }

  document.addEventListener("nav", setupLanguageSwitcher)
  setupLanguageSwitcher()
})()
`

LanguageSwitcher.css = `
.lang-switcher {
  cursor: pointer;
  padding: 0;
  position: relative;
  background: none;
  border: none;
  width: 20px;
  height: 32px;
  margin: 0;
  text-align: inherit;
  flex-shrink: 0;
}

.lang-switcher svg {
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  fill: var(--darkgray);
  transition: opacity 0.1s ease;
}

.lang-switcher:hover svg {
  fill: var(--dark);
}
`

export default (() => LanguageSwitcher) satisfies QuartzComponentConstructor