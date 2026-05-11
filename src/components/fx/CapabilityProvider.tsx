import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Capabilities = {
  ready: boolean;
  lowPower: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
  isMobile: boolean;
};

const defaultValue: Capabilities = {
  ready: false,
  lowPower: false,
  reducedMotion: false,
  coarsePointer: false,
  isMobile: false,
};

const CapabilityContext = createContext<Capabilities>(defaultValue);

export const useCapabilities = () => useContext(CapabilityContext);

export const CapabilityProvider = ({ children }: { children: ReactNode }) => {
  const [caps, setCaps] = useState<Capabilities>(defaultValue);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;

    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMq = window.matchMedia('(hover: none)');
    const widthMq = window.matchMedia('(max-width: 768px)');

    const compute = () => {
      const reducedMotion = reducedMq.matches;
      const coarsePointer = pointerMq.matches;
      const isMobile = widthMq.matches;
      const lowPower =
        reducedMotion || cores < 4 || memory < 4 || (isMobile && coarsePointer);
      setCaps({
        ready: true,
        lowPower,
        reducedMotion,
        coarsePointer,
        isMobile,
      });
    };

    compute();
    reducedMq.addEventListener('change', compute);
    pointerMq.addEventListener('change', compute);
    widthMq.addEventListener('change', compute);
    return () => {
      reducedMq.removeEventListener('change', compute);
      pointerMq.removeEventListener('change', compute);
      widthMq.removeEventListener('change', compute);
    };
  }, []);

  return (
    <CapabilityContext.Provider value={caps}>
      {children}
    </CapabilityContext.Provider>
  );
};
