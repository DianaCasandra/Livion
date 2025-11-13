import React from 'react';
import { View, ScrollView } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function RiskRegister() {
  const rows = [
    {id:'r1', title:'BP > 180', action:'Escalate'},
    {id:'r2', title:'Missed meds > 3 days', action:'Follow-up'}
  ];
  return (
    <ScrollView style={{padding:16}}>
      <ThemedText variant="h1">Risk Register</ThemedText>
      {rows.map(r => <View key={r.id} style={{marginTop:12}}><ThemedText>{r.title} — {r.action}</ThemedText></View>)}
    </ScrollView>
  );
}