import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import Footer from '../Footer';
import { HeartIcon, ClubIcon, SpadeIcon, TriangleIcon, TrophyIcon, BugIcon } from './Icon';
import { MaterialIcons } from 'react-native-vector-icons';
import styles from '../CPS/Styles';
import Navbar from '../Navbar';
import ReactionDetail from './ReactionDetails';

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
  const [activeIcon, setActiveIcon] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [iconColors, setIconColors] = useState({
    0: "#E7E7E7",
    1: "#E7E7E7",
    2: "#E7E7E7",
    3: "#E7E7E7",
    4: "#E7E7E7",
    5: "#E7E7E7"
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * 6);
      setActiveIcon(randomIndex);
      setStartTime(Date.now());
    }, Math.random() * 3000 + 2000);

    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/cps-test-click.mp3')
      );
      setClickSound(sound);
    }

    loadSound();
    return () => {
      clearTimeout(timer);
      if (clickSound) {
        clickSound.unloadAsync();
      }
    };
  }, []);

  const handleIconClick = (index) => {
    if (index === activeIcon) {
      const endTime = Date.now();
      setReactionTime(((endTime - startTime) / 1000).toFixed(2)); // Calculate reaction time in seconds
      setIsModalVisible(true);
      setActiveIcon(null); // Reset active icon

      // Update icon color to indicate successful click
      const newIconColors = { ...iconColors, [index]: "#28A745" }; // Green color for correct click
      setIconColors(newIconColors);
    }
  };

  const startTest = () => {
    setIsTestRunning(true);
    setReactionTime(null);
    setIsModalVisible(false);
    setRandomIconIndex(Math.floor(Math.random() * 6));

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
      // Update icon color for the pressed icon
      const newIconColors = { ...iconColors, [index]: "#007BFF" }; // Blue color when pressed
      setIconColors(newIconColors);
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
    setIconColors({
      0: "#E7E7E7",
      1: "#E7E7E7",
      2: "#E7E7E7",
      3: "#E7E7E7",
      4: "#E7E7E7",
      5: "#E7E7E7"
    });
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
          {!isStartGame ? (
       <View
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


     </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(3,109,248,.234)',
                borderRadius: 8,
                padding: 15,
                marginBottom: 150,
                maxHeight: 500,
                alignItems: 'center',
              }}
            >
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <View style={styles.iconContainer}>
                  <HeartIcon style={styles.icon} color={iconColors[0]} />
                </View>
                <View style={styles.iconContainer}>
                  <ClubIcon style={styles.icon} color={iconColors[1]} />
                </View>
                <View style={styles.iconContainer}>
                  <SpadeIcon style={styles.icon} color={iconColors[2]} />
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 80 }}>
                <View style={styles.iconContainer}>
                  <TriangleIcon style={styles.icon} color={iconColors[3]} />
                </View>
                <View style={styles.iconContainer}>
                  <TrophyIcon style={styles.icon} color={iconColors[4]} />
                </View>
                <View style={styles.iconContainer}>
                  <BugIcon style={styles.icon} color={iconColors[5]} />
                </View>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
      <ReactionDetail />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
