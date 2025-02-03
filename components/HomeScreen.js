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
    color:'#fff',
    marginTop:5
    
  },
  startButton: {
    backgroundColor: '#7655CA',
    padding: 15,
    width: '70%', // Set width to 100%
    borderRadius: 50,
    
    paddingVertical:20,
    elevation: 5,
    // width: 180,
    // height: 180,
    // borderRadius: 200,
    overflow: 'hidden', 
    background: 'linear-gradient(145deg, #2a2a5e, #3a3a7e)', /* Gradient background */
    boxShadow: 
      '8px 8px 16px #1f1f4a, 0px 0px 16px #4a4a92, inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: '#2a2a5e',
  },
  closeButton: {
    backgroundColor: '#7655CA',
    padding: 15,
    width: '70%', // Set width to 100%
    borderRadius: 50,
    
    paddingVertical:20,
    elevation: 5,
    overflow: 'hidden', 
    background: 'linear-gradient(145deg, #2a2a5e, #3a3a7e)', /* Gradient background */
    boxShadow: 
      '8px 8px 16px #1f1f4a, 0px 0px 16px #4a4a92, inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    
    alignSelf: 'center',
    
    marginBottom: 40,
    backgroundColor: '#2a2a5e',
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