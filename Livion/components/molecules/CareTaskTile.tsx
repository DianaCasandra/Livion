import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';

export const CareTaskTile: React.FC<{title:string; due?:string}> = ({title,due}) => (
  <View style={{backgroundColor:'#fff',padding:12,borderRadius:10,marginTop:10}}>
    <ThemedText>{title}</ThemedText>
    {due ? <ThemedText style={{fontSize:12,color:'#666'}}>{due}</ThemedText> : null}
  </View>
);