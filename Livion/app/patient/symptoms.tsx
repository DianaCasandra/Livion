import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function Symptoms() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Symptoms Tracker</ThemedText>
      <ThemedText style={{marginTop:8}}>PROs and symptom forms (mock).</ThemedText>
    </View>
  );
}