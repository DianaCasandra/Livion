import React, { createContext, useContext } from 'react';

export type Task = { id: string; title: string; due?: string; status: 'pending'|'done'|'snoozed' };
export type Insight = { id: string; title: string; reason: string; source: string; action?: string };

const mock = {
  user: { id: 'u1', name: 'Ana Popescu', role: 'patient' },
  insights: [
    { id: 'i1', title: 'Blood pressure trend stable', reason: 'Last 7 readings', source: 'Connected cuff', action: 'View' },
    { id: 'i2', title: 'Medication adherence improved', reason: 'Took meds 6/7 days', source: 'Self-report', action: 'Why?' }
  ] as Insight[],
  tasks: [
    { id: 't1', title: 'Take medication X', due: 'Today', status: 'pending' },
    { id: 't2', title: 'Measure BP', due: 'Tomorrow', status: 'pending' }
  ] as Task[],
  consents: [
    { scope: 'Apple Health', status: 'granted' },
    { scope: 'EHR Data', status: 'revoked' }
  ]
};

const MockDataContext = createContext(mock);

export const MockDataProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <MockDataContext.Provider value={mock}>{children}</MockDataContext.Provider>;
};

export const useMockData = () => useContext(MockDataContext);
