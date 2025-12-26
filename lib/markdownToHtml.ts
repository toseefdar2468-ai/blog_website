// lib/markdownToHtml.ts
import { marked } from "marked";

export async function markdownToHtml(markdown: string): Promise<string> {
  // Add a custom renderer for images so markdown images include
  // loading="lazy" and decoding="async" and always have alt text.
  const renderer = {
    image(href: string | null, title: string | null, text: string) {
      const src = href ?? "";
      const alt = text ?? "";
      const titleAttr = title ? ` title="${title}"` : "";
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async"${titleAttr} />`;
    },
  } as any;

  marked.use({ renderer });

  const html = marked.parse(markdown);
  if (typeof html === "string") return html;
  return await html;
}
