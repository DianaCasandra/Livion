/**
 * TaskItem - Task item with checkbox
 * Shows task with title, time, and completion state
 */

import { CheckCircle2 } from 'lucide-react-native';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

type TaskItemProps = {
  title: string;
  time?: string | null;
  done: boolean;
  onToggle: () => void;
};

export function TaskItem({ title, time, done, onToggle }: TaskItemProps) {
  return (
    <Pressable onPress={onToggle}>
      <View style={[styles.item, done && styles.itemDone]}>
        <View style={[styles.checkbox, done && styles.checkboxDone]}>
          {done && <CheckCircle2 size={18} color={COLORS.teal} />}
        </View>
        <View style={styles.content}>
          <ThemedText style={[styles.title, done && styles.titleDone]}>{title}</ThemedText>
          {time && <ThemedText style={styles.time}>{time}</ThemedText>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  itemDone: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    borderColor: COLORS.teal,
    backgroundColor: COLORS.tealLight,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  time: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 3,
  },
});
