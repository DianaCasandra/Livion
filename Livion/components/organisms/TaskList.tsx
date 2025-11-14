import React from 'react';
import { View } from 'react-native';
import { CareTaskTile } from '../molecules/CareTaskTile';
import { useMockData } from '../providers/MockDataProvider';

export const TaskList: React.FC = () => {
  const { patientData } = useMockData();
  
  return (
    <View>
      {patientData.careTasks.map((t) => (
        <CareTaskTile 
          key={t.id} 
          title={t.title}
          dueDate={t.dueDate}
          status={t.status}
        />
      ))}
    </View>
  );
};