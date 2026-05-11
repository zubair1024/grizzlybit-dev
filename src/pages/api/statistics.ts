// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
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

async function getGithubStats() {
  const responseData = await axios(`https://api.github.com/users/zubair1024`);
  const { followers, public_repos, public_gists } = responseData.data;
  return { followers, public_repos, public_gists };
}

async function getStackOverflowStats() {
  const responseData = await axios(
    `https://api.stackexchange.com/2.3/users/3779309?site=stackoverflow`,
  );
  const user = responseData.data?.items?.[0] ?? {};
  return {
    reputation: user.reputation ?? 0,
    up_vote_count: user.up_vote_count ?? 0,
  };
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

  const [github, stackOverflow] = await Promise.all([
    settle(getGithubStats, 'github'),
    settle(getStackOverflowStats, 'stackOverflow'),
  ]);

  const result: Data = {};
  if (github) result.github = github;
  if (stackOverflow) result.stackOverflow = stackOverflow;

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json(result);
}
