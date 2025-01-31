import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,

  ScrollView,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import Footer from '../Footer';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from './Icon'; // Import your icons
import styles from '../CPS/Styles';
import Navbar from '../Navbar';
import ReactionDetail from './ReactionDetails';
import { HeartIcon, ClubIcon, SpadeIcon, TriangleIcon, TrophyIcon, BugIcon } from './Icon'
import { useLanguage } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CheckIcon } from '../icons';

const colors = [
  { code: '#E90379', label: 'red' },
  { code: '#00B507', label: 'green' },
  { code: '#7655CA', label: 'purple' },
  { code: '#FF8300', label: 'orange' },
  { code: '#FFCC00', label: 'yellow' },
  { code: '#964B00', label: 'brown' },
];

const iconsList1 = [Icon1, Icon2, Icon3];
const iconsList2 = [Icon4, Icon5, Icon6];
const icons = [...iconsList1, ...iconsList2];
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState('');
  const [colorDisplayTime, setColorDisplayTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [colorChangeTimes, setColorChangeTimes] = useState([]);
  const { texts, toggleScroll } = useLanguage();

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
      clearTimeout(timer)
      if (clickSound) {
        clickSound.unloadAsync();
      }
    };
  }, []);


  const handleIconClick = (index) => {
    if (index === randomIconIndex) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      setReactionTime(timeTaken);
      const colorData = {
        name: selectedColorName,
        code: selectedColor,
        time: timeTaken,
        icon: index
      };

      setColorChangeTimes(prevTimes => {
        const updatedTimes = [...prevTimes, colorData];
        if (updatedTimes.length === 6) {
          setIsTestRunning(false);
        }
        return updatedTimes;
      });
      setShowModal(true);
      setRandomIconIndex(null);
    }
  };


  const startTest = () => {

    setIsTestRunning(true);
    setReactionTime(null);
    setIsModalVisible(false);
    setRandomIconIndex(null)
 
    // Pick a random color and set its name
    const availableColors = colors.filter((color, index) =>
      !colorChangeTimes.some(change => change?.code === color?.code)
    );
    const randomColorIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[randomColorIndex];
    setSelectedColor(color?.code);
    setSelectedColorName(color?.label);
    setStartTime(Date.now());

    const delay = Math.random() * (5000 - 1000) + 1000;
    setTimeout(() => {
      setIconDisplayTime(Date.now());
      setColorDisplayTime(Date.now());
      setIsTestRunning(true);
      // Apply the selected color to a random icon after 2 seconds
      setTimeout(() => {
        const getNewIndex = () => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * icons.length);
          } while (colorChangeTimes.some(change => change.icon === newIndex));
          return newIndex;
        };

        const newIndex = getNewIndex();
        setRandomIconIndex(newIndex);
      }, 2000);
    }, delay);
  };

  const resetTest = () => {
    setShowModal(false)
    setSelectedColor(null);
    setRandomIconIndex(null);
    setSelectedColorName(null);
    setReactionTime(null);
    setIsModalVisible(false);
    startTest()
  };

  const tryAgain = () => {
    setIsTestRunning(true);
    setShowModal(false)
    setSelectedColor(null);
    setRandomIconIndex(null);
    setSelectedColorName(null);
    setReactionTime(null);
    setIsModalVisible(false);
    setColorChangeTimes([]);
    startTest()
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      resetTest();
    }
  };

  useEffect(() => {
    startTest()
  }, []);

  const calculateAverageTime = () => {
    if (colorChangeTimes.length === 0) return 0;
    const total = colorChangeTimes.reduce((acc, time) => acc + time.time, 0);
    return (total / colorChangeTimes.length).toFixed(2); // Average time rounded to 2 decimal places
  };

  return (
    <ScrollView onScroll={() => toggleScroll && toggleScroll()} >

      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View>
            {/* <Navbar onToggle={toggleFullScreen} navigation={navigation} /> */}
          </View>
          <TouchableWithoutFeedback onPress={() => toggleScroll()}>

            {/* <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{texts?.ReactionTest?.title}</Text>
              <Text style={styles.tagline}>{texts?.ReactionTest?.tagline}</Text>
              <Text style={styles.colorDisplay}>{selectedColorName}</Text>
            </View> */}
            {!isStartGame ? <View
              style={{
                backgroundColor: 'rgba(3,109,248,.234)',
                borderRadius: 8,
                padding: 5,
                marginBottom: 150,
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              <View style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', paddingInline: 10 }}>
                <Text style={{ width: '98%', color: 'white', fontSize: 16, textAlign: 'center', marginTop: 30, marginBottom: 50 }}>
                  {texts?.ReactionTest?.tagline2}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <HeartIcon size={17} />
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <ClubIcon size={17} />
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <SpadeIcon size={17} />
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <TriangleIcon size={17} />
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <TrophyIcon size={17} />
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: "white", borderWidth: 2, borderRadius: 100, padding: 10 }}>
                <BugIcon size={17} />
              </View>

              <View style={styles.noticeBoard}>
                <View style={styles.noticeRow}>
                  <CheckIcon />
                  <Text style={styles.pointLine}>
                    You have to click on start test to begin Reflex Test.
                  </Text>
                </View>
                <View style={styles.noticeRow}>
                  <CheckIcon />
                  <Text style={styles.pointLine}>
                    Every time you will see 6 monsters on screen.
                  </Text>
                </View>
                <View style={styles.noticeRow}>
                  <CheckIcon />
                  <Text style={styles.pointLine}>
                    Whenever any monster changes its color, you have to click on
                    it quickly.
                  </Text>
                </View>
                <View style={styles.noticeRow}>
                  <CheckIcon />
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


            </View> :
              isTestRunning ?
                <View style={{ backgroundColor: 'rgba(3,109,248,.234)', borderRadius: 20 }}>
                  {
                    showModal ? <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                      <Image
                        source={require('../../assets/reaction-time.png')}
                        style={styles.animationImage}
                      />
                      <Text style={{ color: 'black', fontSize: 40 }}>{reactionTime} MS</Text>
                      <Text style={{ color: 'black', fontSize: 20 }}>{texts?.ReactionTest?.averageReactionTime}</Text>
                      <TouchableOpacity onPress={() => { setShowModal(false); resetTest() }}>
                        <Text style={{ color: 'white', backgroundColor: '#7655ca', paddingInline: 40, paddingVertical: 10, borderRadius: 10, marginTop: 20 }}>{texts?.ReactionTest?.tryAgain}</Text>
                      </TouchableOpacity>
                    </View>
                      :
                      <View>
                        {reactionTime != null && <Text style={{ color: 'white' }}>{texts?.ReactionTest?.yourReactionTime} {reactionTime} milliseconds</Text>}
                        <View style={{
                          borderRadius: 50,
                          overflow: 'hidden',
                          padding: 15,
                          maxHeight: 500,
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-around',
                        }}>
                          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>
                            {iconsList1.map((Icon, index) => {
                              // Check if the icon exists in colorChangeTimes
                              const colorChange = colorChangeTimes.find(change => change.icon === index);
                              const iconColor = colorChange ? colorChange?.code : (index === randomIconIndex ? selectedColor : "white");

                              return (
                                <View key={index} style={{ marginTop: 40, marginBottom: 40, paddingTop: 20, paddingBottom: 20 }}>
                                  <TouchableOpacity onPress={() => handleIconClick(index)}>
                                    {React.createElement(Icon, {
                                      style: {
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: iconColor,
                                        margin: "10px",
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        cursor: "pointer",
                                      },
                                      color: iconColor
                                    })}
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                          </View>
                          {selectedColorName && <View style={{ width: '100%', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Text style={{ color: 'white', fontSize: 26 }}>{texts?.ReactionTest?.clickOn} <Text style={{ color: selectedColor, fontSize: 26 }}>{selectedColorName.toLocaleUpperCase()} icon</Text></Text></View>}
                          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>

                            {iconsList2.map((Icon, index) => {
                              // Check if the icon exists in colorChangeTimes
                              const newIndex = index + 3;
                              const colorChange = colorChangeTimes.find(change => change.icon === newIndex);
                              const iconColor = colorChange ? colorChange?.code : (newIndex === randomIconIndex ? selectedColor : "white");

                              return (
                                <View key={index} style={{ marginTop: 40, marginBottom: 40, paddingTop: 20, paddingBottom: 20 }}>
                                  <TouchableOpacity onPress={() => handleIconClick(newIndex)}>
                                    {React.createElement(Icon, {
                                      style: {
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: iconColor,
                                        margin: "10px",
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        cursor: "pointer",
                                      },
                                      color: iconColor
                                    })}
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      </View>}
                </View>

                :
                <View style={{ backgroundColor: 'rgba(3,109,248,.234)',width:'100%', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                  <Text style={{ color: 'white', width: '80%', paddingVertical: 10, textAlign: 'center', fontSize: 22 }}>{texts?.ReactionTest?.averageReactionTime}</Text>
                  <Image
                    source={require('../../assets/reaction-time.png')}
                    style={styles.animationImage}
                  />
                  <Text style={{ color: 'black', fontSize: 30, paddingVertical: 10 }}>{calculateAverageTime()} MS</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap' }}>
                    {colorChangeTimes.map((time, index) => (
                      <Text key={index} style={{ color: time?.code, paddingLeft: 2, paddingRight: 2, fontSize: 10 }}>{time.time} MS</Text>
                    ))}
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <TouchableOpacity onPress={() => tryAgain()}><Text style={{ marginRight: 10, color: 'white', backgroundColor: '#7655ca', paddingInline: 30, paddingVertical: 10, borderRadius: 10, marginTop: 20 }}>Try Again</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsStartGame(false) }}><Text style={{ marginLeft: 10, color: 'white', backgroundColor: '#7655ca', paddingInline: 30, paddingVertical: 10, borderRadius: 10, marginTop: 20 }}>Close</Text></TouchableOpacity>
                  </View>
                </View>
            }
          </TouchableWithoutFeedback>

        </View>
      </ImageBackground >
      {/* <ReactionDetail /> */}
      {/* < Footer navigation={navigation} /> */}
    </ScrollView >
  );
}