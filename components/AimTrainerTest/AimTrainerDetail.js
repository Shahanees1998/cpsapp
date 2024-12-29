import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

const AimTrainerDetail = () => {
  const { texts } = useLanguage();
  return (
    <View style={styles.detailBackground}>
      <ScrollView onScroll={() => toggleScroll && toggleScroll()} contentContainerStyle={styles.contentScreen}>
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.AimTrainerTest?.container1.question1}<Text style={styles.cpsColor}>{texts?.AimTrainerTest?.container1.questiontitle}</Text>
            </Text>
            <Text style={styles.paragraph}>
            {texts?.AimTrainerTest?.container1.answer1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
            {texts?.AimTrainerTest?.container2.question1} <Text style={styles.cpsColor}>{texts?.AimTrainerTest?.container2.questiontitle}</Text>
            </Text>
            <Text style={styles.paragraph}>
            {texts?.AimTrainerTest?.container2.answer1}
            </Text>
            <Text style={styles.paragraph}>
            {texts?.AimTrainerTest?.container2.answer2}
            </Text>
            <Text style={styles.paragraph}>
            {texts?.AimTrainerTest?.container2.answer3}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
            {texts?.AimTrainerTest?.container3.question1} <Text style={styles.cpsColor}>{texts?.AimTrainerTest?.container2.questiontitle}</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>1. {texts?.AimTrainerTest?.container3.bullets.bullet1}</Text>
              <Text style={styles.bulletPoint}>2. {texts?.AimTrainerTest?.container3.bullets.bullet2}</Text>
              <Text style={styles.bulletPoint}>3. {texts?.AimTrainerTest?.container3.bullets.bullet3}</Text>
              <Text style={styles.bulletPoint}>4. {texts?.AimTrainerTest?.container3.bullets.bullet4}</Text>
              <Text style={styles.bulletPoint}>5. {texts?.AimTrainerTest?.container3.bullets.bullet5}</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
            {texts?.AimTrainerTest?.container4.question1} <Text style={styles.cpsColor}>{texts?.AimTrainerTest?.container4.questiontitle}</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>{texts?.AimTrainerTest?.container4.bullets.bullet1.part1} </Text> {texts?.AimTrainerTest?.container4.bullets.bullet1.part2}</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>{texts?.AimTrainerTest?.container4.bullets.bullet2.part1}</Text> {texts?.AimTrainerTest?.container4.bullets.bullet2.part2}</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>{texts?.AimTrainerTest?.container4.bullets.bullet3.part1}</Text> {texts?.AimTrainerTest?.container4.bullets.bullet3.part2}</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>{texts?.AimTrainerTest?.container4.bullets.bullet4.part1}</Text> {texts?.AimTrainerTest?.container4.bullets.bullet4.part4}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBackground: {
    flex: 1,
    padding: 35,
    backgroundColor: "transparent",
  },
  contentScreen: {
    flexGrow: 1,
  },
  mainContentContainer: {
    marginBottom: 20,
  },
  cpsTest: {
    marginBottom: 20,
  },
  bulletList: {
    marginLeft: 10, // Indent the bullet points
  },
  bulletPoint: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "Poppins-Regular",
  },
  header: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
  },
  cpsColor: {
    color: '#b32f60',
  },
  paragraph: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "Poppins-Regular",
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default AimTrainerDetail;