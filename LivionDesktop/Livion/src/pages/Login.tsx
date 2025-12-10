/**
 * Login - Clinician login screen
 * Simple entry point with animated background
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlassCard } from '../components/GlassCard';
import { COLORS, Typography, BorderRadius, Shadows } from '../constants/colors';

export function Login() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <AnimatedBackground />

      <div style={styles.content}>
        {/* Logo and branding */}
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Livion Logo" style={styles.logoImage} />
          <p style={styles.subtitle}>Clinician Portal</p>
        </div>

        {/* Login card */}
        <GlassCard variant="strong" padding="lg" style={styles.loginCard}>
          <div style={styles.cardHeader}>
            <Stethoscope size={24} color={COLORS.teal} />
            <h2 style={styles.cardTitle}>Welcome Back</h2>
          </div>

          <p style={styles.cardDescription}>
            Access your patient dashboard, appointments, and AI-powered insights.
          </p>

          {/* Demo notice */}
          <div style={styles.demoNotice}>
            <span style={styles.demoBadge}>DEMO</span>
            <span style={styles.demoText}>No credentials required</span>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...styles.loginButton,
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isHovered ? Shadows.glow.teal : Shadows.md,
            }}
          >
            <span>Enter Dashboard</span>
            <ArrowRight
              size={20}
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 200ms ease',
              }}
            />
          </button>
        </GlassCard>

        {/* Footer */}
        <p style={styles.footer}>
          Secure healthcare platform for clinicians
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: COLORS.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    zIndex: 1,
    maxWidth: '420px',
    width: '100%',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  logoImage: {
    width: '220px',
    height: '220px',
    objectFit: 'contain',
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: COLORS.textSecondary,
    margin: 0,
    fontWeight: Typography.fontWeight.medium,
  },
  loginCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  cardDescription: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: Typography.lineHeight.relaxed,
    margin: 0,
  },
  demoNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: COLORS.tealLight,
    borderRadius: BorderRadius.md,
  },
  demoBadge: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.teal,
    backgroundColor: COLORS.cardWhite,
    padding: '4px 8px',
    borderRadius: BorderRadius.sm,
    letterSpacing: '0.5px',
  },
  demoText: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.tealDark,
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '16px 24px',
    backgroundColor: COLORS.teal,
    color: COLORS.cardWhite,
    border: 'none',
    borderRadius: BorderRadius.lg,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    marginTop: '8px',
  },
  footer: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textTertiary,
    margin: 0,
  },
};
