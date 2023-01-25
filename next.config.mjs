import mdx from '@next/mdx';
import rehypePrism from 'rehype-prism-plus';
import smartypants from 'remark-smartypants';

const withMDX = mdx({
  options: {
    remarkPlugins: [smartypants],
    rehypePlugins: [rehypePrism],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
