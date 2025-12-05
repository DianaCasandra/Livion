import React, { createContext, ReactNode, useContext } from 'react';

// Mock Data Types
export type Insight = {
  id: string;
  title: string;
  reason: string;
  source: string;
  evidence?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
};

export type CareTask = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'due' | 'overdue' | 'completed';
};

export type ConsentRecord = {
  id: string;
  scope: string;
  status: 'active' | 'pending' | 'revoked';
  grantedDate: Date;
};


export type PatientMetrics = {
  steps: number | null;
  sleep: number | null;   // hours
  mood: string | null;    // textual summary
};

export type PatientData = {
  name: string;
  age: number;
  conditions: string[];
  insights: Insight[];
  careTasks: CareTask[];
  consents: ConsentRecord[];

  metrics: PatientMetrics;
  safetyMessage?: string;
  statusSummary?: string;
};

// Mock Data
const mockPatientData: PatientData = {
  name: 'Jane Doe',
  age: 34,
  conditions: ['Type 2 Diabetes', 'Hypertension'],

  metrics: {
    steps: 7321,
    sleep: 7.2,
    mood: 'Good',
  },

  statusSummary: 'Stable',

  safetyMessage:
    'Your care team has reviewed your latest readings. No urgent concerns — continue your routine and report any symptoms.',

  insights: [
    {
      id: '1',
      title: 'Blood Glucose Trend',
      reason:
        'Your morning blood glucose readings have been consistently higher this week.',
      source: 'Continuous Glucose Monitor',
      evidence:
        'Based on 7 days of CGM data showing average fasting glucose of 145 mg/dL, compared to your target range of 80-130 mg/dL. This pattern suggests potential need for medication adjustment or dietary review.',
      action: {
        label: 'Schedule Review',
        onPress: () => console.log('Schedule review clicked'),
      },
    },
    {
      id: '2',
      title: 'Activity Achievement',
      reason: "10 patients reached their weekly step goal 3 weeks in a row!",
      source: 'Fitness Tracker',
      action: {
        label: 'View Progress',
        onPress: () => console.log('View progress clicked'),
      },
    },
  ],

  careTasks: [
    {
      id: '1',
      title: 'Blood Pressure Check',
      description: 'Take your morning blood pressure reading',
      dueDate: new Date(),
      status: 'due',
    },
    {
      id: '2',
      title: 'Medication Refill',
      description: 'Metformin prescription needs renewal',
      dueDate: new Date(Date.now() - 86400000), // Yesterday
      status: 'overdue',
    },
    {
      id: '3',
      title: 'Weekly Exercise Log Review',
      description: 'Review the commited exercise activities for the week',
      dueDate: new Date(Date.now() + 172800000), // 2 days from now
      status: 'completed',
    },
  ],

  consents: [
    {
      id: '1',
      scope: 'Health Data Sharing',
      status: 'active',
      grantedDate: new Date('2024-01-15'),
    },
    {
      id: '2',
      scope: 'Research Participation',
      status: 'pending',
      grantedDate: new Date('2024-03-01'),
    },
  ],
};

type MockDataContextType = {
  patientData: PatientData;
  updatePatientData: (data: Partial<PatientData>) => void;
};

const MockDataContext = createContext<MockDataContextType | undefined>(
  undefined
);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patientData] = React.useState<PatientData>(mockPatientData);

  const updatePatientData = (data: Partial<PatientData>) => {
    // In real app, this would update state
    console.log('Update patient data:', data);
  };

  return (
    <MockDataContext.Provider
      value={{
        patientData,
        updatePatientData,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within MockDataProvider');
  }
  return context;
};
