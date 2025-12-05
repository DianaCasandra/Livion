import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ThemedText } from '../atoms/ThemedText';

export type SafetyBannerProps = {
  type: 'info' | 'warning' | 'emergency';
  title: string;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  style?: ViewStyle;
};

/**
 * SafetyBanner Component
 * Triage advice and disclaimers
 * Critical for clinical safety communications
 */
export const SafetyBanner: React.FC<SafetyBannerProps> = ({
  type,
  title,
  message,
  action,
  dismissible = false,
  onDismiss,
  style,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return {
          backgroundColor: `${Colors.primary.teal}15`,
          borderColor: Colors.primary.teal,
          iconColor: Colors.primary.teal,
          icon: 'info',
        };
      case 'warning':
        return {
          backgroundColor: `${Colors.status.attention}15`,
          borderColor: Colors.status.attention,
          iconColor: Colors.status.attention,
          icon: 'alertTriangle',
        };
      case 'emergency':
        return {
          backgroundColor: `${Colors.status.action}15`,
          borderColor: Colors.status.action,
          iconColor: Colors.status.action,
          icon: 'alertCircle',
        };
      default:
        return {
          backgroundColor: `${Colors.primary.teal}15`,
          borderColor: Colors.primary.teal,
          iconColor: Colors.primary.teal,
          icon: 'info',
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: typeStyles.backgroundColor,
          borderColor: typeStyles.borderColor,
        },
        style,
      ]}
    >
      {/* Icon & Title */}
      <View style={styles.header}>
        <Icon name={typeStyles.icon} color={typeStyles.iconColor} size={24} />
        <ThemedText variant="subtitle" weight="semibold" style={styles.title}>
          {title}
        </ThemedText>
        {dismissible && onDismiss && (
          <Button variant="ghost" size="sm" onPress={onDismiss}>
            ✕
          </Button>
        )}
      </View>

      {/* Message */}
      <ThemedText variant="body" color="secondary" style={styles.message}>
        {message}
      </ThemedText>

      {/* Action Button */}
      {action && (
        <Button
          variant={type === 'emergency' ? 'primary' : 'outline'}
          size="sm"
          onPress={action.onPress}
          style={styles.actionButton}
        >
          {action.label}
        </Button>
      )}

      {/* Disclaimer for emergency */}
      {type === 'emergency' && (
        <ThemedText variant="caption" color="tertiary" style={styles.disclaimer}>
          If this is a medical emergency, call 911 or your local emergency number immediately.
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  message: {
    marginBottom: Spacing.md,
  },
  actionButton: {
    marginTop: Spacing.sm,
  },
  disclaimer: {
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },
});
