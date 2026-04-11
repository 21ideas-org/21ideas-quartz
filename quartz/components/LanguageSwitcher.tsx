import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LanguageSwitcher: QuartzComponent = (props: QuartzComponentProps) => {
  const currentPath = props.fileData.slug || ""
  const isRussian = currentPath.startsWith("ru/") || currentPath.startsWith("/ru")

  return (
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
      <a 
        href="/en" 
        className={`lang-link ${!isRussian ? "active" : ""}`}
        style={{ textDecoration: "none", fontWeight: !isRussian ? "bold" : "normal" }}
      >
        EN
      </a>
      <span style={{ color: "#666" }}>|</span>
      <a 
        href="/ru" 
        className={`lang-link ${isRussian ? "active" : ""}`}
        style={{ textDecoration: "none", fontWeight: isRussian ? "bold" : "normal" }}
      >
        RU
      </a>
    </div>
  )
}

export default (() => LanguageSwitcher) satisfies QuartzComponentConstructor