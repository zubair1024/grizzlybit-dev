import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Manual: Medium killed public follower counts and Cloudflare blocks scraping.
const MEDIUM_FOLLOWERS = 58;
const MEDIUM_POSTS = 19;

// Last known values so the server HTML never shows zeros; refreshed on the client.
const SEED = {
  github: { followers: 29, public_repos: 172 },
  stackOverflow: { reputation: 853, badges: 32 },
};

const Statistics = () => {
  const [stats, setStats] = useState(SEED);

  useEffect(() => {
    axios
      .get('/api/statistics')
      .then((res) => {
        setStats((prev) => ({
          github: { ...prev.github, ...(res.data?.github ?? {}) },
          stackOverflow: {
            ...prev.stackOverflow,
            ...(res.data?.stackOverflow ?? {}),
          },
        }));
      })
      .catch((err) => {
        console.error('failed to load statistics', err);
      });
  }, []);

  const items = [
    {
      icon: '/statistics/medium.svg',
      label: 'Medium',
      title: 'Medium followers',
      value: MEDIUM_FOLLOWERS,
      desc: `${MEDIUM_POSTS} articles published`,
    },
    {
      icon: '/statistics/github.svg',
      label: 'GitHub',
      title: 'GitHub followers',
      value: stats.github.followers,
      desc: `${stats.github.public_repos} public repositories`,
    },
    {
      icon: '/statistics/stack-overflow-new.svg',
      label: 'Stack Overflow',
      title: 'Stack Overflow reputation',
      value: stats.stackOverflow.reputation,
      desc: `${stats.stackOverflow.badges} badges earned`,
    },
    {
      icon: '/statistics/figma.svg',
      label: 'Figma Community',
      title: 'Figma file copies',
      value: '1,049',
      desc: '17 community likes',
    },
  ];

  return (
    <div className="mx-auto my-10 w-full max-w-6xl px-4 md:px-6">
      <dl className="hero-stats grid grid-cols-1 gap-y-2 rounded-md border border-border px-2 py-2 shadow-sm sm:grid-cols-2 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="hero-stat">
            <dt className="hero-stat-title">{i.title}</dt>
            <dd className="hero-stat-value">{i.value}</dd>
            <dd className="hero-stat-desc">{i.desc}</dd>
            <dd className="hero-stat-figure">
              <Image
                src={i.icon}
                height="40"
                width="40"
                alt={`${i.label} logo`}
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Statistics;
