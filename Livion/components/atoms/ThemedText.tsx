import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

export const ThemedText: React.FC<TextProps & {variant?: 'h1'|'body'}> = ({children, style, variant='body', ...rest}) => {
  const color = useThemeColor('textLight');
  const fontSize = variant === 'h1' ? 20 : 16;
  return <Text style={[{color, fontSize, lineHeight: Math.round(fontSize*1.4)}, style]} {...rest}>{children}</Text>;
};
