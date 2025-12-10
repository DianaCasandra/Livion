/**
 * VitalCard - Compact vital display card
 * Shows health metrics with icon, value, and optional progress bar
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Card } from '../atoms/Card';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

type VitalCardProps = {
  icon: LucideIcon;
  iconColor: string;
  value: string | number;
  unit: string;
  subtitle: string;
  progress?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export function VitalCard({
  icon: Icon,
  iconColor,
  value,
  unit,
  subtitle,
  progress,
  style,
  onPress,
}: VitalCardProps) {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <View style={styles.iconRow}>
        <View style={[styles.iconCircle, { backgroundColor: iconColor + '20' }]}>
          <Icon size={24} color={iconColor} strokeWidth={2.5} />
        </View>
      </View>
      <View style={styles.valueRow}>
        <ThemedText style={styles.value}>{value}</ThemedText>
        {unit ? <ThemedText style={styles.unit}>{unit}</ThemedText> : null}
      </View>
      <ThemedText style={[styles.subtitle, { color: iconColor }]}>{subtitle}</ThemedText>
      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: iconColor }]} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 0,
    backgroundColor: COLORS.cardWhite,
  },
  iconRow: {
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  unit: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
