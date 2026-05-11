import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

let initPromise: Promise<void> | null = null;

const ensureEngine = () => {
  if (!initPromise) {
    initPromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }
  return initPromise;
};

export const orbitOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true } },
    color: { value: ['#f28c18', '#a991f7', '#37cdbe'] },
    shape: { type: 'circle' },
    opacity: { value: 0.35 },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.6,
      outModes: { default: 'bounce' },
      random: true,
    },
    links: {
      enable: true,
      distance: 130,
      color: '#a991f7',
      opacity: 0.15,
      width: 1,
    },
  },
  detectRetina: true,
};

export const constellationOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 60 },
    color: { value: ['#f28c18', '#a991f7'] },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: { min: 0.5, max: 2 } },
    move: {
      enable: true,
      speed: 0.4,
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 160,
      color: '#f28c18',
      opacity: 0.18,
      width: 1,
    },
  },
  detectRetina: true,
};

type Props = {
  id: string;
  options: ISourceOptions;
  className?: string;
};

const ParticlesField = ({ id, options, className }: Props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureEngine().then(() => setReady(true));
  }, []);

  const opts = useMemo(() => options, [options]);

  if (!ready) return null;

  return <Particles id={id} options={opts} className={className} />;
};

export default ParticlesField;
