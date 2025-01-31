import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Animated, Image } from 'react-native';
import LeftTestListBar from '../components/CPS/LeftTestListBar'; // Import your LeftTestListBar component
import { useLanguage } from '../src/context/LanguageContext';

const LeftTestScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));
  const [languageHeight] = useState(new Animated.Value(0));
  const { texts, setLanguage, language } = useLanguage();

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    Animated.timing(menuHeight, {
      toValue: newState ? 300 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleLanguage = () => {
    const newState = !isLanguageOpen;
    setIsLanguageOpen(newState);
    Animated.timing(languageHeight, {
      toValue: newState ? 200 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    toggleLanguage();
  };

  return (
    <ImageBackground
      source={require('../assets/background-image.png')} // Replace with your background image path
      style={styles.background}
    >
      <TouchableOpacity onPress={toggleLanguage} style={styles.menuItem}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require('../assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Text style={styles.heading}>Which test will you take?</Text>
      <LeftTestListBar navigation={navigation} title={texts?.testName?.selectTest} /> {/* Pass navigation to LeftTestListBar */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    height: 60,
    marginBottom: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  },
  heading: {
    fontSize: 26,
    color: '#b32f60'
  },
  logo: {
    height: '100%',
    width: 120,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

export default LeftTestScreen; 