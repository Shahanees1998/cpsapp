// ButterflyClickDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const ButterflyDetail = () => {
  return (
    <View style={styles.detailBackground}>
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              What is <Text style={styles.cpsColor}>the Butterfly Click Test?</Text>
            </Text>
            <Text style={styles.paragraph}>
              Our butterfly click test is a quick and easy way to measure how fast you can click within a set time. It’s a popular technique where you use your index and middle finger to alternate clicks on the same mouse button at rapid speed. So if you’re looking to improve your combat or PvP skills, take our butterfly click test and find out where you stand!
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Use the Butterfly Click Test?</Text>
            </Text>
            <Text style={styles.paragraph}>Our butterfly click test is similar to any click test. Here’s how you can start the butterfly click test:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>• Launch our <Text style={styles.link} onPress={() => Linking.openURL('/butterfly-click')}>butterfly click test.</Text></Text>
              <Text style={styles.bulletPoint}>• Choose your time limit from 1 second to 100 seconds.</Text>
              <Text style={styles.bulletPoint}>• Get your mouse ready in the space, placing your index and middle fingers on the button.</Text>
              <Text style={styles.bulletPoint}>• Start clicking as fast as you can by alternating between the two fingers.</Text>
              <Text style={styles.bulletPoint}>• Once the timer runs out, you’ll see your total clicks and CPS (clicks per second).</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              Why is <Text style={styles.cpsColor}>Butterfly Clicking Speed Important?</Text>
            </Text>
            <Text style={styles.paragraph}>
              For Minecraft PvP or fast-paced shooters, speed matters. Butterfly clicking lets you click way faster than normal, giving you an edge when every millisecond counts. Whether you're attacking, building, or performing quick actions, faster clicking means faster gameplay.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              Benefits of <Text style={styles.cpsColor}>Butterfly Clicking</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Boosted clicking speed:</Text> It’s faster than regular clicking, helping you hit those higher CPS numbers. Whether it's for work or gaming, high CPS numbers make you better at what you do.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Better finger coordination:</Text> Using two fingers instead of one helps improve your hand speed and coordination.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Gaming advantage:</Text> In PvP or games that need quick reactions, butterfly clicking can be a game-changer. You can defeat enemies, build anything on a large scale, and do it all faster than before!</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Less finger fatigue:</Text> Switching between fingers helps reduce the strain on a single finger, keeping you in the game longer.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How Does <Text style={styles.cpsColor}>the Butterfly Click Test Work?</Text>
            </Text>
            <Text style={styles.paragraph}>
              The butterfly click test counts how many times you can click in a specific time frame. It records each click and calculates your CPS (clicks per second). Our test even shows how consistent your clicking speed is throughout the timer, so you can work on staying steady during longer gaming sessions.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Get Better at Butterfly Clicking?</Text>
            </Text>
            <Text style={styles.paragraph}>
              To get better at butterfly clicking, regular practice is key. The more you practice, the faster and more precise you'll become. It’s also important to use a good mouse with responsive buttons, as this makes it easier to click at high speeds.
            </Text>
            <Text style={styles.paragraph}>
              Make sure your finger positioning is comfortable to maintain accuracy and speed. Start with shorter clicking sessions to build up your endurance, gradually increasing the duration to improve stamina. Finally, remember to keep your hand relaxed since tensing up can slow you down. With consistent practice, you'll see your CPS soar and start dominating every game you play!
            </Text>
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

export default ButterflyDetail;