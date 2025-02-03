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
        <View style={{display:"flex",marginTop:150}}>

    
        <Text style={styles.resultText}>Tap for {selectedTime} seconds</Text>
        <Text style={styles.statText}>Count:       {clicks} </Text>
        <Text style={styles.statText}>Speed:        {isFinite(clicks / selectedTime) ? (clicks / selectedTime).toFixed(2) : 0.0} time/sec</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
          <Text style={styles.tryAgainText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
          <Text style={styles.tryAgainText}>{texts?.cpsTest?.tryagain}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    marginTop:30
  },
  resultText: {
    fontSize: 28,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  statText: {
    fontSize: 28,
    marginBottom: 20,
    color: '#fff',
  },
  tryAgainButton: {
    backgroundColor: '#7655CA',
    padding: 10,
    borderRadius: 50,
    textAlign: "center",
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 15,
    minWidth: 200,
    padding: 20,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.6)'
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CPSResultScreen; 