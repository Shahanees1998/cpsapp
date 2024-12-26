import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal,ScrollView, Image, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import LeftTestListBar from '../CPS/LeftTestListBar';
import TimeListBar from '../CPS/TimeListBar';
import styles from '../CPS/Styles'; 
import KohiDetails from './KohiDetail';
import Footer from '../Footer';
import Stats from '../Stats/Stats'; 
import Navbar from '../Navbar';
import CarousalComponent from '../CPS/CarousalComponent';
import { useLanguage } from '@/src/context/LanguageContext';
export default function KohiTest({ navigation }) {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const {texts} = useLanguage();
  // Get screen dimensions
  const { width: screenWidth } = Dimensions.get('window');
  const width = isFullScreen ? screenWidth : 220;
  const height = isFullScreen ? screenWidth : 220;
  const r = isFullScreen ? screenWidth / 2 - 15 : 90;
  const cx = width / 2;
  const cy = height / 2 + (isFullScreen ? 20 : 0);
  const circumference = 2 * Math.PI * r;

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

  useEffect(() => {
    let interval;
    if (isTestRunning) {
      interval = setInterval(() => {
        setTimePassed((prev) => {
          if (prev >= selectedTime - 1) {
            setIsTestRunning(false);
            clearInterval(interval);
            setIsModalVisible(true); // Show modal when test completes
            return selectedTime;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTestRunning, selectedTime]);

  const playSound = async () => {
    if (isSoundOn && clickSound) {
      try {
        await clickSound.replayAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  };

  const handleClick = () => {
    if (!isTestRunning) {
      setIsTestRunning(true);
      setClicks(0);
      setTimePassed(0);
    }

    if (isTestRunning) {
      setClicks((prev) => prev + 1);
      const elapsedTime = timePassed + 1; // Increment time passed
      setCps((clicks + 1) / elapsedTime); // Calculate CPS
      playSound();
    }
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setClicks(0);
    setCps(0);
    setTimePassed(0);
    setIsModalVisible(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      resetTest(); 
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  return (
    <ScrollView>
      {!isFullScreen ? (
        <>
        <ImageBackground
          source={require('../../assets/background-image.png')}
          style={styles.imageBackground}
        >
          <View style={styles.container}>
          <Navbar onToggle={toggleFullScreen} />
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{texts?.cpsTest.title}</Text>
              <Text style={styles.tagline}>
                {texts?.cpsTest.smallDescription}
              </Text>
            </View>
            <View style={styles.mainLayout}>
              <LeftTestListBar navigation={navigation} title={"Kohi Test Online"} />
              <Text style={styles.sidebarTitle}>{selectedTime} {texts?.seconds}</Text>
              <View style={styles.mainContent}>
                <View style={styles.centerContent}>
                  <View style={styles.testArea}>
                    <View style={styles.controlBar}>
                      <TouchableOpacity onPress={toggleFullScreen}>
                        <MaterialIcons name={isFullScreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#fff" />
                      </TouchableOpacity>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <TouchableOpacity onPress={toggleMusic}>
                          <MaterialIcons name={isMusicOn ? "music-note" : "music-off"} size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleSound}>
                          <MaterialIcons name={isSoundOn ? "volume-up" : "volume-off"} size={24} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.clickCircle}
                      onPress={handleClick}
                      activeOpacity={0.7}
                    >
                      <Svg width={width} height={height}>
                        <Circle
                          stroke="#7455CA"
                          fill="transparent"
                          strokeWidth="15"
                          r={r}
                          cx={cx}
                          cy={cy}
                        />
                        <Circle
                          stroke="#b32f60"
                          fill="transparent"
                          strokeWidth="15"
                          r={r}
                          cx={cx}
                          cy={cy}
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference - (timePassed / selectedTime) * circumference}
                        />
                      </Svg>
                      <Text style={styles.clickText}>
                        {!isTestRunning ? texts?.clickToStartTest :
                          timePassed >= selectedTime ? texts?.testComplete : texts?.click}
                      </Text>
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={resetTest}
            >
              <View style={styles.modalOverlay}>
                <ImageBackground
                  source={require('../../assets/modal-bg.jpg')}
                  style={styles.modalInnerContainer}
                >
                  <View style={styles.modalTopBar}>
                    <TouchableOpacity onPress={resetTest} style={styles.closeBtn}>
                      <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{texts?.yourAchievments}</Text>
                    </View>
                  </View>
                  <View style={styles.resultOuterContainer}>
                    <View style={styles.resultContainer}>
                      <View style={styles.animationContainer}>
                        <View style={styles.animeLgDisplay}>
                          <Image
                            source={require('../../assets/sloath.jpg')}
                            style={styles.animationImage}
                          />
                        </View>
                      </View>
                      <View style={styles.resultContentContainer}>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.animeTitle}>Sloth!</Text>
                        </View>
                        <View style={styles.modalStatsContainer}>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.normalText}>You clicked with the speed of</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statHeading}>{cps.toFixed(2)} CPS</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statSubheading}>{clicks} {texts?.clicks} {texts?.in} {selectedTime} {texts?.seconds}</Text>
                          </View>
                        </View>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.modalNote}>{texts?.stopFeelingSorryFoYourself}</Text>
                        </View>
                        <View style={styles.resultContentRow}>
                          <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                            <Text style={styles.tryBtnText}>{texts?.tryAgain}</Text>
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
        <KohiDetails/>
        <CarousalComponent/>
        <Footer/>
        </>
      ) : (
        <ImageBackground
          source={require('../../assets/background-image.png')}
          style={styles.imageBackgroundfull}
        >
          <View style={styles.controlBar}>
            <TouchableOpacity onPress={toggleFullScreen}>
              <MaterialIcons name={isFullScreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity onPress={toggleMusic}>
                <MaterialIcons name={isMusicOn ? "music-note" : "music-off"} size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSound}>
                <MaterialIcons name={isSoundOn ? "volume-up" : "volume-off"} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50, marginBottom: 50 }}>
            <TouchableOpacity
              style={styles.clickCircle}
              onPress={handleClick}
              activeOpacity={0.7}
            >
              <Svg width={screenWidth} height={screenWidth}>
                <Circle
                  stroke="#7455CA"
                  fill="transparent"
                  strokeWidth="15"
                  r={screenWidth / 2 - 15}
                  cx={screenWidth / 2}
                  cy={screenWidth / 2 + 20}
                />
                <Circle
                  stroke="#b32f60"
                  fill="transparent"
                  strokeWidth="15"
                  r={screenWidth / 2 - 15}
                  cx={screenWidth / 2}
                  cy={screenWidth / 2 + 20}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (timePassed / selectedTime) * circumference}
                />
              </Svg>
              <Text style={styles.clickText}>
                {!isTestRunning ? texts?.clickToStartTest :
                  timePassed >= selectedTime ? texts?.testComplete : texts?.click}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 100, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Stats cps={cps} timePassed={timePassed} score={clicks} /> {/* Pass props to Stats */}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={resetTest}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground
                source={require('../../assets/modal-bg.jpg')}
                style={styles.modalInnerContainer}
              >
                <View style={styles.modalTopBar}>
                  <TouchableOpacity onPress={resetTest} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>Close</Text>
                  </TouchableOpacity>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{texts?.yourAchievments}</Text>
                  </View>
                </View>
                <View style={styles.resultOuterContainer}>
                  <View style={styles.resultContainer}>
                    <View style={styles.animationContainer}>
                      <View style={styles.animeLgDisplay}>
                        <Image
                          source={require('../../assets/sloath.jpg')}
                          style={styles.animationImage}
                        />
                      </View>
                    </View>
                    <View style={styles.resultContentContainer}>
                      <View style={styles.resultContentRow}>
                        <Text style={styles.animeTitle}>Sloth!</Text>
                      </View>
                      <View style={styles.modalStatsContainer}>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.normalText}>You clicked with the speed of</Text>
                        </View>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.statHeading}>{cps.toFixed(2)} CPS</Text>
                        </View>
                        <View style={styles.cpsStatRow}>
                          <Text style={styles.statSubheading}>{clicks} {texts?.clicks} {texts?.in} {selectedTime} {texts?.seconds}</Text>
                        </View>
                      </View>
                      <View style={styles.resultContentRow}>
                        <Text style={styles.modalNote}>{texts?.stopFeelingSorryFoYourself}</Text>
                      </View>
                      <View style={styles.resultContentRow}>
                        <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                          <Text style={styles.tryBtnText}>{texts?.tryAgain}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </ImageBackground>
      )}
    </ScrollView>
  );
}