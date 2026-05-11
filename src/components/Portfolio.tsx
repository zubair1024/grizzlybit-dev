import portfolio, { IPortfolioItem } from 'data/portfolio';
import { useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useRef, useState } from 'react';
import { trackEvent } from '@/util/ga';
import { useCapabilities } from './fx/CapabilityProvider';
import { MDiv, MP } from './fx/m';

export const PortfolioCardItem = (props: {
  data: IPortfolioItem;
  textSize?: 'text-sm' | 'text-md';
}) => {
  const item = props.data;
  const textSize = props.textSize ?? 'text-md';
  return (
    <Link
      href={item.url}
      onClick={() =>
        trackEvent('portfolio_view', {
          project: item.title,
          url: item.url,
          location: 'card_item',
        })
      }
    >
      <div>
        <div className="relative mb-5 ml-5 group ">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src={item.img}
            alt={`${item.title} - ${item.desc}`}
            width={350}
            height={350}
            className="relative"
            loading="lazy"
          />
          <div className="absolute top-0 z-40 w-full h-full overflow-hidden opacity-0 hover:opacity-100 hover:bg-black">
            <div className="flex flex-col items-center justify-center h-full font-bold text-white">
              <p className={`${textSize} text-center`}>{item.title}</p>
              <p className={`max-w-xs font-light text-center ${textSize}`}>
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PortfolioCard = ({
  item,
  index,
}: {
  item: IPortfolioItem;
  index: number;
}) => {
  const { coarsePointer, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const interactive = !coarsePointer && !reducedMotion;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !interactive) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <MDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      className="relative aspect-[1/1.414]"
      style={{ perspective: 1200 }}
    >
      <Link
        href={item.url}
        className="block h-full"
        onClick={() =>
          trackEvent('portfolio_view', {
            project: item.title,
            url: item.url,
            position: index + 1,
            location: 'portfolio_grid',
          })
        }
      >
        <MDiv
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onMouseEnter={() => setHovered(true)}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: 'preserve-3d',
          }}
          className="group relative h-full w-full"
        >
          <div
            aria-hidden
            className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
            style={{
              background:
                'linear-gradient(120deg, #f28c18, #a991f7 40%, #37cdbe 80%)',
            }}
          />

          <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
            <Image
              src={item.img}
              alt={`${item.title} - ${item.desc}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div
              aria-hidden
              className="crt-scanlines absolute inset-0 opacity-25 mix-blend-overlay"
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
            />

            <div
              className="absolute inset-x-0 bottom-0 p-4"
              style={{ transform: 'translateZ(30px)' }}
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-brand-glow uppercase">
                Project / 0{index + 1}
              </p>
              <h3 className="mt-1 font-mono text-base md:text-lg text-white leading-tight">
                {item.title}
              </h3>
              <MP
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 6,
                  height: hovered ? 'auto' : 0,
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden font-mono text-[11px] text-white/70 max-w-md mt-1"
              >
                {item.desc}
              </MP>
            </div>
          </div>
        </MDiv>
      </Link>
    </MDiv>
  );
};

const Portfolio = () => {
  return (
    <section
      className="relative mx-auto my-12 max-w-7xl px-5 scroll-m-20"
      id="my-portfolio"
    >
      <div className="mb-10 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
          Selected work
        </p>
        <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider uppercase text-white">
          Some of my works
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {portfolio.map((item, i) => (
          <PortfolioCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
