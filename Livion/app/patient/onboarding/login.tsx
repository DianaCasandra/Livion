import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Button } from '../../../components/atoms/Button';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1">Sign in</ThemedText>
      <ThemedText style={{marginTop:8}}>Email / phone </ThemedText>
      <View style={{marginTop:20}}>
        <Link href="/patient/onboarding/consent"><Button title="Sign in" /></Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: {flex:1, padding:20, justifyContent:'center', alignItems:'center'} });
