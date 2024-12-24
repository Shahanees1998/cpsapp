// path/to/your/components/ContactUs.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer";
import Navbar from '../Navbar';
export default function ContactUs({ navigation }) {
    return (
        <ScrollView>
            <ImageBackground
               source={require('../../assets/header-top-image.png')}
                style={{ width:"100%",height:200 }}
            >
                <Navbar/>
                <Text style={styles.headerTitle}>Contact Us</Text>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.contactGrid}>
                    <View style={styles.contactFirstPart}>
                        <View style={styles.contactFirstPartLeft}>
                            <Image
                                source={require('../../assets/Lets-Talk.png')}
                                style={styles.imageIcon}
                            />
                        </View>
                        <View style={styles.contactSecondPartLeft}>
                            <Text style={styles.contactHeading}>Customer Support</Text>
                            <Text style={styles.paragraph}>
                                Feeling lost or need assistance? Our Customer Support heroes are ready to help! If our support resources haven’t resolved your issue, feel free to reach out directly at <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@tapspeedtest.com')}>support@tapspeedtest.com</Text>. We’ll get back to you as soon as possible to make sure your journey with Tap Speed Test is a joyful one!
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contactFirstPart}>
                        <View style={styles.contactFirstPartLeft}>
                            <Image
                                source={require('../../assets/Cps-Tester-Community.png')}
                                style={styles.imageIcon}
                            />
                        </View>
                        <View style={styles.contactSecondPartLeft}>
                            <Text style={styles.contactHeading}>Community Support</Text>
                            <Text style={styles.paragraph}>
                                Need help with login, registration, or using our tools? Our amazing user community is here to assist! Share your questions, vote on ideas, and engage with other users who are just as passionate about Tap Speed Test as you are. If you're stuck, drop a message, and a fellow user will be happy to help! You can also contact us at <Text style={styles.link} onPress={() => Linking.openURL('mailto:community@tapspeedtest.com')}>community@tapspeedtest.com</Text>.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contactFirstPart}>
                        <View style={styles.contactFirstPartLeft}>
                            <Image
                                source={require('../../assets/Report-Bug.png')}
                                style={styles.imageIcon}
                            />
                        </View>
                        <View style={styles.contactSecondPartLeft}>
                            <Text style={styles.contactHeading}>Report a Bug</Text>
                            <Text style={styles.paragraph}>
                                Oops! Spotted a bug while using one of our tools or games? Let us know! Your reports are invaluable in helping us keep Tap Speed Test running smoothly. If you find a glitch, send us the details along with any images or videos at <Text style={styles.link} onPress={() => Linking.openURL('mailto:bugs@tapspeedtest.com')}>bugs@tapspeedtest.com</Text>. We’ll work quickly to fix the issue and improve your experience.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contactFirstPart}>
                        <View style={styles.contactFirstPartLeft}>
                            <Image
                                source={require('../../assets/collaboration-and-advertising.png')}
                                style={styles.imageIcon}
                            />
                        </View>
                        <View style={styles.contactSecondPartLeft}>
                            <Text style={styles.contactHeading}>Collaboration & Advertising</Text>
                            <Text style={styles.paragraph}>
                                Got exciting ideas or want to explore partnership and advertising opportunities with Tap Speed Test? We’re all ears! Whether you’re looking to collaborate or bring something new to the table, let’s create something amazing together. Contact us at <Text style={styles.link} onPress={() => Linking.openURL('mailto:collaborate@tapspeedtest.com')}>collaborate@tapspeedtest.com</Text> and let’s make some magic happen.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.contactFirstPart}>
                <View style={styles.contactSecondPartLeft}>
                    <Image
                        source={require('../../assets/Twiter.png')}
                        style={styles.imageIcon}
                    />
                    <Text style={styles.contactHeading}>Social Media:</Text>
                    <Text style={styles.paragraph}>
                        Stay connected and reach out to us on social media for quick support and updates:
                    </Text>
                    <Text style={styles.paragraph}>Twitter: @TapSpeedTest</Text>
                </View>
                </View>
            </View>

            <Carousel />
            <Footer navigation={navigation} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerBackground: {
        display: "flex",
        alignItems: "center",
        paddingVertical: 80,
    },
    headerTitle: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },
    contentContainer: {
        marginTop: 30,
        
       
        margin: 20,
        
    },
    contactGrid: {
        marginBottom: 20,
    },
    contactFirstPart: {
        flex: 1,
       
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#bfbfbf",
        padding: 20,
        borderRadius: 20,
    },
    contactFirstPartLeft: {
        marginRight: 10,
justifyContent:"center"
    },
    contactSecondPartLeft: {
        flex: 1,
        alignItems: "center",

    },
    contactHeading: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: 'bold',
        color: '#b32f60',
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    imageIcon: {
        width: 80,
        height: 80,
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    contactSecondPart2Left: {
        marginTop: 20,
    },
});