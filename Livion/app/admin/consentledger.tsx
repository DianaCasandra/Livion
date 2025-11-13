import React from 'react';
import { View, ScrollView } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function ConsentLedger() {
  const ledger = [
    {id:'c1',action:'granted',scope:'Apple Health',when:'2025-01-10'},
    {id:'c2',action:'revoked',scope:'EHR Data',when:'2025-02-01'}
  ];
  return (
    <ScrollView style={{padding:16}}>
      <ThemedText variant="h1">Consent Ledger</ThemedText>
      {ledger.map(l => <View key={l.id} style={{marginTop:12}}><ThemedText>{l.scope}: {l.action} — {l.when}</ThemedText></View>)}
    </ScrollView>
  );
}