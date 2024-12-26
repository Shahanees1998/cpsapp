// path/to/your/component/KohiDetails.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '@/src/context/LanguageContext';

const KohiDetails = () => {
    const { texts } = useLanguage();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBackground}>
                <View style={styles.contentScreen}>
                    <View style={styles.mainContentContainer}>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                What is <Text style={styles.cpsColor}>the Kohi Click Test?</Text>
                            </Text>
                            <Text style={styles.detailP}>
                                The Kohi Click Test is a fun way to see how fast you can click your mouse in a short amount of time. Originally created for Minecraft PvP fans, it’s become super popular among gamers who want to improve their clicking speed. Whether you’re gearing up for an intense battle or just curious about your clicking skills, the Kohi Click Test is a great way to see how quick your reflexes really are.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                Why is <Text style={styles.cpsColor}>clicking speed important?</Text>
                            </Text>
                            <Text>
                                In competitive gaming, every millisecond counts. Whether you’re battling in Minecraft, Fortnite, or any fast-paced game, the faster you can click, the quicker you can respond to in-game events. This can give you a big edge when attacking enemies, building structures, or pulling off fast combos. If you're into PvP games, having a high clicking speed can help you dominate the competition. But even if you’re not exactly a gamer, improving your clicking speed can also help you become more efficient in everyday computer tasks.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                What is <Text style={styles.cpsColor}>a good click speed?</Text>
                            </Text>
                            <Text>
                                The average player usually clocks around 6–7 clicks per second (CPS). But if you're aiming to be more competitive, you’ll want to hit 8 CPS or more. In the Kohi Click Test, some of the best players can reach 10-12 CPS, which is considered an awesome score. So if you’re hitting double digits, you’re definitely on the right track!
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                How did <Text style={styles.cpsColor}>the Kohi Click Test get its name?</Text>
                            </Text>
                            <Text>
                                The Kohi Click Test gets its name from the popular Kohi Minecraft server, which was famous for its hardcore PvP battles. Players on this server were always looking for ways to improve their combat skills, and fast clicking was a big part of that. Over time, “Kohi Click” became a thing, and now it’s a standard for anyone wanting to check or improve their click speed.
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                How to <Text style={styles.cpsColor}>take a Kohi Click Test</Text>
                            </Text>
                            <Text>Ready to test your speed? Here’s how you can take the Kohi Click Test:</Text>
                            <Text style={styles.listItem}>• Start the click test by clicking on the circle labeled “Click to Test.”</Text>
                            <Text style={styles.listItem}>• Once the test starts, click your mouse as fast as you can within a set time limit (usually 5 to 10 seconds).</Text>
                            <Text style={styles.listItem}>• After the time’s up, you’ll see your clicks per second (CPS) score.</Text>
                            <Text style={styles.listItem}>• Try the test again and see if you can beat your previous score!</Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                How to <Text style={styles.cpsColor}>improve your click score?</Text>
                            </Text>
                            <Text>Want to improve your clicking speed? Here are a few tips to get your CPS up:</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Get a good mouse:</Text> A solid gaming mouse can make a world of difference. Look for one that’s comfortable and responsive.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Experiment with grips:</Text> The way you hold your mouse matters. The claw or fingertip grip often allows for faster clicking.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Practice, practice, practice:</Text> The more you do it, the better you’ll get. Try clicking challenges or even games to help you improve.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Learn jitter clicking:</Text> Some players use a technique called jitter clicking, where you rapidly tense and relax your hand to click faster. It takes practice but can boost your speed.</Text>
                            <Text style={styles.listItem}><Text style={styles.bold}>Stay relaxed:</Text> Don’t tense up! A relaxed hand will let you click faster without burning out.</Text>
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
});

export default KohiDetails;