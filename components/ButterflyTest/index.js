import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image, ScrollView } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { Audio } from 'expo-av';
import LeftTestListBar from '../CPS/LeftTestListBar';
import TimeListBar from '../CPS/TimeListBar';
import styles from '../CPS/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import ButterflyDetail from "./ButterflyDetail"
import CarousalComponent from '../CPS/CarousalComponent';
import Footer from '../Footer';
import Navbar from '../Navbar'

export default function ButterflyTest({ navigation }) {
    const [clicks, setClicks] = useState(0);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [timePassed, setTimePassed] = useState(0);
    const [clickSound, setClickSound] = useState();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(5); // Default time for the test

    const width = 220;
    const height = 220;
    const r = 90;
    const cx = width / 2;
    const cy = height / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (clicks / selectedTime) * circumference;
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

    useEffect(() => {
        let interval;
        if (isTestRunning) {
            interval = setInterval(() => {
                setTimePassed((prev) => {
                    if (prev >= selectedTime) {
                        setIsTestRunning(false);
                        clearInterval(interval);
                        setIsModalVisible(true);
                        return selectedTime;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTestRunning, selectedTime]);

    const handleClick = () => {
        if (!isTestRunning) {
            setIsTestRunning(true);
            setClicks(0);
            setTimePassed(0);
        }

        if (isTestRunning) {
            setClicks((prev) => prev + 1);
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
        setClicks(0);
        setTimePassed(0);
        setIsModalVisible(false);
    };
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) {
          resetTest(); 
        }
      };

    return (
        <>
        <ScrollView>
        <ImageBackground
            source={require('../../assets/background-image.png')}
            style={styles.imageBackground}
        >
            <View style={styles.container}>
          <Navbar onToggle={toggleFullScreen} />
            
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Butterfly Click Test</Text>
                    <Text style={styles.tagline}>Test your butterfly clicking speed by clicking alternately between two buttons!</Text>
                </View>
                <View style={styles.mainLayout}>
                    <LeftTestListBar navigation={navigation} title={"Butterfly Test Online"} />
                    <Text style={styles.sidebarTitle}>{selectedTime} Second Per Click</Text>
                    <View style={styles.mainContent}>
                        <View style={styles.centerContent}>
                            <View style={styles.testArea}>
                                <View style={styles.controlBar}>
                                    <TouchableOpacity>
                                        <MaterialIcons name="fullscreen" size={24} color="#fff" />
                                    </TouchableOpacity>
                                    <View style={styles.soundControls}>
                                        <TouchableOpacity onPress={() => setIsSoundEnabled(!isSoundEnabled)}>
                                            <MaterialIcons
                                                name={isSoundEnabled ? "volume-up" : "volume-off"}
                                                size={24}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.butterflyClickArea}>
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
                                                strokeDashoffset={offset}
                                            />
                                        </Svg>
                                        <Text style={styles.clickText}>Click 1</Text>
                                    </TouchableOpacity>

                                </View>
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

                {/* Modal for displaying results */}
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
                                    <Text style={styles.closeBtnText}>Close</Text>
                                </TouchableOpacity>
                                <View style={styles.modalTitleContainer}>
                                    <Text style={styles.modalTitle}>Your Achievements</Text>
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
                                            <Text style={styles.animeTitle}>Sloth!</Text>
                                        </View>
                                        <View style={styles.modalStatsContainer}>
                                            <View style={styles.cpsStatRow}>
                                                <Text style={styles.normalText}>You clicked with the speed of</Text>
                                            </View>
                                            {/* <View style={styles.cpsStatRow}>
                      <Text style={styles.statHeading}>{cps.toFixed(2)} CPS</Text>
                    </View> */}
                                            <View style={styles.cpsStatRow}>
                                                <Text style={styles.statSubheading}>{clicks} Clicks in {selectedTime} Seconds</Text>
                                            </View>
                                        </View>
                                        <View style={styles.resultContentRow}>
                                            <Text style={styles.modalNote}>Stop feeling sorry for yourself, Don't be a loser</Text>
                                        </View>
                                        <View style={styles.resultContentRow}>
                                            <TouchableOpacity style={styles.tryBtn} onPress={resetTest}>
                                                <Text style={styles.tryBtnText}>Try Again</Text>
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
        <ButterflyDetail/>
        {/* <CarousalComponent/> */}
        <Footer navigation={navigation}/>
        </ScrollView>
        </>
    );
}