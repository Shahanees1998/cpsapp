// ReactionTestDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage, toggleScroll } from '../../src/context/LanguageContext';

const ReactionDetail = () => {
  const { texts } = useLanguage();
  return (
    <View style={styles.detailBackground}>
      <ScrollView onScroll={() => toggleScroll && toggleScroll()} contentContainerStyle={styles.contentScreen}>
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.ReactionDetail?.header1}
            </Text>
            <Text style={styles.paragraph}>
              {texts?.ReactionDetail?.paragraph1}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.ReactionDetail?.header2}
            </Text>
            <Text style={styles.subHeader}>{texts?.ReactionDetail?.subHeader1}</Text>
            <Text style={styles.paragraph}>
              {texts?.ReactionDetail?.paragraph2}
            </Text>
            <Text style={styles.subHeader}>{texts?.ReactionDetail?.subHeader2}</Text>
            <Text style={styles.paragraph}>
              {texts?.ReactionDetail?.paragraph3}
            </Text>
            <Text style={styles.subHeader}>{texts?.ReactionDetail?.subHeader3}</Text>
            <Text style={styles.paragraph}>
              {texts?.ReactionDetail?.paragraph4}
            </Text>
            <Text style={styles.subHeader}>{texts?.ReactionDetail?.subHeader4}</Text>
            <Text style={styles.paragraph}>
              {texts?.ReactionDetail?.paragraph5}
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.ReactionDetail?.header3}
            </Text>
            <Text style={styles.paragraph}>{texts?.ReactionDetail?.paragraph6}</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bullet1}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bullet2}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bullet3}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bullet4}</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.ReactionDetail?.header4}
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint1}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint2}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint3}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint4}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint5}</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              {texts?.ReactionDetail?.header5}
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint6}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint7}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint8}</Text>
              <Text style={styles.bulletPoint}>{texts?.ReactionDetail?.bulletPoint9}</Text>
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

export default ReactionDetail;