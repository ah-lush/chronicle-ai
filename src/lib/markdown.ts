import { marked } from "marked";
import DOMPurify from "dompurify";

/**
 * Convert markdown string to sanitized HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Configure marked options
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
  });

  // Convert markdown to HTML
  const rawHtml = marked.parse(markdown) as string;

  // Sanitize HTML to prevent XSS
  // Only run DOMPurify in browser environment
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "blockquote",
        "code",
        "pre",
        "a",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "hr",
        "div",
        "span",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id", "target", "rel"],
    });
  }

  // Server-side: return raw HTML (will be sanitized on client)
  return rawHtml;
}
