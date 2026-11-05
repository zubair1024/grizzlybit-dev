import { companies } from 'data/companies';
import Image from 'next/image';
import { Reveal, Section } from './Section';

const Companies = () => (
  <Section
    id="companies"
    title="Companies I've built software with"
    intro="Government, logistics, IoT and home services teams, including Dubai Police, Dubai Municipality, Haifa Logistics and Roamworks."
    compact
  >
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-6">
      {companies.map((company, i) => (
        <li key={company.name}>
          <Reveal delay={Math.min(i * 0.025, 0.3)} className="h-full">
            <div className="flex h-full flex-col items-center justify-between gap-2 border-2 border-border bg-card p-3 text-card-foreground md:gap-3 md:p-4 shadow-sm">
              <div className="flex h-10 w-full items-center md:h-12 justify-center">
                <Image
                  src={company.img}
                  width={160}
                  height={56}
                  alt={`${company.name} logo`}
                  className="h-auto max-h-10 w-auto md:max-h-12 max-w-full object-contain brightness-0 dark:invert"
                />
              </div>
              <span className="text-center text-xs leading-tight font-bold md:text-sm">
                {company.name}
              </span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Companies;
