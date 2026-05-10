// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  medium?: {
    followersCount: number;
    numberOfPostsPublished: number;
  };
  github?: {
    followers: number;
    public_repos: number;
    public_gists: number;
  };
  stackOverflow?: {
    reputation: number;
    up_vote_count: number;
  };
};

async function getMediumStats() {
  // Medium removed public follower counts and Cloudflare blocks the JSON
  // endpoint, so fall back to counting items in the public RSS feed.
  const response = await axios.get('https://medium.com/feed/@zubair1024', {
    responseType: 'text',
  });
  const xml = response.data as string;
  const numberOfPostsPublished = (xml.match(/<item>/g) || []).length;
  return { followersCount: 0, numberOfPostsPublished };
}

async function getGithubStats() {
  const responseData = await axios(`https://api.github.com/users/zubair1024`);
  const { followers, public_repos, public_gists } = responseData.data;
  return { followers, public_repos, public_gists };
}

async function getStackOverflowStats() {
  const responseData = await axios(
    `https://api.stackexchange.com/2.3/users/3779309?order=desc&sort=reputation&site=stackoverflow&filter=!VQMBkYomhDwpfkehRxP9jWc*8.oHon`,
  );
  const { reputation, up_vote_count } = responseData.data?.items[0];
  return { reputation, up_vote_count };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const settle = async <T>(fn: () => Promise<T>, label: string) => {
    try {
      return await fn();
    } catch (err) {
      console.error(`statistics: ${label} failed`, err);
      return undefined;
    }
  };

  const [medium, github, stackOverflow] = await Promise.all([
    settle(getMediumStats, 'medium'),
    settle(getGithubStats, 'github'),
    settle(getStackOverflowStats, 'stackOverflow'),
  ]);

  const result: Data = {};
  if (medium) result.medium = medium;
  if (github) result.github = github;
  if (stackOverflow) result.stackOverflow = stackOverflow;

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json(result);
}
