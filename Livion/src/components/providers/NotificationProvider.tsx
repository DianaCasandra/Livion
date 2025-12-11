/**
 * NotificationProvider - Global notification banners
 * Shows reminder notifications that slide down from the top
 */

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Droplets, Moon, X, CheckCircle2, LucideIcon } from 'lucide-react-native';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

type Reminder = {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  question: string;
  options: string[];
};

type NotificationContextType = {
  startReminders: () => void;
  stopReminders: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const REMINDERS: Reminder[] = [
  { id: 'water', icon: Droplets, color: COLORS.teal, title: 'Hidratare', question: 'Câte pahare de apă ai băut azi?', options: ['1-2', '3-4', '5-6', '7+'] },
  { id: 'sleep', icon: Moon, color: COLORS.purple, title: 'Somn', question: 'Cum ai dormit noaptea trecută?', options: ['Foarte bine', 'Bine', 'Așa și așa', 'Rău'] },
];

type NotificationProviderProps = {
  children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [currentReminderIndex, setCurrentReminderIndex] = useState(-1);
  const [reminderResponse, setReminderResponse] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const notificationSlide = useRef(new Animated.Value(-250)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentReminder = currentReminderIndex >= 0 ? REMINDERS[currentReminderIndex] : null;

  const startReminders = () => {
    if (isActive) return;
    setIsActive(true);

    // Show first reminder after 20 seconds
    timerRef.current = setTimeout(() => {
      setCurrentReminderIndex(0);
    }, 20000);
  };

  const stopReminders = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentReminderIndex(-1);
  };

  // Animate notification in when currentReminderIndex changes
  useEffect(() => {
    if (currentReminderIndex >= 0 && currentReminderIndex < REMINDERS.length) {
      notificationSlide.setValue(-250);
      Animated.spring(notificationSlide, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 9,
      }).start();
    }
  }, [currentReminderIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleReminderResponse = (response: string) => {
    setReminderResponse(response);
    setTimeout(() => {
      Animated.timing(notificationSlide, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setReminderResponse(null);
        if (currentReminderIndex < REMINDERS.length - 1) {
          // Delay before showing next notification (90 seconds)
          setTimeout(() => {
            setCurrentReminderIndex(currentReminderIndex + 1);
          }, 90000);
        } else {
          setCurrentReminderIndex(-1);
        }
      });
    }, 1200);
  };

  const dismissReminder = () => {
    Animated.timing(notificationSlide, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentReminderIndex < REMINDERS.length - 1) {
        // Delay before showing next notification (90 seconds)
        setTimeout(() => {
          setCurrentReminderIndex(currentReminderIndex + 1);
        }, 90000);
      } else {
        setCurrentReminderIndex(-1);
      }
    });
  };

  return (
    <NotificationContext.Provider value={{ startReminders, stopReminders }}>
      {children}

      {/* Global Notification Banner */}
      {currentReminder && (
        <Animated.View
          style={[
            styles.notificationBanner,
            { transform: [{ translateY: notificationSlide }] },
          ]}
        >
          <SafeAreaView edges={['top']} style={styles.notificationSafeArea}>
            <View style={styles.notificationCard}>
              {/* Colored Header */}
              <View style={[styles.notificationHeaderBar, { backgroundColor: currentReminder.color }]}>
                <View style={styles.notificationHeaderContent}>
                  <View style={styles.notificationIconWrap}>
                    {React.createElement(currentReminder.icon, { size: 18, color: '#fff' })}
                  </View>
                  <ThemedText style={styles.notificationTitle}>{currentReminder.title}</ThemedText>
                </View>
                <Pressable style={styles.notificationDismiss} onPress={dismissReminder}>
                  <X size={16} color="rgba(255,255,255,0.8)" />
                </Pressable>
              </View>

              {/* Body */}
              <View style={styles.notificationBody}>
                <ThemedText style={styles.notificationQuestion}>{currentReminder.question}</ThemedText>

                {reminderResponse ? (
                  <View style={styles.notificationThankYou}>
                    <CheckCircle2 size={22} color={currentReminder.color} />
                    <ThemedText style={[styles.notificationThankYouText, { color: currentReminder.color }]}>Mulțumim pentru răspuns!</ThemedText>
                  </View>
                ) : (
                  <View style={styles.notificationOptions}>
                    {currentReminder.options.map((option) => (
                      <Pressable
                        key={option}
                        style={styles.notificationOption}
                        onPress={() => handleReminderResponse(option)}
                      >
                        <ThemedText style={styles.notificationOptionText}>
                          {option}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  notificationBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  notificationSafeArea: {
    backgroundColor: 'transparent',
  },
  notificationCard: {
    backgroundColor: COLORS.cardWhite,
    marginHorizontal: 12,
    marginTop: 40,
    borderRadius: 18,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 25,
      },
      android: { elevation: 12 },
    }),
  },
  notificationHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  notificationHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDismiss: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  notificationBody: {
    padding: 18,
    paddingTop: 16,
  },
  notificationQuestion: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  notificationOption: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notificationOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  notificationThankYou: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  notificationThankYouText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
