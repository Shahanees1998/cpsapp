import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, ImageBackground, Image, Animated, BackHandler } from "react-native";
import { Audio } from "expo-av";
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AnimatedButton from '../../components/AnimatedButton';
import { MusicIcon, SoundIcon } from '../icons/index';
import { useFocusEffect } from "@react-navigation/native";

const Dot = ({ id, x, y, onRemove, onHit, size, color, difficulty }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [growing, setGrowing] = useState(true);
console.log(difficulty)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize((prev) => {
        if (growing) {
          if (prev < currentSize) {
            return prev + 1;
          } else {
            setGrowing(false);
            return prev - 1;
          }
        } else {
          if (prev <= 0) {
            onRemove(id, true);
            return 0;
          }
          return prev - 1;
        }
      });
    }, 50);

    const timer = setTimeout(() => {
      onRemove(id, true); // Remove dot if it times out and mark as missed
    }, difficulty);

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
  const [selectedLevel, setSelectedLevel] = useState("2000"); // Default level
  const [stopGame, setIsStopGame] = useState(false)
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [selectedColor, setSelectedColor] = useState('#FF0000'); // Default color
  const [targetSize, setTargetSize] = useState(30); // Default size

  const { texts, toggleScroll } = useLanguage();
  const [dots, setDots] = useState([]); // Ensure dots state is defined
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);


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


  useFocusEffect(
    React.useCallback(() => {
      setScore(0)
      setMisses(0)
      setIsTestRunning(false)
      setIsTestFinished(false)

    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      setIsTestRunning(false);
      setIsStopGame(true);
      clearInterval();
      navigation.navigate('LeftTestScreen', { selectedTime });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, [navigation]);


  const navigate = () => {
    navigation.navigate('CPSResultScreen', { clicks: score, misses: misses, selectedTime, cps: score / selectedTime });
  };

  // Add this useEffect to call navigate when the test ends
  useEffect(() => {
    if (!isTestRunning && timePassed > 0 && !stopGame) {
      navigate();
    }
  }, [isTestRunning, timePassed]);

  useEffect(() => {
    let interval;

    if (isTestRunning) {
      interval = setInterval(() => {
        setTimePassed((prev) => {
          if (prev >= selectedTime - 1) {
            setIsTestRunning(false);
            setIsTestFinished(true)
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
      }, 600);
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
      else {
        backgroundMusic?.stopAsync();
      }
    } else {
      backgroundMusic?.stopAsync();
    }
  }, [isTestRunning, isMusicOn]);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <ScrollView onScroll={() => toggleScroll && toggleScroll()}>
      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => toggleScroll()}>
            {(!isTestRunning && !isTestFinished) ? (
              <View >
                <Text style={styles.dropdownLabel}>{texts?.locales?.level}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedLevel}
                    onValueChange={(itemValue) => setSelectedLevel(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label={texts?.locales?.easy} value="1000" />
                    <Picker.Item label={texts?.locales?.normal} value="600" />
                    <Picker.Item label={texts?.locales?.medium} value="400" />
                    <Picker.Item label={texts?.locales?.fast} value="200" />
                  </Picker>
                </View>

                <Text style={styles.dropdownLabel}>{texts?.locales?.targetSize}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={targetSize}
                    onValueChange={(itemValue) => setTargetSize(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label={texts?.locales?.tiny} value={20} />
                    <Picker.Item label={texts?.locales?.small} value={40} />
                    <Picker.Item label={texts?.locales?.medium} value={60} />
                    <Picker.Item label={texts?.locales?.large} value={80} />
                    <Picker.Item label={texts?.locales?.extraLarge} value={100} />
                  </Picker>
                </View>
                <Text style={styles.dropdownLabel}>{texts?.locales?.color}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedColor}
                    onValueChange={(itemValue) => setSelectedColor(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {colors.map((color) => (
                      <Picker.Item key={color.value} label={color.label} value={color.value} />
                    ))}
                  </Picker>
                </View>
                <AnimatedButton />
                <Text style={styles.dropdownLabel}>{texts?.locales?.time}</Text>
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
                <View style={{ display: "flex", flexDirection: "row", marginVertical: 20 }}>
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
                  <Text style={styles.startButtonText}>{texts?.locales?.startTest}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.testArea}>
                <View style={styles.statsContainer}>
                  <View style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                    <Animated.Image
                      source={require('../../assets/arrow.png')}
                      style={[styles.pointerImage]}
                    />
                    <Text style={styles.statText}>Hits: {score}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                    <Animated.Image
                      source={require('../../assets/reaction-time.png')}
                      style={[styles.pointerImage]}
                    />
                    <Text style={styles.statText}>Timer: {selectedTime - timePassed}s</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                    <Animated.Image
                      source={require('../../assets/arrow.png')}
                      style={[styles.pointerImage]}
                    />
                    <Text style={styles.statText}>{texts?.locales?.misses}: {misses}</Text>
                  </View>
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
                      difficulty={parseInt(selectedLevel)}
                    />
                  ))}
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "100%"
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    height: '100%'
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
    // backgroundColor: '#2a2a5e',
    borderRadius: 8,
    marginTop: 20,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 60,
  },
  pointerImage: {
    width: 30,
    height: 30,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },

  aimGameArea: {
    position: 'relative',
    width: '100%',
    height: 500,
    backgroundColor: 'rgba(3,109,248,.234)',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow:
      '8px 8px 16px #1f1f4a, -1px -1px 16px #4a4a92, inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',

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
    fontSize: 18,
    marginBottom: 15,
    marginTop: 10
  },
  pickerContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    paddingInline: 10,
    marginBottom: 10,

  },
  picker: {
    margin: 0

  },
  pickerItem: {
    fontSize: 10,

  },
  startButton: {
    backgroundColor: '#7455CA',
    paddingInline: 15,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.6)'
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
    borderRadius: 20,
    overflow: 'hidden',
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
  modalTitleContainer: {
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
    padding: 10
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
  modalTopBar: {
    width: '80%',
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  modalStatsContainer: {
    display: "flex",
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: "#481b91",
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
