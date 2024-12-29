// path/to/your/components/About.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer";
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function About({ navigation }) {
    const { texts } = useLanguage(); // Access the language context

    return (
        <ScrollView onScroll={() => toggleScroll && toggleScroll()} >
            <TouchableWithoutFeedback onPress={() => toggleScroll()}>
                <ImageBackground
                    source={require('../../assets/background-image.png')}
                    style={styles.headerBackground}
                >
                    <Text style={styles.headerTitle}>{texts?.about?.headerTitle}</Text>
                </ImageBackground>

                <View style={styles.contentContainer}>
                    <Text style={styles.heading}>{texts?.about?.whoWeAre}</Text>
                    <Text style={styles.paragraph}>
                        {texts?.about?.whoWeAreText}
                    </Text>
                    <Text style={styles.heading}>{texts?.about?.ourMission}</Text>
                    <Text style={styles.paragraph}>
                        {texts?.about?.ourMissionText}
                    </Text>
                    <Text style={styles.heading}>{texts?.about?.whatWeOffer}</Text>
                    <View style={styles.listContainer}>
                        <Text style={styles.listItem}><Text style={styles.bold}>Accurate and Fast Results:</Text> Our CPS Test is designed to give precise measurements of your clicking speed over multiple time intervals.</Text>
                        <Text style={styles.listItem}><Text style={styles.bold}>Multiple Click Tests:</Text> Practice consistently with a range of tests, including the Jitter Click Test and Kohi Click Test, to sharpen your skills.</Text>
                        <Text style={styles.listItem}><Text style={styles.bold}>Unlimited Free Access:</Text> Users can practice as much as they want, completely free of charge.</Text>
                        <Text style={styles.listItem}><Text style={styles.bold}>User-Friendly Interface:</Text> Our platform is simple and intuitive, making it easy for gamers of any age to use without any hassle.</Text>
                    </View>
                    <Text style={styles.heading}>{texts?.about?.ourVision}</Text>
                    <Text style={styles.paragraph}>
                        {texts?.about?.ourVisionText}
                    </Text>
                    <Text style={styles.paragraph}>
                        {texts?.about?.stayConnectedText}
                    </Text>
                    <Text style={styles.paragraph}>
                        {texts?.about?.thankYou}
                    </Text>
                </View>

                <Carousel />
                <Footer navigation={navigation} />
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
        marginTop: 10,
        padding: 20,
        backgroundColor: "#bfbfbf",
        margin: 20,
        borderRadius: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b32f60',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    listContainer: {
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
});