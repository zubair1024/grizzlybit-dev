import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Icon swap is pure CSS (dark: variant); aria-pressed waits for mount so
// server and first client render match.
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === 'dark';
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-11"
      aria-label="Dark mode"
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun className="dark:hidden" aria-hidden="true" />
      <Moon className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
};

export default ThemeToggle;
