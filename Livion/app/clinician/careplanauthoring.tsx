import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function CarePlanAuthoring() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Care Plan Authoring</ThemedText>
      <ThemedText style={{marginTop:8}}>Create templates and tasks.</ThemedText>
    </View>
  );
}