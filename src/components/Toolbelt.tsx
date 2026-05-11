import toolBelt from 'data/toolbelt';
import { useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCapabilities } from './fx/CapabilityProvider';
import { MDiv } from './fx/m';
import ParticlesField, { orbitOptions } from './fx/Particles';

const RING_RADII = [110, 200, 300];
const RING_DURATIONS = [40, 60, 80];
const RING_DIRECTIONS: Array<1 | -1> = [1, -1, 1];

type Ring = { items: typeof toolBelt; radius: number; duration: number; dir: 1 | -1 };

const rings: Ring[] = [
  {
    items: toolBelt.slice(0, 3),
    radius: RING_RADII[0],
    duration: RING_DURATIONS[0],
    dir: RING_DIRECTIONS[0],
  },
  {
    items: toolBelt.slice(3, 8),
    radius: RING_RADII[1],
    duration: RING_DURATIONS[1],
    dir: RING_DIRECTIONS[1],
  },
  {
    items: toolBelt.slice(8, 12),
    radius: RING_RADII[2],
    duration: RING_DURATIONS[2],
    dir: RING_DIRECTIONS[2],
  },
];

const Orbit = ({ ring }: { ring: Ring }) => {
  const controls = useAnimationControls();
  const counterControls = useAnimationControls();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      controls.stop();
      counterControls.stop();
      return;
    }
    controls.start({
      rotate: ring.dir * 360,
      transition: { duration: ring.duration, ease: 'linear', repeat: Infinity },
    });
    counterControls.start({
      rotate: -ring.dir * 360,
      transition: { duration: ring.duration, ease: 'linear', repeat: Infinity },
    });
  }, [controls, counterControls, ring.dir, ring.duration, paused]);

  return (
    <MDiv
      animate={controls}
      className="absolute inset-0 m-auto"
      style={{
        width: ring.radius * 2,
        height: ring.radius * 2,
        borderRadius: '9999px',
        border: '1px dashed rgba(169, 145, 247, 0.12)',
      }}
    >
      {ring.items.map((tool, idx) => {
        const angle = (idx / ring.items.length) * Math.PI * 2;
        const x = Math.cos(angle) * ring.radius;
        const y = Math.sin(angle) * ring.radius;
        return (
          <MDiv
            key={tool.name}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
            whileHover={{ scale: 1.35 }}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
            }}
          >
            <MDiv
              animate={counterControls}
              className="relative group flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: '9999px',
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), rgba(0,0,0,0.5))',
                boxShadow:
                  '0 0 20px rgba(242,140,24,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Image
                src={tool.img}
                width={36}
                height={36}
                alt={`${tool.name} logo`}
                loading="lazy"
              />
              <span
                className="absolute -bottom-7 text-[10px] font-mono text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
              >
                {tool.name}
              </span>
            </MDiv>
          </MDiv>
        );
      })}
    </MDiv>
  );
};

const StaticGrid = () => (
  <div className="grid content-center justify-center grid-cols-3 gap-6 p-8 md:grid-cols-4 max-w-3xl mx-auto">
    {toolBelt.map((i) => (
      <div
        key={i.name}
        className="flex flex-col items-center justify-center gap-2"
      >
        <Image
          src={i.img}
          height={64}
          width={64}
          alt={`${i.name} logo`}
          loading="lazy"
        />
        <span className="text-xs font-mono text-white/70">{i.name}</span>
      </div>
    ))}
  </div>
);

const Toolbelt = () => {
  const { lowPower, isMobile } = useCapabilities();
  const minimal = lowPower || isMobile;

  return (
    <section className="relative py-16 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0b0d12] via-[#0f1218] to-[#0b0d12]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(169,145,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(169,145,247,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {!minimal && (
        <div className="absolute inset-0 pointer-events-none">
          <ParticlesField
            id="toolbelt-particles"
            options={orbitOptions}
            className="absolute inset-0"
          />
        </div>
      )}

      <div className="relative z-10 pt-10 text-white text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
          Stack
        </p>
        <h2 className="font-mono text-2xl md:text-3xl tracking-wider uppercase mt-2">
          My tool-belt
        </h2>
        <p className="font-mono text-sm text-white/50 mt-3 max-w-md mx-auto px-4">
          Tools that orbit my day-to-day craft.
        </p>
      </div>

      {minimal ? (
        <div className="relative z-10 py-12">
          <StaticGrid />
        </div>
      ) : (
        <div className="relative flex-1 flex items-center justify-center">
          <div
            className="relative"
            style={{ width: 660, height: 660, maxWidth: '95vw' }}
          >
            <div
              aria-hidden
              className="absolute inset-0 m-auto rounded-full"
              style={{
                width: 80,
                height: 80,
                background:
                  'radial-gradient(circle, rgba(242,140,24,0.9) 0%, rgba(242,140,24,0.0) 70%)',
                filter: 'blur(8px)',
                animation: 'floatY 4s ease-in-out infinite',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                core
              </div>
            </div>
            {rings.map((ring) => (
              <Orbit key={ring.radius} ring={ring} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Toolbelt;
