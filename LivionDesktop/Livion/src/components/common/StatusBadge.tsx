/**
 * StatusBadge - Patient status indicator
 * Displays status icon with optional label
 */

import { statusConfig } from '../../constants/statusConfig';
import type { PatientStatus } from '../../constants/statusConfig';
import { BorderRadius, Typography } from '../../constants/colors';

interface StatusBadgeProps {
  status: PatientStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeMap = {
  sm: { icon: 12, badge: 24 },
  md: { icon: 14, badge: 32 },
  lg: { icon: 18, badge: 40 },
};

export function StatusBadge({ status, size = 'md', showLabel = false }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const dimensions = sizeMap[size];

  if (showLabel) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          backgroundColor: config.bgColor,
          borderRadius: BorderRadius.full,
        }}
      >
        <Icon size={dimensions.icon} color={config.color} />
        <span
          style={{
            fontSize: Typography.fontSize.xs,
            fontWeight: Typography.fontWeight.medium,
            color: config.color,
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
        borderRadius: '50%',
        backgroundColor: config.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={dimensions.icon} color={config.color} />
    </div>
  );
}
