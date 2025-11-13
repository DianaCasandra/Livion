import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { useMockData } from '../../components/providers/MockDataProvider';
import { Button } from '../../components/atoms/Button';

export default function CarePlan() {
  const mock = useMockData();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText variant="h1">Care Plan</ThemedText>
      {mock.tasks.map(t => (
        <View key={t.id} style={styles.tile}>
          <ThemedText>{t.title}</ThemedText>
          <ThemedText style={{fontSize:12, color:'#555'}}>{t.due}</ThemedText>
        </View>
      ))}
      <View style={{marginTop:12}}><Button title="Mark all complete" onPress={()=>{}}/></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:16 },
  tile: { backgroundColor:'#fff', padding:12, borderRadius:10, marginTop:10 }
});
