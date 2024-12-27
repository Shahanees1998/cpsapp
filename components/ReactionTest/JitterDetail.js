// path/to/your/component/JitterDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

const JitterDetail = () => {
    const { texts } = useLanguage();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBackground}>
                <View style={styles.contentScreen}>
                    <View style={styles.mainContentContainer}>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                {texts?.jitterDetails?.heading1}
                            </Text>
                            <Text style={styles.detailP}>
                                {texts?.jitterDetails?.detail1}
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                {texts?.jitterDetails?.heading2}
                            </Text>
                            <Text>
                                {texts?.jitterDetails?.detail2}
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                {texts?.jitterDetails?.heading3}
                            </Text>
                            <Text>Here are some steps to jitter click effectively:</Text>
                            {texts?.jitterDetails?.steps.map((step, index) => (
                                <Text key={index} style={styles.listItem}>{step}</Text>
                            ))}
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                {texts?.jitterDetails?.heading4}
                            </Text>
                            <Text>
                                {texts?.jitterDetails?.detail3}
                            </Text>
                        </View>
                        <View style={styles.cpsTestMainHr}>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.cpsTest}>
                            <Text style={styles.heading}>
                                {texts?.jitterDetails?.heading5}
                            </Text>
                            <Text>
                                {texts?.jitterDetails?.detail4}
                            </Text>
                            <Text style={styles.listItem}>{texts?.jitterDetails?.alternative1}</Text>
                            <Text style={styles.listItem}>{texts?.jitterDetails?.alternative2}</Text>
                            <Text style={styles.listItem}>{texts?.jitterDetails?.alternative3}</Text>
                            <Text>
                                {texts?.jitterDetails?.conclusion}
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