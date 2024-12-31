import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

const Footer = ({navigation}) => {
    const { texts, toggleScroll } = useLanguage();

    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                {texts?.footer?.copyright}
            </Text>
            <View style={styles.footerLinks}>
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
                    <Text style={styles.footerLink}>{texts?.footer?.privacyPolicy}</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>—</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Disclaimer")}>
                    <Text style={styles.footerLink}>{texts?.footer?.disclaimer}</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>/</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
                    <Text style={styles.footerLink}>{texts?.footer?.contactUs}</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>/</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("About")} style={{alignSelf:"flex-start",marginLeft:30}}>
                <Text style={styles.footerLink}>{texts?.footer?.about}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        alignItems: 'center', 
        backgroundColor:"white"
    },
    footerText: {
        fontSize: 14,
        color: '#333', // Change as needed
        marginBottom: 5, // Space between copyright and links
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth:100
    },
    footerLink: {
      
        color: 'black', 
        textDecorationLine: 'none',
    },
    separator: {
        marginHorizontal: 5, 
        color: '#333', 
    },
});

export default Footer; 