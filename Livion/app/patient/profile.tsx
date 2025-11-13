import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { useMockData } from '../../components/providers/MockDataProvider';

export default function Profile() {
  const m = useMockData();
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Profile</ThemedText>
      <ThemedText style={{marginTop:8}}>Name: {m.user.name}</ThemedText>
      <ThemedText style={{marginTop:4}}>Role: {m.user.role}</ThemedText>
    </View>
  );
}
