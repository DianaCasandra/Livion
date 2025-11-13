import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '../components/atoms/ThemedText';
import { Button } from '../components/atoms/Button';

export default function Index() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1">Livion</ThemedText>
      <ThemedText style={{marginTop:12}}>Your health story. Yours to share.</ThemedText>
      <View style={{marginTop:20}}>
        <Link href="/patient/home"><Button title="Continue as Patient" /></Link>
      </View>
      <View style={{marginTop:12}}>
        <Link href="/clinician/dashboard"><Button title="Continue as Clinician" /></Link>
      </View>
      <View style={{marginTop:12}}>
        <Link href="/admin/dashboard"><Button title="Admin" /></Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20, backgroundColor:'#f6f7fb' }
});

