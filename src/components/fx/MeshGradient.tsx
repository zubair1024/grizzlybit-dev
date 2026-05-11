import { useCapabilities } from './CapabilityProvider';

type Props = {
  className?: string;
};

const MeshGradient = ({ className }: Props) => {
  const { lowPower, reducedMotion } = useCapabilities();
  const animate = !lowPower && !reducedMotion;

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className ?? ''}`}
      style={{
        background: 'linear-gradient(180deg, #0b0d12 0%, #14171d 100%)',
      }}
    >
      <div
        className="absolute"
        style={{
          width: '55%',
          height: '70%',
          left: '5%',
          top: '0%',
          borderRadius: '50%',
          background: '#a991f7',
          filter: 'blur(110px)',
          opacity: 0.55,
          animation: animate ? 'blobA 18s ease-in-out infinite' : undefined,
        }}
      />
      <div
        className="absolute"
        style={{
          width: '50%',
          height: '60%',
          right: '0%',
          top: '20%',
          borderRadius: '50%',
          background: '#f28c18',
          filter: 'blur(120px)',
          opacity: 0.45,
          animation: animate ? 'blobB 22s ease-in-out infinite' : undefined,
        }}
      />
      <div
        className="absolute"
        style={{
          width: '55%',
          height: '60%',
          left: '20%',
          bottom: '0%',
          borderRadius: '50%',
          background: '#37cdbe',
          filter: 'blur(110px)',
          opacity: 0.35,
          animation: animate ? 'blobC 26s ease-in-out infinite' : undefined,
        }}
      />
    </div>
  );
};

export default MeshGradient;
