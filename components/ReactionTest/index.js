import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import Footer from '../Footer';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from './Icon'; // Import your icons
import { MaterialIcons } from 'react-native-vector-icons'; // Import MaterialIcons for tick icon
import styles from '../CPS/Styles';
import Navbar from '../Navbar';
import ReactionDetail from './ReactionDetails';

const colors = [
  '#E90379',
  '#00B507',
  '#7655CA',
  '#FF8300',
  '#FFCC00',
  '#964B00',
];

const icons = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6];

export default function ReactionTest({ navigation }) {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const [clickSound, setClickSound] = useState();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [randomIconIndex, setRandomIconIndex] = useState(null);
  const [iconDisplayTime, setIconDisplayTime] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isStartGame, setIsStartGame] = useState(false);

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

  const startTest = () => {
    setIsTestRunning(true);
    setReactionTime(null);
    setIsModalVisible(false);
    setRandomIconIndex(Math.floor(Math.random() * icons.length));

    const delay = Math.random() * (5000 - 1000) + 1000;
    setTimeout(() => {
      setIconDisplayTime(Date.now());
      setIsTestRunning(true);
    }, delay);
  };

  const handleIconPress = (index) => {
    if (isTestRunning && index === randomIconIndex) {
      const timeTaken = Date.now() - iconDisplayTime;
      setReactionTime(timeTaken);
      setIsTestRunning(false);
      setIsModalVisible(true);
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
    setReactionTime(null);
    setIsModalVisible(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      resetTest();
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View>
            <Navbar onToggle={toggleFullScreen} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Reaction Time Test</Text>
            <Text style={styles.tagline}>
              Take a free test to become a pro at your favorite challenge:
            </Text>
          </View>
          {!isStartGame ? <View
            style={{
              backgroundColor: 'rgba(3,109,248,.234)',
              borderRadius: 8,
              padding: 15,
              marginBottom: 150,
              maxHeight: 500,
              alignItems: 'center',
            }}
          >
            <Text style={styles.tagline}>
              Take a free test to become a pro at your favorite challenge:
            </Text>
            <View style={styles.animatesContainer}>
              {icons.map((Icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleIconPress(index)}
                  style={styles.iconCircle}
                >
                  <Icon color={'#fff'} size={20} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.noticeBoard}>
              <View style={styles.noticeRow}>
                <View style={styles.pointBox}>
                  <MaterialIcons name="check" size={20} color="#fff" />
                </View>
                <Text style={styles.pointLine}>
                  You have to click on start test to begin Reflex Test.
                </Text>
              </View>
              <View style={styles.noticeRow}>
                <View style={styles.pointBox}>
                  <MaterialIcons name="check" size={20} color="#fff" />
                </View>
                <Text style={styles.pointLine}>
                  Every time you will see 6 monsters on screen.
                </Text>
              </View>
              <View style={styles.noticeRow}>
                <View style={styles.pointBox}>
                  <MaterialIcons name="check" size={20} color="#fff" />
                </View>
                <Text style={styles.pointLine}>
                  Whenever any monster changes its color, you have to click on
                  it quickly.
                </Text>
              </View>
              <View style={styles.noticeRow}>
                <View style={styles.pointBox}>
                  <MaterialIcons name="check" size={20} color="#fff" />
                </View>
                <Text style={styles.pointLine}>
                  The time duration between clicking on the monster who changed
                  its color will result in your reaction or reflex time.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setIsStartGame(true)}
              >
                <Text style={styles.startButtonText}>Start Test</Text>
              </TouchableOpacity>
            </View>


          </View> : <View style={{
            backgroundColor: 'rgba(3,109,248,.234)',
            borderRadius: 8,
            padding: 15,
            marginBottom: 150,
            maxHeight: 500,
            alignItems: 'center',
          }}></View>}

        </View>
      </ImageBackground>
      <ReactionDetail />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
