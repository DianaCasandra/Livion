import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function ClinicianMessages() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Clinician Messages</ThemedText>
      <ThemedText style={{marginTop:8}}>Secure messaging</ThemedText>
    </View>
  );
}