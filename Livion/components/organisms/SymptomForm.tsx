import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { InputField } from '../atoms/InputField';
import { Button } from '../atoms/Button';

export const SymptomForm: React.FC = () => {
  return (
    <View style={{marginTop:12}}>
      <ThemedText>How are you feeling today?</ThemedText>
      <InputField placeholder="Describe symptoms" />
      <View style={{marginTop:10}}><Button title="Submit" onPress={()=>{}}/></View>
    </View>
  );
};
