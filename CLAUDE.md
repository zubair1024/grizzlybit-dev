# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for Zubair Ahmed (grizzlybit.dev) built with Next.js 13, TypeScript, Tailwind CSS with DaisyUI, and MDX for blog content.

## Commands

### Development
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Type Checking
```bash
npx tsc --noEmit     # Run TypeScript compiler without emitting files
```

### Code Quality
The project uses Husky with lint-staged to automatically format code on commit:
- TypeScript files: Type check + ESLint + Prettier
- JavaScript files: ESLint + Prettier
- Markdown/JSON files: Prettier

## Architecture

### Pages Router Structure
- **Homepage (`src/pages/index.tsx`)**: Dynamically rendered (`ssr: false`) with multiple sections (Banner, Services, AboutMe, BlogSection, Toolbelt, Portfolio, Companies, Testimonials, Contact)
- **Blog Posts (`src/pages/blog/[slug].tsx`)**: Static generation using MDX files from `src/posts/`
- **Portfolio Pages (`src/pages/portfolio/*.tsx`)**: Individual static pages for each project
- **API Routes (`src/pages/api/`)**:
  - `/api/contact` - Contact form submission via AWS SES
  - `/api/statistics` - Dynamic statistics endpoint

### Content Management
- **Blog posts**: Written in MDX format in `src/posts/`, processed using `mdx-bundler` with gray-matter for frontmatter
- **Static data**: Stored in `data/` directory (badges, companies, portfolio items, testimonials, toolbelt, social links)
- **Post utilities (`src/util/posts.ts`)**: Functions for reading MDX files, extracting frontmatter, and bundling with rehype-prism-plus (syntax highlighting) and remark-gfm (GitHub Flavored Markdown)

### Key Components
- **Layout (`src/components/Layout.tsx`)**: Wraps all pages with Header/Footer and Framer Motion page transitions
- **Section Components**: Self-contained components for each homepage section (AboutMe, Banner, BlogSection, Companies, Contact, Portfolio, Services, Statistics, Testimonials, Toolbelt)
- **CustomHead**: SEO metadata management with next-seo

### Styling
- Tailwind CSS with custom config in `src/` directory
- DaisyUI component library with "halloween" theme
- Framer Motion for page transitions and animations
- Custom CSS modules for specific pages (Home.module.css, Portfolio.module.css)

### External Integrations
- **Analytics**: Google Analytics 4 (via ga-4-react) and Hotjar
- **Email**: AWS SES via nodemailer for contact form (`src/util/mailer.ts`)
- **SEO**: next-sitemap for automatic sitemap generation (postbuild script)

### Environment Variables
Required environment variables (see `example.env`):
- `NEXT_PUBLIC_GA_TRACKING_ID` - Google Analytics tracking ID
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` - AWS credentials for SES email service

### MDX Blog Post Structure
Blog posts require frontmatter with:
- `title`: Post title
- `publishedAt`: Publication date
- `description`: Meta description
- `summary`: Short summary
- `image`: Cover image path
- `showOnHome`: Boolean to display on homepage
