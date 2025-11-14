import React from 'react';
import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { InputField } from '../atoms/InputField';
import { ThemedText } from '../atoms/ThemedText';

export const SymptomForm: React.FC = () => {
  return (
    <View style={{marginTop:12}}>
      <ThemedText>How are you feeling today?</ThemedText>
      <InputField placeholder="Describe symptoms" />
      <View style={{marginTop:10}}><Button onPress={()=>{}}>Submit</Button></View>
    </View>
  );
};
