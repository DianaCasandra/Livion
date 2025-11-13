import React from 'react';
import { View } from 'react-native';
import { CareTaskTile } from '../molecules/CareTaskTile';
import { useMockData } from '../providers/MockDataProvider';

export const TaskList: React.FC = () => {
  const m = useMockData();
  return (
    <View>
      {m.tasks.map(t => <CareTaskTile key={t.id} title={t.title} due={t.due} />)}
    </View>
  );
};