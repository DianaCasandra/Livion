/**
 * AIComingSoon - Placeholder for upcoming AI features
 * Teaser section for AI-powered capabilities
 */

import { Sparkles, Brain, LineChart, MessageSquare, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { COLORS, Typography, BorderRadius } from '../constants/colors';

interface UpcomingFeature {
  icon: typeof Sparkles;
  title: string;
  description: string;
  color: string;
}

const upcomingFeatures: UpcomingFeature[] = [
  {
    icon: Brain,
    title: 'Asistent AI Diagnostic',
    description: 'Obțineți sugestii bazate pe AI pornind de la simptomele și istoricul pacientului',
    color: COLORS.purple,
  },
  {
    icon: LineChart,
    title: 'Analiză Predictivă',
    description: 'Identificați pacienții cu risc înainte de apariția complicațiilor',
    color: COLORS.teal,
  },
  {
    icon: MessageSquare,
    title: 'Documentație Inteligentă',
    description: 'Generare automată a notelor clinice din interacțiunile cu pacienții',
    color: COLORS.blue,
  },
  {
    icon: Zap,
    title: 'Recomandări de Tratament',
    description: 'Sugestii de tratament bazate pe dovezi, personalizate pentru fiecare pacient',
    color: COLORS.amber,
  },
];

export function AIComingSoon() {
  return (
    <GlassCard style={styles.container} highlight="purple">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Sparkles size={24} color={COLORS.purple} />
        </div>
        <div style={styles.headerText}>
          <h2 style={styles.title}>Funcții AI</h2>
          <span style={styles.badge}>În curând</span>
        </div>
      </div>

      {/* Description */}
      <p style={styles.description}>
        Construim instrumente inteligente pentru a vă ajuta să oferiți îngrijire mai bună. Iată ce urmează:
      </p>

      {/* Features grid */}
      <div style={styles.featuresGrid}>
        {upcomingFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} style={styles.featureCard}>
              <div
                style={{
                  ...styles.featureIcon,
                  backgroundColor: feature.color + '15',
                }}
              >
                <Icon size={20} color={feature.color} />
              </div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <Sparkles size={16} color={COLORS.purple} />
          <span style={styles.ctaText}>
            Doriți acces timpuriu? Alăturați-vă programului beta
          </span>
        </div>
        <button style={styles.ctaButton}>
          Înscrie-te
        </button>
      </div>
    </GlassCard>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  headerIcon: {
    width: '48px',
    height: '48px',
    borderRadius: BorderRadius.md,
    backgroundColor: COLORS.purpleLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  badge: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.purple,
    backgroundColor: COLORS.purpleLight,
    padding: '4px 10px',
    borderRadius: BorderRadius.full,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: Typography.lineHeight.relaxed,
    margin: 0,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  featureCard: {
    display: 'flex',
    gap: '12px',
    padding: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    border: '1px solid rgba(255, 255, 255, 0.7)',
  },
  featureIcon: {
    width: '40px',
    height: '40px',
    borderRadius: BorderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  featureTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  featureDescription: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
    lineHeight: Typography.lineHeight.normal,
    margin: 0,
  },
  ctaSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.md,
    marginTop: '4px',
  },
  ctaContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  ctaText: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.purple,
    fontWeight: Typography.fontWeight.medium,
  },
  ctaButton: {
    padding: '8px 16px',
    backgroundColor: COLORS.purple,
    color: COLORS.cardWhite,
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
};
