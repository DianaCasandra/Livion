import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { MessageBubble } from '../../../components/molecules/MessageBubble';

// Importăm constantele necesare
import { BorderRadius, Spacing } from '../../../constants/Colors';

const { width: SCREEN_W } = Dimensions.get('window');

// Puteți extrage această componentă într-un fișier separat (ex: GlowyContainer.tsx)
// pentru a o reutiliza, dar o includem aici pentru demonstrație.
function GlowyContainer({ children, style }: any) {
    return (
        <View style={[styles.glowyContainer, style]}>
            <View style={styles.cardGlow} pointerEvents="none" />
            <View style={styles.cardContent}>{children}</View>
        </View>
    );
}

export default function MessagesScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* background ombré + soft glow layers */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* subtle radial glows (pure view overlays) */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* ScrollView care va conține conținutul real */}
        <ScrollView contentContainerStyle={styles.container}>
          
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Messages
          </ThemedText>

          {/* Thread (înlocuim stilul vechi 'thread' cu GlowyContainer) */}
          <GlowyContainer style={styles.thread}>
            <MessageBubble
              message="Hi Jane, your latest readings look stable. How are you feeling today?"
              sender="clinician"
              senderName="Dr. Harper"
              timestamp={new Date()}
            />
            <MessageBubble
              message="Feeling a bit tired but overall okay."
              sender="user"
              timestamp={new Date()}
            />
            <MessageBubble
              message="Thanks for updating us. Remember to log your symptoms later today."
              sender="clinician"
              senderName="Care Team"
              timestamp={new Date()}
            />
          </GlowyContainer>

          {/* Composer (înlocuim stilul vechi 'composer' cu GlowyContainer) */}
          <GlowyContainer style={styles.composer}>
            <InputField placeholder="Type your message..." multiline style={styles.input} />
            <Button variant="primary" fullWidth>
              Send
            </Button>
          </GlowyContainer>

        </ScrollView>
      </SafeAreaView>

      {/* Dacă folosiți layout-ul recomandat, scoateți acest import și lăsați-l în _layout.tsx */}
      {/* <BottomNavbar /> */} 
    </View>
  );
}


const styles = StyleSheet.create({
  // STILURI GLOBALE (Preluate din HomeGlossyAnimated)
  root: {
    flex: 1,
    backgroundColor: '#041025',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['3xl'] + 60, // Spațiu pentru Navbar
  },
  header: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 48,
    marginBottom: Spacing.xl,
  },

  // STILURI REUTILIZABILE PENTRU CARDURI (GlowyContainer)
  glowyContainer: {
    backgroundColor: 'rgba(10,25,40,0.55)',
    borderRadius: BorderRadius.xl || 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    // shadow
    ...Platform.select({
      ios: { shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 18 },
      android: { elevation: 6 },
    }),
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  
  // STILURI SPECIFICE MESAJELOR
  thread: {
    padding: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  composer: {
    padding: Spacing.lg,
  },
  input: {
    marginBottom: Spacing.md,
  },

  // GLOWS (Preluate din HomeGlossyAnimated)
  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -60,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.08,
    transform: [{ scale: 1.4 }],
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: -180,
    bottom: -120,
    borderRadius: 999,
    backgroundColor: '#0ea5a4',
    opacity: 0.06,
    transform: [{ scale: 1.2 }],
  },
});