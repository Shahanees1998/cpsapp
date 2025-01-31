import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../src/context/LanguageContext';

const CPSResultScreen = ({ navigation, route }) => {
  const { clicks, selectedTime, cps } = route.params; 
  const { texts } = useLanguage();

  const handleTryAgain = () => {
    navigation.navigate('CPSTest', { selectedTime }); // Navigate back to the test with the selected time
  };

  return (
    <ImageBackground
      source={require('../../assets/background-image.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>
        <Text style={styles.resultText}>Tap for {selectedTime} seconds</Text>
        <Text style={styles.statText}>Count: {isFinite(clicks / selectedTime) ? (clicks / selectedTime).toFixed(2) : 0.0} CPS</Text>
        <Text style={styles.statText}>{clicks} {texts?.cpsTest?.clicksin} {selectedTime} {texts?.cpsTest?.seconds}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
          <Text style={styles.tryAgainText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
          <Text style={styles.tryAgainText}>{texts?.cpsTest?.tryagain}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tryAgainButton} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.tryAgainText}>Title</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
  },
  statText: {
    fontSize: 16,
    color: '#fff',
  },
  tryAgainButton: {
    backgroundColor: '#7655CA',
    padding: 15,
    borderRadius: 40,
    marginTop: 20,
    minWidth:'80%'
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CPSResultScreen; 