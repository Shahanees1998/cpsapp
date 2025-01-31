// path/to/your/components/ContactUs.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer";
import Navbar from '../Navbar';
import { useLanguage  } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ContactUs({ navigation }) {
    const { texts, toggleScroll } = useLanguage();

    return (
        <ScrollView onScroll={() => toggleScroll && toggleScroll()} >

            <ImageBackground
                source={require('../../assets/header-top-image.png')}
                style={{ width: "100%", height: 200 }}
            >
                <Navbar navigation={navigation} />
                <Text style={styles.headerTitle}>{texts.ContactUs.headerTitle}</Text>
            </ImageBackground>
            <TouchableWithoutFeedback onPress={() => toggleScroll()}>

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
                                <Text style={styles.contactHeading}>{texts.ContactUs.customerSupport.heading}</Text>
                                <Text style={styles.paragraph}>
                                    {texts.ContactUs.customerSupport.paragraph}
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
                                <Text style={styles.contactHeading}>{texts.ContactUs.communitySupport.heading}</Text>
                                <Text style={styles.paragraph}>
                                    {texts.ContactUs.communitySupport.paragraph}
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
                                <Text style={styles.contactHeading}>{texts.ContactUs.reportBug.heading}</Text>
                                <Text style={styles.paragraph}>
                                    {texts.ContactUs.reportBug.paragraph}
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
                                <Text style={styles.contactHeading}>{texts.ContactUs.collaboration.heading}</Text>
                                <Text style={styles.paragraph}>
                                    {texts.ContactUs.collaboration.paragraph}
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
                            <Text style={styles.contactHeading}>{texts.ContactUs.socialMedia.heading}</Text>
                            <Text style={styles.paragraph}>
                                {texts.ContactUs.socialMedia.paragraph}
                            </Text>
                        </View>
                    </View>
                </View>

                <Carousel />
                {/* <Footer navigation={navigation} /> */}
            </TouchableWithoutFeedback>
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
        justifyContent: "center"
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