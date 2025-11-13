import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';

export default function DataConnections() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Data Connections</ThemedText>
      <ThemedText style={{marginTop:8}}>Connect Apple Health, EHR (mock).</ThemedText>
    </View>
  );
}