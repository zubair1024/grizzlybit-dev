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

// WHACKY STUFF THEY PUT IN FRONT OF RESPONSE
const JSON_HIJACKING_PREFIX = '])}while(1);</x>';

async function getMediumStats() {
  const response = await axios.get(
    'https://medium.com/@zubair1024?format=json',
  );

  const responseData = JSON.parse(
    response.data.replace(JSON_HIJACKING_PREFIX, ''),
  );
  const userId = responseData?.payload?.user?.userId;
  if (userId) {
    const followersCount = responseData?.payload?.references?.SocialStats?.[
      userId
    ]?.usersFollowedByCount as number;
    const numberOfPostsPublished = responseData?.payload?.userMeta
      ?.numberOfPostsPublished as number;
    return { followersCount, numberOfPostsPublished };
  }
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
  let result = {};

  const medium = await getMediumStats();
  if (medium) {
    result = { ...result, medium };
  }

  const github = await getGithubStats();
  if (github) {
    result = { ...result, github };
  }

  const stackOverflow = await getStackOverflowStats();
  if (stackOverflow) {
    result = { ...result, stackOverflow };
  }

  return res.status(200).json(result);
}
