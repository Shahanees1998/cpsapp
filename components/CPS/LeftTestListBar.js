import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KohiIcon, ButterflyIcon, AimIcon, ReactionIcon, APMIcon } from '../icons'; // Adjust the import path as necessary
import styles from './Styles';
import { useLanguage, toggleScroll } from '@/src/context/LanguageContext';
const LeftTestListBar = ({ navigation, title }) => {
  const {texts} = useLanguage()

  const tests = [
    { name: texts?.testName?.kohi, Icon: KohiIcon, route: 'KohiTest' },
    { name: texts?.testName?.reaction, Icon: ReactionIcon, route: 'ReactionTest' },
    { name: texts?.testName?.butter, Icon: ButterflyIcon, route: 'ButterflyTest' },
    { name: texts?.testName?.aim, Icon: AimIcon, route: 'AimTrainerTest' },
    { name: texts?.testName?.cps, Icon: APMIcon, route: 'CPSTest' },
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