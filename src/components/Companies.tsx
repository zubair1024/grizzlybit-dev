import { companies } from 'data/companies';
import Image from 'next/image';
import { useCapabilities } from './fx/CapabilityProvider';
import { MCircle, MDiv, MLine } from './fx/m';
import ParticlesField, { constellationOptions } from './fx/Particles';

type Node = { x: number; y: number };

const nodes: Node[] = [
  { x: 12, y: 22 },
  { x: 28, y: 14 },
  { x: 45, y: 26 },
  { x: 62, y: 16 },
  { x: 80, y: 28 },
  { x: 18, y: 52 },
  { x: 36, y: 48 },
  { x: 54, y: 56 },
  { x: 72, y: 50 },
  { x: 24, y: 78 },
  { x: 50, y: 84 },
  { x: 76, y: 76 },
];

const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [2, 6],
  [4, 8],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [7, 10],
  [8, 11],
  [9, 10],
  [10, 11],
];

const CompanyStar = ({
  node,
  name,
  img,
  index,
}: {
  node: Node;
  name: string;
  img: string;
  index: number;
}) => {
  return (
    <MDiv
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 160 }}
    >
      <MDiv
        whileHover={{ scale: 1.12 }}
        className="group relative flex items-center justify-center"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(242,140,24,0.35), transparent 70%)',
          }}
        />
        <div className="relative flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full border border-white/10 bg-[#0d0f14]/80 p-3 backdrop-blur-sm shadow-xl">
          <Image
            src={img}
            height={120}
            width={120}
            alt={`${name} company logo`}
            className="object-contain"
            loading="lazy"
          />
        </div>
        <span className="absolute -bottom-6 font-mono text-[10px] tracking-wide text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {name}
        </span>
      </MDiv>
    </MDiv>
  );
};

const StaticGrid = () => (
  <div className="grid content-center justify-center grid-cols-2 gap-6 p-8 md:grid-cols-4 max-w-5xl mx-auto">
    {companies.map((i) => (
      <div key={i.name} className="flex items-center justify-center">
        <Image
          src={i.img}
          height={140}
          width={140}
          alt={`${i.name} company logo`}
          loading="lazy"
        />
      </div>
    ))}
  </div>
);

const Companies = () => {
  const { lowPower, isMobile } = useCapabilities();
  const minimal = lowPower || isMobile;

  return (
    <section className="relative py-16 flex flex-col justify-center overflow-hidden">
      <div className="text-center mb-10 px-4">
        <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
          Trust
        </p>
        <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider text-white uppercase">
          A constellation I&apos;ve worked with
        </h2>
      </div>

      {minimal ? (
        <StaticGrid />
      ) : (
        <div className="relative mx-auto w-full max-w-6xl h-[680px] px-4">
          <div className="absolute inset-0 pointer-events-none">
            <ParticlesField
              id="companies-particles"
              options={constellationOptions}
              className="absolute inset-0"
            />
          </div>

          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {edges.map(([a, b], i) => {
              const A = nodes[a];
              const B = nodes[b];
              return (
                <MLine
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="#f28c18"
                  strokeOpacity={0.25}
                  strokeWidth={0.15}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.05 }}
                />
              );
            })}
            <MCircle
              cx={5}
              cy={10}
              r={0.6}
              fill="#fff"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 1, 1, 0],
                cx: [5, 95],
                cy: [10, 90],
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, delay: 0.8, ease: 'easeOut' }}
            />
          </svg>

          <div className="absolute inset-0">
            {companies.slice(0, nodes.length).map((c, i) => (
              <CompanyStar
                key={c.name}
                node={nodes[i]}
                name={c.name}
                img={c.img}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Companies;
