import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../../constants/Colors';
import { Chip } from '../atoms/Chip';
import { Icon } from '../atoms/Icon';
import { ThemedText } from '../atoms/ThemedText';

export type ConsentChipProps = {
  scope: string;
  status: 'active' | 'pending' | 'revoked';
  style?: ViewStyle;
};

/**
 * ConsentChip Component
 * Shows data consent scope and current status
 * Part of trust & transparency surfaces
 */
export const ConsentChip: React.FC<ConsentChipProps> = ({
  scope,
  status,
  style,
}) => {
  const getStatusVariant = (): 'status-ok' | 'status-attention' | 'status-action' => {
    switch (status) {
      case 'active':
        return 'status-ok';
      case 'pending':
        return 'status-attention';
      case 'revoked':
        return 'status-action';
      default:
        return 'status-ok';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return 'checkCircle';
      case 'pending':
        return 'clock';
      case 'revoked':
        return 'xCircle';
      default:
        return 'checkCircle';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'revoked':
        return 'Revoked';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.scopeContainer}>
        <Icon name="shield" color={Colors.primary.teal} size={16} />
        <ThemedText variant="label" color="secondary" style={styles.scopeText}>
          {scope}
        </ThemedText>
      </View>
      <Chip
        label={getStatusLabel()}
        variant={getStatusVariant()}
        size="sm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  scopeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scopeText: {
    marginLeft: Spacing.sm,
  },
});
