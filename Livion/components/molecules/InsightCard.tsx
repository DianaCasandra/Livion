import React, { useState } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../constants/Colors';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ThemedText } from '../atoms/ThemedText';

export type InsightCardProps = {
  title: string;
  reason: string;
  source?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  expandable?: boolean;
  evidence?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * InsightCard Component
 * Displays AI-generated insights with transparency
 * Expandable to show evidence (200-250ms animation)
 */
export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  reason,
  source,
  action,
  expandable = false,
  evidence,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 250, // 200-250ms for meaningful motion
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust based on content
  });

  return (
    <View style={[styles.container, style]}>
      {/* Main Card Content */}
      <View style={styles.content}>
        {/* Title & Icon */}
        <View style={styles.header}>
          <Icon name="lightbulb" color={Colors.accent.gold} size={24} />
          <ThemedText variant="heading" style={styles.title}>
            {title}
          </ThemedText>
        </View>

        {/* Reason */}
        <ThemedText variant="body" color="secondary" style={styles.reason}>
          {reason}
        </ThemedText>

        {/* Source */}
        {source && (
          <View style={styles.sourceContainer}>
            <Icon name="info" color={Colors.text.tertiary} size={16} />
            <ThemedText variant="caption" color="tertiary" style={styles.source}>
              Source: {source}
            </ThemedText>
          </View>
        )}

        {/* Action Button */}
        {action && (
          <Button
            variant="primary"
            size="sm"
            onPress={action.onPress}
            style={styles.actionButton}
          >
            {action.label}
          </Button>
        )}

        {/* Expand Button */}
        {expandable && evidence && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.expandButton}
            activeOpacity={0.7}
          >
            <ThemedText variant="label" color="teal">
              {expanded ? 'Hide Evidence' : 'Show Evidence'}
            </ThemedText>
            <Icon
              name={expanded ? 'chevronUp' : 'chevronDown'}
              color={Colors.primary.teal}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Expandable Evidence Section */}
      {expandable && evidence && (
        <Animated.View style={[styles.evidenceContainer, { maxHeight }]}>
          <View style={styles.evidenceDivider} />
          <ThemedText variant="caption" color="tertiary" style={styles.evidenceLabel}>
            EVIDENCE & TRANSPARENCY
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.evidence}>
            {evidence}
          </ThemedText>
          <ThemedText variant="caption" color="tertiary" style={styles.disclaimer}>
            This is general information, not a diagnosis. Please consult with your healthcare provider.
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    overflow: 'hidden',
    ...Shadows.md,
  },
  content: {
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
  reason: {
    marginBottom: Spacing.md,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  source: {
    marginLeft: Spacing.xs,
  },
  actionButton: {
    marginTop: Spacing.sm,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  evidenceContainer: {
    overflow: 'hidden',
    paddingHorizontal: Spacing.lg,
  },
  evidenceDivider: {
    height: 1,
    backgroundColor: Colors.border.medium,
    marginBottom: Spacing.md,
  },
  evidenceLabel: {
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  evidence: {
    marginBottom: Spacing.md,
    fontFamily: 'Source Serif Pro', // Clinical content font
  },
  disclaimer: {
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
});
