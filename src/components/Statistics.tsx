import axios from 'axios';
import { SiFigma, SiGithub, SiMedium, SiStackoverflow } from 'react-icons/si';
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
      Icon: SiMedium,
      title: 'Medium followers',
      value: MEDIUM_FOLLOWERS,
      desc: `${MEDIUM_POSTS} articles published`,
    },
    {
      Icon: SiGithub,
      title: 'GitHub followers',
      value: stats.github.followers,
      desc: `${stats.github.public_repos} public repositories`,
    },
    {
      Icon: SiStackoverflow,
      title: 'Stack Overflow rep',
      value: stats.stackOverflow.reputation,
      desc: `${stats.stackOverflow.badges} badges earned`,
    },
    {
      Icon: SiFigma,
      title: 'Figma file copies',
      value: '1,049',
      desc: '17 community likes',
    },
  ];

  return (
    <div className="mx-auto my-10 w-full max-w-6xl px-4 md:px-6">
      <dl className="grid grid-cols-1 gap-y-2 border-2 border-border bg-card px-2 py-2 text-card-foreground shadow-md sm:grid-cols-2 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex flex-col gap-1 px-4 py-4 md:px-6">
            <dt className="flex items-center gap-3 text-muted-foreground">
              <span className="flex size-9 shrink-0 items-center justify-center border-2 border-border bg-secondary text-secondary-foreground">
                <i.Icon className="size-4" aria-hidden="true" />
              </span>
              {i.title}
            </dt>
            <dd className="mt-2 text-4xl font-bold tracking-tight">
              {i.value}
            </dd>
            <dd className="text-sm text-muted-foreground">{i.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Statistics;
