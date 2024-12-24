import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';

const TimeListBar = ({ selectedTime, onTimeSelect }) => {
  const times = [1, 5, 10, 60, 100];
  
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
            {time} {time === 1 ? 'Second' : 'Seconds'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TimeListBar;