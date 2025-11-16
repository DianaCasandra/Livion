import { Href, usePathname, useRouter } from 'expo-router';
// ... // <-- Am adăugat usePathname
import { Activity, MessageSquare, Sparkles, Users } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';

const { width: SCREEN_W } = Dimensions.get('window');

// NavButton Rămâne la fel, dar acum primește și onPress
function NavButton({ icon, label, active = false, onPress }: any) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.navButton, active && styles.navButtonActive]}
    > 
      {icon}
      <ThemedText variant="caption" style={[styles.navLabel, active && styles.navLabelActive]}>{label}</ThemedText>
    </Pressable>
  );
}


// Componenta principală a navbar-ului
export default function FloatingPillNav() {
  const router = useRouter();
  const currentPath = usePathname(); // <-- Obținem calea URL-ului curent

  // Funcție ajutătoare pentru a naviga și a înlocui istoricul (router.replace)
  const navigate = (path: string) => {
    router.replace(path as Href);
  };

  return (
    <View style={styles.floatingNavWrap} pointerEvents="box-none">
      <View style={styles.floatingNav}>
        <NavButton
          icon={<Activity size={18} color="#fff" />}
          label="Daily"
          // Verificăm dacă calea curentă se potrivește cu calea butonului
          active={currentPath === '/clinician/dashboard/home'} 
          onPress={() => navigate('/clinician/dashboard/home')}
        />
        <NavButton
          icon={<Users size={18} color="#fff" />}
          label="Care Plan"
          active={currentPath === '/clinician/dashboard/careplanauthoring'} 
          onPress={() => navigate('/clinician/dashboard/careplanauthoring')}
        />

        <NavButton
          icon={<Sparkles size={18} color="#fff" />}
          label="Documentation"
          active={currentPath === '/clinician/dashboard/documentation'} 
          onPress={() => navigate('/clinician/dashboard/documentation')}
        />

        <NavButton
          icon={<MessageSquare size={18} color="#fff" />}
          label="Messages"
          active={currentPath === '/clinician/dashboard/messages'} 
          onPress={() => navigate('/clinician/dashboard/messages')}
        />
      </View>
    </View>
  );
}

// 3. Stilizarea (aceeași ca mai înainte)
const styles = StyleSheet.create({
  // Floating nav
  floatingNavWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 33,
    alignItems: 'center',
    zIndex: 10, 
  },
  floatingNav: {
    width: SCREEN_W - 48,
    backgroundColor: '#0f172a',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    ...Platform.select({ ios: { backdropFilter: 'blur(6px)' as any }, android: {} }),
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  navButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  navLabelActive: {
    color: '#fff',
    fontWeight: '600',
  },
});