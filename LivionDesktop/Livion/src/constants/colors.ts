/**
 * Color System - Livion Health Platform (Desktop)
 * Inspired by Stardust design with clinical, calming aesthetics
 *
 * Palette:
 * - Primary: Teal 600 (trust/health), Indigo 600 (competence)
 * - Accents: Gold 400 (achievement), Coral 300 (human warmth)
 * - Status: Green (ok), Amber (attention), Red (action)
 */

export const COLORS = {
  // Background colors
  background: '#f7f7f7',
  cardWhite: '#ffffff',

  // Primary accent colors
  teal: '#03d0c5',
  tealLight: '#e6faf9',
  tealDark: '#029e96',

  // Secondary accent colors
  amber: '#ff6e1e',
  amberLight: '#fff4ed',
  amberDark: '#e55a0d',

  // Text colors
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',

  // UI colors
  border: '#e2e8f0',
  borderLight: 'rgba(255, 255, 255, 0.8)',

  // Status colors
  success: '#10b981',
  successLight: '#ecfdf5',
  warning: '#f59e0b',
  warningLight: '#fffbeb',
  error: '#ef4444',
  errorLight: '#fef2f2',

  // Additional UI colors
  purple: '#8b5cf6',
  purpleLight: '#f3e8ff',
  blue: '#3b82f6',
  blueLight: '#eff6ff',
};

// Glass morphism style presets (for CSS)
export const GlassStyles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
  },
  cardSubtle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
  },
  cardStrong: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(16px)',
  },
};

// Typography scale
export const Typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Spacing system (8-point grid)
export const Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

// Border radius
export const BorderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
};

// Box shadows
export const Shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  xl: '0 12px 36px rgba(0, 0, 0, 0.16)',
  glow: {
    teal: '0 0 40px rgba(3, 208, 197, 0.3)',
    amber: '0 0 40px rgba(255, 110, 30, 0.3)',
  },
};

// Animation durations
export const Animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    blob: '8000ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};
