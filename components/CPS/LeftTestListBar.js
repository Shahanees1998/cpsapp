import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KohiIcon, ButterflyIcon, AimIcon, ReactionIcon, APMIcon } from '../icons'; // Adjust the import path as necessary
import styles from './Styles';

const LeftTestListBar = ({ navigation, title }) => {
  const tests = [
    { name: 'Kohi Click Test', Icon: KohiIcon, route: 'KohiTest' },
    { name: 'Reaction Click Test', Icon: ReactionIcon, route: 'ReactionTest' },
    { name: 'Butterfly Click', Icon: ButterflyIcon, route: 'ButterflyTest' },
    { name: 'Aim Trainer Test', Icon: AimIcon, route: 'AimTrainerTest' },
    { name: 'APM Test', Icon: APMIcon, route: 'APMTest' },
  ];

  return (
    <View>
      <Text style={styles.sidebarTitle}>{title}</Text>
      <View style={styles.leftSidebar}>
        <View style={styles.testList}>
          {tests.map((test, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.testItem} 
              onPress={() => navigation.navigate(test.route)} // Navigate to the corresponding test
            >
              <View style={{ width: 20, height: 20}}>
                <test.Icon /> 
              </View>
              <Text style={styles.testItemText}>{test.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default LeftTestListBar;