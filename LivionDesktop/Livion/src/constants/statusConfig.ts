/**
 * Status configuration for patients
 * Shared across PatientsList and PatientsPreview
 */

import { Heart, Activity, AlertTriangle } from 'lucide-react';
import { COLORS } from './colors';

export type PatientStatus = 'stable' | 'attention' | 'critical';

export interface StatusConfig {
  color: string;
  bgColor: string;
  icon: typeof Heart;
  label: string;
}

export const statusConfig: Record<PatientStatus, StatusConfig> = {
  stable: {
    color: COLORS.success,
    bgColor: COLORS.successLight,
    icon: Heart,
    label: 'Stable',
  },
  attention: {
    color: COLORS.warning,
    bgColor: COLORS.warningLight,
    icon: Activity,
    label: 'Needs Attention',
  },
  critical: {
    color: COLORS.error,
    bgColor: COLORS.errorLight,
    icon: AlertTriangle,
    label: 'Critical',
  },
};

export const getStatusConfig = (status: PatientStatus): StatusConfig => {
  return statusConfig[status];
};
