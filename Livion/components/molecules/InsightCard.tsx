import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { Button } from '../atoms/Button';
import { Colors } from '../../constants/Colors';

export const InsightCard: React.FC<{title:string; reason:string; source:string; action?:string}> = ({title, reason, source, action}) => {
  return (
    <View style={styles.card}>
      <ThemedText variant="h1">{title}</ThemedText>
      <ThemedText style={{marginTop:6}}>{reason}</ThemedText>
      <ThemedText style={{marginTop:8, fontSize:12}}>Source: {source}</ThemedText>
      {action ? <View style={{marginTop:10}}><Button title={action} onPress={()=>{}}/></View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    marginVertical: 8
  }
});
