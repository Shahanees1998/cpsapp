import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'expo-router';
import { MenuIcon } from '../icons';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';
import { GlobeIcon, TriangleIcon } from '../ReactionTest/Icon';

const Navbar = ({ onMenuToggle, navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));
  const [languageHeight] = useState(new Animated.Value(0));
  const { texts, setLanguage, isScroll, language } = useLanguage();

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    Animated.timing(menuHeight, {
      toValue: newState ? 300 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onMenuToggle?.(newState);
  };

  const toggleLanguage = () => {
    const newState = !isLanguageOpen;
    setIsLanguageOpen(newState);
    Animated.timing(menuHeight, {
      toValue: newState ? 400 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
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

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isScroll]);

  const handleOutsidePress = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('CPSTest')} style={styles.logoContainer}>
            <Image
              source={require('../../assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Pressable onPress={toggleMenu} style={styles.menuButton}>
            <View style={styles.menuIconContainer}>
              <MenuIcon isOpen={false} />
            </View>
          </Pressable>
        </View>

        <Animated.View style={[styles.dropdown, { height: menuHeight }]}>
          <TouchableOpacity onPress={() => navigation.navigate('KohiTest')} style={styles.menuItem}>
            <Text style={styles.menuText}>{texts?.testName?.kohi}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ButterflyTest')} style={styles.menuItem}>
            <Text style={styles.menuText}>{texts?.testName?.butter}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReactionTest')} style={styles.menuItem}>
            <Text style={styles.menuText}>{texts?.testName?.reaction}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AimTrainerTest')} style={styles.menuItem}>
            <Text style={styles.menuText}>{texts?.testName?.aim}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CPSTest')} style={styles.menuItem}>
            <Text style={styles.menuText}>{texts?.testName?.cps}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLanguage} style={styles.menuItem}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <GlobeIcon size={20} />
              <Text style={styles.menuText}>{language.toUpperCase()}</Text>
              <TriangleIcon 
                size={10} 
                style={{ 
                  transform: !isLanguageOpen ? [{ rotate: '180deg' }] : [],
                  paddingLeft: 20 
                }} 
              />
            </View>
          </TouchableOpacity>
          <Animated.View style={[styles.dropdown, { height: languageHeight }]}>
            <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.menuItem}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/en.jpg')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text style={styles.menuText}>English</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.menuItem}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/es.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text style={styles.menuText}>Spanish</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('fr')} style={styles.menuItem}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/fr.jpg')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text style={styles.menuText}>French</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoContainer: {
    height: 60,
  },
  logo: {
    height: '100%',
    width: 120,
  },
  menuButton: {
    padding: 8,
  },
  menuIconContainer: {
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: 'transparent', // More transparent
    borderRadius: 8,

    overflow: 'hidden',
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,

  },
  menuText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
});

export default Navbar; 