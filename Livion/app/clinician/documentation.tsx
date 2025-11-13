import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function DocumentationScreen() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Documentation</ThemedText>
      <ThemedText style={{marginTop:8}}>Clinical notes and export</ThemedText>
    </View>
  );
}