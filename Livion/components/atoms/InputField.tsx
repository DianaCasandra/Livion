import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const InputField: React.FC<any> = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, backgroundColor:'#fff' }
});