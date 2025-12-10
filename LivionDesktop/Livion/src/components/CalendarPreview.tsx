/**
 * CalendarPreview - Compact calendar for dashboard
 * Shows today's appointments with link to full schedule
 */

import { Clock, User, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { TypeBadge } from './common/TypeBadge';
import { COLORS, Typography, BorderRadius } from '../constants/colors';
import { getTodayAppointments } from '../constants/mockData';

interface CalendarPreviewProps {
  onViewAll: () => void;
}

export function CalendarPreview({ onViewAll }: CalendarPreviewProps) {
  const today = new Date();
  const appointments = getTodayAppointments().slice(0, 3);

  return (
    <GlassCard style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>Programul de Azi</h3>
          <span style={styles.dateLabel}>
            {today.toLocaleDateString('ro-RO', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <button style={styles.viewAllButton} onClick={onViewAll}>
          Vezi tot
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <User size={14} color={COLORS.teal} />
          <span>{getTodayAppointments().length} programări</span>
        </div>
        <div style={styles.summaryItem}>
          <Clock size={14} color={COLORS.textSecondary} />
          <span>Următoarea: {appointments[0]?.startTime || 'Niciuna'}</span>
        </div>
      </div>

      {/* Appointments list */}
      <div style={styles.appointmentList}>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            style={styles.appointmentRow}
            onClick={onViewAll}
          >
            <div style={styles.timeColumn}>
              <span style={styles.time}>{appointment.startTime}</span>
            </div>
            <TypeBadge type={appointment.type} size="md" />
            <div style={styles.appointmentInfo}>
              <span style={styles.patientName}>{appointment.patientName}</span>
              <span style={styles.reason}>{appointment.reason}</span>
            </div>
            <ChevronRight size={16} color={COLORS.textTertiary} />
          </div>
        ))}
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
    gap: '12px',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  dateLabel: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
    padding: '2px 8px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.sm,
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
  summary: {
    display: 'flex',
    gap: '16px',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: BorderRadius.md,
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  appointmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  appointmentRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  timeColumn: {
    width: '70px',
    flexShrink: 0,
  },
  time: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  appointmentInfo: {
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
  reason: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
};
