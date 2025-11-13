import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { Link } from 'expo-router';
import { Button } from '../../components/atoms/Button';

export default function ClinicianLogin() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:20}}>
      <ThemedText variant="h1">Sign in</ThemedText>
      <Link href="/clinician/dashboard"><Button title="Sign in" /></Link>
    </View>
  );
}