import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { KohiIcon, ButterflyIcon, AimIcon, ReactionIcon, APMIcon } from '../icons'; // Adjust the import path as necessary
import styles from './Styles';
import { useLanguage } from '@/src/context/LanguageContext';

const LeftTestListBar = ({ navigation, title }) => {
  const { texts } = useLanguage();

  const tests = [
    { name: texts?.testName?.cps, Icon: APMIcon, route: 'TimeSelectionScreen',nextroute:"CPSTest" }, // Navigate to TimeSelectionScreen
    { name: texts?.testName?.kohi, Icon: KohiIcon, route: 'TimeSelectionScreen',nextroute:"KohiTest"  },
    { name: texts?.testName?.butter, Icon: ButterflyIcon, route: 'TimeSelectionScreen',nextroute:"ButterflyTest"  },
    { name: texts?.testName?.reaction, Icon: ReactionIcon, route: 'TimeSelectionScreen',nextroute:"ReactionTest"  },
    { name: texts?.testName?.aim, Icon: AimIcon, route: 'TimeSelectionScreen',nextroute:"AimTrainerTest"  },
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
              onPress={() => navigation.navigate(test.route, { testType: test.nextroute })} // Pass the test name as a parameter
            >
              <View style={{ width: 20, height: 20, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {test.nextroute === 'ButterflyTest' ? (
                  <Image source={require('../../assets/butterfly.png')} style={{ width: 20, height: 20 }} />
                ) : (
                  <test.Icon />
                )}
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