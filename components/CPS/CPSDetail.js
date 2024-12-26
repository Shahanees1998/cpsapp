// CPSDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, ImageBackground } from 'react-native';
import { useLanguage } from '../../src/context/LanguageContext';
const CPSDetail = () => {
  const { texts } = useLanguage();
  return (
    <View
    
      style={styles.detailBackground}
    >
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container1?.question1} <Text style={styles.cpsColor}>{texts?.cpsTest?.container1?.questiontitle} </Text></Text>
            <Text style={styles.paragraph}>
             {texts?.cpsTest?.container1?.answer1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container2?.question1} <Text style={styles.cpsColor}>{texts?.cpsTest?.container2?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>{texts?.cpsTest?.container2?.answer1}</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>• {texts?.cpsTest?.container2?.bullets.bullet1}</Text>
              <Text style={styles.bulletPoint}>• {texts?.cpsTest?.container2?.bullets.bullet2}</Text>
              <Text style={styles.bulletPoint}>• {texts?.cpsTest?.container2?.bullets.bullet3}</Text>
              <Text style={styles.bulletPoint}>• {texts?.cpsTest?.container2?.bullets.bullet4}</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container3?.question1}<Text style={styles.cpsColor}>{texts?.cpsTest?.container3?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>
            {texts?.cpsTest?.container3?.answer1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container4?.question1} <Text style={styles.cpsColor}>{texts?.cpsTest?.container4?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>
            {texts?.cpsTest?.container4?.answer1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container5?.question1} <Text style={styles.cpsColor}>{texts?.cpsTest?.container5?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>
            {texts?.cpsTest?.container5?.answer1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container6?.question1}<Text style={styles.cpsColor}>{texts?.cpsTest?.container6?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>{texts?.cpsTest?.container6?.answer1}</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>{texts?.cpsTest?.container6?.bullets.bullet1.part1}</Text> {texts?.cpsTest?.container6?.bullets.bullet1.part2}</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>{texts?.cpsTest?.container6?.bullets.bullet2.part1}</Text> {texts?.cpsTest?.container6?.bullets.bullet2.part2}</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>{texts?.cpsTest?.container6?.bullets.bullet3.part1}</Text> {texts?.cpsTest?.container6?.bullets.bullet3.part2}</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>{texts?.cpsTest?.container6?.bullets.bullet4.part1}</Text>{texts?.cpsTest?.container6?.bullets.bullet4.part2} </Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>{texts?.cpsTest?.container7?.question1}<Text style={styles.cpsColor}>{texts?.cpsTest?.container7?.questiontitle}</Text></Text>
            <Text style={styles.paragraph}>
            {texts?.cpsTest?.container7?.answer1}
            </Text>
          </View>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  detailBackground: {
    flex: 1,
    padding: 35,
    backgroundColor:"transparent"
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
    color: 'black',
    textDecorationLine: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  cpsTestMainHr: {
    marginVertical: 10,
  },
  hr: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default CPSDetail;