import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Link } from 'expo-router';
import { Button } from '../../../components/atoms/Button';

export default function OnboardingIndex() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Get started</ThemedText>
      <Link href="/patient/onboarding/welcome"><Button title="Welcome" /></Link>
      <View style={{height:12}} />
      <Link href="/patient/onboarding/login"><Button title="Login" /></Link>
    </View>
  );
}