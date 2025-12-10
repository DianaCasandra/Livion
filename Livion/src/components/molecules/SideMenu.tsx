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
  Globe,
  Check,
} from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
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
import { useLanguage } from '../providers/LanguageProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Menu items will be generated dynamically based on language

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
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Menu items configuration with translations
  const MENU_ITEMS = [
    { id: 'profile', icon: User, label: t.menu.myProfile, color: COLORS.teal },
    { id: 'glossary', icon: BookOpen, label: t.menu.labResults, color: COLORS.amber },
    { id: 'doctors', icon: Stethoscope, label: t.menu.myDoctors, color: COLORS.success },
    { id: 'language', icon: Globe, label: t.menu.language, color: COLORS.teal },
    { id: 'settings', icon: Settings, label: t.menu.settings, color: COLORS.textSecondary },
    { id: 'help', icon: HelpCircle, label: t.menu.helpSupport, color: COLORS.textSecondary },
  ];

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
    // Handle language toggle without closing menu
    if (id === 'language') {
      setShowLanguageSelector(!showLanguageSelector);
      return;
    }

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
      setShowLanguageSelector(false);
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

  const handleLanguageSelect = async (lang: 'en' | 'ro') => {
    await setLanguage(lang);
    setShowLanguageSelector(false);
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
              <React.Fragment key={item.id}>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.id)}
                >
                  <View style={[styles.menuItemIcon, { backgroundColor: item.color + '15' }]}>
                    <item.icon size={22} color={item.color} />
                  </View>
                  <ThemedText style={styles.menuItemLabel}>{item.label}</ThemedText>
                  {item.id === 'language' ? (
                    <View style={styles.languageIndicator}>
                      <ThemedText style={styles.currentLanguage}>
                        {language === 'en' ? 'EN' : 'RO'}
                      </ThemedText>
                      <ChevronRight
                        size={20}
                        color={COLORS.textTertiary}
                        style={{ transform: [{ rotate: showLanguageSelector ? '90deg' : '0deg' }] }}
                      />
                    </View>
                  ) : (
                    <ChevronRight size={20} color={COLORS.textTertiary} />
                  )}
                </Pressable>

                {/* Language Selector Dropdown */}
                {item.id === 'language' && showLanguageSelector && (
                  <View style={styles.languageSelector}>
                    <Pressable
                      style={[styles.languageOption, language === 'en' && styles.languageOptionSelected]}
                      onPress={() => handleLanguageSelect('en')}
                    >
                      <ThemedText style={[styles.languageOptionText, language === 'en' && styles.languageOptionTextSelected]}>
                        {t.language.english}
                      </ThemedText>
                      {language === 'en' && <Check size={18} color={COLORS.teal} />}
                    </Pressable>
                    <Pressable
                      style={[styles.languageOption, language === 'ro' && styles.languageOptionSelected]}
                      onPress={() => handleLanguageSelect('ro')}
                    >
                      <ThemedText style={[styles.languageOptionText, language === 'ro' && styles.languageOptionTextSelected]}>
                        {t.language.romanian}
                      </ThemedText>
                      {language === 'ro' && <Check size={18} color={COLORS.teal} />}
                    </Pressable>
                  </View>
                )}
              </React.Fragment>
            ))}
          </ScrollView>

          <View style={styles.menuFooter}>
            <Pressable style={styles.menuLogout} onPress={() => handleMenuPress('logout')}>
              <LogOut size={20} color={COLORS.error} />
              <ThemedText style={styles.menuLogoutText}>{t.menu.logOut}</ThemedText>
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
  languageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currentLanguage: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.teal,
    backgroundColor: COLORS.teal + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  languageSelector: {
    marginLeft: 58,
    marginRight: 20,
    marginBottom: 8,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  languageOptionSelected: {
    backgroundColor: COLORS.teal + '10',
  },
  languageOptionText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  languageOptionTextSelected: {
    color: COLORS.teal,
    fontWeight: '600',
  },
});
