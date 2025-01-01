import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import { Audio } from "expo-av";
import { Picker } from '@react-native-picker/picker';
import Navbar from '../Navbar';
import AimTrainerDetail from "./AimTrainerDetail";
import Footer from "../Footer";

import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PlusIcon from '../icons/PlusIcon';
import ArrowIcon from '../icons/ArrowIcon';
import AnimatedButton from '../../components/AnimatedButton';
import MusicVolumeButton from '../MusicVolumeButton';
import { MusicIcon, SoundIcon } from '../icons/index';
const Dot = ({ id, x, y, onRemove, onHit, size, color }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [growing, setGrowing] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize((prev) => {
        if (growing) {
          if (prev < 65) {
            return prev + 1;
          } else {
            setGrowing(false);
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
  const [selectedLevel, setSelectedLevel] = useState("easy"); // Default level
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [selectedColor, setSelectedColor] = useState('#FF0000'); // Default color
  const [targetSize, setTargetSize] = useState(30); // Default size
  const { texts, toggleScroll } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false); // Ensure modal visibility state is defined
  const [dots, setDots] = useState([]); // Ensure dots state is defined
  const [showColorDropdown, setShowColorDropdown] = useState(false); // State to control color dropdown visibility
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);


  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      resetTest();
    }
  };
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/background-music.mp3')
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
            setIsModalVisible(true); // Show modal when time is up
            clearInterval(interval);
            return selectedTime;
          }
          return prev + 1;
        });


        const newDot = {
          id: Date.now(),
          x: Math.random() * 90,
          y: Math.random() * 90,
        };
        setDots((prevDots) => [...prevDots, newDot]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestRunning, selectedTime]);

  const handleDotRemove = (id, isMissed) => {
    if (isMissed) {
      setMisses((prevMisses) => prevMisses + 1);
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
    setDots([]);
    setIsModalVisible(false);
  };

  const colors = [
    { label: "Red", value: "#FF0000" },
    { label: "Blue", value: "#0000FF" },
    { label: "Green", value: "#008000" },
    { label: "Yellow", value: "#FFFF00" },
    { label: "Purple", value: "#800080" },

  ];

  useEffect(() => {
    async function loadSounds() {
      const { sound: clickSnd } = await Audio.Sound.createAsync(
        require('../../assets/cps-test-click.mp3')
      );
      const { sound: bgMusic } = await Audio.Sound.createAsync(
        require('../../assets/background-music.mp3'),
        { isLooping: true }
      );
      setClickSound(clickSnd);
      setBackgroundMusic(bgMusic);
    }

    loadSounds();

    return () => {
      if (clickSound) clickSound.unloadAsync();
      if (backgroundMusic) backgroundMusic.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (isTestRunning) {
      if (isMusicOn) {
        backgroundMusic?.playAsync();
      }
    } else {
      backgroundMusic?.stopAsync();
    }
  }, [isTestRunning, isMusicOn]);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  const startTest = () => {
    setIsTestRunning(true);
    setIsModalVisible(false);
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
              <Text style={styles.tagline}>{texts?.AimTrainerTest?.tagline}</Text>
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
                <Text style={styles.dropdownLabel}>Level</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedLevel}
                    onValueChange={(itemValue) => setSelectedLevel(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Normal" value="normal" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Fast" value="fast" />
                  </Picker>
                </View>

                <Text style={styles.dropdownLabel}>Target Size</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={targetSize}
                    onValueChange={(itemValue) => setTargetSize(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Tiny" value={20} />
                    <Picker.Item label="Small" value={30} />
                    <Picker.Item label="Medium" value={40} />
                    <Picker.Item label="Large" value={50} />
                    <Picker.Item label="Extra Large" value={65} />
                  </Picker>
                </View>
                <Text style={styles.dropdownLabel}>Color</Text>
                <TouchableOpacity
                  style={styles.colorInput}
                  onPress={() => setShowColorDropdown(!showColorDropdown)}
                >
                  <View style={[styles.colorCircle, { backgroundColor: selectedColor }]} />
                </TouchableOpacity>
                {showColorDropdown && (
                  <View style={styles.colorDropdown}>
                    {colors.map((color) => (
                      <TouchableOpacity
                        key={color.value}
                        style={styles.colorOption}
                        onPress={() => {
                          setSelectedColor(color.value);
                          setShowColorDropdown(false);
                        }}
                      >
                        <View style={[styles.colorCircle, { backgroundColor: color.value }]} />

                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <AnimatedButton />
                <Text style={styles.dropdownLabel}>Time</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedTime}
                    onValueChange={(itemValue) => setSelectedTime(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="15" value={15} />
                    <Picker.Item label="30" value={30} />
                    <Picker.Item label="45" value={45} />
                    <Picker.Item label="60" value={60} />
                  </Picker>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginVertical: 5 }}>
                  <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      setIsMusicOn(!isMusicOn);

                    }}
                  >
                    {isMusicOn ?
                      <View style={{ width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#7455CA' }}>
                        <Image source={require('../../assets/music-on.png')} style={{ width: 15, height: 15 }} /> </View> : <MusicIcon isEnabled={isMusicOn} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleSound}>
                    <SoundIcon isEnabled={isSoundOn} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => setIsTestRunning(true)}>
                  <Text style={styles.startButtonText}>Start Test</Text>
                </TouchableOpacity>

              </View>
            )}
          </TouchableWithoutFeedback>

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
                    <Text style={styles.closeBtnText}>{texts?.cpsTest?.close}</Text>
                  </TouchableOpacity>

                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{texts?.cpsTest?.achievementtitle}</Text>
                  </View>
                </View>
                <View style={styles.resultOuterContainer}>
                  <View style={styles.resultContainer}>
                    <View style={styles.animationContainer}>
                      <View style={styles.animeLgDisplay}>
                        <Image
                          source={require('../../assets/sloath.png')} // Replace with your image path
                          style={styles.animationImage}
                        />
                      </View>
                    </View>
                    <View style={styles.resultContentContainer}>
                      <View style={styles.resultContentRow}>
                        <Text style={styles.animeTitle}>{texts?.cpsTest?.sloth}</Text>
                      </View>
                      <View style={styles.modalStatsContainer}>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.normalText}>{texts?.cpsTest?.clickspeeddesc}</Text>
                        </View>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.statHeading}>Scores: {score}</Text>
                        </View>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.statSubheading}>Misses: {misses}</Text>
                        </View>
                      </View>
                      <View style={styles.resultContentRow}>
                        <Text style={styles.modalNote}>{texts?.cpsTest?.feelings}</Text>
                      </View>
                      <View style={styles.resultContentRow}>
                        <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                          <Text style={styles.tryBtnText}>{texts?.cpsTest?.tryagain} </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

              </ImageBackground>
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
    height: "72%",
    backgroundColor: 'rgba(3,109,248,.234)',
    borderRadius: 8,
    padding: 20
  },
  dropdownLabel: {
    color: '#fff',
    marginBottom: 5,
  },
  pickerContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,

  },
  picker: {
    margin: 0

  },
  pickerItem: {
    fontSize: 10,

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
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  animeTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "#fff"

  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'normal',
    marginRight: -40
  },
  animeLgDisplay: {
    // Styles for large display
  },
  animationImage: {
    width: 130,
    height: 130,
  },
  resultContentContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resultContentRow: {
    marginVertical: 5,
  },
  modalStatsContainer: {
    display: "flex",
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: "#481b91",
    maxWidth: 200,
    justifyContent: "center"
  },
  cpsStatRow: {
    marginVertical: 2,
  },
  normalText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  statHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#ff0c73"
  },
  statSubheading: {
    fontSize: 16,
    color: '#fff',
    fontWeight: "bold"
  },
  modalNote: {
    fontSize: 17,
    textAlign: 'center',
    margin: 15,
    color: "#f95e5e",
    fontWeight: "600",

  },
  tryBtn: {
    backgroundColor: '#ffc600',
    padding: 10,
    borderRadius: 10,
  },
  tryBtnText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
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
  colorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  colorText: {
    fontSize: 12, // Font size for color text
  },
  colorDropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    padding: 10,
    maxHeight: 150,
    overflow: 'hidden',
    display: "flex",
    flexDirection: "row"
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: 'max-content',
    cursor: 'pointer',
    marginTop: 10, // Add some margin for spacing
  },
  button: {
    cursor: 'pointer',
  },
  cursorAim: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusBtnIcon: {
    marginRight: 5,
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#7455CA',
  },
  icon: {
    width: 15,
    height: 15,
  },
});
