/**
 * Dashboard - Main clinician dashboard
 * Overview of appointments, patients, and AI features
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar as CalendarIcon, Activity, TrendingUp, AlertCircle, Settings, ChevronRight } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { GlassCard } from '../components/GlassCard';
import { CalendarPreview } from '../components/CalendarPreview';
import { PatientsPreview } from '../components/PatientsPreview';
import { AIComingSoon } from '../components/AIComingSoon';
import { COLORS, Typography, BorderRadius } from '../constants/colors';

// Quick stats data
const quickStats = [
  {
    icon: Users,
    label: 'Total Pacienți',
    value: '156',
    change: '+12 luna aceasta',
    color: COLORS.teal,
    bgColor: COLORS.tealLight,
  },
  {
    icon: CalendarIcon,
    label: 'Programări Azi',
    value: '8',
    change: '2 în așteptare',
    color: COLORS.blue,
    bgColor: COLORS.blueLight,
  },
  {
    icon: Activity,
    label: 'Pacienți Critici',
    value: '3',
    change: 'Necesită atenție',
    color: COLORS.error,
    bgColor: COLORS.errorLight,
  },
  {
    icon: TrendingUp,
    label: 'Rată Recuperare',
    value: '94%',
    change: '+2% față de luna trecută',
    color: COLORS.success,
    bgColor: COLORS.successLight,
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

  // Mock certificate status - in real app this would come from context/API
  const hasDigitalCertificate = false;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bună dimineața';
    if (hour < 18) return 'Bună ziua';
    return 'Bună seara';
  };

  const subtitle = currentTime.toLocaleDateString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageLayout
      activePage="dashboard"
      title={`${getGreeting()}, Dr. Radu`}
      subtitle={subtitle}
      showNotifications
      notificationCount={3}
    >
      {/* Digital Certificate Warning Banner */}
      {!hasDigitalCertificate && (
        <div style={styles.certificateBanner} onClick={() => navigate('/settings')}>
          <div style={styles.certificateBannerContent}>
            <AlertCircle size={20} color={COLORS.amber} />
            <div style={styles.certificateBannerText}>
              <span style={styles.certificateBannerTitle}>Certificat digital neconfigurat</span>
              <span style={styles.certificateBannerSubtitle}>
                Trebuie să încărcați certificatul digital pentru a trimite rețete și documente medicale.
              </span>
            </div>
          </div>
          <div style={styles.certificateBannerAction}>
            <Settings size={16} />
            <span>Mergi la Setări</span>
            <ChevronRight size={16} />
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div style={styles.statsGrid}>
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={index} padding="md" style={styles.statCard}>
              <div style={styles.statHeader}>
                <div
                  style={{
                    ...styles.statIcon,
                    backgroundColor: stat.bgColor,
                  }}
                >
                  <Icon size={20} color={stat.color} />
                </div>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={{ ...styles.statChange, color: stat.color }}>{stat.change}</div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={styles.mainGrid}>
        {/* Left column - Calendar and AI */}
        <div style={styles.leftColumn}>
          <CalendarPreview onViewAll={() => navigate('/schedule')} />
          <AIComingSoon />
        </div>

        {/* Right column - Patients */}
        <div style={styles.rightColumn}>
          <PatientsPreview onViewAll={() => navigate('/patients')} />
        </div>
      </div>
    </PageLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  // Certificate banner
  certificateBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    border: `1px solid ${COLORS.amber}`,
    borderRadius: BorderRadius.md,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  certificateBannerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  certificateBannerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  certificateBannerTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.amber,
  },
  certificateBannerSubtitle: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
  certificateBannerAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: BorderRadius.sm,
    color: COLORS.amber,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Stats grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    flexShrink: 0,
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: BorderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  statValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  statChange: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Main grid - Two column layout
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '4px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};
