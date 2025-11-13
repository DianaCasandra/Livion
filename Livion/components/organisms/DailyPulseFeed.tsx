import React from 'react';
import { View } from 'react-native';
import { InsightCard } from '../molecules/InsightCard';
import { useMockData } from '../providers/MockDataProvider';

export const DailyPulseFeed: React.FC = () => {
  const mock = useMockData();
  return (
    <View>
      {mock.insights.map(i => <InsightCard key={i.id} title={i.title} reason={i.reason} source={i.source} action={i.action} />)}
    </View>
  );
};
