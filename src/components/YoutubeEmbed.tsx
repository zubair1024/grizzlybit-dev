import { cn } from '@/lib/utils';

interface IProps {
  videoId: string;
  // Required: iframes need an accessible name
  title: string;
  // 'portrait' for vertical YouTube Shorts, so they aren't letterboxed in 16:9
  aspect?: 'video' | 'portrait';
  className?: string;
}

// SSR-safe, privacy-enhanced YouTube embed; the iframe loads only near the viewport.
const YoutubeEmbed = ({
  videoId,
  title,
  aspect = 'video',
  className,
}: IProps) => (
  <div
    className={cn(
      'relative w-full',
      aspect === 'portrait' ? 'aspect-[9/16] max-w-[280px]' : 'aspect-video',
      className,
    )}
  >
    <iframe
      title={title}
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      loading="lazy"
      className="absolute inset-0 size-full border-0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);

export default YoutubeEmbed;
