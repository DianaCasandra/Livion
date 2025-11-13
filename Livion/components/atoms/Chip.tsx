import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Chip: React.FC<{label:string}> = ({label}) => (
  <View style={styles.chip}><Text style={styles.txt}>{label}</Text></View>
);

const styles = StyleSheet.create({
  chip: { paddingHorizontal:10, paddingVertical:6, backgroundColor:'#eef6f5', borderRadius:16 },
  txt: { color:'#024' }
});
