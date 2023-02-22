import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState({
    medium: {
      followersCount: 0,
      numberOfPostsPublished: 0,
    },
    github: {
      followers: 0,
      public_repos: 0,
      public_gists: 0,
    },
    stackOverflow: {
      reputation: 0,
      up_vote_count: 0,
    },
  });

  useEffect(() => {
    axios.get('/api/statistics').then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="px-2 rounded-md shadow grid grid-flow-row grid-cols-2 md:grid-cols-4 bg-[#181818]">
      <div className="stat b-0">
        <div className="stat-figure">
          <Image
            src="/statistics/medium.svg"
            height="40"
            width="40"
            alt="stack-overflow"
          ></Image>
        </div>
        <div className="stat-title">Medium Followers</div>
        <div className="stat-value">{stats.medium.followersCount}</div>
        <div className="stat-desc">
          ↗︎ Over <b>{stats.medium.numberOfPostsPublished}</b> Posts
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure">
          <Image
            src="/statistics/github.svg"
            height="40"
            width="40"
            alt="github"
          ></Image>
        </div>
        <div className="stat-title">Github Followers</div>
        <div className="stat-value">{stats.github.followers}</div>
        <div className="stat-desc">
          ↗︎ Over <b>{stats.github.public_repos}</b> Public Repos
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure">
          <Image
            src="/statistics/stack-overflow-new.svg"
            height="40"
            width="40"
            alt="stack-overflow"
          ></Image>
        </div>
        <div className="stat-title">StackOverflow Rep.</div>
        <div className="stat-value">{stats.stackOverflow.reputation}</div>
        <div className="stat-desc">
          ↗︎ Over <b>{stats.stackOverflow.up_vote_count}</b> Up-votes
        </div>
      </div>
      <div className="stat">
        <div className="stat-figure">
          <Image
            src="/statistics/figma.svg"
            height="40"
            width="40"
            alt="figma"
          ></Image>
        </div>
        <div className="stat-title">Figma Copies</div>
        <div className="stat-value">1,049</div>
        <div className="stat-desc">
          ↗︎ Over <b>17</b> Likes
        </div>
      </div>
    </div>
  );
};

export default Statistics;
