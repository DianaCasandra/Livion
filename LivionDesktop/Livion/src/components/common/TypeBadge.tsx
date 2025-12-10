/**
 * TypeBadge - Appointment type indicator
 * Displays appointment type icon with optional label
 */

import { appointmentTypeConfig } from '../../constants/appointmentConfig';
import type { AppointmentType } from '../../constants/appointmentConfig';
import { BorderRadius, Typography } from '../../constants/colors';

interface TypeBadgeProps {
  type: AppointmentType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'filled' | 'light';
}

const sizeMap = {
  sm: { icon: 10, badge: 20 },
  md: { icon: 12, badge: 24 },
  lg: { icon: 16, badge: 32 },
};

export function TypeBadge({
  type,
  size = 'md',
  showLabel = false,
  variant = 'light',
}: TypeBadgeProps) {
  const config = appointmentTypeConfig[type];
  const Icon = config.icon;
  const dimensions = sizeMap[size];

  const bgColor = variant === 'filled' ? config.color : config.bgColor;
  const iconColor = variant === 'filled' ? '#fff' : config.color;

  if (showLabel) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          backgroundColor: bgColor,
          borderRadius: BorderRadius.full,
        }}
      >
        <Icon size={dimensions.icon} color={iconColor} />
        <span
          style={{
            fontSize: Typography.fontSize.xs,
            fontWeight: Typography.fontWeight.medium,
            color: iconColor,
          }}
        >
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${dimensions.badge}px`,
        height: `${dimensions.badge}px`,
        borderRadius: BorderRadius.sm,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={dimensions.icon} color={iconColor} />
    </div>
  );
}
