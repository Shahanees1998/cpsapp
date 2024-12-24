// AimTrainerDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const AimTrainerDetail = () => {
  return (
    <View style={styles.detailBackground}>
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              What is <Text style={styles.cpsColor}>an Aim Trainer Test?</Text>
            </Text>
            <Text style={styles.paragraph}>
              The Aim Trainer Test is a tool designed to help you practice and improve your aiming skills by testing your ability to quickly and accurately click on targets. It’s widely used by gamers, especially in first-person shooters (FPS) or other competitive games, where precision and fast reflexes are critical. The test challenges your hand-eye coordination and reaction time, giving you instant feedback on your aiming performance.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              Why is <Text style={styles.cpsColor}>Aiming Accuracy Important?</Text>
            </Text>
            <Text style={styles.paragraph}>
              Aiming accuracy is crucial in many gaming scenarios, especially for competitive players. In games like Counter-Strike, Call of Duty, or Valorant, your ability to aim and shoot quickly and accurately determines your performance. High accuracy gives you an advantage in eliminating opponents before they can react.
            </Text>
            <Text style={styles.paragraph}>
              Aim training improves how well your eyes and hands work together, allowing you to precisely target moving or small objects on-screen. Good aim isn’t just about speed but also precision. Practicing helps you to react faster while maintaining accuracy, which is especially useful in fast-paced games where every millisecond counts.
            </Text>
            <Text style={styles.paragraph}>
              Even outside of shooters, aim training can enhance your overall gameplay experience by making you more responsive and focused.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Take the Aim Trainer Test?</Text>
            </Text>
            <Text style={styles.paragraph}>Here’s how you can take the Aim Trainer Test:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>1. Launch our website and wait for the Aim Trainer Test to load.</Text>
              <Text style={styles.bulletPoint}>2. Choose your preferred difficulty level. You can select from beginner, intermediate, or advanced, depending on your skill level.</Text>
              <Text style={styles.bulletPoint}>3. Click on the “Start Game” button to begin.</Text>
              <Text style={styles.bulletPoint}>4. When the test starts, aim and click on the targets as soon as they appear. Targets will move around the screen or appear randomly, testing your speed and accuracy.</Text>
              <Text style={styles.bulletPoint}>5. Once the test ends, your score will be displayed. This score includes metrics such as accuracy, reaction time, and the number of targets you successfully hit.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Improve Your Aim?</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Consistent practice:</Text> Regular practice is key to improving your aim. Use aim training tools like the Aim Trainer Test to work on your accuracy and reaction speed regularly.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Find the right mouse sensitivity:</Text> Finding the right mouse sensitivity and DPI (dots per inch) settings is crucial for precise aiming. A higher DPI allows for faster movement, while a lower DPI may offer better control, depending on your preference.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Improve hand-eye coordination:</Text> The aim is directly tied to hand-eye coordination. You can improve this by practicing with specific drills, like focusing on fast-moving objects or playing games that require precision.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Enhance reaction time:</Text> The faster you can react to targets, the better your aim will be. Engage in exercises designed to improve your reaction time, such as playing fast-paced games or using specialized reaction training tools.</Text>
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