import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import PlusIcon from './icons/PlusIcon'; // Import your PlusIcon component

const AnimatedButton = () => {
  const [isPlusActive, setIsPlusActive] = useState(true);
  const plusTranslateX = useState(new Animated.Value(0))[0]; // For the plus button
  const pointerTranslateX = useState(new Animated.Value(0))[0]; // For the pointer image
  const rotation = useState(new Animated.Value(0))[0]; // For the rotation effect

  const handlePress = () => {

    setIsPlusActive(!isPlusActive);

    Animated.parallel([
      Animated.timing(plusTranslateX, {
        toValue: isPlusActive ? 30 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pointerTranslateX, {
        toValue: isPlusActive ? -38 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: isPlusActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotate from 0 to 180 degrees
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.iconContainer}>
          <Animated.View style={{ transform: [{ translateX: plusTranslateX }, { rotate: rotateInterpolate }] }}>
            <View style={styles.circle}>
              <PlusIcon size={12} color="#fff" />
            </View>
          </Animated.View>
          <View style={styles.pointerContainer}>
            <Animated.Image
              source={require('../assets/arrow.png')}
              style={[styles.pointerImage, { transform: [{ translateX: pointerTranslateX }] }]}
            />

          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    width: 80, // Set a fixed width for the button
    overflow: 'hidden', // Prevent overflow
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B4513', // Brown color
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  pointerImage: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
  },
  line: {
    width: 2,
    height: 15,
    backgroundColor: '#000', // Line color
    marginLeft: 5,
  },
});

export default AnimatedButton; 