'use client';

import { useThemeStore } from '@/lib/store/theme-store';
import type * as React from 'react';
import { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, accent } = useThemeStore();

  // Aplica o tema quando montar e quando mudar
  useEffect(() => {
    const root = window.document.documentElement;

    // Adiciona a classe de transição antes de mudar o tema
    root.classList.add('gradient-transition');

    // Remove temas anteriores
    root.classList.remove('light', 'dark');

    // Aplica o novo tema
    root.classList.add(theme);

    // Remove a classe de transição após a mudança
    const timeout = setTimeout(() => {
      root.classList.remove('gradient-transition');
    }, 300); // Mesmo tempo que --transition-duration

    return () => clearTimeout(timeout);
  }, [theme]);

  // Aplica a cor de destaque quando montar e quando mudar
  useEffect(() => {
    const root = window.document.documentElement;
    const colors = {
      blue: '235 40% 60%',
      green: '142 71% 45%',
      red: '0 84% 60%',
      purple: '262 83% 58%',
      orange: '24 95% 53%',
      yellow: '41 96% 50%',
      pink: '322 81% 60%',
    };

    // Adiciona a classe de transição antes de mudar a cor
    root.classList.add('gradient-transition');

    // Aplica a nova cor
    root.style.setProperty('--primary', colors[accent as keyof typeof colors] || '235 40% 60%');
    root.style.setProperty('--ring', colors[accent as keyof typeof colors] || '235 40% 60%');

    // Remove a classe de transição após a mudança
    const timeout = setTimeout(() => {
      root.classList.remove('gradient-transition');
    }, 300); // Mesmo tempo que --transition-duration

    return () => clearTimeout(timeout);
  }, [accent]);

  return <>{children}</>;
}

export { useThemeStore as useTheme };
