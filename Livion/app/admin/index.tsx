import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { Link } from 'expo-router';

export default function AdminIndex() {
  return (
    <View style={{padding:16}}>
      <ThemedText variant="h1">Admin</ThemedText>
      <Link href="/admin/dashboard"><ThemedText style={{marginTop:8}}>Open Admin Dashboard</ThemedText></Link>
    </View>
  );
}