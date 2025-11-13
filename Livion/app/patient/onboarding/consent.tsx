import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Button } from '../../../components/atoms/Button';
import { Link } from 'expo-router';

export default function Consent() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1">Consent</ThemedText>
      <ThemedText style={{marginTop:8}}>Choose what to share. You can change this later.</ThemedText>
      <View style={{marginTop:20}}>
        <Link href="/patient/home"><Button title="Finish onboarding" /></Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: {flex:1, padding:20, justifyContent:'center', alignItems:'center'} });
