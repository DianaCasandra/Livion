/**
 * SideMenu - Hamburger menu drawer
 * Slides in from the right with profile and navigation options
 */

import {
  User,
  BookOpen,
  Stethoscope,
  Settings,
  HelpCircle,
  X,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Menu items configuration
const MENU_ITEMS = [
  { id: 'profile', icon: User, label: 'My Profile', color: COLORS.teal },
  { id: 'glossary', icon: BookOpen, label: 'Lab Results & Glossary', color: COLORS.amber },
  { id: 'doctors', icon: Stethoscope, label: 'My Doctors', color: COLORS.success },
  { id: 'settings', icon: Settings, label: 'Settings', color: COLORS.textSecondary },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', color: COLORS.textSecondary },
];

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  userName?: string;
  userEmail?: string;
};

export function SideMenu({
  visible,
  onClose,
  onNavigate,
  userName = 'Darian',
  userEmail = 'darian@email.com',
}: SideMenuProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset to starting position before animating in
      slideAnim.setValue(SCREEN_WIDTH);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleMenuPress = (id: string) => {
    // Close menu first, then navigate
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      // Handle navigation based on menu item
      switch (id) {
        case 'glossary':
          onNavigate('LabResults');
          break;
        case 'profile':
        case 'doctors':
        case 'settings':
        case 'help':
          console.log('Menu item pressed:', id);
          break;
        default:
          break;
      }
    });
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
      <View style={styles.menuContainer}>
        <Animated.View style={[styles.menuBackdrop, { opacity: fadeAnim }]}>
          <Pressable style={styles.menuBackdropPress} onPress={handleClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.menuPanel,
            {
              transform: [{ translateX: slideAnim }],
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <View style={styles.menuProfileSection}>
              <View style={styles.menuAvatar}>
                <ThemedText style={styles.menuAvatarText}>{userName.charAt(0)}</ThemedText>
              </View>
              <View style={styles.menuProfileInfo}>
                <ThemedText style={styles.menuProfileName}>{userName}</ThemedText>
                <ThemedText style={styles.menuProfileEmail}>{userEmail}</ThemedText>
              </View>
            </View>
            <Pressable style={styles.menuCloseBtn} onPress={handleClose}>
              <X size={24} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={[styles.menuItemIcon, { backgroundColor: item.color + '15' }]}>
                  <item.icon size={22} color={item.color} />
                </View>
                <ThemedText style={styles.menuItemLabel}>{item.label}</ThemedText>
                <ChevronRight size={20} color={COLORS.textTertiary} />
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.menuFooter}>
            <Pressable style={styles.menuLogout} onPress={() => handleMenuPress('logout')}>
              <LogOut size={20} color={COLORS.error} />
              <ThemedText style={styles.menuLogoutText}>Log Out</ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuBackdropPress: {
    flex: 1,
  },
  menuPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: COLORS.cardWhite,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: -4, height: 0 },
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.cardWhite,
  },
  menuProfileInfo: {
    flex: 1,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  menuProfileEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 20,
  },
  menuLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLogoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
  },
});
