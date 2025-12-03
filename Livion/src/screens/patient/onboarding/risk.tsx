import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '@/components/atoms/Button'; // Componenta Button
import { Chip } from '@/components/atoms/Chip';
import { ThemedText } from '@/components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '@/constants/Colors';

const QUESTIONS = [
  "Do you experience severe headaches daily?",
  "Have you had episodes of dizziness or fainting?",
  "Are you experiencing chest pain or pressure?",
  "Do you have persistent shortness of breath?",
  "Do you notice unusual swelling in your legs or ankles?",
];

export default function RiskAssessmentScreen() {
  const router = useRouter();

  // 'yes' | 'no' | null for each question
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));

  const yesCount = answers.filter(a => a === 'yes').length;

  const handleAnswer = (index: number, value: 'yes' | 'no') => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <View style={styles.root}>
        {/* 1. Background Gradient (Darker teal) */}
        <LinearGradient
            colors={['#08131c', '#0b1e29', '#0d2533']}
            style={StyleSheet.absoluteFill}
            start={[0, 0]}
            end={[1, 1]}
        />

        {/* 2. Soft background glows */}
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />

        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                {/* Back button (ACUM ESTE UN COMPONENT BUTTON) */}
 <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

                {/* Card principal - Stil Glossy/Glassy */}
                <View style={styles.card}>
                    <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
                        Risk Snapshot
                    </ThemedText>

                    <ThemedText variant="body" color="secondary" align="center" style={styles.body}>
                        Please complete the following triage questions regarding your current symptoms. We will examine your state as a starting point in your health journey.
                    </ThemedText>

                    {/* Questions */}
                    <View style={styles.questionsContainer}>
                        {QUESTIONS.map((q, i) => (
                            <View key={i} style={styles.questionItem}>
                                <ThemedText variant="subtitle" weight="semibold" style={styles.questionText}>
                                    {q}
                                </ThemedText>
                                <View style={styles.answerButtons}>
                                    <Chip
                                        label="Yes"
                                        variant={answers[i] === 'yes' ? 'status-action' : 'teal'} 
                                        style={{ marginRight: Spacing.sm }}
                                        onPress={() => handleAnswer(i, 'yes')}
                                    />
                                    <Chip
                                        label="No"
                                        variant={answers[i] === 'no' ? 'status-ok' : 'teal'}
                                        onPress={() => handleAnswer(i, 'no')}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Guidance if 3+ yes */}
                    {yesCount >= 3 && (
                        <View style={styles.guidanceContainer}>
                            <ThemedText variant="subtitle" weight="bold" style={{ color: Colors.status.action, marginBottom: Spacing.sm }}>
                                Seek Care
                            </ThemedText>
                            <ThemedText variant="body" color="secondary" align='center'>
                                Based on your responses, it is recommended to contact your healthcare provider immediately. For emergencies, call:
                            </ThemedText>
                            <ThemedText variant="body" color="secondary">
                                - 112 (EU)
                            </ThemedText>
                        </View>
                    )}

                    {/* Buton Continue (rămâne primary) */}
                    <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/patient/dashboard/home')}>
                        Finish Assessment
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background.primary, 
    },
    safeArea: { flex: 1 },
    container: { flexGrow: 1, padding: Spacing.xl },
    
    // NOU: Stil pentru butonul Back (Componenta Button)
    backButton: { 
        alignSelf: 'flex-start', // Important: Nu FullWidth
        marginBottom: Spacing.lg, 
        marginTop: Spacing.md,
          padding: 5,
    borderRadius: 10,
        backgroundColor: 'rgba(57, 73, 171, 0.2)', // Fundal semi-transparent
    },
    
    // Stilul principal al cardului 
    card: {
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        backgroundColor: 'rgba(15,23,42,0.6)', 
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
    },
    title: { 
        marginBottom: Spacing.md,
        color: '#fff', 
    },
    body: { marginBottom: Spacing.lg },
    
    // Întrebări
    questionsContainer: { gap: Spacing.lg, marginBottom: Spacing.xl },
    questionItem: {
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    questionText: { 
        marginBottom: Spacing.sm,
        color: '#fff', 
    },
    answerButtons: { flexDirection: 'row' },
    
    // Mesajul de urgență
    guidanceContainer: {
        alignItems: 'center',
        marginTop: Spacing.lg,
        padding: Spacing.md,
        backgroundColor: `${Colors.status.action}20`, 
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.status.action, 
    },
    button: { marginTop: Spacing.lg }, // Butonul Finish Assessment (Primary)

    // GLOWS 
    glowTopRight: {
        position: 'absolute',
        width: 400,
        height: 400,
        right: -150,
        top: -100,
        borderRadius: 999,
        backgroundColor: Colors.primary.indigo,
        opacity: 0.12,
    },
    glowBottomLeft: {
        position: 'absolute',
        width: 480,
        height: 480,
        left: -200,
        bottom: -160,
        borderRadius: 999,
        backgroundColor: '#3949AB',
        opacity: 0.10,
    },
});