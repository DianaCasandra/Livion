import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';

export default function RiskScreen() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Risk Screening</ThemedText>
      <ThemedText style={{marginTop:8}}>Simple triage questions (mock).</ThemedText>
    </View>
  );
}