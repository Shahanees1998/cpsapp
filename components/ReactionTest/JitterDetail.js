// path/to/your/component/JitterDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const JitterDetail = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBackground}>
                <View style={styles.contentScreen}>
                    <View style={styles.mainContentContainer}>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                What is <Text style={styles.cpsColor}>Jitter Clicking?</Text>
                            </Text>
                            <Text style={styles.detailP}>
                                Jitter clicking is a technique used to click a mouse button at an extremely high rate, often for gaming purposes, particularly in games like Minecraft or first-person shooters where fast clicking can give players an advantage. The idea behind jitter clicking is to tense your arm or wrist muscles to create rapid vibrations that allow your finger to press the mouse button much faster than regular clicking.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                What is <Text style={styles.cpsColor}>a good jitter test result?</Text>
                            </Text>
                            <Text>
                                A good jitter-clicking test result usually measures the Clicks Per Second (CPS). An average person can click around 6-7 CPS, while experienced jitter clickers can reach anywhere between 10-15 CPS or even higher. However, anything over 12 CPS is generally considered a good result in gaming.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                How to <Text style={styles.cpsColor}>Jitter Click?</Text>
                            </Text>
                            <Text>Here are some steps to jitter click effectively:</Text>
                            <Text style={styles.listItem}>1. <Text style={styles.bold}>Grip the mouse:</Text> Hold the mouse firmly but don't grip it too tightly. Most people prefer a claw or fingertip grip for jitter-clicking.</Text>
                            <Text style={styles.listItem}>2. <Text style={styles.bold}>Tense your arm:</Text> Focus on tensing your forearm and wrist muscles to produce rapid vibrations. Avoid only moving your finger.</Text>
                            <Text style={styles.listItem}>3. <Text style={styles.bold}>Vibrate your finger:</Text> Allow the vibration to transfer through to your finger so it moves up and down on the mouse button, creating quick clicks.</Text>
                            <Text style={styles.listItem}>4. <Text style={styles.bold}>Practice:</Text> Like any skill, jitter clicking requires practice to control speed and accuracy. It may take time to get comfortable with the technique.</Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                Is <Text style={styles.cpsColor}>Jitter Clicking bad?</Text>
                            </Text>
                            <Text>
                                Jitter clicking has been known to cause some forms of discomfort in numerous cases. It can hurt your arm and wrist muscles as it causes excessive strain for a long period of time, leading to conditions like Tendinitis and even Carpal Tunnel Syndrome! In some cases, you can even face a loss of control of muscles because you’re vibrating your hand consistently. This can reduce your accuracy when you’re playing games like Minecraft!
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                Alternatives to <Text style={styles.cpsColor}>Jitter Click Test</Text>
                            </Text>
                            <Text>If you're concerned about the risks of jitter clicking, there are safer alternatives for fast clicking:</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Butterfly Clicking:</Text> This involves using two fingers to alternate clicks on the same button. It's easier on the hands and can also achieve high CPS.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Drag Clicking:</Text> By dragging your finger lightly across the mouse button, friction can create a high number of clicks per second, though this is a more advanced technique and not recommended for all mice.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Normal Clicking:</Text> While slower, regular clicking puts less strain on your hands and arms, making it a safer option.</Text>
                            <Text>
                                Each method comes with its own learning curve and CPS potential, but <Text style={styles.link} onPress={() => Linking.openURL('/butterfly-click')}>Butterfly Clicking</Text> is usually the most viable alternative for fast CPS without excessive strain.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    detailBackground: {
        // Add styles for the background if needed
    },
    contentScreen: {
        // Add styles for the content screen if needed
    },
    mainContentContainer: {
        // Add styles for the main content container if needed
    },
    cpsTest: {
        marginBottom: 20,
    },
    cpsColor: {
        color: '#B32F60', // Change to your desired color
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailP: {
        fontSize: 16,
        lineHeight: 24,
    },
    cpsTestMainHr: {
        marginVertical: 10,
    },
    hr: {
        height: 1,
        backgroundColor: '#ccc', // Change to your desired color
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
    link: {
        color: '#007BFF', // Change to your desired link color
        textDecorationLine: 'underline',
    },
});

export default JitterDetail;