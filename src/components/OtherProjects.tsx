import { IPortfolioItem } from 'data/portfolio';
import { PortfolioCardItem } from './Portfolio';

const OtherProjects = (props: { data: IPortfolioItem[] }) => {
  const otherProjects = props.data;
  return (
    <div className="grid gap-1 grid-col-2 md:grid-cols-6">
      {otherProjects.map((i) => (
        <PortfolioCardItem key={i.title} data={i} textSize={'text-sm'} />
      ))}
    </div>
  );
};

export default OtherProjects;
