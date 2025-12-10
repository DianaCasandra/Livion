/**
 * Calendar - Full time-slot based calendar
 * Shows daily/weekly view with time slots and appointments
 */

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { TypeBadge } from './common/TypeBadge';
import { COLORS, Typography, BorderRadius } from '../constants/colors';
import { APPOINTMENTS, formatDateKey, type Appointment } from '../constants/mockData';
import { appointmentTypeConfig } from '../constants/appointmentConfig';


// Generate time slots from 8 AM to 6 PM
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Start from Sunday

  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const appointments = APPOINTMENTS[selectedDateKey] || [];

  // Create a map of appointments by start time
  const appointmentsByTime = useMemo(() => {
    const map: Record<string, Appointment> = {};
    appointments.forEach((apt) => {
      map[apt.startTime] = apt;
    });
    return map;
  }, [appointments]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getAppointmentHeight = (apt: Appointment): number => {
    const start = parseInt(apt.startTime.split(':')[0]) * 60 + parseInt(apt.startTime.split(':')[1]);
    const end = parseInt(apt.endTime.split(':')[0]) * 60 + parseInt(apt.endTime.split(':')[1]);
    return ((end - start) / 30) * 60; // 60px per 30min slot
  };

  return (
    <GlassCard style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Schedule</h2>
          <div style={styles.viewToggle}>
            <button
              onClick={() => setView('day')}
              style={{
                ...styles.viewButton,
                ...(view === 'day' && styles.viewButtonActive),
              }}
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              style={{
                ...styles.viewButton,
                ...(view === 'week' && styles.viewButtonActive),
              }}
            >
              Week
            </button>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button onClick={goToToday} style={styles.todayButton}>
            Today
          </button>
          <div style={styles.navigation}>
            <button onClick={() => navigateDate('prev')} style={styles.navButton}>
              <ChevronLeft size={18} color={COLORS.textSecondary} />
            </button>
            <span style={styles.dateLabel}>
              {view === 'day'
                ? formatDisplayDate(selectedDate)
                : `${formatDisplayDate(weekDays[0])} - ${formatDisplayDate(weekDays[6])}`}
            </span>
            <button onClick={() => navigateDate('next')} style={styles.navButton}>
              <ChevronRight size={18} color={COLORS.textSecondary} />
            </button>
          </div>
        </div>
      </div>

      {/* Week day selector (for day view) */}
      {view === 'day' && (
        <div style={styles.weekSelector}>
          {weekDays.map((day, index) => {
            const dayKey = formatDateKey(day);
            const dayAppointments = APPOINTMENTS[dayKey] || [];
            const hasAppointments = dayAppointments.length > 0;

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedDate(day);
                  setCurrentDate(day);
                }}
                style={{
                  ...styles.dayButton,
                  ...(isSelected(day) && styles.dayButtonSelected),
                  ...(isToday(day) && !isSelected(day) && styles.dayButtonToday),
                }}
              >
                <span
                  style={{
                    ...styles.dayName,
                    color: isSelected(day) ? COLORS.cardWhite : COLORS.textSecondary,
                  }}
                >
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span
                  style={{
                    ...styles.dayNumber,
                    color: isSelected(day) ? COLORS.cardWhite : COLORS.textPrimary,
                  }}
                >
                  {day.getDate()}
                </span>
                {hasAppointments && (
                  <div
                    style={{
                      ...styles.appointmentIndicator,
                      backgroundColor: isSelected(day) ? COLORS.cardWhite : COLORS.teal,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Time slots grid */}
      <div style={styles.calendarBody}>
        {/* Summary bar */}
        <div style={styles.summaryBar}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryValue}>{appointments.length}</span>
            <span style={styles.summaryLabel}>appointments</span>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryItem}>
            <span style={styles.summaryValue}>
              {appointments.filter((a) => a.status === 'confirmed').length}
            </span>
            <span style={styles.summaryLabel}>confirmed</span>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryItem}>
            <span style={styles.summaryValue}>
              {appointments.filter((a) => a.status === 'pending').length}
            </span>
            <span style={styles.summaryLabel}>pending</span>
          </div>
          <button style={styles.addButton}>
            <Plus size={16} />
            <span>New</span>
          </button>
        </div>

        {/* Time grid */}
        <div style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => {
            const appointment = appointmentsByTime[time];
            const isHourMark = time.endsWith(':00');

            return (
              <div
                key={time}
                style={{
                  ...styles.timeSlot,
                  ...(isHourMark && styles.timeSlotHour),
                }}
              >
                <div style={styles.timeLabel}>
                  {isHourMark && (
                    <span style={styles.timeLabelText}>
                      {parseInt(time.split(':')[0]) > 12
                        ? `${parseInt(time.split(':')[0]) - 12} PM`
                        : `${parseInt(time.split(':')[0])} AM`}
                    </span>
                  )}
                </div>
                <div style={styles.slotContent}>
                  {appointment ? (
                    <div
                      style={{
                        ...styles.appointmentCard,
                        height: `${getAppointmentHeight(appointment)}px`,
                        borderLeftColor: appointmentTypeConfig[appointment.type].color,
                        backgroundColor:
                          appointment.status === 'completed'
                            ? 'rgba(148, 163, 184, 0.1)'
                            : appointmentTypeConfig[appointment.type].color + '15',
                        opacity: appointment.status === 'completed' ? 0.7 : 1,
                      }}
                    >
                      <div style={styles.appointmentHeader}>
                        <div style={styles.appointmentAvatar}>
                          <span style={styles.appointmentInitials}>
                            {appointment.patientInitials}
                          </span>
                        </div>
                        <div style={styles.appointmentInfo}>
                          <span style={styles.appointmentName}>
                            {appointment.patientName}
                          </span>
                          <span style={styles.appointmentTime}>
                            {appointment.startTime} - {appointment.endTime}
                          </span>
                        </div>
                        <TypeBadge type={appointment.type} size="md" />
                      </div>
                      <span style={styles.appointmentReason}>{appointment.reason}</span>
                    </div>
                  ) : (
                    <div style={styles.emptySlot} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    margin: 0,
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.sm,
    padding: '4px',
    gap: '4px',
  },
  viewButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: BorderRadius.sm,
    backgroundColor: 'transparent',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  viewButtonActive: {
    backgroundColor: COLORS.cardWhite,
    color: COLORS.textPrimary,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  todayButton: {
    padding: '6px 14px',
    backgroundColor: COLORS.tealLight,
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.tealDark,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  navButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: BorderRadius.sm,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  dateLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.textPrimary,
    minWidth: '140px',
    textAlign: 'center',
  },

  // Week selector
  weekSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px',
    marginBottom: '16px',
    flexShrink: 0,
  },
  dayButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '10px 8px',
    borderRadius: BorderRadius.md,
    border: '2px solid transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  dayButtonSelected: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  dayButtonToday: {
    borderColor: COLORS.teal,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dayName: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  dayNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  appointmentIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },

  // Calendar body
  calendarBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  summaryBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BorderRadius.md,
    marginBottom: '12px',
    flexShrink: 0,
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  summaryValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    color: COLORS.textSecondary,
  },
  summaryDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: COLORS.border,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginLeft: 'auto',
    padding: '8px 14px',
    backgroundColor: COLORS.teal,
    border: 'none',
    borderRadius: BorderRadius.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: COLORS.cardWhite,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // Time grid
  timeGrid: {
    flex: 1,
    overflow: 'auto',
    paddingRight: '8px',
  },
  timeSlot: {
    display: 'flex',
    minHeight: '60px',
    borderBottom: `1px solid ${COLORS.border}30`,
  },
  timeSlotHour: {
    borderBottom: `1px solid ${COLORS.border}`,
  },
  timeLabel: {
    width: '70px',
    paddingRight: '12px',
    paddingTop: '4px',
    textAlign: 'right',
    flexShrink: 0,
  },
  timeLabelText: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textTertiary,
    fontWeight: Typography.fontWeight.medium,
  },
  slotContent: {
    flex: 1,
    position: 'relative',
    borderLeft: `1px solid ${COLORS.border}50`,
    paddingLeft: '12px',
  },
  emptySlot: {
    height: '100%',
    cursor: 'pointer',
  },

  // Appointment card
  appointmentCard: {
    position: 'absolute',
    left: '12px',
    right: '8px',
    top: '0px',
    padding: '8px 12px',
    borderRadius: BorderRadius.md,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    overflow: 'hidden',
  },
  appointmentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '4px',
  },
  appointmentAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: COLORS.cardWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  appointmentInitials: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  appointmentInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  appointmentName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: COLORS.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  appointmentTime: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
  },
  appointmentReason: {
    fontSize: Typography.fontSize.xs,
    color: COLORS.textSecondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
