/**
 * Calculate reading time from MDX content
 * @param content - The MDX content string
 * @returns Reading time in "X min read" format
 */
export function calculateReadingTime(content: string): string {
  // Remove MDX/Markdown syntax for accurate word count
  const text = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#+ /g, '') // Remove headings
    .replace(/[*_~`]/g, '') // Remove formatting characters
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();

  // Count words (split by whitespace)
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time (200 words per minute)
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return `${readingTimeMinutes} min read`;
}
