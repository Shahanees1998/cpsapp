import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, ScrollView, Keyboard } from 'react-native';
import { Audio } from 'expo-av';
import LeftTestListBar from '../CPS/LeftTestListBar';
import TimeListBar from '../CPS/TimeListBar';
import styles from '../CPS/Styles'; 
import { MaterialIcons } from '@expo/vector-icons';

export default function SpacebarTest({ navigation }) {
  const [clicks, setClicks] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(5); // Default time for the test

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/cps-test-click.mp3') 
      );
      setClickSound(sound);
    }

    loadSound();
    return () => {
      if (clickSound) {
        clickSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isTestRunning) {
      interval = setInterval(() => {
        setTimePassed((prev) => {
          if (prev >= selectedTime) { 
            setIsTestRunning(false);
            clearInterval(interval);
            setIsModalVisible(true); 
            return selectedTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestRunning, selectedTime]);

  const handleSpacebarPress = () => {
    if (!isTestRunning) {
      setIsTestRunning(true);
      setClicks(0);
      setTimePassed(0);
    }

    if (isTestRunning) {
      setClicks((prev) => prev + 1);
      playSound();
    }
  };

  const playSound = async () => {
    if (isSoundEnabled && clickSound) {
      try {
        await clickSound.replayAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setClicks(0);
    setTimePassed(0);
    setIsModalVisible(false);
  };

  return (
    <ImageBackground 
      source={require('../../assets/background-image.png')} 
      style={styles.container}
    >
      <ScrollView onScroll={() => toggleScroll && toggleScroll()} >
        {/* <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Spacebar Test</Text>
          <Text style={styles.tagline}>Press the spacebar as fast as you can for {selectedTime} seconds!</Text>
        </View> */}
        <View style={styles.mainLayout}>
          <LeftTestListBar navigation={navigation} title={"Spacebar Test Online"} />
          <Text style={styles.sidebarTitle}>{selectedTime} Second Per Click</Text>
          <View style={styles.mainContent}>
            <View style={styles.centerContent}>
              <View style={styles.testArea}>
                <View style={styles.controlBar}>
                  <TouchableOpacity>
                    <MaterialIcons name="fullscreen" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.soundControls}>
                    <TouchableOpacity onPress={() => setIsSoundEnabled(!isSoundEnabled)}>
                      <MaterialIcons 
                        name={isSoundEnabled ? "volume-up" : "volume-off"} 
                        size={24} 
                        color="#fff" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.statsContainer}>
                  <Text style={styles.statText}>Clicks: {clicks}</Text>
                  <Text style={styles.statText}>Time: {timePassed}s</Text>
                </View>

                <TouchableOpacity 
                  style={styles.clickCircle} 
                  onPress={handleSpacebarPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clickText}>Press Spacebar</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 20 }}>
                <TimeListBar 
                  selectedTime={selectedTime}
                  onTimeSelect={(time) => {
                    setSelectedTime(time);
                    resetTest();
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Modal for displaying results */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={resetTest}
        >
          <View style={styles.modalOverlay}>
            <ImageBackground 
              source={require('../../assets/modal-bg.jpg')} // Replace with your modal background image path
              style={styles.modalInnerContainer}
            >
              <View style={styles.modalTopBar}>
                <TouchableOpacity onPress={resetTest} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>Your Achievements</Text>
                </View>
              </View>
              <View style={styles.resultOuterContainer}>
                <View style={styles.resultContainer}>
                  <Text style={styles.modalResult}>You pressed the spacebar {clicks} times in {timePassed} seconds.</Text>
                  <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                    <Text style={styles.tryBtnText}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}