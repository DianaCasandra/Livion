import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '../../constants/Colors';
import { ThemedText } from './ThemedText';

export type InputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
};

/**
 * InputField Component
 * Accessible input with labels and error states
 * WCAG AA contrast requirements
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <ThemedText
          variant="label"
          color="secondary"
          style={styles.label}
        >
          {label}
        </ThemedText>
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Colors.text.tertiary}
      />
      {error && (
        <ThemedText
          variant="caption"
          style={[styles.helperText, { color: Colors.status.action }]}
        >
          {error}
        </ThemedText>
      )}
      {!error && helperText && (
        <ThemedText
          variant="caption"
          color="tertiary"
          style={styles.helperText}
        >
          {helperText}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background.cardGlass,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    color: Colors.text.primary,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.sans,
  },
  inputError: {
    borderColor: Colors.status.action,
  },
  helperText: {
    marginTop: Spacing.xs,
  },
});
