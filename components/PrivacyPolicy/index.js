import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';

// import styles from '../CPS/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from '../Navbar';
import Footer from "../Footer"
import { useLanguage } from '@/src/context/LanguageContext';

export default function PrivacyPolicy({ navigation }) {
     const {texts, toggleScroll} = useLanguage();
    return (
        <ScrollView onScroll={() => toggleScroll && toggleScroll()} >
        <ImageBackground
            source={require('../../assets/header-top-image.png')}
            style={{height:450}}
        >
            <Navbar navigation={navigation}/>
            <View style={{}}>
            <Text style={{ fontSize: 24, color: "#fff", fontWeight: "700", textAlign: "center" }}>{texts?.privacy.heading}</Text>
            <View style={{ paddingHorizontal: 50 }}>
                <Text style={styles.tagline}>{texts?.privacy.tagline}</Text>
            </View>
            </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
            <Text style={styles.heading}>{texts?.privacy.heading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.content1} <Text style={styles.link} onPress={() => Linking.openURL('https://tapspeedtest.com')}>https://tapspeedtest.com</Text>, {texts?.privacy.content2} <Text style={styles.link} onPress={() => Linking.openURL('mailto:admin@tapspeedtest.com')}>admin@tapspeedtest.com</Text>.
            </Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.policyDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.consentHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.consentText}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.informationHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.informationDescription}
            </Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.contactDescription}
            </Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.registrationDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.usageHeading}</Text>
            <Text style={styles.paragraph}>{texts?.privacy.usageDescription}</Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem1}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem2}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem3}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem4}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem5}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem6}</Text>
                <Text style={styles.listItem}>• {texts?.privacy.usageItem7}</Text>
            </View>
            <Text style={styles.heading}>{texts?.privacy.logFileHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.logFileDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.cookiesHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.cookiesDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.dartCookieHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.dartCookieDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.advertisingPoliciesHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.advertisingPoliciesDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.gdprHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.gdprDescription}
            </Text>
            <Text style={styles.heading}>{texts?.privacy.childrenHeading}</Text>
            <Text style={styles.paragraph}>
                {texts?.privacy.childrenDescription}
            </Text>
        </View>
        <Footer navigation={navigation}/>
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
    tagline: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        lineHeight: 24
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b32f60',
        marginBottom: 16,
    }
})