import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function WebViewScreen() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Web Content</ThemedText>
      <ThemedText style={{marginTop:8}}>Embedded educational content</ThemedText>
    </View>
  );
}