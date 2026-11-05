import { companies } from 'data/companies';
import Image from 'next/image';
import { Reveal, Section } from './Section';

const Companies = () => (
  <Section
    id="companies"
    eyebrow="Experience"
    title="Companies I've built software with"
    intro="Government, logistics, IoT and home services teams, including Dubai Police, Dubai Municipality, Haifa Logistics and Roamworks."
  >
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {companies.map((company, i) => (
        <li key={company.name}>
          <Reveal delay={Math.min(i * 0.025, 0.3)} className="h-full">
            <div className="flex h-full flex-col items-center justify-between gap-4 border-2 border-border bg-card p-5 text-card-foreground shadow-sm">
              <div className="flex h-14 w-full items-center justify-center">
                <Image
                  src={company.img}
                  width={160}
                  height={56}
                  alt={`${company.name} logo`}
                  className="h-auto max-h-14 w-auto max-w-full object-contain brightness-0 dark:invert"
                />
              </div>
              <span className="text-center text-sm font-bold">
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
