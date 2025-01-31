import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to Home screen after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/background-image.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});

export default SplashScreen;