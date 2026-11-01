import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

// Must be a stable reference: the provider inits the engine once per app
const loadEngine = (engine: Engine) => loadSlim(engine);

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

const ParticlesField = ({ id, options, className }: Props) => (
  <ParticlesProvider init={loadEngine}>
    <Particles id={id} options={options} className={className} />
  </ParticlesProvider>
);

export default ParticlesField;
