import { Moon, Sun } from 'lucide-icons-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import cn from '@/lib/cn';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type='button'
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-2',
        'text-foreground hover:bg-foreground/10 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground',
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className='h-5 w-5' />
        ) : (
          <Moon className='h-5 w-5' />
        )
      ) : (
        <span className='h-5 w-5' />
      )}
    </button>
  );
}
