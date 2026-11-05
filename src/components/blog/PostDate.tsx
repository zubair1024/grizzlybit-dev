// Hand-rolled (UTC) so server and browser ICU data can't disagree.
const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

export const formatPostDate = (date: string) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

export const PostDate = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => (
  <time dateTime={date} className={className}>
    {formatPostDate(date)}
  </time>
);

export default PostDate;
