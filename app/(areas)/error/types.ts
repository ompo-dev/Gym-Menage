import type { ReactNode } from 'react';

export interface ErrorPageProps {
  title?: string;
  message?: string;
  error?: Error | string;
  showReload?: boolean;
  showHome?: boolean;
  customActions?: ReactNode;
  homeLink?: string;
  reloadButtonText?: string;
  homeButtonText?: string;
  footerText?: string;
  className?: string;
  showIcon?: boolean;
  iconColor?: string;
  iconSize?: string;
}

export interface UnauthorizedPageProps {
  title?: string;
  message?: string;
  showLogin?: boolean;
  showHome?: boolean;
  customActions?: ReactNode;
  supportMessage?: string;
  loginLink?: string;
  homeLink?: string;
  loginButtonText?: string;
  homeButtonText?: string;
  className?: string;
  showIcon?: boolean;
  iconColor?: string;
  iconSize?: string;
}
