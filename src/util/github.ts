import type { ContributionDay } from '@/components/ui/contribution-skyline';

export const GITHUB_USERNAME = 'zubair1024';

// ponytail: scrapes GitHub's public contributions fragment (no token needed).
// Breaks if GitHub changes the markup; switch to the GraphQL API with a token then.
export async function getGithubContributions(): Promise<
  ContributionDay[] | null
> {
  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    );
    if (!res.ok) return null;
    const html = await res.text();

    // <td ... data-date="2025-11-02" id="contribution-day-component-0-0" ...>
    const dates = new Map<string, string>();
    for (const [td] of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
      const date = /data-date="([^"]+)"/.exec(td)?.[1];
      const id = /id="([^"]+)"/.exec(td)?.[1];
      if (date && id) dates.set(id, date);
    }

    // <tool-tip for="contribution-day-component-0-0" ...>4 contributions on ...</tool-tip>
    const days: ContributionDay[] = [];
    for (const [, id, text] of html.matchAll(
      /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
    )) {
      const date = dates.get(id);
      if (!date) continue;
      days.push({ date, count: parseInt(text.replace(/,/g, ''), 10) || 0 });
    }
    return days.length ? days : null;
  } catch {
    return null;
  }
}
