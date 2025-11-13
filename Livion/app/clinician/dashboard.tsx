import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { Link } from 'expo-router';

export default function ClinicianDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText variant="h1">Clinician Dashboard</ThemedText>
      <ThemedText style={{marginTop:8}}>Patients needing attention</ThemedText>
      <View style={{marginTop:12}}>
        <Link href="/clinician/patientdetails?id=patient-1"><ThemedText>Open patient</ThemedText></Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { padding:16 } });