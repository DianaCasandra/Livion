import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function PatientMessages() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Messages</ThemedText>
      <ThemedText style={{marginTop:8}}>Conversation with clinician</ThemedText>
    </View>
  );
}