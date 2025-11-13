import React from 'react';
import { View } from 'react-native';
import { Chip } from '../atoms/Chip';

export const ConsentChip: React.FC<{scope:string; status:string}> = ({scope,status}) => (
  <View style={{marginTop:8}}><Chip label={`${scope}: ${status}`} /></View>
);