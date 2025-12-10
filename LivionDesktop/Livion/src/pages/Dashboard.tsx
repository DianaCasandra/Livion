/**
 * Dashboard - Main clinician dashboard
 * Overview of appointments, patients, and AI features
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar as CalendarIcon, Activity, TrendingUp } from 'lucide-react';
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
    label: 'Total Patients',
    value: '156',
    change: '+12 this month',
    color: COLORS.teal,
    bgColor: COLORS.tealLight,
  },
  {
    icon: CalendarIcon,
    label: "Today's Appointments",
    value: '8',
    change: '2 pending',
    color: COLORS.blue,
    bgColor: COLORS.blueLight,
  },
  {
    icon: Activity,
    label: 'Critical Patients',
    value: '3',
    change: 'Needs attention',
    color: COLORS.error,
    bgColor: COLORS.errorLight,
  },
  {
    icon: TrendingUp,
    label: 'Recovery Rate',
    value: '94%',
    change: '+2% from last month',
    color: COLORS.success,
    bgColor: COLORS.successLight,
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const subtitle = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageLayout
      activePage="dashboard"
      title={`${getGreeting()}, Dr. Harper`}
      subtitle={subtitle}
      showNotifications
      notificationCount={3}
    >
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
