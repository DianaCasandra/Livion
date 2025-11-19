import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Pressable,
} from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

type InsightModalProps = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message: string;
};

export function InsightModal({ visible, onClose, title = "Insight", message }: InsightModalProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalCard}>
                    <ThemedText
                        variant="heading"
                        weight="bold"
                        style={{ marginBottom: Spacing.md, fontSize: 20 }}
                    >
                        {title}
                    </ThemedText>

                    <ThemedText
                        variant="body"
                        color="secondary"
                        style={{ fontSize: 14, lineHeight: 20 }}
                    >
                        {message}
                    </ThemedText>

                    <Pressable onPress={onClose} style={styles.okButton}>
                        <ThemedText variant="subtitle" weight="semibold" style={styles.okText} color="inverse">
                            OK
                        </ThemedText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modalCard: {
        width: "100%",
        backgroundColor: "rgba(15,23,42,0.92)",
        borderRadius: BorderRadius['2xl'],
        padding: Spacing.xl,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    okButton: {
        alignSelf: 'center',
        marginTop: 18,
        paddingVertical: 8,       
        paddingHorizontal: 18, 
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 10,

        // PRETTY GLOW
        shadowColor: '#fff',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    okText: {
        fontSize: 12,         // smaller text
        color: '#fff',
    }
});
