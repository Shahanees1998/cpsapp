// path/to/your/components/About.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Carousel from "../CPS/CarousalComponent";
import Footer from "../Footer";

export default function About({ navigation }) {
    return (
        <ScrollView>
            <ImageBackground
                source={require('../../assets/background-image.png')}
                style={styles.headerBackground}
            >
                <Text style={styles.headerTitle}>About</Text>
            </ImageBackground>

            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Who We Are</Text>
                <Text style={styles.paragraph}>
                    At TapSpeedTest.com, we’ve built a thriving community of individuals who are passionate about gaming and technology. We understand the importance of speed and precision in competitive gaming, which is why we’ve developed our click speed test (CPS Test) with a strong focus on accuracy and user experience.
                </Text>
                <Text style={styles.paragraph}>
                    Our platform offers various tools and tests, each designed to help you master different clicking methods and time intervals. Whether you're practicing jitter clicking, Kohi clicking, or simply working to improve your CPS, we have the tools to meet your needs.
                </Text>
                <Text style={styles.heading}>Our Mission</Text>
                <Text style={styles.paragraph}>
                    Our mission is to provide gamers with the best tools to track and improve their clicking speed. We prioritize accuracy and ease of use, allowing gamers of all levels to quickly and efficiently test their skills. Through our tests, we aim to help users improve their gaming performance, one click at a time.
                </Text>
                <Text style={styles.heading}>What We Offer</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}><Text style={styles.bold}>Accurate and Fast Results:</Text> Our CPS Test is designed to give precise measurements of your clicking speed over multiple time intervals.</Text>
                    <Text style={styles.listItem}><Text style={styles.bold}>Multiple Click Tests:</Text> Practice consistently with a range of tests, including the Jitter Click Test and Kohi Click Test, to sharpen your skills.</Text>
                    <Text style={styles.listItem}><Text style={styles.bold}>Unlimited Free Access:</Text> Users can practice as much as they want, completely free of charge.</Text>
                    <Text style={styles.listItem}><Text style={styles.bold}>User-Friendly Interface:</Text> Our platform is simple and intuitive, making it easy for gamers of any age to use without any hassle.</Text>
                </View>
                <Text style={styles.heading}>Our Vision</Text>
                <Text style={styles.paragraph}>
                    We envision TapSpeedTest.com as a leading platform where gamers can continuously improve their skills with tools tailored to their needs. Our goal is to keep enhancing the platform by introducing more variations and modes to meet the evolving demands of the gaming community.
                </Text>
                <Text style={styles.paragraph}>
                    We want to empower gamers worldwide to track their progress, hone their skills, and reach new levels of performance.
                </Text>
                <Text style={styles.heading}>Stay Connected</Text>
                <Text style={styles.paragraph}>
                    We’re constantly evolving, and we encourage you to keep visiting our site as we roll out new features and tools. If you have any questions, feedback, or suggestions, don’t hesitate to reach out to us via the Contact page.
                </Text>
                <Text style={styles.paragraph}>
                    Thank you for choosing TapSpeedTest.com — let’s click our way to victory!
                </Text>
            </View>

            <Carousel />
            <Footer navigation={navigation}/>
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