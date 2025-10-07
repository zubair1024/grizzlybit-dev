# Open Graph Images Directory

This directory contains custom Open Graph (OG) images for blog posts and pages on grizzlybit.dev.

## Why OG Images Matter

Open Graph images are the preview images that appear when your content is shared on social media platforms like Facebook, LinkedIn, Twitter, and in messaging apps like WhatsApp and Slack. High-quality, custom OG images can:

- Increase click-through rates by 2-3x
- Make your content stand out in social feeds
- Provide visual context for your content
- Improve brand recognition

## Image Specifications

### Recommended Dimensions

- **Primary Format**: 1200x630 pixels (1.91:1 aspect ratio)
  - This is the recommended size for Facebook, LinkedIn, and Twitter
  - Ensures images display properly across all platforms
  - Minimum: 600x315 pixels

- **Alternative Formats**:
  - Square: 1200x1200 pixels (for Instagram-style posts)
  - Wide: 1200x675 pixels (16:9 ratio for video thumbnails)

### File Format

- **PNG** (preferred) - Better quality, supports transparency
- **JPG** - Smaller file size, good for photos
- Maximum file size: 8MB (but keep under 1MB for faster loading)

### Color Guidelines

To match the Grizzlybit brand (DaisyUI Halloween theme):

- Primary Background: `#1f2937` (gray-800)
- Text Color: `#f9fafb` (gray-50)
- Accent: `#f97316` (orange-500)
- Secondary: `#10b981` (green-500)

## Naming Convention

Use the blog post slug as the filename:

```
og-images/
  post-slug-name.png
  another-blog-post.png
  my-tutorial-guide.png
```

## Creating OG Images

### Option 1: Design Tools

**Canva** (Recommended for beginners)
1. Create custom size: 1200x630px
2. Use Grizzlybit brand colors
3. Include:
   - Post title (large, readable)
   - Grizzlybit logo/branding
   - Optional: Author photo, relevant graphics
4. Export as PNG

**Figma** (For designers)
1. Create frame: 1200x630px
2. Design with brand guidelines
3. Export as PNG at 2x resolution

**Adobe Photoshop/Illustrator**
1. New document: 1200x630px, 72 DPI
2. Design with web-safe fonts
3. Export for web (PNG)

### Option 2: Automated Tools

**Cloudinary**
- Use transformation parameters to generate OG images dynamically
- Good for large blogs with many posts

**OG Image Service** (og-image.vercel.app)
- Generate images from templates
- Can be automated with build scripts

**Puppeteer/Playwright**
- Generate images programmatically from HTML templates
- Best for consistent, template-based designs

## Template Guidelines

Your OG images should include:

1. **Post Title** (Required)
   - Use large, bold, readable font (min 48px)
   - Keep to 2-3 lines maximum
   - Ensure good contrast with background

2. **Branding** (Required)
   - Grizzlybit logo
   - Website URL or handle

3. **Visual Elements** (Optional)
   - Related icons or illustrations
   - Author photo
   - Post category indicator
   - Date (if relevant)

4. **Composition Tips**
   - Keep important content away from edges (50px safe zone)
   - Use high contrast for readability
   - Test how it looks as a small thumbnail
   - Avoid small text (minimum 24px)

## Using Custom OG Images

### In Blog Posts

Update your blog post frontmatter:

```markdown
---
title: "My Awesome Post"
ogImage: "/og-images/my-awesome-post.png"
---
```

### In CustomHead Component

```tsx
<CustomHead
  title="My Awesome Post"
  description="An amazing tutorial"
  ogImage="/og-images/my-awesome-post.png"
  ogType="article"
/>
```

## Testing Your OG Images

Before publishing, test your OG images:

1. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/

2. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator

3. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/

4. **Social Share Preview**
   - https://socialsharepreview.com/

## Default Fallback

If no custom OG image is provided, the system falls back to:
- `/grizzlybit-logo-image.png` (1200x630px)
- Configured in `/data/defaultTags.ts`

## Batch Generation Script (Future Enhancement)

Consider creating a Node.js script to generate OG images automatically:

```javascript
// scripts/generate-og-images.js
// This could use Puppeteer to generate images from a template
// Run this during build process to create OG images for all posts
```

## Checklist for New OG Images

- [ ] Image is 1200x630 pixels
- [ ] File size is under 1MB
- [ ] Uses brand colors
- [ ] Title is readable at small sizes
- [ ] Includes Grizzlybit branding
- [ ] Tested on Facebook Debugger
- [ ] Tested on Twitter Card Validator
- [ ] File named with post slug
- [ ] Saved in `/public/og-images/`

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [LinkedIn Post Inspector Guide](https://www.linkedin.com/help/linkedin/answer/a521928)
- [Meta's Best Practices](https://developers.facebook.com/docs/sharing/webmasters/images/)

---

Last Updated: October 2025
