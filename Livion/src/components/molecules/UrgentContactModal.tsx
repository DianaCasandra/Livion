/**
 * UrgentContactModal - Emergency contact modal for severe symptoms
 * Shows automatically when symptoms are critical and provides quick contact options
 */

import { Ionicons } from '@expo/vector-icons';
import { Phone, MessageCircle, AlertTriangle, X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, BorderRadius, Spacing } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';
import { useLanguage } from '../providers/LanguageProvider';

type UrgentContactModalProps = {
  visible: boolean;
  onClose: () => void;
  onChat: () => void;
  doctorName?: string;
  doctorPhone?: string;
  severity?: 'high' | 'critical';
};

export function UrgentContactModal({
  visible,
  onClose,
  onChat,
  doctorName = 'Dr. Diana',
  doctorPhone = '+40 721 123 456',
  severity = 'high',
}: UrgentContactModalProps) {
  const { t } = useLanguage();
  // Animation values
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Entry animation
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Pulse animation for alert icon
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleCall = () => {
    const phoneNumber = doctorPhone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmergency = () => {
    Linking.openURL('tel:112');
  };

  const isCritical = severity === 'critical';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalCard,
            { transform: [{ scale }], opacity },
          ]}
        >
          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={22} color={COLORS.textSecondary} />
          </Pressable>

          {/* Alert Icon */}
          <View style={styles.alertIconContainer}>
            <Animated.View
              style={[
                styles.alertIconBg,
                isCritical && styles.alertIconBgCritical,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <AlertTriangle
                size={32}
                color={isCritical ? COLORS.error : COLORS.warning}
              />
            </Animated.View>
          </View>

          {/* Title */}
          <ThemedText style={styles.title}>
            {isCritical ? t.urgent.urgentAttention : t.urgent.highSymptomAlert}
          </ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>
            {isCritical
              ? t.urgent.criticalDescription
              : t.urgent.highDescription}
          </ThemedText>

          {/* Doctor Info Card */}
          <View style={styles.doctorCard}>
            <View style={styles.doctorAvatar}>
              <ThemedText style={styles.doctorAvatarText}>
                {doctorName.charAt(0)}
              </ThemedText>
            </View>
            <View style={styles.doctorInfo}>
              <ThemedText style={styles.doctorName}>{doctorName}</ThemedText>
              <ThemedText style={styles.doctorRole}>{t.symptoms.familyPhysician}</ThemedText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {/* Call Doctor Button */}
            <Pressable style={styles.callButton} onPress={handleCall}>
              <Phone size={20} color={COLORS.cardWhite} />
              <ThemedText style={styles.callButtonText}>
                {t.urgent.callDoctor} {doctorName.split(' ')[0]}
              </ThemedText>
            </Pressable>

            {/* Chat Button */}
            <Pressable style={styles.chatButton} onPress={onChat}>
              <MessageCircle size={20} color={COLORS.teal} />
              <ThemedText style={styles.chatButtonText}>{t.urgent.sendMessage}</ThemedText>
            </Pressable>
          </View>

          {/* Emergency Option */}
          {isCritical && (
            <Pressable style={styles.emergencyButton} onPress={handleEmergency}>
              <Ionicons name="warning" size={18} color={COLORS.error} />
              <ThemedText style={styles.emergencyText}>
                {t.urgent.callEmergency}
              </ThemedText>
            </Pressable>
          )}

          {/* Dismiss Option */}
          <Pressable style={styles.dismissButton} onPress={onClose}>
            <ThemedText style={styles.dismissText}>
              {t.urgent.dismissAlert}
            </ThemedText>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalCard: {
    width: '100%',
    backgroundColor: COLORS.cardWhite,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.lg,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
      },
      android: { elevation: 8 },
    }),
  },

  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },

  alertIconContainer: {
    marginTop: 8,
    marginBottom: 16,
  },

  alertIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.warningLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertIconBgCritical: {
    backgroundColor: COLORS.errorLight,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
  },

  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },

  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  doctorAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  doctorInfo: {
    flex: 1,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  doctorRole: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  actionButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.teal,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },

  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tealLight,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },

  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.teal,
  },

  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.errorLight,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.error,
  },

  emergencyText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.error,
  },

  dismissButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  dismissText: {
    fontSize: 14,
    color: COLORS.textTertiary,
    textDecorationLine: 'underline',
  },
});
