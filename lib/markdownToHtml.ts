// lib/markdownToHtml.ts
import { marked } from "marked";

export async function markdownToHtml(markdown: string): Promise<string> {
  // marked.parse can be sync or async — we wrap in async for compatibility
  const html = marked.parse(markdown);
  // Type guard because marked can sometimes return string | Promise<string>
  if (typeof html === "string") {
    return html;
  }
  return await html;
}
