import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import { useCapabilities } from './fx/CapabilityProvider';
import { MDiv } from './fx/m';

type ServicesData = {
  title: string;
  description: string;
  tools: string[];
  img: string;
};

const servicesData: ServicesData[] = [
  {
    title: 'Front-end',
    description:
      'I like to code things from scratch, and enjoy bringing ideas to life in the browser. Be it SEO optimized landing pages or complex web applications.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    img: '/services/web-development.svg',
  },
  {
    title: 'Back-end',
    description:
      'I like to work on complex ideas to create efficient and reliable solutions that power the functionality that changes peoples lives.',
    tools: ['Node.js', 'Express', 'Mongoose', 'Prisma'],
    img: '/services/coding.svg',
  },
  {
    title: 'Designer',
    description:
      "I like using Jakob's Principle to design visually stunning, user-friendly UX/UI projects. More of a hobbyist in this field.",
    tools: ['Figma', 'Tokens', 'Systems'],
    img: '/services/designer.svg',
  },
  {
    title: 'Mentor',
    description:
      'I love to impart my knowledge and see people achieve great potential of their own. The leadership positions I have taken up at my positions have given be pleasure to mentor multiple cross-functional teams.',
    tools: ['Coaching', 'Code Review', 'Architecture'],
    img: '/services/leadership.svg',
  },
];

const Card = ({ data, index }: { data: ServicesData; index: number }) => {
  const { coarsePointer, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);

  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const tiltEnabled = !coarsePointer && !reducedMotion;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tiltEnabled) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotY.set((px - 0.5) * 14);
    rotX.set(-(py - 0.5) * 14);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
    mx.set(50);
    my.set(50);
  };

  const foil = useMotionTemplate`radial-gradient(400px circle at ${mx}% ${my}%, rgba(242,140,24,0.22), transparent 60%)`;

  const fromLeft = index % 2 === 0;

  return (
    <MDiv
      initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <MDiv
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full"
      >
        <MDiv
          aria-hidden
          style={{ background: foil }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div
          aria-hidden
          className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'conic-gradient(from var(--angle,0deg), #f28c18, #a991f7, #37cdbe, #ff7847, #f28c18)',
            animation: 'borderSpin 6s linear infinite',
            filter: 'blur(16px)',
            zIndex: -1,
          }}
        />

        <div
          className="relative flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-[#0f1218]/85 p-7 text-white shadow-2xl backdrop-blur-sm"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs tracking-[0.25em] text-white/40">
              0{index + 1}
            </span>
            <MDiv
              whileHover={{ rotate: [-2, 8, 0], scale: 1.08 }}
              transition={{ duration: 0.6 }}
              className="relative"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-60 blur-xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(242,140,24,0.55), transparent 70%)',
                }}
              />
              <Image
                src={data.img}
                alt={`${data.title} service icon`}
                width={72}
                height={72}
                className="relative"
              />
            </MDiv>
          </div>

          <div style={{ transform: 'translateZ(20px)' }}>
            <h3 className="font-mono text-xl">{data.title}</h3>
            <div className="mt-2 h-px w-12 bg-gradient-to-r from-brand-glow to-transparent" />
          </div>

          <p
            className="font-mono text-sm leading-relaxed tracking-tight text-white/70"
            style={{ transform: 'translateZ(10px)' }}
          >
            {data.description}
          </p>

          <div
            className="mt-auto flex flex-wrap gap-1.5"
            style={{ transform: 'translateZ(15px)' }}
          >
            {data.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </MDiv>
    </MDiv>
  );
};

const Services = () => {
  return (
    <section className="relative px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
            Capabilities
          </p>
          <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider text-white uppercase">
            What I do
          </h2>
          <p className="mt-3 font-mono text-sm text-white/50">
            Four hats. One craft.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((s, i) => (
            <Card key={s.title} data={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
