import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Audio } from "expo-av";
import { Picker } from '@react-native-picker/picker';
import LeftTestListBar from '../CPS/LeftTestListBar';
import TimeListBar from '../CPS/TimeListBar';
import Navbar from '../Navbar'
import CarousalComponent from "../CPS/CarousalComponent";
import AimTrainerDetail from "./AimTrainerDetail";
import Footer from "../Footer";
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Dot = ({ id, x, y, onRemove, onHit, size, color }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [growing, setGrowing] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize((prev) => {
        if (growing) {
          if (prev < 65) { // Maximum size
            return prev + 1; // Grow the dot
          } else {
            setGrowing(false); // Stop growing and start shrinking
            return prev - 1;
          }
        } else {
          if (prev <= 0) {
            onRemove(id, true); // Remove dot if it shrinks to 0 and mark as missed
            return 0;
          }
          return prev - 1; // Shrink the dot
        }
      });
    }, 50);

    const timer = setTimeout(() => {
      onRemove(id, true); // Remove dot if it times out and mark as missed
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [id, onRemove, growing]);

  const handleClick = () => {
    onHit(id);
    onRemove(id, false); // Mark as hit
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        width: currentSize,
        height: currentSize,
        backgroundColor: color, // Use the color passed as a prop
        borderRadius: currentSize / 2,
      }}
    />
  );
};


export default function AimTrainerTest({ navigation }) {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [selectedTime, setSelectedTime] = useState(30);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [accuracy, setAccuracy] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dots, setDots] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#FF0000'); // Default color
  const [targetSize, setTargetSize] = useState(30); // Default size
  const { texts, toggleScroll } = useLanguage();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      resetTest();
    }
  };
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
          if (prev >= selectedTime - 1) {
            setIsTestRunning(false);
            setIsModalVisible(true);
            clearInterval(interval);
            return selectedTime;
          }
          return prev + 1;
        });

        // Generate a new dot at a random position
        const newDot = {
          id: Date.now(),
          x: Math.random() * 90, // Random x position
          y: Math.random() * 90, // Random y position
        };
        setDots((prevDots) => [...prevDots, newDot]);
      }, 1000); // Adjust the interval as needed
    }
    return () => clearInterval(interval);
  }, [isTestRunning, selectedTime]);

  const handleDotRemove = (id, isMissed) => {
    if (isMissed) {
      setMisses((prevMisses) => prevMisses + 1); // Increment misses if the dot was missed
    }
    setDots((prevDots) => prevDots.filter(dot => dot.id !== id));
  };

  const handleDotHit = (id) => {
    setScore((prevScore) => prevScore + 1);
    handleDotRemove(id, false); // Mark as hit
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setScore(0);
    setMisses(0);
    setTimePassed(0);
    setAccuracy(100);
    setIsModalVisible(false);
    setDots([]);
  };

  return (
    <ScrollView onScroll={() => toggleScroll && toggleScroll()}>

      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Navbar onToggle={toggleFullScreen} navigation={navigation} />

          <TouchableWithoutFeedback onPress={() => toggleScroll()}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{texts?.AimTrainerTest?.title}</Text>
              <Text style={styles.tagline}> {texts?.AimTrainerTest?.tagline} </Text>
            </View>
            {isTestRunning ? (
              <View style={styles.testArea}>
                <View style={styles.statsContainer}>
                  <Text style={styles.statText}>Score: {score}</Text>
                  <Text style={styles.statText}>Misses: {misses}</Text>
                  <Text style={styles.statText}>Time: {selectedTime - timePassed}s</Text>
                </View>
                <View style={styles.aimGameArea}>
                  {dots.map((dot) => (
                    <Dot
                      key={dot.id}
                      id={dot.id}
                      x={dot.x}
                      y={dot.y}
                      onRemove={handleDotRemove}
                      onHit={handleDotHit}
                      size={targetSize}
                      color={selectedColor}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.configurationContainer}>
                <Text style={styles.dropdownLabel}>{texts?.AimTrainerDetail?.shapecolor}</Text>
                <Picker
                  selectedValue={selectedColor}
                  onValueChange={(itemValue) => setSelectedColor(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Red" value="#FF0000" />
                  <Picker.Item label="Blue" value="#0000FF" />
                  <Picker.Item label="Green" value="#008000" />
                  <Picker.Item label="Yellow" value="#FFFF00" />
                  <Picker.Item label="Purple" value="#800080" />
                  <Picker.Item label="Orange" value="#FFA500" />
                </Picker>

                <Text style={styles.dropdownLabel}>{texts?.AimTrainerDetail?.targetSize}</Text>
                <Picker
                  selectedValue={targetSize}
                  onValueChange={(itemValue) => setTargetSize(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Small" value={30} />
                  <Picker.Item label="Medium" value={40} />
                  <Picker.Item label="Large" value={50} />
                  <Picker.Item label="Extra Large" value={65} />
                </Picker>

                <Text style={styles.dropdownLabel}>{texts?.AimTrainerDetail?.time}</Text>
                <Picker
                  selectedValue={selectedTime}
                  onValueChange={(itemValue) => setSelectedTime(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="15 seconds" value={15} />
                  <Picker.Item label="30 seconds" value={30} />
                  <Picker.Item label="45 seconds" value={45} />
                  <Picker.Item label="60 seconds" value={60} />
                </Picker>

                <TouchableOpacity style={styles.startButton} onPress={() => setIsTestRunning(true)}>
                  <Text style={styles.startButtonText}>Start Test</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableWithoutFeedback>
          {/* Modal for displaying results */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={resetTest}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalInnerContainer}>
                <Text style={styles.modalTitle}>Test Complete!</Text>
                <Text style={styles.modalText}>Score: {score}</Text>
                <Text style={styles.modalText}>Misses: {misses}</Text>
                <Text style={styles.modalText}>Accuracy: {accuracy.toFixed(1)}%</Text>
                <TouchableOpacity style={styles.closeButton} onPress={resetTest}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
      <AimTrainerDetail />
      <Footer navigation={navigation} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 900
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    color: '#b32f60',
    fontWeight: "700",
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  testArea: {
    backgroundColor: '#2a2a5e',
    borderRadius: 8,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statText: {
    color: '#fff',
    fontSize: 16,
  },
  aimGameArea: {
    position: 'relative',
    width: '100%',
    height: 400,
    backgroundColor: '#3a3a7e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  configurationContainer: {
    marginTop: 20,
    height: 400,
    backgroundColor: 'rgba(3,109,248,.234)',
    borderRadius: 8,
    padding: 20
  },
  dropdownLabel: {
    color: '#fff',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#7655ca',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#b32f60',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
});
