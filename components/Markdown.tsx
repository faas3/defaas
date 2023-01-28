import { gfm } from "../utils/markdown.ts"

export function Markdown({ markdown }: { markdown: string }) {
  const preMarkdown = `\`\`\`ts${markdown}\`\`\``
  const html = gfm.render(preMarkdown)
  return (
    <div
      class="markdown-body max-w-[90vw]"
      data-color-mode="auto"
      data-light-theme="light"
      data-dark-theme="dark"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
