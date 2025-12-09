import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { BorderRadius, COLORS, Spacing } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

type InsightModalProps = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message: string;
};

export function InsightModal({ visible, onClose, title = "Insight", message }: InsightModalProps) {

    // ---------- ANIMATION ----------
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 0.9,
                    duration: 120,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 120,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

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

                    {/* ---------- CLOSE BUTTON ---------- */}
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={22} color={COLORS.cardWhite} />
                    </Pressable>

                    {/* ---------- TITLE ---------- */}
                    <ThemedText
                        variant="heading"
                        weight="bold"
                        style={{
                            marginBottom: Spacing.sm,
                            fontSize: 22,
                            color: COLORS.cardWhite,
                            paddingRight: 28,
                        }}
                    >
                        {title}
                    </ThemedText>

                    {/* ---------- SCROLLABLE CONTENT ---------- */}
                    <ScrollView
                        style={styles.scrollArea}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={true}
                    >
                        <ThemedText
                            variant="body"
                            color="secondary"
                            style={{ fontSize: 15, lineHeight: 22 }}
                        >
                            {message}
                        </ThemedText>
                    </ScrollView>

                    {/* ---------- OK BUTTON ---------- */}
                    <Pressable onPress={onClose} style={styles.okButton}>
                        <ThemedText
                            variant="subtitle"
                            weight="semibold"
                            style={styles.okText}
                            color="inverse"
                        >
                            OK
                        </ThemedText>
                    </Pressable>

                </Animated.View>
            </View>
        </Modal>
    );
}

/* ------------------------------- STYLES ------------------------------- */

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    modalCard: {
        width: "100%",
        maxHeight: "85%",
        backgroundColor: "rgba(15,23,42,0.92)",
        borderRadius: BorderRadius['2xl'],
        padding: Spacing.xl,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
        position: "relative",
    },

    closeButton: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: 6,
        zIndex: 20,
    },

    scrollArea: {
        maxHeight: "70%",
        marginTop: 4,
    },

    okButton: {
        alignSelf: "center",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 22,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 12,

        shadowColor: "#fff",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },

    okText: {
        fontSize: 13,
        color: COLORS.cardWhite,
    },
});
