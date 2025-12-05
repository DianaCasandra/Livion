import React from 'react';
import { View } from 'react-native';
import { InsightCard } from '../../src/components/molecules/InsightCard';
import { useMockData } from '../providers/MockDataProvider';

export const DailyPulseFeed: React.FC = () => {
  const { patientData } = useMockData();
  
  return (
    <View>
      {patientData.insights.map(i => (
        <InsightCard 
          key={i.id} 
          title={i.title} 
          reason={i.reason} 
          source={i.source} 
          action={i.action} 
        />
      ))}
    </View>
  );
};