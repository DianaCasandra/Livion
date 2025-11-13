import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function PatientDetails() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Patient: Ana Popescu</ThemedText>
      <ThemedText style={{marginTop:8}}>BP: 128/78 • HR: 72</ThemedText>
      <ThemedText style={{marginTop:12}}>Last notes: Medication adherence improved.</ThemedText>
    </View>
  );
}