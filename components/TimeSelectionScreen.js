import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import TimeListBar from './CPS/TimeListBar'; // Import your TimeListBar component
import { useLanguage } from '@/src/context/LanguageContext'; // Import useLanguage for localization

const TimeSelectionScreen = ({ navigation, route }) => {
  const { testType } = route.params; // Get the selected test type from route params
  const [selectedTime, setSelectedTime] = useState(null); // State to hold the selected time
  const { texts } = useLanguage(); // Get texts for localization

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Set the selected time
  };

  const handleStartTest = () => {
    if (selectedTime) {
      navigation.navigate(testType, { selectedTime });
    } else {
      alert(texts?.cpsTest?.selectTime); 
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background-image.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{texts?.cpsTest?.selectTimeTitle}</Text>
        <TimeListBar selectedTime={selectedTime} onTimeSelect={handleTimeSelect} /> {/* Display TimeListBar */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
          <Text style={styles.buttonText}>Start Test</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  startButton: {
    // backgroundColor: '#7655CA',
    backgroundColor: '#434f65',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TimeSelectionScreen; 