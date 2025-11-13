import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Button } from '../../../components/atoms/Button';
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1">Welcome to Livion</ThemedText>
      <ThemedText style={{marginTop:8}}>We protect what’s yours. You decide who sees your data.</ThemedText>
      <View style={{marginTop:20}}>
        <Link href="/patient/onboarding/login"><Button title="Get started" /></Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: {flex:1, padding:20, justifyContent:'center', alignItems:'center'} });
