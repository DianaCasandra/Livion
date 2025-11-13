import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';

export const PrivacyLedger: React.FC = () => {
  const rows = [
    {id:'l1', text:'Apple Health granted 2025-01-10'},
    {id:'l2', text:'EHR revoked 2025-02-01'}
  ];
  return (
    <View>
      <ThemedText variant="h1">Privacy Ledger</ThemedText>
      {rows.map(r => <ThemedText key={r.id} style={{marginTop:8}}>{r.text}</ThemedText>)}
    </View>
  );
};