import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, Image, Dimensions, BackHandler } from 'react-native';
import { Svg } from 'react-native-svg';
import { Audio } from 'expo-av';
import styles from '../CPS/Styles';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MusicIcon, SoundIcon } from '../icons';
import { useLanguage } from '../../src/context/LanguageContext';

export default function ButterflyTest({ navigation, route }) {
  const { selectedTime } = route.params;
  const [clicks, setClicks] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopGame, setIsStopGame] = useState(false)


  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const { texts, toggleScroll } = useLanguage();
  const [countdown, setCountdown] = useState(null);
  const width = 220;
  const height = 220;
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

  useEffect(() => {
    let interval;
    if (isTestRunning) {
      interval = setInterval(() => {
        setTimePassed((prev) => {
          const time = selectedTime
          if (prev >= time) {
            clearInterval(interval);
            backgroundMusic?.stopAsync();
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


  const navigate = () => {
    navigation.navigate('CPSResultScreen', { clicks, selectedTime, cps: clicks / selectedTime });
  };

  useEffect(() => {
    if (timePassed >= selectedTime && !stopGame) {
      navigate();
    }
  }, [isTestRunning, timePassed]);

  const handleClick = () => {
    if (!isTestRunning && countdown === null) {
      setCountdown(3)
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            setIsTestRunning(true);
            setStartTime(Date.now());
            setTimePassed(0);
            return null;
          }

          return prevCountdown - 1;
        });

      }, 1000);
    }
    if (isTestRunning && countdown === null) {
      const time = selectedTime
      if (isTestRunning && timePassed < time) {
        playSound();
        setClicks((prevClicks) => {
          const newClicks = prevClicks + 1;
          return newClicks;
        });
      }
    }
  };


  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

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

  return (
    <ScrollView onScroll={() => toggleScroll && toggleScroll()} >
      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => toggleScroll()}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 15 }}>
              {/* <LeftTestListBar navigation={navigation} title={texts?.ButterflyTest?.leftsidetitle} /> */}
              <Text style={styles.sidebarTitle}>{selectedTime} {texts?.ButterflyTest?.selectTimetitle}</Text>
              <View style={styles.mainContent}>
                <View style={styles.centerContent}>
                  <View style={styles.testArea}>
                    <Text style={styles.normalTexttime}>{isFinite(clicks / selectedTime) ? (clicks / selectedTime).toFixed(2) : 0.0} time/sec</Text>
                    <Text style={styles.normalTextTime}>{clicks ? clicks : 0} clicks</Text>



                    <TouchableOpacity
                      style={styles.clickCircle}
                      onPress={handleClick}
                      activeOpacity={0.7}
                    >
                      <Svg width={width} height={height}>
                      </Svg>
                      <Text style={[styles.clickText, countdown !== null && { fontSize: 50 }]}>
                        {countdown !== null ? countdown :
                          !isTestRunning ? texts.cpsTest.circletext :
                            timePassed >= selectedTime ? '' : ''}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.normalTexttime}>{countdown !== null ? '0' : timePassed <= selectedTime ? timePassed : '0'} seconds</Text>
                    <View style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "center", marginBottom: 10 }}>
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
                  </View>
                </View>
              </View>
              <View style={{ height: 100 }}>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}