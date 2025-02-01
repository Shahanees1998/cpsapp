import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, BackHandler, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('LeftTestScreen'); // Navigate to CPS Test
  };

  const handleClose = () => {
    BackHandler.exitApp(); // Close the app
  };

  return (
    <ImageBackground
      source={require('../assets/background-image.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        {/* <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.heading}>Tap Speed Test Game</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.buttonText}>Close </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, 

  },
  heading: {
    marginBottom: 100,
    fontSize:28,
    color:'#b32f60'
    
  },
  startButton: {
    backgroundColor: '#7655CA',
    padding: 15,
    width: '70%', // Set width to 100%
    borderRadius: 50,
    marginBottom: 20,
    elevation: 5,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.9)'
  },
  closeButton: {
    backgroundColor: '#7655CA',
    padding: 15,
    width: '70%', // Set width to 100%
    borderRadius: 50,
    elevation: 5,
    marginTop: 20,
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.9)'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', // Center the text
  },
  logo: {
    height: 100,
    width: 300,
    marginBottom: 70
  }
});

export default HomeScreen; 