import { useScroll, useTransform } from 'framer-motion';
import { useCapabilities } from './CapabilityProvider';
import { MDiv } from './m';

const ScrollSignal = () => {
  const { lowPower, ready } = useCapabilities();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.0, 0.3, 0.0]);

  if (!ready || lowPower) return null;

  return (
    <MDiv
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
        opacity,
        background:
          'radial-gradient(60% 50% at 30% 40%, rgba(242,140,24,0.30), transparent 70%),' +
          'radial-gradient(60% 50% at 70% 60%, rgba(169,145,247,0.30), transparent 70%),' +
          'radial-gradient(60% 50% at 50% 85%, rgba(55,205,190,0.25), transparent 70%)',
      }}
    />
  );
};

export default ScrollSignal;
