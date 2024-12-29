import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

const AimTrainerModal = ({ closeModal, hits, miss, time }) => {
    const { texts } = useLanguage();

    return (
        <Modal transparent={true} visible={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{texts?.AimTrainerTestModal?.title}</Text>
                    <Text style={styles.resultText}>{texts?.AimTrainerTestModal?.hits}{hits}</Text>
                    <Text style={styles.resultText}>{texts?.AimTrainerTestModal?.missed}{miss}</Text>
                    <Text style={styles.resultText}>{texts?.AimTrainerTestModal?.time}{time}s</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>{texts?.AimTrainerTestModal?.close}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
    },
});

export default AimTrainerModal;