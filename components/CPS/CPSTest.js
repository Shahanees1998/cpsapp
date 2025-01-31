import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { Audio } from 'expo-av';
import { useLanguage } from '../../src/context/LanguageContext';

export default function CPSTest({ navigation, route }) {
  const { selectedTime } = route.params; 
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timePassed, setTimePassed] = useState(0);
  const [clickSound, setClickSound] = useState();
  const [backgroundMusic, setBackgroundMusic] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [circleColor, setCircleColor] = useState('#7455CA'); // Initial circle color
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const { texts } = useLanguage();

  // Get screen dimensions
  const { width: screenWidth } = Dimensions.get('window');
  const r = isFullScreen ? screenWidth / 2 - 15 : 90;
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
            backgroundMusic?.stopAsync();
            // Navigate to the CPSResultScreen when the test completes
            navigation.navigate('CPSResultScreen', { clicks, selectedTime, cps: clicks / selectedTime });
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

  const handleRipple = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (locationX >= 80) {
      setRipples([...ripples, { x: locationX, y: locationY }]);
    }
    setTimeout(() => {
      setRipples(ripples.slice(1));
    }, 500);
  };

  const handleClick = (event) => {
    if (!isTestRunning) {
      setIsTestRunning(true);
      setStartTime(Date.now());
      setTimePassed(0);
      setClicks(0);
    }
    handleRipple(event);
    if (isTestRunning && timePassed < selectedTime) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      setClicks((prevClicks) => {
        const newClicks = prevClicks + 1;
        setCps(newClicks / elapsedTime);
        return newClicks;
      });

      playSound();
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background-image.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.sidebarTitle}>{selectedTime} {texts?.cpsTest?.selectTimetitle}</Text>
        <View style={styles.mainContent}>
          <View style={styles.centerContent}>
            <View style={styles.testArea}>
              <Text style={styles.normalTexttime}>{clicks ? clicks : 0} clicks</Text>
              <Text style={styles.normalTexttime}>{isFinite(clicks / selectedTime) ? (clicks / selectedTime).toFixed(2) : 0.0} CPS</Text>
              <TouchableOpacity
                style={styles.clickCircle}
                onPress={handleClick}
                activeOpacity={0.7}
              >
                <Svg width={screenWidth} height={screenWidth}>
                  <Circle
                    stroke={circleColor}
                    fill="transparent"
                    strokeWidth="15"
                    r={r}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                  />
                  <Circle
                    stroke="#b32f60"
                    fill="transparent"
                    strokeWidth="15"
                    r={r}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (timePassed / selectedTime) * circumference}
                  />
                  {ripples.map((ripple, index) => (
                    <Circle
                      key={index}
                      cx={ripple.x}
                      cy={ripple.y}
                      r={40}
                      fill="rgba(255, 255, 255, 0.3)"
                    />
                  ))}
                </Svg>
                <Text style={styles.clickText}>
                  {!isTestRunning ? 'Click to Start' : timePassed >= selectedTime ? '' : 'Click!'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.normalTexttime}>{timePassed} seconds</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  testArea: {
    alignItems: 'center',
  },
  normalTexttime: {
    fontSize: 18,
    color: '#fff',
  },
  clickCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: 20,
  },
  clickText: {
    fontSize: 20,
    color: '#fff',
  },
});