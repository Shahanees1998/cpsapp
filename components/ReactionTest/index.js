import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import { Audio } from 'expo-av';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from './Icon';
import styles from '../CPS/Styles';
import { useLanguage } from '../../src/context/LanguageContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const iconsList1 = [Icon1, Icon2, Icon3];
const iconsList2 = [Icon4, Icon5, Icon6];
export default function ReactionTest({ navigation }) {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [clickSound, setClickSound] = useState();
  const [randomIconIndex, setRandomIconIndex] = useState(null);
  const [isStartGame, setIsStartGame] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [colorChangeTimes, setColorChangeTimes] = useState([]);
  const [randomIndices, setRandomIndices] = useState([0, 1, 2, 3, 4, 5]);
  const { texts, toggleScroll } = useLanguage();

  const [colors, setColors] = useState([
    { code: '#E90379', label: 'red' },
    { code: '#00B507', label: 'green' },
    { code: '#7655CA', label: 'purple' },
    { code: '#FF8300', label: 'orange' },
    { code: '#FFCC00', label: 'yellow' },
    { code: '#964B00', label: 'brown' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
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

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('LeftTestScreen', { selectedTime: 5 });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleIconClick = (index) => {
    if (index === randomIconIndex) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
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
          setColors([
            { code: '#E90379', label: 'red' },
            { code: '#00B507', label: 'green' },
            { code: '#7655CA', label: 'purple' },
            { code: '#FF8300', label: 'orange' },
            { code: '#FFCC00', label: 'yellow' },
            { code: '#964B00', label: 'brown' },
          ])
          setShowModal(true);
          setRandomIndices([0, 1, 2, 3, 4, 5]);
          setRandomIconIndex(null);


        }
        return updatedTimes;
      });
      startTest()
    }
  };


  const startTest = () => {

    setIsTestRunning(true);
    setRandomIconIndex(null)

    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomColorIndex];


    setColors(colors.filter((color, index) => index !== randomColorIndex));
    setSelectedColor(color?.code);
    setSelectedColorName(color?.label);


    const delay = 1.5 * 1000;
    setTimeout(() => {
      setIsTestRunning(true);
      setTimeout(() => {
        const getRandomIndex = () => {
          if (randomIndices.length === 0) return null;
          const randomIndex = Math.floor(Math.random() * randomIndices.length);
          const selectedIndex = randomIndices[randomIndex];
          setRandomIndices(prev => prev.filter((_, index) => index !== randomIndex));
          return selectedIndex;
        };

        const newIndex = getRandomIndex();
        setRandomIconIndex(newIndex);
        setStartTime(Date.now());
      }, 1000);
    }, delay);
  };

  useEffect(() => {
    startTest()
  }, []);

  const calculateAverageTime = () => {
    if (colorChangeTimes.length === 0) return 0;
    const total = colorChangeTimes.reduce((acc, time) => acc + time.time, 0);
    return (total / colorChangeTimes.length).toFixed(2);
  };

  return (
    <ScrollView onScroll={() => toggleScroll && toggleScroll()} >

      <ImageBackground
        source={require('../../assets/background-image.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View>
          </View>
          <TouchableWithoutFeedback onPress={() => toggleScroll()}>
            {!isStartGame ?
              <View style={{
                marginTop: 140,
                borderRadius: 20
              }}>
                <View>
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
                        return (
                          <View key={index} style={{ marginTop: 40, marginBottom: 40, paddingTop: 20, paddingBottom: 20 }}>
                            <TouchableOpacity>
                              {React.createElement(Icon, {
                                style: {
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: 'white',
                                  margin: "10px",
                                  paddingTop: 20,
                                  paddingBottom: 20,
                                  cursor: "pointer",
                                },
                                color: 'white'
                              })}
                            </TouchableOpacity>
                          </View>
                        );
                      })}

                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%' }}>
                      {iconsList2.map((Icon, index) => {
                        return (
                          <View key={index} style={{ marginTop: 40, marginBottom: 40, paddingTop: 20, paddingBottom: 20 }}>
                            <TouchableOpacity >
                              {React.createElement(Icon, {
                                style: {
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: 'white',
                                  margin: "10px",
                                  paddingTop: 20,
                                  paddingBottom: 20,
                                  cursor: "pointer",
                                },
                                color: 'white'
                              })}
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                      <TouchableOpacity
                        style={styles.startTestItem}
                        onPress={() => setIsStartGame(true)}
                      >
                        <Text style={{ width: '100%', color: 'white', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Start Test
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              :
              (isTestRunning && !showModal) ?
                <View style={{
                  marginTop: 140,
                  borderRadius: 20
                }}>
                  <View>
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
                  </View>
                </View>

                :
                <View style={{ width: '100%', marginTop: 100, borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                  <Text style={{ color: 'white', width: '80%', lineHeight: 35, paddingVertical: 10, textAlign: 'center', fontSize: 22 }}>{texts?.ReactionTest?.averageReactionTime}</Text>
                  <Image
                    source={require('../../assets/reaction-time.png')}
                    style={styles.animationImage}
                  />
                  <Text style={{ color: 'white', marginBottom: 20, fontSize: 30, paddingVertical: 10 }}>{calculateAverageTime()} MS</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap' }}>
                    {colorChangeTimes.map((time, index) => (
                      <Text key={index} style={{ color: time?.code, paddingLeft: 2, paddingRight: 2, fontSize: 11, color: time?.code }}>{time.time} MS</Text>
                    ))}
                  </View>
                  <View style={{ display: 'flex', marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('LeftTestScreen', { selectedTime: 5 })}><Text style={{ marginLeft: 10, color: 'white', backgroundColor: '#7655ca', paddingInline: 30, paddingVertical: 10, borderRadius: 30, marginTop: 20, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.6)' }}>Close</Text></TouchableOpacity>

                  </View>
                </View>
            }
          </TouchableWithoutFeedback>

        </View>
      </ImageBackground >
    </ScrollView >
  );
}