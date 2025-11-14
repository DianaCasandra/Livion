import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../constants/Colors';
import { Chip } from '../atoms/Chip';
import { Icon } from '../atoms/Icon';
import { ThemedText } from '../atoms/ThemedText';

export type CareTaskTileProps = {
  title: string;
  description?: string;
  dueDate: Date;
  status: 'due' | 'overdue' | 'completed';
  onPress?: () => void;
  onSnooze?: () => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * CareTaskTile Component
 * Individual care task with status and actions
 * Shows due date, overdue status, snooze option
 */
export const CareTaskTile: React.FC<CareTaskTileProps> = ({
  title,
  description,
  dueDate,
  status,
  onPress,
  onSnooze,
  style,
}) => {
  const getStatusChip = () => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" variant="status-ok" size="sm" />;
      case 'overdue':
        return <Chip label="Overdue" variant="status-action" size="sm" />;
      case 'due':
        return <Chip label="Due" variant="status-attention" size="sm" />;
      default:
        return null;
    }
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      {/* Header: Icon & Status */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon
            name={status === 'completed' ? 'checkCircle' : 'clipboard'}
            color={status === 'completed' ? Colors.status.ok : Colors.primary.teal}
            size={24}
          />
        </View>
        {getStatusChip()}
      </View>

      {/* Title */}
      <ThemedText variant="subtitle" weight="semibold" style={styles.title}>
        {title}
      </ThemedText>

      {/* Description */}
      {description && (
        <ThemedText variant="body" color="secondary" style={styles.description}>
          {description}
        </ThemedText>
      )}

      {/* Footer: Due Date & Actions */}
      <View style={styles.footer}>
        <View style={styles.dueDateContainer}>
          <Icon name="calendar" color={Colors.text.tertiary} size={16} />
          <ThemedText variant="caption" color="tertiary" style={styles.dueDate}>
            {formatDueDate(dueDate)}
          </ThemedText>
        </View>

        {onSnooze && status !== 'completed' && (
          <TouchableOpacity
            onPress={onSnooze}
            style={styles.snoozeButton}
            activeOpacity={0.7}
          >
            <Icon name="clock" color={Colors.primary.indigo} size={16} />
            <ThemedText variant="label" color="indigo" style={styles.snoozeText}>
              Snooze
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary.teal}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.xs,
  },
  description: {
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    marginLeft: Spacing.xs,
  },
  snoozeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  snoozeText: {
    marginLeft: Spacing.xs,
  },
});
