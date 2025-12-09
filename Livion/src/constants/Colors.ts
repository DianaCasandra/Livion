/**
 * Color System - Livion Health Platform
 * Inspired by Stardust design with clinical, calming aesthetics
 * 
 * Palette:
 * - Primary: Teal 600 (trust/health), Indigo 600 (competence)
 * - Accents: Gold 400 (achievement), Coral 300 (human warmth)
 * - Status: Green (ok), Amber (attention), Red (action)
 */

// Color palette
export const COLORS = {
  background: '#f7f7f7',
  cardWhite: '#ffffff',
  teal: '#03d0c5',
  tealLight: '#e6faf9',
  tealDark: '#029e96',
  amber: '#ff6e1e',
  amberLight: '#fff4ed',
  amberDark: '#e55a0d',
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  border: '#e2e8f0',
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
  // Switch/Toggle colors
  switchTrackOff: '#cbd5e1',
  switchThumbOff: '#e2e8f0',
};

// Glass morphism style presets
export const GlassStyles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardSubtle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  cardStrong: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tealHighlight: {
    backgroundColor: 'rgba(3, 208, 197, 0.12)',
    borderColor: 'rgba(3, 208, 197, 0.2)',
  },
  amberHighlight: {
    backgroundColor: 'rgba(255, 110, 30, 0.12)',
    borderColor: 'rgba(255, 110, 30, 0.2)',
  },
};

// Opacity hex values for appending to colors
export const OpacityHex = {
  '5': '0d',
  '10': '1a',
  '15': '26',
  '20': '33',
  '25': '40',
  '30': '4d',
  '40': '66',
  '50': '80',
  '60': '99',
  '70': 'b3',
  '80': 'cc',
  '90': 'e6',
};

export const Colors = {
  // Primary Colors
  primary: {
    teal: '#03d0c5',      // Teal 600 - trust/health
    indigo: '#ff6e1e',    // Indigo 600 - competence
    darkNavy: '#ffffff',  // Deep navy background
    deepPurple: '#1e1b4b', // Deep purple for layered backgrounds
    white: '#ffffff',    // Pure white for contrast
    mint: '#05e6dbff', // Mint accent color
    amber: '#ff6e1e', // Warm amber accent
  },

  // Accent Colors
  accent: {
    gold: '#fbbf24',      // Gold 400 - achievement
    coral: '#fca5a5',     // Coral 300 - human warmth
    purple: '#a78bfa',    // Purple for highlights
    pink: '#f472b6',      // Pink for gradients
    cyan: '#22d3ee',      // Cyan for data visualizations
  },

  // Status Colors
  status: {
    ok: '#10b981',        // Green - everything is fine
    attention: '#f59e0b', // Amber - needs attention
    action: '#ef4444',    // Red - requires action
  },

  // Semantic Colors
  background: {
    primary: '#0f172a',   // Deep navy
    secondary: '#3949AB', // Slate 800
    card: '#1e1b4b',      // Deep purple with transparency
    cardGlass: 'rgba(30, 27, 75, 0.6)', // Glassmorphism effect
    overlay: 'rgba(15, 23, 42, 0.95)',
  },

  text: {
    primary: '#f8fafc',   // Slate 50 - main text
    secondary: '#cbd5e1', // Slate 300 - secondary text
    tertiary: '#94a3b8',  // Slate 400 - muted text
    inverse: '#0f172a',   // Dark text on light backgrounds
  },

  border: {
    subtle: '#cbd5e11a', // Very subtle borders
    medium: '#cbd5e133',
    strong: '#cbd5e14d',
    gradient: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(34, 211, 238, 0.3))',
  },

  // Gradient Definitions (Stardust-inspired)
  gradients: {
    primary: ['#0d9488', '#4f46e5'],           // Teal to Indigo
    accent: ['#a78bfa', '#f472b6', '#fca5a5'], // Purple to Pink to Coral
    status: ['#10b981', '#f59e0b', '#ef4444'], // Green to Amber to Red
    cosmic: ['#1e1b4b', '#312e81', '#4c1d95'], // Deep purple gradient
    warm: ['#fbbf24', '#fca5a5'],              // Gold to Coral
    cool: ['#0d9488', '#22d3ee', '#a78bfa'],   // Teal to Cyan to Purple
  },

  // Glow Effects (for neon/highlight effects)
  glow: {
    teal: '#0d948866',
    indigo: 'rgba(79, 70, 229, 0.4)',
    purple: 'rgba(167, 139, 250, 0.4)',
    pink: 'rgba(244, 114, 182, 0.4)',
    gold: 'rgba(251, 191, 36, 0.4)',
  },

  // Particle/Star colors for background effects
  particles: {
    primary: '#a78bfa',   // Purple
    secondary: '#22d3ee', // Cyan
    tertiary: '#fbbf24',  // Gold
  },
};

/**
 * Typography Scale
 * Minimum 14-16pt base; 1.2-1.6 line-height; WCAG AA contrast
 * Using System fonts - SF Pro (iOS) / Roboto (Android)
 */
export const Typography = {
  fontFamily: {
    // System fonts - these resolve to SF Pro on iOS and Roboto on Android
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,    // Minimum base size
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

/**
 * Spacing System (8-point grid)
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

/**
 * Border Radius
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

/**
 * Shadow System (subtle, layered shadows)
 */
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
};

/**
 * Animation Timing (200-250ms for meaningful motion)
 */
export const Animation = {
  duration: {
    fast: 150,
    normal: 200,
    slow: 250,
  },
  easing: {
    default: 'ease-in-out',
    spring: 'spring',
  },
};
