import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';

// import styles from '../CPS/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from "../Navbar"
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer"

export default function PrivacyPolicy({ navigation }) {

    return (
        <ScrollView>
            <ImageBackground
               source={require('../../assets/header-top-image.png')}
                style={{ width:"100%",height:200 }}
            >
                <Navbar/>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "700", textAlign: "center" }}>Disclaimer</Text>
              
            </ImageBackground>
            <View style={styles.contentContainer}>
            <Text style={styles.heading}>Content</Text>
            <Text style={styles.paragraph}>
                The information held on this website is for general information purposes only. Tap Speed Test does not make representations or warranties of any kind about the accuracy or reliability of the tools or website or the products or services contained on this website for any purpose. While the information is periodically updated, errors and omissions may occur. No guarantee is given that the information provided on this website is correct and up-to-date. Users may rely on such information at their own risk. In no case will Tap Speed Test and its contributors be responsible or answerable for any loss or damage arising from the use of the content or tools on the website.
            </Text>
            <Text style={styles.paragraph}>
                Tap Speed Test has the right to make changes to the content on the website at any time, without any prior notice.
            </Text>
            <Text style={styles.heading}>External websites</Text>
            <Text style={styles.paragraph}>
                Through this website, you can visit other external websites by following hyperlinks. We do not have control or liability over the content and availability of these sites, even though we endeavor to provide only quality links to legitimate and valuable websites.
            </Text>
            <Text style={styles.paragraph}>
                The inclusion of these links does not imply a recommendation or endorsement of views presented within them from Tap Speed Test. None of the administrators, writers, or contributors associated with Tap Speed Test can be responsible for your use of the details contained in or linked to these web pages.
            </Text>
            <Text style={styles.paragraph}>
                When you visit external websites, these sites have a different privacy policy and terms and conditions that are not under our control. Do check the privacy policies and terms and conditions of these websites relying on any information or before purchasing any of its services.
            </Text>
            <Text style={styles.heading}>Consent</Text>
            <Text style={styles.paragraph}>
                By using the website, you agree to accept the Terms of Use. Tap Speed Test and its contributors have the right to alter, modify, or update these terms of use at any time. Please read these terms and conditions carefully. The terms and conditions can be accessed from the link at the bottom of any page of our website.
            </Text>
            <Text style={styles.paragraph}>
                Tap Speed Test uses cookies [as stated in the privacy policy] to provide users with more convenient website visits. Accessing the website implies that the user accepts the policy of usage of cookies.
            </Text>
            <Text style={styles.heading}>Updates</Text>
            <Text style={styles.paragraph}>
                We constantly put in efforts to keep the website up and ensure its smooth functionality. However, Tap Speed Test will not be responsible if the website is temporarily unavailable due to technical problems that are not under our control.
            </Text>
            <Text style={styles.heading}>Copyright</Text>
            <Text style={styles.paragraph}>
                Tap Speed Test and its suppliers own all copyrights on this website. We recommend you not copy or display content or any portion of this site for redistribution to third parties without the permission of Tap Speed Test.
            </Text>
            </View>
            {/* <Carousel /> */}
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