import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function SettingsScreen() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Settings</ThemedText>
      <ThemedText style={{marginTop:8}}>Preferences, privacy, theme.</ThemedText>
    </View>
  );
}