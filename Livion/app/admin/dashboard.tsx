import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { Link } from 'expo-router';

export default function AdminDashboard() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Admin Dashboard</ThemedText>
      <Link href="/admin/consentledger"><ThemedText style={{marginTop:10}}>Consent Ledger</ThemedText></Link>
    </View>
  );
}