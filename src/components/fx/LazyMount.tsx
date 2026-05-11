import { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  fallback?: ReactNode;
};

const LazyMount = ({
  children,
  rootMargin = '200px',
  minHeight = '100vh',
  fallback = null,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ref.current || mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, mounted]);

  return (
    <div ref={ref} style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted ? children : fallback}
    </div>
  );
};

export default LazyMount;
