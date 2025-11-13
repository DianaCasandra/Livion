import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

export const SafetyBanner: React.FC<{level:'green'|'amber'|'red'; message:string}> = ({level, message}) => {
  const bg = level === 'red' ? Colors.red : level === 'amber' ? Colors.amber : Colors.green;
  return (
    <View style={[styles.wrap, {backgroundColor: bg}]}>
      <ThemedText style={{color:'#000'}}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 12, borderRadius: 8, marginVertical: 8 }
});