import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';

// import styles from '../CPS/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from '../Navbar';
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer"

export default function PrivacyPolicy({ navigation }) {

    return (
        <ScrollView>
            <ImageBackground
                source={require('../../assets/header-top-image.png')}
                style={{height:450}}
            >
                <Navbar/>
                <View style={{}}>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "700", textAlign: "center" }}>Privacy Policy</Text>
                <View style={{ paddingHorizontal: 50 }}>
                    <Text style={styles.tagline}>If you would like any more information or have questions regarding our privacy policy, please feel free to reach out to us. The privacy of our guests is of the utmost importance to us. The following information outlines how personal data is received and collected by us.</Text>
                </View>
                </View>

            </ImageBackground>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Privacy Policy for Tap Speed Test</Text>
                <Text style={styles.paragraph}>
                    At Tap Speed Test, accessible at <Text style={styles.link} onPress={() => Linking.openURL('https://tapspeedtest.com')}>https://tapspeedtest.com</Text>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Tap Speed Test and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <Text style={styles.link} onPress={() => Linking.openURL('mailto:admin@tapspeedtest.com')}>admin@tapspeedtest.com</Text>.
                </Text>
                <Text style={styles.paragraph}>
                    This privacy policy applies only to our online activities and is valid for visitors to our website with regard to the information that they share and/or collect in Tap Speed Test. This policy does not apply to any information collected offline or via channels other than this website.
                </Text>
                <Text style={styles.heading}>Consent</Text>
                <Text style={styles.paragraph}>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Text>
                <Text style={styles.heading}>Information we collect</Text>
                <Text style={styles.paragraph}>
                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </Text>
                <Text style={styles.paragraph}>
                    If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </Text>
                <Text style={styles.paragraph}>
                    When you register for an account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </Text>
                <Text style={styles.heading}>How we use your information</Text>
                <Text style={styles.paragraph}>We use the information we collect in various ways, including to:</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Provide, operate, and maintain our website</Text>
                    <Text style={styles.listItem}>• Improve, personalize, and expand our website</Text>
                    <Text style={styles.listItem}>• Understand and analyze how you use our website</Text>
                    <Text style={styles.listItem}>• Develop new products, services, features, and functionality</Text>
                    <Text style={styles.listItem}>• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</Text>
                    <Text style={styles.listItem}>• Send you emails</Text>
                    <Text style={styles.listItem}>• Find and prevent fraud</Text>
                </View>
                <Text style={styles.heading}>Log File</Text>
                <Text style={styles.paragraph}>
                    Tap Speed Test follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is to analyze trends, administer the site, track users' movement on the website, and gather demographic information.
                    These are not linked to any personally identifiable information. The purpose of the information is to analyze trends, administer the site, track users' movement on the website, and gather demographic information.
                </Text>
                <Text style={styles.heading}>Cookies and Web Beacons</Text>
                <Text style={styles.paragraph}>
                    Like any other website, Tap Speed Test uses ‘cookies’. These cookies are used to store information, including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </Text>
                <Text style={styles.heading}>DoubleClick DART Cookie</Text>
                <Text style={styles.paragraph}>
                    Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to
                    and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –
                    Some advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has its own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.Google:
                </Text>
                <Text style={styles.heading}>Advertising Partners Privacy Policies</Text>
                <Text style={styles.paragraph}>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of Tap Speed Test.
                    Third-party ad servers or ad networks use technologies like cookies, JavaScript, or web beacons that are used in their respective advertisements and links that appear on Tap Speed Test, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </Text>
                <Text style={styles.heading}>How we use your information</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Text>
                    <Text style={styles.listItem}>• Request that a business delete any personal data about the consumer that a business has collected.</Text>
                    <Text style={styles.listItem}>• Request that a business that sells a consumer's personal data, not sell the consumer's personal data.If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us </Text>

                </View>
                <Text style={styles.heading}>GDPR Privacy Policy (Data Protection Rights)</Text>
                <Text style={styles.paragraph}>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service. The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete. The right to erasure – You have the right to request that we erase your personal data, under certain conditions. The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions. The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions. The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please
                </Text>
                <Text style={styles.heading}>Children's Information</Text>
                <Text style={styles.paragraph}>
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.Tap Speed Test does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
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