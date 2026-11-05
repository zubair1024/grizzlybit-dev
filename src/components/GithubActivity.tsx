import ContributionSkyline, {
  type ContributionDay,
} from '@/components/ui/contribution-skyline';
import { GITHUB_USERNAME } from '@/util/github';
import { Reveal, Section } from './Section';

const GithubActivity = ({ data }: { data: ContributionDay[] }) => (
  <Section
    id="github"
    title="Shipping code, every week"
    intro={
      <>
        A year of commits, PRs and reviews on{' '}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline underline-offset-4"
        >
          GitHub (@{GITHUB_USERNAME})
        </a>
        .
      </>
    }
    compact
  >
    <Reveal>
      <ContributionSkyline
        data={data}
        className="rounded-none border-2 shadow-sm"
      />
    </Reveal>
  </Section>
);

export default GithubActivity;
