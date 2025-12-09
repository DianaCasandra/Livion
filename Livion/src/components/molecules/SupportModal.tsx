/**
 * SupportModal - Modal shown when user selects "Rough" mood
 * Offers quick access to care team support
 */

import {
  Heart,
  X,
  ChevronRight,
  Phone,
  MessageCircle,
} from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

type SupportModalProps = {
  visible: boolean;
  onClose: () => void;
  onCallDoctor?: () => void;
  onSendMessage?: () => void;
};

export function SupportModal({
  visible,
  onClose,
  onCallDoctor,
  onSendMessage,
}: SupportModalProps) {
  const handleCall = () => {
    onCallDoctor?.();
    onClose();
  };

  const handleMessage = () => {
    onSendMessage?.();
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Heart size={28} color="#fff" />
            </View>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          <ThemedText style={styles.title}>We're here for you</ThemedText>
          <ThemedText style={styles.subtitle}>
            It's okay to have rough days. Would you like to reach out to your care team?
          </ThemedText>

          <View style={styles.actions}>
            <Pressable style={styles.actionBtn} onPress={handleCall}>
              <View style={[styles.actionIcon, { backgroundColor: COLORS.teal + '20' }]}>
                <Phone size={22} color={COLORS.teal} />
              </View>
              <View style={styles.actionText}>
                <ThemedText style={styles.actionTitle}>Call Dr. Sarah</ThemedText>
                <ThemedText style={styles.actionSubtitle}>Family Physician</ThemedText>
              </View>
              <ChevronRight size={20} color={COLORS.textTertiary} />
            </Pressable>

            <Pressable style={styles.actionBtn} onPress={handleMessage}>
              <View style={[styles.actionIcon, { backgroundColor: COLORS.amber + '20' }]}>
                <MessageCircle size={22} color={COLORS.amber} />
              </View>
              <View style={styles.actionText}>
                <ThemedText style={styles.actionTitle}>Send a message</ThemedText>
                <ThemedText style={styles.actionSubtitle}>Get a response within 24h</ThemedText>
              </View>
              <ChevronRight size={20} color={COLORS.textTertiary} />
            </Pressable>
          </View>

          <Pressable style={styles.dismissBtn} onPress={onClose}>
            <ThemedText style={styles.dismissText}>I'm okay for now</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
      },
      android: { elevation: 10 },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  actions: {
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dismissBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dismissText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
});
