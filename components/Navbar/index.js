import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated,TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MenuIcon } from '../icons';
import { useLanguage } from '../../src/context/LanguageContext';

const Navbar = ({ onMenuToggle,navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));
  const { texts, setLanguage } = useLanguage();
  

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    Animated.timing(menuHeight, {
      toValue: newState ? 320 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onMenuToggle?.(newState);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    toggleMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/" style={styles.logoContainer}>
          <Image 
            source={require('../../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Link>
        
        <Pressable onPress={toggleMenu} style={styles.menuButton}>
          <View style={styles.menuIconContainer}>
            <MenuIcon isOpen={isMenuOpen} />
          </View>
        </Pressable>
      </View>

      <Animated.View style={[styles.dropdown, { height: menuHeight }]}>
        <TouchableOpacity onPress={()=>navigation.navigate('KohiTest')} style={styles.menuItem}>
          <Text style={styles.menuText}>Kohi Click Test</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ButterflyTest')} style={styles.menuItem}>
          <Text style={styles.menuText}>Butterfly Test</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ReactionTest')} style={styles.menuItem}>
          <Text style={styles.menuText}>Reaction Test</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AimTrainerTest')} style={styles.menuItem}>
          <Text style={styles.menuText}>Aim Trainer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.menuItem}>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Image 
            source={require('../../assets/en.jpg')}
            style={{width:30,height:30,borderRadius:0, marginRight:10}}
            resizeMode="contain"
          />
          <Text style={styles.menuText}>English</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.menuItem}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Image 
            source={require('../../assets/es.png')}
            style={{width:30,height:30,borderRadius:0, marginRight:10}}
            resizeMode="contain"
          />
          <Text style={styles.menuText}>Spanish</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('fr')} style={styles.menuItem}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Image 
            source={require('../../assets/fr.jpg')}
            style={{width:30,height:30,borderRadius:0, marginRight:10}}
            resizeMode="contain"
          />
          <Text style={styles.menuText}>French</Text>
        </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
    
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoContainer: {
    height: 40,
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