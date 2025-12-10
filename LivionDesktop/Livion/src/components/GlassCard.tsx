/**
 * GlassCard - Glassmorphism card component
 * Reusable card with blur effect and subtle borders
 */

import type { ReactNode } from 'react';
import { COLORS, BorderRadius, Shadows, GlassStyles } from '../constants/colors';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'subtle' | 'strong';
  highlight?: 'teal' | 'amber' | 'purple';
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

export function GlassCard({
  children,
  variant = 'default',
  highlight,
  padding = 'md',
  style,
  onClick,
  className,
}: GlassCardProps) {
  const glassStyle =
    variant === 'subtle'
      ? GlassStyles.cardSubtle
      : variant === 'strong'
      ? GlassStyles.cardStrong
      : GlassStyles.card;

  const paddingValue = padding === 'sm' ? '16px' : padding === 'lg' ? '32px' : '24px';

  const highlightStyles: React.CSSProperties = highlight
    ? {
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderLeftColor:
          highlight === 'teal'
            ? COLORS.teal
            : highlight === 'amber'
            ? COLORS.amber
            : COLORS.purple,
      }
    : {};

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...styles.card,
        backgroundColor: glassStyle.backgroundColor,
        borderColor: glassStyle.borderColor,
        backdropFilter: glassStyle.backdropFilter,
        WebkitBackdropFilter: glassStyle.backdropFilter,
        padding: paddingValue,
        cursor: onClick ? 'pointer' : 'default',
        ...highlightStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: Shadows.md,
    transition: 'transform 150ms ease, box-shadow 150ms ease',
  },
};
