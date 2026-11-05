import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import services from 'data/services';
import { Reveal, Section } from './Section';

const Services = () => (
  <Section
    id="services"
    title="Full-stack development, consulting and mentoring"
    intro="From the first wireframe to production APIs, I help teams design, build and ship web, mobile and IoT products."
  >
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map(({ title, description, tools, icon: Icon }, i) => (
        <li key={title}>
          <Reveal delay={i * 0.07} className="h-full">
            <Card className="h-full">
              <CardHeader className="gap-4">
                <span
                  aria-hidden
                  className="flex size-12 items-center justify-center border-2 border-border bg-accent text-accent-foreground shadow-sm"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="text-xl leading-snug font-bold">{title}</h3>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-5">
                <p className="text-base text-pretty text-muted-foreground">
                  {description}
                </p>
                <ul
                  aria-label={`${title} tools`}
                  className="mt-auto flex flex-wrap gap-2"
                >
                  {tools.map((tool) => (
                    <li key={tool}>
                      <Badge variant="outline">{tool}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;
