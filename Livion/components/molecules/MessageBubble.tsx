import React from 'react';
import { View, Text } from 'react-native';

export const MessageBubble: React.FC<{from:string; text:string}> = ({from,text}) => (
  <View style={{backgroundColor:'#eef',padding:8,borderRadius:8,marginVertical:6}}>
    <Text style={{fontWeight:'600'}}>{from}</Text>
    <Text>{text}</Text>
  </View>
);
