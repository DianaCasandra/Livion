// app/index.tsx
import { Link } from 'expo-router';
import { View } from 'react-native';
import { ThemedText } from '../components/atoms/ThemedText';

export default function LandingPage() {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20, 
      backgroundColor: '#0f172a' 
    }}>
      <ThemedText variant="display" style={{ marginBottom: 20 }}>
        HealthApp
      </ThemedText>
      <ThemedText variant="body" color="secondary" style={{ textAlign: 'center', marginBottom: 30 }}>
        Welcome to your personal health companion
      </ThemedText>
      
      <View style={{ gap: 15, width: '100%', maxWidth: 300 }}>
        {/* Folosește rutele corecte pentru structura ta */}
        <Link href={"/patient/home" as any} style={{
          backgroundColor: '#0d9488',
          padding: 15,
          borderRadius: 8,
          width: '100%',
        }}>
          <ThemedText color="inverse" align="center">
            Get Started as Patient
          </ThemedText>
        </Link>
        
        <Link href={"/clinician/dashboard" as any} style={{
          backgroundColor: 'transparent',
          padding: 15,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: '#0d9488',
          width: '100%',
        }}>
          <ThemedText color="teal" align="center">I'm a Clinician</ThemedText>
        </Link>
        
        <Link href={"/admin/dashboard" as any} style={{
          backgroundColor: 'transparent',
          padding: 15,
          borderRadius: 8,
          width: '100%',
        }}>
          <ThemedText color="secondary" align="center">Admin Access</ThemedText>
        </Link>
      </View>
    </View>
  );
}