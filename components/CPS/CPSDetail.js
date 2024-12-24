// CPSDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, ImageBackground } from 'react-native';

const CPSDetail = () => {
  return (
    <View
    
      style={styles.detailBackground}
    >
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>What is <Text style={styles.cpsColor}>CPS TEST?</Text></Text>
            <Text style={styles.paragraph}>
              The CPS (Clicks Per Second) test is a simple tool that measures how fast you can click your mouse in a specific time frame, usually in seconds. It’s widely used by gamers to test and improve their clicking speed for games that require quick reflexes, such as Minecraft, first-person shooters, and other competitive games. The test records your clicks and calculates your CPS to show how many times you can click per second.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>How to take <Text style={styles.cpsColor}>CPS Test</Text></Text>
            <Text style={styles.paragraph}>Taking a CPS test is as straightforward as it can be. Here’s how you can quickly test your clicking speed with our tool:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>• Launch our <Text style={styles.link} onPress={() => Linking.openURL('/')}>CPS Test.</Text></Text>
              <Text style={styles.bulletPoint}>• Choose your time limit from 1 second to 100 seconds.</Text>
              <Text style={styles.bulletPoint}>• Place your finger on the mouse and click as fast as possible during the countdown.</Text>
              <Text style={styles.bulletPoint}>• Once the time is up, the tool will display your total clicks and your CPS score. You can repeat the test to track improvements in your clicking speed.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>How many clicks per second <Text style={styles.cpsColor}>is fast?</Text></Text>
            <Text style={styles.paragraph}>
              A CPS of around 6 to 7 clicks per second is considered average for most people. However, if you're able to hit 8 to 10 CPS, you're doing quite well and can be considered fast. Skilled gamers and experienced clickers often aim for a CPS of 10 or higher, depending on their goals and the specific clicking techniques they use, like jitter or butterfly clicking.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>What is <Text style={styles.cpsColor}>CPS in Minecraft?</Text></Text>
            <Text style={styles.paragraph}>
              In Minecraft, CPS refers to how fast you can click per second and is important in PvP combat. The higher your CPS, the faster you can hit opponents or place blocks. For most Minecraft players, achieving a CPS between 6 and 8 is sufficient, but competitive players often aim for 10 CPS or higher to get an edge in fast-paced battles.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>How do you <Text style={styles.cpsColor}>calculate clicks per second?</Text></Text>
            <Text style={styles.paragraph}>
              Calculating clicks per second (CPS) is simple. Take the total number of clicks you made during a test and divide it by the duration of the test in seconds. For example, if you made 50 clicks in 10 seconds, your CPS would be 50 ÷ 10 = 5 CPS.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>How to <Text style={styles.cpsColor}>improve clicks per second?</Text></Text>
            <Text style={styles.paragraph}>To improve your CPS, try the following techniques:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Practice regularly:</Text> The more you practice, the faster you’ll get.</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Try different clicking techniques:</Text> Experiment with methods like jitter clicking, butterfly clicking, or drag clicking to find what works best for you.</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Use a good mouse:</Text> A mouse with responsive, low-resistance buttons will help you click faster.</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Stay relaxed:</Text> Tension in your hand or fingers can slow you down. Keep your hand loose and light to click more efficiently.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>Take the <Text style={styles.cpsColor}>Kohi Click test</Text></Text>
            <Text style={styles.paragraph}>
              The <Text style={styles.link} onPress={() => Linking.openURL('/kohi-click-test')}>Kohi Click Test</Text> is another super popular CPS test among gamers, especially in the Minecraft community. Named after the Minecraft PvP server 'Kohi,' it measures your clicking speed in a simple interface. Just start the timer and click as fast as you can to see your CPS. Many Minecraft players use this test to sharpen their clicking skills and prepare for PvP battles.
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