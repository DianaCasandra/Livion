import React from 'react';
import { Text } from 'react-native';

export const Icon: React.FC<{name:string; size?:number}> = ({name,size=16}) => {
  return <Text style={{fontSize:size}}>{name}</Text>;
};