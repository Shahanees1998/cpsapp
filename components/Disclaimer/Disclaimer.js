import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

export default function PrivacyPolicy({ navigation }) {
    const { texts } = useLanguage();

    return (
        <ScrollView onScroll={() => toggleScroll && toggleScroll()} >
            <ImageBackground
                source={require('../../assets/header-top-image.png')}
                style={{ width: "100%", height: 200 }}
            >
                <Navbar navigation={navigation}/>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "700", textAlign: "center" }}>{texts.Disclaimer.title}</Text>
            </ImageBackground>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Content</Text>
                <Text style={styles.paragraph}>{texts.Disclaimer.content}</Text>
                <Text style={styles.heading}>External websites</Text>
                <Text style={styles.paragraph}>{texts.Disclaimer.externalWebsites}</Text>
                <Text style={styles.heading}>Consent</Text>
                <Text style={styles.paragraph}>{texts.Disclaimer.consent}</Text>
                <Text style={styles.heading}>Updates</Text>
                <Text style={styles.paragraph}>{texts.Disclaimer.updates}</Text>
                <Text style={styles.heading}>Copyright</Text>
                <Text style={styles.paragraph}>{texts.Disclaimer.copyright}</Text>
            </View>
            <Footer navigation={navigation} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,
        padding: 20,
        backgroundColor: "#bfbfbf",
        margin: 20,
        borderRadius: 20
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b32f60',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 14,
        marginBottom: 10,
    }
});