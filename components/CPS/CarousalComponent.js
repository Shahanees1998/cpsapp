import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

// Example SVG Icon for Drag Click Test
const DragClickIcon = () => (
    <Svg width="50" height="50" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M24.3284 9.83584C24.3284 13.0365 22.4904 15.954 19.6718 17.3633V15.4997C21.5573 14.2472 22.7128 12.1137 22.7128 9.83584C22.7128 6.0887 19.6642 3.041 15.918 3.041C12.1718 3.041 9.12313 6.0887 9.12313 9.83584C9.12313 12.1137 10.2787 14.2472 12.1641 15.4997V17.3633C9.34543 15.954 7.50757 13.0365 7.50757 9.83584C7.50757 5.19829 11.2803 1.42543 15.918 1.42543C20.5556 1.42543 24.3284 5.19829 24.3284 9.83584Z" fill="white" />

    </Svg>
);

const CarousalComponent = () => {
    const scrollViewRef = useRef(null);
    const { texts } = useLanguage();

    // Function to scroll to the next card
    const scrollToNext = () => {
        scrollViewRef.current.scrollTo({ x: 300, animated: true }); // Adjust 300 based on card width
    };

    // Function to scroll to the previous card
    const scrollToPrev = () => {
        scrollViewRef.current.scrollTo({ x: -300, animated: true }); // Adjust 300 based on card width
    };

    return (
        <View></View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 120,
        paddingBottom: 30
    },
    container: {
        alignItems: 'center',
        textAlign: 'center',

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    arrowButton: {
        padding: 10,
    },
    arrowImageLeft: {
        width: 100,
        height: 100,
        transform: [{ rotate: '180deg' }],
    },
    arrowImageRight: {
        width: 100,
        height: 100,
    },
    scrollView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: 'hsla(0, 0%, 100%, .205)',
        height: 150,
        minWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
    },
    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    cardText: {
        color: '#fff', // White text color
        marginTop: 10,
    },
});

export default CarousalComponent; 