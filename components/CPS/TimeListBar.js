import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import styles from './Styles';
import { useLanguage, toggleScroll } from '@/src/context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const TimeListBar = ({ selectedTime, onTimeSelect }) => {
  const times = [1, 5, 10, 60, 100];
  const {texts} = useLanguage()
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('LeftTestScreen', { selectedTime });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, selectedTime]);

  return (
    <View style={styles.timeListContainer}>
      <Text style={styles.heading}>Select Your Preferred Time</Text>
      <View style={{paddingInline:20}}>
      {times.map((time) => (
        <TouchableOpacity 
          key={time}
          style={[
            styles.timeButton,
            selectedTime === time && styles.activeTimeButton
          ]}
          onPress={() => onTimeSelect(time)}
        >
          <Text style={styles.timeButtonText}>
            {time} {time === 1 ? texts?.cpsTest?.second : texts?.cpsTest?.seconds}
          </Text>
        </TouchableOpacity>
      ))}</View>
    </View>
  );
};

export default TimeListBar;