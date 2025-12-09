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
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: iconColor + '18' }]}>
          <Icon size={22} color={iconColor} strokeWidth={2.5} />
        </View>
        <View style={styles.info}>
          <View style={styles.valueRow}>
            <ThemedText style={styles.value}>{value}</ThemedText>
            {unit ? <ThemedText style={styles.unit}>{unit}</ThemedText> : null}
          </View>
          <ThemedText style={[styles.subtitle, { color: iconColor }]}>{subtitle}</ThemedText>
        </View>
      </View>
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
    padding: 16,
    marginBottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
