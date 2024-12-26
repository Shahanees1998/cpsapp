import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import LeftTestListBar from '../CPS/LeftTestListBar';
import TimeListBar from '../CPS/TimeListBar';
import styles from '../CPS/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from "../Navbar";
import Footer from '../Footer';
import Stats from '../Stats/Stats';
import { MusicIcon, SoundIcon } from '../icons';
import { useLanguage } from '../../src/context/LanguageContext';
import KohiDetails from './KohiDetail';


export default function KohiTest({ navigation }) {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  const [ripples, setRipples] = useState([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [circleColor, setCircleColor] = useState('#7455CA'); // Initial circle color
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const { texts } = useLanguage();


  // Get screen dimensions
  const { width: screenWidth } = Dimensions.get('window');
  const width = isFullScreen ? screenWidth : 220;
  const height = isFullScreen ? screenWidth : 220;
  const r = isFullScreen ? screenWidth / 2 - 15 : 90;
  const cx = width / 2;
  const cy = height / 2 + (isFullScreen ? 20 : 0); // Add margin when in full screen
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

  const handleClick = (event) => {
    if (!isTestRunning) {
      setIsTestRunning(true);
      setStartTime(Date.now());
      setTimePassed(0);
      setCps(0);
    }

    if (isTestRunning && timePassed < selectedTime) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      setClicks((prevClicks) => {
        const newClicks = prevClicks + 1;
        setCps(newClicks / elapsedTime);
        return newClicks;
      });

      playSound();

      const { locationX, locationY } = event.nativeEvent;
      setRipples([...ripples, { x: locationX, y: locationY }]);
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.slice(1));
      }, 500);
    }
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setClicks(0);
    setCps(0);
    setTimePassed(0);
    setStartTime(null);
    setRipples([]);
    setIsModalVisible(false);
    setCircleColor('#7455CA'); // Reset circle color
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // if (!isFullScreen) {
    //   resetTest();
    // }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  // const [clicks, setClicks] = useState(0);
  // const [cps, setCps] = useState(0);
  // const [selectedTime, setSelectedTime] = useState(5);
  // const [isTestRunning, setIsTestRunning] = useState(false);
  // const [timePassed, setTimePassed] = useState(0);
  // const [clickSound, setClickSound] = useState();
  // const [backgroundMusic, setBackgroundMusic] = useState();
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  // const [isSoundOn, setIsSoundOn] = useState(true);
  // const [isMusicOn, setIsMusicOn] = useState(true);
  // const {texts} = useLanguage();
  // // Get screen dimensions
  // const { width: screenWidth } = Dimensions.get('window');
  // const width = isFullScreen ? screenWidth : 220;
  // const height = isFullScreen ? screenWidth : 220;
  // const r = isFullScreen ? screenWidth / 2 - 15 : 90;
  // const cx = width / 2;
  // const cy = height / 2 + (isFullScreen ? 20 : 0);
  // const circumference = 2 * Math.PI * r;

  // useEffect(() => {
  //   async function loadSounds() {
  //     const { sound: clickSnd } = await Audio.Sound.createAsync(
  //       require('../../assets/cps-test-click.mp3')
  //     );
  //     const { sound: bgMusic } = await Audio.Sound.createAsync(
  //       require('../../assets/background-music.mp3'),
  //       { isLooping: true }
  //     );
  //     setClickSound(clickSnd);
  //     setBackgroundMusic(bgMusic);
  //   }

  //   loadSounds();

  //   return () => {
  //     if (clickSound) clickSound.unloadAsync();
  //     if (backgroundMusic) backgroundMusic.unloadAsync();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isTestRunning) {
  //     if (isMusicOn) {
  //       backgroundMusic?.playAsync();
  //     }
  //   } else {
  //     backgroundMusic?.stopAsync();
  //   }
  // }, [isTestRunning, isMusicOn]);

  // useEffect(() => {
  //   let interval;
  //   if (isTestRunning) {
  //     interval = setInterval(() => {
  //       setTimePassed((prev) => {
  //         if (prev >= selectedTime - 1) {
  //           setIsTestRunning(false);
  //           clearInterval(interval);
  //           setIsModalVisible(true); // Show modal when test completes
  //           return selectedTime;
  //         }
  //         return prev + 1;
  //       });
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isTestRunning, selectedTime]);

  // const playSound = async () => {
  //   if (isSoundOn && clickSound) {
  //     try {
  //       await clickSound.replayAsync();
  //     } catch (error) {
  //       console.log('Error playing sound:', error);
  //     }
  //   }
  // };

  // const handleClick = () => {
  //   if (!isTestRunning) {
  //     setIsTestRunning(true);
  //     setClicks(0);
  //     setTimePassed(0);
  //   }

  //   if (isTestRunning) {
  //     setClicks((prev) => prev + 1);
  //     const elapsedTime = timePassed + 1; // Increment time passed
  //     setCps((clicks + 1) / elapsedTime); // Calculate CPS
  //     playSound();
  //   }
  // };

  // const resetTest = () => {
  //   setIsTestRunning(false);
  //   setClicks(0);
  //   setCps(0);
  //   setTimePassed(0);
  //   setIsModalVisible(false);
  // };

  // const toggleFullScreen = () => {
  //   setIsFullScreen(!isFullScreen);
  //   if (!isFullScreen) {
  //     resetTest(); 
  //   }
  // };

  // const toggleSound = () => {
  //   setIsSoundOn(!isSoundOn);
  // };

  // const toggleMusic = () => {
  //   setIsMusicOn(!isMusicOn);
  // };

  return (
    <ScrollView>
    {!isFullScreen ? (
      <>
        <ImageBackground
          source={require('../../assets/background-image.png')}
          style={styles.imageBackground}
        >
          <View style={styles.container}>
            <Navbar onToggle={toggleFullScreen} navigation={navigation} />
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{texts?.KohiTest?.title}</Text>
              <Text style={styles.tagline}>
              {texts?.KohiTest?.tagline}
              </Text>
            </View>
            <View style={styles.mainLayout}>
              <LeftTestListBar navigation={navigation} title={texts?.KohiTest?.leftsidetitle} />
              <Text style={styles.sidebarTitle}>{selectedTime} {texts?.KohiTest?.selectTimetitle}</Text>
              <View style={styles.mainContent}>
                <View style={styles.centerContent}>
                  <View style={styles.testArea}>
                    <View style={styles.controlBar}>
                      <TouchableOpacity onPress={toggleFullScreen}>
                        <MaterialIcons name={isFullScreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#fff" />
                      </TouchableOpacity>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{ marginRight: 10 }}
                          onPress={() => {
                            setIsMusicOn(!isMusicOn);

                          }}
                        >
                          <MusicIcon isEnabled={isMusicOn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleSound}>
                          <SoundIcon isEnabled={isSoundOn} />
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
                          stroke={circleColor}
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
                        {ripples.map((ripple, index) => (
                          <Circle
                            key={index}
                            cx={ripple.x}
                            cy={ripple.y}
                            r={30}
                            fill="rgba(255, 255, 255, 0.3)"
                          />
                        ))}
                      </Svg>
                      <Text style={styles.clickText}>
                        {!isTestRunning ? texts.cpsTest.circletext:
                          timePassed >= selectedTime ? '' : ''}
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
              <View style={{ height: 100 }}>
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
                  source={require('../../assets/modal-bg.jpg')} // Replace with your modal background image path
                  style={styles.modalInnerContainer}
                >
                  <View style={styles.modalTopBar}>
                    <TouchableOpacity onPress={resetTest} style={styles.closeBtn}>
                      <Text style={styles.closeBtnText}>{texts?.KohiTest?.close}</Text>
                    </TouchableOpacity>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{texts?.KohiTest?.achievementtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.resultOuterContainer}>
                    <View style={styles.resultContainer}>
                      <View style={styles.animationContainer}>
                        <View style={styles.animeLgDisplay}>
                          <Image
                            source={require('../../assets/sloath.jpg')} // Replace with your image path
                            style={styles.animationImage}
                          />
                        </View>
                      </View>
                      <View style={styles.resultContentContainer}>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.animeTitle}>{texts?.KohiTest?.sloth}</Text>
                        </View>
                        <View style={styles.modalStatsContainer}>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.normalText}>{texts?.KohiTest?.clickspeeddesc}</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statHeading}>{cps.toFixed(2)} CPS</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statSubheading}>{clicks} {texts?.KohiTest?.clicksin} {selectedTime} {texts?.KohiTest?.seconds}</Text>
                          </View>
                        </View>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.modalNote}>{texts?.KohiTest?.feelings}</Text>
                        </View>
                        <View style={styles.resultContentRow}>
                          <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                            <Text style={styles.tryBtnText}>{texts?.KohiTest?.tryagain} </Text>
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
        <KohiDetails />
        {/* <CarousalComponent/> */}
        <Footer navigation={navigation} />
      </>
    ) : (
      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackgroundfull}
      >
        <View style={styles.controlBar}>
          <TouchableOpacity onPress={() => setIsFullScreen(false)}>
            <MaterialIcons name={isFullScreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#fff" />
          </TouchableOpacity>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setIsMusicOn(!isMusicOn);

              }}
              style={{ marginRight: 10 }}
            >
              <MusicIcon isEnabled={isMusicOn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSound}>
              <SoundIcon isEnabled={isSoundOn} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50, marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              width: screenWidth-50,
              height: screenWidth-50,
              display:'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius:220,
              overflow:'hidden'
            }}
            onPress={handleClick}
            activeOpacity={0.7}
          >
            <Svg width={screenWidth} height={screenWidth-50}>
              <Circle
                stroke={circleColor}
                fill="transparent"
                strokeWidth="15"
                r={screenWidth / 2 - 45}
                cx={screenWidth / 2}
                cy={screenWidth / 2 -20}
              />
              <Circle
                stroke="#b32f60"
                fill="transparent"
                strokeWidth="15"
                r={screenWidth / 2 - 45}
                cx={screenWidth / 2}
                cy={screenWidth / 2 -20}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (timePassed / selectedTime) * circumference}
              />
              {ripples.map((ripple, index) => (
                <Circle
                  key={index}
                  cx={ripple.x}
                  cy={ripple.y}
                  r={30}
                  fill="rgba(255, 255, 255, 0.3)"
                />
              ))}
            </Svg>
            <Text style={styles.clickText}>
              {!isTestRunning ? 'Click to Start' :
                timePassed >= selectedTime ? 'Test Complete' : 'Click!'}
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
                  source={require('../../assets/modal-bg.jpg')} // Replace with your modal background image path
                  style={styles.modalInnerContainer}
                >
                  <View style={styles.modalTopBar}>
                    <TouchableOpacity onPress={resetTest} style={styles.closeBtn}>
                      <Text style={styles.closeBtnText}>{texts?.KohiTest?.close}</Text>
                    </TouchableOpacity>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{texts?.KohiTest?.achievementtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.resultOuterContainer}>
                    <View style={styles.resultContainer}>
                      <View style={styles.animationContainer}>
                        <View style={styles.animeLgDisplay}>
                          <Image
                            source={require('../../assets/sloath.jpg')} // Replace with your image path
                            style={styles.animationImage}
                          />
                        </View>
                      </View>
                      <View style={styles.resultContentContainer}>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.animeTitle}>{texts?.KohiTest?.sloth}</Text>
                        </View>
                        <View style={styles.modalStatsContainer}>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.normalText}>{texts?.KohiTest?.clickspeeddesc}</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statHeading}>{cps.toFixed(2)} CPS</Text>
                          </View>
                          <View style={styles.cpsStatRow}>
                            <Text style={styles.statSubheading}>{clicks} {texts?.KohiTest?.clicksin} {selectedTime} {texts?.KohiTest?.seconds}</Text>
                          </View>
                        </View>
                        <View style={styles.resultContentRow}>
                          <Text style={styles.modalNote}>{texts?.KohiTest?.feelings}</Text>
                        </View>
                        <View style={styles.resultContentRow}>
                          <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                            <Text style={styles.tryBtnText}>{texts?.KohiTest?.tryagain} </Text>
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