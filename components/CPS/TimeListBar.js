import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { useLanguage, toggleScroll } from '@/src/context/LanguageContext';
const TimeListBar = ({ selectedTime, onTimeSelect }) => {
  const times = [1, 5, 10, 60, 100];
  const {texts} = useLanguage()
  return (
    <View style={styles.timeListContainer}>
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
      ))}
    </View>
  );
};

export default TimeListBar;