import { cn } from '@/lib/utils';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Card colours are the theme's chart tokens (red, yellow, blue, green, magenta).
const CARDS = [
  { id: 1, title: 'Compiling', color: 'bg-chart-2', tag: 'Step 01' },
  { id: 2, title: 'Optimizing', color: 'bg-chart-3', tag: 'Step 02' },
  { id: 3, title: 'Hydrating', color: 'bg-chart-4', tag: 'Step 03' },
  { id: 4, title: 'Rendering', color: 'bg-chart-1', tag: 'Step 04' },
  { id: 5, title: 'Ready', color: 'bg-chart-5', tag: 'Step 05' },
];

type Props = {
  label?: string;
  className?: string;
};

// Full-screen neo-brutalist loader: a shuffling deck of step cards.
export default function BrutalistDeckLoader({
  label = 'Loading page',
  className,
}: Props) {
  const [deck, setDeck] = useState(CARDS);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setDeck(([top, ...rest]) => [...rest, top]);
    }, 1800);
    const tick = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 90);
    return () => {
      clearInterval(cycle);
      clearInterval(tick);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background p-8 antialiased',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(color-mix(in oklch, var(--foreground) 20%, transparent) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <div className="relative flex h-80 w-64 items-center justify-center [perspective:1200px]">
          <AnimatePresence mode="popLayout">
            {deck.map((card, index) => {
              const isTop = index === 0;
              const rotate = (index % 2 === 0 ? 1 : -1) * (index * 2);
              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ scale: 0.8, y: -100, rotateX: 45, opacity: 0 }}
                  animate={{
                    x: isTop ? 0 : index * 3,
                    y: isTop ? 0 : index * 8,
                    rotate: isTop ? 0 : rotate,
                    scale: 1 - index * 0.04,
                    zIndex: CARDS.length - index,
                    opacity: 1,
                  }}
                  exit={{
                    x: 200,
                    y: -40,
                    rotate: 20,
                    scale: 0.9,
                    opacity: 0,
                    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className={cn(
                    'absolute flex h-80 w-64 flex-col justify-between border-[3px] border-border p-5 text-black shadow-lg select-none',
                    card.color,
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-7 items-center justify-center rounded-full border-2 border-black bg-white">
                      <div className="size-2 rounded-full bg-black" />
                    </div>
                    <span className="border-2 border-black bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0_0_#000]">
                      {card.tag}
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center gap-3">
                    {isTop ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: 'linear',
                        }}
                        className="rounded-full border-2 border-black bg-black p-3 text-white"
                      >
                        <RefreshCw size={24} />
                      </motion.div>
                    ) : (
                      <div className="rounded-full border-2 border-black bg-white/60 p-3">
                        <Sparkles size={24} />
                      </div>
                    )}
                    <p className="text-center text-2xl leading-none font-bold tracking-tight uppercase">
                      {card.title}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase">
                      <span>Status</span>
                      <span className="tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-4 w-full border-2 border-black bg-white p-0.5 shadow-[2px_2px_0_0_#000]">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="z-10 mt-12 flex w-fit items-center justify-center gap-3 border-[3px] border-border bg-foreground px-5 py-2 font-mono text-xs font-bold text-background uppercase shadow-md">
          <Loader2 className="shrink-0 animate-spin text-secondary" size={16} />
          <span>Processing assets…</span>
        </div>
      </div>
    </div>
  );
}
