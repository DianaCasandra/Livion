import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { DailyPulseFeed } from '../../components/organisms/DailyPulseFeed';
import { ThemedText } from '../../components/atoms/ThemedText';
import { SafetyBanner } from '../../components/molecules/SafetyBanner';
import { useMockData } from '../../components/providers/MockDataProvider';
import { Link } from 'expo-router';

export default function Home() {
  const mock = useMockData();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText variant="h1">Daily Pulse</ThemedText>
      <SafetyBanner level="amber" message="This is general information, not a diagnosis." />
      <DailyPulseFeed />
      <View style={{height:24}}/>
      <Link href="/patient/careplan"><ThemedText>Go to Care Plan →</ThemedText></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:16, backgroundColor:'#f2f5f8' }
});
