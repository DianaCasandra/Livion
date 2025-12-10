/**
 * PatientsPreview - Compact patient list for dashboard
 * Shows a quick overview with link to full patients page
 */

import { ChevronRight, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { StatusBadge } from './common/StatusBadge';
import { COLORS, Typography, BorderRadius } from '../constants/colors';
import { getPreviewPatients } from '../constants/mockData';
import { statusConfig } from '../constants/statusConfig';

interface PatientsPreviewProps {
  onViewAll: () => void;
}

export function PatientsPreview({ onViewAll }: PatientsPreviewProps) {
  const patients = getPreviewPatients(4);

  return (
    <GlassCard style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>Pacienți</h3>
          <div style={styles.aiIndicator}>
            <Sparkles size={12} color={COLORS.purple} />
            <span>AI Activ</span>
          </div>
        </div>
        <button style={styles.viewAllButton} onClick={onViewAll}>
          Vezi toți
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Patient list */}
      <div style={styles.patientList}>
        {patients.map((patient) => {
          const status = statusConfig[patient.status];
          const hasAiInsight = !!patient.aiInsight;

          return (
            <div
              key={patient.id}
              style={{
                ...styles.patientRow,
                borderLeftColor: hasAiInsight ? status.color : 'transparent',
              }}
              onClick={onViewAll}
            >
              <StatusBadge status={patient.status} size="md" />
              <div style={styles.patientInfo}>
                <span style={styles.patientName}>{patient.name}</span>
                {hasAiInsight ? (
                  <div style={styles.aiAlertRow}>
                    <Sparkles size={10} color={COLORS.purple} />
                    <span style={styles.aiAlert}>{patient.aiInsight?.summary.slice(0, 40)}...</span>
                  </div>
                ) : (
                  <span style={styles.condition}>{patient.condition}</span>
                )}
              </div>
              <ChevronRight size={16} color={COLORS.textTertiary} />
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  aiIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    backgroundColor: COLORS.purpleLight,
    borderRadius: BorderRadius.full,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.purple,
  },
  viewAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.teal,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  patientList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  patientRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  patientInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
  },
  patientName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  condition: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
  aiAlertRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  aiAlert: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.purple,
    fontWeight: Typography.fontWeight.medium,
  },
};
