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
    name: 'Ana Popescu',
    initials: 'AP',
    age: 45,
    condition: 'Hipertensiune',
    status: 'stable',
    lastVisit: '2024-12-05',
    nextVisit: '2024-12-20',
    vitals: { bp: '128/82', hr: '72', temp: '36.4', o2: '98%' },
  },
  {
    id: '2',
    name: 'Ion Ionescu',
    initials: 'II',
    age: 62,
    condition: 'Diabet Tip 2',
    status: 'attention',
    lastVisit: '2024-12-08',
    nextVisit: '2024-12-15',
    vitals: { bp: '135/88', hr: '78', temp: '36.9', o2: '97%' },
    aiInsight: {
      summary: 'Nivelurile glicemiei arată o tendință ascendentă în ultimele 2 săptămâni',
      recommendation: 'Luați în considerare ajustarea dozei de metformin. Programați control în 1 săptămână.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '3',
    name: 'Elena Dumitrescu',
    initials: 'ED',
    age: 38,
    condition: 'Astm',
    status: 'stable',
    lastVisit: '2024-12-01',
    nextVisit: '2025-01-15',
    vitals: { bp: '118/76', hr: '68', temp: '36.4', o2: '99%' },
  },
  {
    id: '4',
    name: 'Gheorghe Munteanu',
    initials: 'GM',
    age: 71,
    condition: 'Boală Cardiacă',
    status: 'critical',
    lastVisit: '2024-12-09',
    nextVisit: '2024-12-11',
    vitals: { bp: '145/95', hr: '88', temp: '37.3', o2: '94%' },
    aiInsight: {
      summary: 'Niveluri crescute de troponină detectate. Posibilă exacerbare ICC.',
      recommendation: 'Consult cardiologic imediat recomandat. Luați în considerare spitalizarea.',
      trend: 'declining',
      urgency: 'high',
    },
  },
  {
    id: '5',
    name: 'Maria Georgescu',
    initials: 'MG',
    age: 55,
    condition: 'Boală Cronică de Rinichi',
    status: 'attention',
    lastVisit: '2024-12-07',
    nextVisit: '2024-12-14',
    vitals: { bp: '142/90', hr: '76', temp: '36.9', o2: '96%' },
    aiInsight: {
      summary: 'eGFR în scădere de la 48 la 42 în ultimele 3 luni',
      recommendation: 'Revizuiți medicamentele nefrotoxice. Luați în considerare trimiterea la nefrolog.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '6',
    name: 'Vasile Stoica',
    initials: 'VS',
    age: 68,
    condition: 'BPOC',
    status: 'stable',
    lastVisit: '2024-12-03',
    nextVisit: '2024-12-17',
    vitals: { bp: '130/84', hr: '74', temp: '36.9', o2: '95%' },
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
      patientName: 'Gheorghe Munteanu',
      patientInitials: 'GM',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'Urgent: Evaluare Cardiacă',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Maria Georgescu',
      patientInitials: 'MG',
      startTime: '10:30',
      endTime: '11:00',
      type: 'video',
      reason: 'Discuție Rezultate Analize',
      status: 'confirmed',
    },
    {
      id: '3',
      patientName: 'Ion Ionescu',
      patientInitials: 'II',
      startTime: '14:00',
      endTime: '14:30',
      type: 'phone',
      reason: 'Verificare Medicație',
      status: 'pending',
    },
    {
      id: '4',
      patientName: 'Ana Popescu',
      patientInitials: 'AP',
      startTime: '15:30',
      endTime: '16:00',
      type: 'in-person',
      reason: 'Control: Hipertensiune',
      status: 'confirmed',
    },
  ],
  [getDateKey(1)]: [
    {
      id: '5',
      patientName: 'Vasile Stoica',
      patientInitials: 'VS',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'Control BPOC',
      status: 'confirmed',
    },
    {
      id: '6',
      patientName: 'Cristina Moldovan',
      patientInitials: 'CM',
      startTime: '11:00',
      endTime: '11:30',
      type: 'video',
      reason: 'Consultație Pacient Nou',
      status: 'confirmed',
    },
    {
      id: '7',
      patientName: 'Elena Dumitrescu',
      patientInitials: 'ED',
      startTime: '13:30',
      endTime: '14:00',
      type: 'phone',
      reason: 'Reînnoire Rețetă',
      status: 'pending',
    },
    {
      id: '8',
      patientName: 'Andrei Vasilescu',
      patientInitials: 'AV',
      startTime: '16:00',
      endTime: '16:30',
      type: 'in-person',
      reason: 'Examen Fizic Anual',
      status: 'confirmed',
    },
  ],
  [getDateKey(2)]: [
    {
      id: '9',
      patientName: 'Mihaela Popa',
      patientInitials: 'MP',
      startTime: '10:00',
      endTime: '10:30',
      type: 'in-person',
      reason: 'Revizuire Medicație',
      status: 'confirmed',
    },
    {
      id: '10',
      patientName: 'Tudor Marinescu',
      patientInitials: 'TM',
      startTime: '13:00',
      endTime: '13:30',
      type: 'phone',
      reason: 'Rezultate Teste',
      status: 'confirmed',
    },
    {
      id: '11',
      patientName: 'Patricia Stan',
      patientInitials: 'PS',
      startTime: '15:00',
      endTime: '15:30',
      type: 'video',
      reason: 'Consultație de Control',
      status: 'pending',
    },
  ],
  [getDateKey(-1)]: [
    {
      id: '12',
      patientName: 'Victor Tănase',
      patientInitials: 'VT',
      startTime: '09:30',
      endTime: '10:00',
      type: 'in-person',
      reason: 'Evaluare Cardiacă',
      status: 'completed',
    },
    {
      id: '13',
      patientName: 'Nicoleta Diaconu',
      patientInitials: 'ND',
      startTime: '11:30',
      endTime: '12:00',
      type: 'video',
      reason: 'Control Diabet',
      status: 'completed',
    },
    {
      id: '14',
      patientName: 'Gabriel Horia',
      patientInitials: 'GH',
      startTime: '14:00',
      endTime: '14:30',
      type: 'in-person',
      reason: 'Control Tensiune',
      status: 'completed',
    },
  ],
  [getDateKey(3)]: [
    {
      id: '15',
      patientName: 'Sofia Rusu',
      patientInitials: 'SR',
      startTime: '09:00',
      endTime: '09:30',
      type: 'in-person',
      reason: 'Consultație Inițială',
      status: 'confirmed',
    },
    {
      id: '16',
      patientName: 'Radu Ciobanu',
      patientInitials: 'RC',
      startTime: '14:30',
      endTime: '15:00',
      type: 'phone',
      reason: 'Revizuire Rezultate Analize',
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
