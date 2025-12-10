/**
 * Appointment type configuration
 * Shared across Calendar and CalendarPreview
 */

import { MapPin, Video, Phone } from 'lucide-react';
import { COLORS } from './colors';

export type AppointmentType = 'in-person' | 'video' | 'phone';
export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface TypeConfig {
  icon: typeof MapPin;
  color: string;
  bgColor: string;
  label: string;
}

export const appointmentTypeConfig: Record<AppointmentType, TypeConfig> = {
  'in-person': {
    icon: MapPin,
    color: COLORS.teal,
    bgColor: COLORS.tealLight,
    label: 'In-Person',
  },
  video: {
    icon: Video,
    color: COLORS.blue,
    bgColor: COLORS.blueLight,
    label: 'Video Call',
  },
  phone: {
    icon: Phone,
    color: COLORS.purple,
    bgColor: COLORS.purpleLight,
    label: 'Phone',
  },
};

export const getAppointmentTypeConfig = (type: AppointmentType): TypeConfig => {
  return appointmentTypeConfig[type];
};
