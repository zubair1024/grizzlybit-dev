interface IProps {
  videoId: string;
  // Required: iframes need an accessible name
  title: string;
}

// SSR-safe, privacy-enhanced YouTube embed; the iframe loads only near the viewport.
const YoutubeEmbed = ({ videoId, title }: IProps) => (
  <div className="relative aspect-video w-full">
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
