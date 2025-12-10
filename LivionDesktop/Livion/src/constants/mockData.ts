/**
 * Mock data for the application
 * Centralized data source for patients and appointments
 */

import type { PatientStatus } from './statusConfig';
import type { AppointmentType, AppointmentStatus } from './appointmentConfig';

// ============ PATIENT DATA ============

export interface AIInsight {
  summary: string;
  recommendation: string;
  trend: 'improving' | 'stable' | 'declining';
  urgency: 'low' | 'medium' | 'high';
}

export interface PatientVitals {
  bp: string;
  hr: string;
  temp: string;
  o2: string;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  condition: string;
  status: PatientStatus;
  lastVisit: string;
  nextVisit: string;
  vitals: PatientVitals;
  aiInsight?: AIInsight;
}

export const PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    age: 45,
    condition: 'Hypertension',
    status: 'stable',
    lastVisit: '2024-12-05',
    nextVisit: '2024-12-20',
    vitals: { bp: '128/82', hr: '72', temp: '98.6', o2: '98%' },
  },
  {
    id: '2',
    name: 'Michael Chen',
    initials: 'MC',
    age: 62,
    condition: 'Type 2 Diabetes',
    status: 'attention',
    lastVisit: '2024-12-08',
    nextVisit: '2024-12-15',
    vitals: { bp: '135/88', hr: '78', temp: '98.4', o2: '97%' },
    aiInsight: {
      summary: 'Blood glucose levels showing upward trend over past 2 weeks',
      recommendation: 'Consider adjusting metformin dosage. Schedule follow-up in 1 week.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '3',
    name: 'Emily Davis',
    initials: 'ED',
    age: 38,
    condition: 'Asthma',
    status: 'stable',
    lastVisit: '2024-12-01',
    nextVisit: '2025-01-15',
    vitals: { bp: '118/76', hr: '68', temp: '98.6', o2: '99%' },
  },
  {
    id: '4',
    name: 'James Wilson',
    initials: 'JW',
    age: 71,
    condition: 'Heart Disease',
    status: 'critical',
    lastVisit: '2024-12-09',
    nextVisit: '2024-12-11',
    vitals: { bp: '145/95', hr: '88', temp: '99.1', o2: '94%' },
    aiInsight: {
      summary: 'Elevated troponin levels detected. Possible CHF exacerbation.',
      recommendation: 'Immediate cardiology consult recommended. Consider hospitalization.',
      trend: 'declining',
      urgency: 'high',
    },
  },
  {
    id: '5',
    name: 'Maria Garcia',
    initials: 'MG',
    age: 55,
    condition: 'Chronic Kidney Disease',
    status: 'attention',
    lastVisit: '2024-12-07',
    nextVisit: '2024-12-14',
    vitals: { bp: '142/90', hr: '76', temp: '98.5', o2: '96%' },
    aiInsight: {
      summary: 'eGFR declining from 48 to 42 over 3 months',
      recommendation: 'Review nephrotoxic medications. Consider nephrology referral.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '6',
    name: 'Robert Brown',
    initials: 'RB',
    age: 68,
    condition: 'COPD',
    status: 'stable',
    lastVisit: '2024-12-03',
    nextVisit: '2024-12-17',
    vitals: { bp: '130/84', hr: '74', temp: '98.4', o2: '95%' },
  },
];

// Get patients for preview (prioritize critical/attention)
export const getPreviewPatients = (limit = 4): Patient[] => {
  const sorted = [...PATIENTS].sort((a, b) => {
    const priority = { critical: 0, attention: 1, stable: 2 };
    return priority[a.status] - priority[b.status];
  });
  return sorted.slice(0, limit);
};

// ============ APPOINTMENT DATA ============

export interface Appointment {
  id: string;
  patientName: string;
  patientInitials: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  reason: string;
  status: AppointmentStatus;
}

// Helper to get date key for a date offset from today
const getDateKey = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

export const APPOINTMENTS: Record<string, Appointment[]> = {
  [getDateKey(0)]: [
    {
      id: '1',
      patientName: 'James Wilson',
      patientInitials: 'JW',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'Urgent: Heart Disease Review',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      patientInitials: 'MG',
      startTime: '10:30',
      endTime: '11:00',
      type: 'video',
      reason: 'Lab Results Discussion',
      status: 'confirmed',
    },
    {
      id: '3',
      patientName: 'Michael Chen',
      patientInitials: 'MC',
      startTime: '14:00',
      endTime: '14:30',
      type: 'phone',
      reason: 'Medication Check',
      status: 'pending',
    },
    {
      id: '4',
      patientName: 'Sarah Johnson',
      patientInitials: 'SJ',
      startTime: '15:30',
      endTime: '16:00',
      type: 'in-person',
      reason: 'Follow-up: Hypertension',
      status: 'confirmed',
    },
  ],
  [getDateKey(1)]: [
    {
      id: '5',
      patientName: 'Robert Brown',
      patientInitials: 'RB',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'COPD Check-up',
      status: 'confirmed',
    },
    {
      id: '6',
      patientName: 'Lisa Anderson',
      patientInitials: 'LA',
      startTime: '11:00',
      endTime: '11:30',
      type: 'video',
      reason: 'New Patient Consultation',
      status: 'confirmed',
    },
    {
      id: '7',
      patientName: 'Emily Davis',
      patientInitials: 'ED',
      startTime: '13:30',
      endTime: '14:00',
      type: 'phone',
      reason: 'Prescription Renewal',
      status: 'pending',
    },
    {
      id: '8',
      patientName: 'David Martinez',
      patientInitials: 'DM',
      startTime: '16:00',
      endTime: '16:30',
      type: 'in-person',
      reason: 'Annual Physical',
      status: 'confirmed',
    },
  ],
  [getDateKey(2)]: [
    {
      id: '9',
      patientName: 'Jennifer Lee',
      patientInitials: 'JL',
      startTime: '10:00',
      endTime: '10:30',
      type: 'in-person',
      reason: 'Medication Review',
      status: 'confirmed',
    },
    {
      id: '10',
      patientName: 'Thomas White',
      patientInitials: 'TW',
      startTime: '13:00',
      endTime: '13:30',
      type: 'phone',
      reason: 'Test Results',
      status: 'confirmed',
    },
    {
      id: '11',
      patientName: 'Patricia Moore',
      patientInitials: 'PM',
      startTime: '15:00',
      endTime: '15:30',
      type: 'video',
      reason: 'Follow-up Consultation',
      status: 'pending',
    },
  ],
  [getDateKey(-1)]: [
    {
      id: '12',
      patientName: 'William Taylor',
      patientInitials: 'WT',
      startTime: '09:30',
      endTime: '10:00',
      type: 'in-person',
      reason: 'Cardiac Assessment',
      status: 'completed',
    },
    {
      id: '13',
      patientName: 'Nancy Clark',
      patientInitials: 'NC',
      startTime: '11:30',
      endTime: '12:00',
      type: 'video',
      reason: 'Diabetes Follow-up',
      status: 'completed',
    },
    {
      id: '14',
      patientName: 'George Harris',
      patientInitials: 'GH',
      startTime: '14:00',
      endTime: '14:30',
      type: 'in-person',
      reason: 'Blood Pressure Check',
      status: 'completed',
    },
  ],
  [getDateKey(3)]: [
    {
      id: '15',
      patientName: 'Susan Robinson',
      patientInitials: 'SR',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'Initial Consultation',
      status: 'confirmed',
    },
    {
      id: '16',
      patientName: 'Richard King',
      patientInitials: 'RK',
      startTime: '14:30',
      endTime: '15:00',
      type: 'phone',
      reason: 'Lab Results Review',
      status: 'pending',
    },
  ],
};

// Get today's appointments for preview
export const getTodayAppointments = (): Appointment[] => {
  const today = getDateKey(0);
  return APPOINTMENTS[today] || [];
};

// Get appointments for a specific date
export const getAppointmentsByDate = (dateKey: string): Appointment[] => {
  return APPOINTMENTS[dateKey] || [];
};

// Format date to key
export const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
