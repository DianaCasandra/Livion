import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
    Animated,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { router } from 'expo-router';

// ----------------------------------------------------
// GlowyCard Component
// ----------------------------------------------------
function GlowyCard({ children, onPress = () => {} }: any) {
    const pressScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();
    };
    const onPressOut = () => {
        Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    };

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
            <Animated.View style={[styles.cardBase, { transform: [{ scale: pressScale }] }]}>
                <View style={styles.cardGlow} pointerEvents="none" />
                <View style={styles.cardContent}>{children}</View>
            </Animated.View>
        </Pressable>
    );
}

// ----------------------------------------------------

export default function CarePlanAuthoringScreen() {
    return (
        <View style={styles.root}>
            <StatusBar hidden />

            {/* Background Gradient */}
            <LinearGradient
                colors={["#07203f", "#04363a", "#06233d"]}
                style={StyleSheet.absoluteFill}
                start={[0, 0]}
                end={[1, 1]}
            />

            {/* Decorative Glows */}
            <View style={styles.glowTopRight} pointerEvents="none" />
            <View style={styles.glowBottomLeft} pointerEvents="none" />

            {/* Main Content */}
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <ThemedText variant="body" style={styles.backButtonText}>
                            ⪻ Back
                        </ThemedText>
                    </TouchableOpacity>

                    <ThemedText variant="display" weight="bold" align="center" style={styles.header}>
                        ePrescription Portal
                    </ThemedText>

                    <ThemedText variant="body" color="secondary" align="center" style={styles.subheader}>
                        Your central hub for managing and fulfilling electronic prescriptions.
                    </ThemedText>

                    {/* GlowyCard Form */}
                    <GlowyCard>
                        <InputField label=" Prescription Title" placeholder="e.g. Acnee treatment" style={styles.input} />
                        <InputField
                            label="List of medications"
                            placeholder="e.g. Fucidin 30ml, Roaccutane 40mg"
                            multiline
                            style={styles.input}
                        />
                        <InputField
                            label="Other specifications"
                            placeholder="e.g. Fucidin every morning
3 capsules of Roaccutane each day (every 8 hours)"
                            multiline
                            style={styles.input}
                        />
                        <InputField
                            label="Specify the Patient"
                            placeholder=""
                            multiline
                            style={styles.input}
                        />

                        <Button variant="primary" fullWidth style={styles.button}>
                            Save Draft
                        </Button>

                        <Button variant="outline" fullWidth style={styles.button}>
                            Share with Patient
                        </Button>
                    </GlowyCard>

                    <View style={{ height: Spacing['3xl'] + 60 }} />
                </ScrollView>
            </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#041025',
    },

    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 0,
    },

    container: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.lg,
    },

    backButton: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        marginBottom: Spacing.md,
    },

    backButtonText: {
        fontSize: 18,
        color: Colors.primary.teal,
    },

    header: {
        marginBottom: Spacing.sm,
        color: '#fff',
        fontSize: 42,
        lineHeight: 48,
    },

    subheader: {
        marginBottom: Spacing.xl,
    },

    cardBase: {
        backgroundColor: 'rgba(10,25,40,0.55)',
        borderRadius: BorderRadius.xl || 16,
        padding: Spacing.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        marginBottom: Spacing['2xl'],
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

    input: {
        marginTop: Spacing.md,
    },

    button: {
        marginTop: Spacing.md,
    },

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
