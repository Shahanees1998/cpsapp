// ReactionTestDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const ReactionDetail = () => {
  return (
    <View style={styles.detailBackground}>
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View style={styles.mainContentContainer}>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              What is <Text style={styles.cpsColor}>a Reaction Time Test?</Text>
            </Text>
            <Text style={styles.paragraph}>
              A reaction time test measures how quickly a person responds to a stimulus, such as a visual or auditory cue. It evaluates your reflexes and cognitive processing speed. Reaction time tests are commonly used in a variety of fields—from medical assessments to sports and gaming—to determine how fast a person can react to certain triggers.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              Why is <Text style={styles.cpsColor}>Reaction Time Important?</Text>
            </Text>
            <Text style={styles.subHeader}>Helps identify health issues</Text>
            <Text style={styles.paragraph}>
              Reaction time can be an indicator of neurological conditions like ADHD (Attention Deficit Hyperactivity Disorder) or Parkinson's disease, where delayed or inconsistent responses can suggest underlying health concerns.
            </Text>
            <Text style={styles.subHeader}>Improves your performance in competitive gaming</Text>
            <Text style={styles.paragraph}>
              Faster reaction times give players a significant advantage in competitive gaming, where quick decisions and reflexes can mean the difference between winning and losing.
            </Text>
            <Text style={styles.subHeader}>Makes you a better driver</Text>
            <Text style={styles.paragraph}>
              A quicker reaction time allows you to respond more effectively to sudden changes in traffic, reducing the risk of accidents.
            </Text>
            <Text style={styles.subHeader}>Makes you better at attention-focused jobs</Text>
            <Text style={styles.paragraph}>
              Professions requiring focus and alertness, such as air traffic controllers, surgeons, or athletes, benefit greatly from a sharp reaction time, allowing for faster and more accurate decision-making.
            </Text>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Test Your Reaction Time?</Text>
            </Text>
            <Text style={styles.paragraph}>Here’s how you can test your reaction time:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>1. Launch our website.</Text>
              <Text style={styles.bulletPoint}>2. Read the instructions provided before starting the test to ensure you understand the process.</Text>
              <Text style={styles.bulletPoint}>3. Click on the “Start Test” button to begin. You’ll be prompted to respond to a stimulus as quickly as possible.</Text>
              <Text style={styles.bulletPoint}>4. Your reaction time will be recorded based on how fast you respond to the cue, and the results will be displayed at the end of the test.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              How to <Text style={styles.cpsColor}>Improve Reaction Time?</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Train your weak points:</Text> Identify specific areas where your reaction time might be slower and focus on improving those areas through targeted exercises or drills.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Practice:</Text> Consistent practice helps you get faster. Engaging in activities like video games, sports, or reaction time drills can significantly enhance your response time over time.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Have the right nutrition intake:</Text> A healthy, balanced diet supports cognitive function. Nutrients like omega-3 fatty acids, found in fish, and antioxidants, found in fruits and vegetables, are essential for maintaining brain health and quick thinking.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Engage in physical exercises:</Text> Physical fitness improves both the brain and body’s ability to react quickly. Cardiovascular exercises, strength training, and coordination drills can sharpen your reflexes.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Practice cognitive exercises:</Text> Engage in mental exercises like puzzles, brain-training games, or tasks that require quick decisions to stimulate cognitive speed and improve your reaction time.</Text>
            </View>
          </View>
          <View style={styles.cpsTest}>
            <Text style={styles.header}>
              Factors that Influence <Text style={styles.cpsColor}>Reaction Time</Text>
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Age:</Text> As we age, our reaction times tend to slow down due to natural cognitive and physical decline.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Fitness:</Text> Higher levels of physical fitness are associated with faster reaction times because of improved coordination and muscle response.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Stimulus complexity:</Text> Simpler stimuli result in faster reaction times, while more complex stimuli may slow down response time as they require more processing.</Text>
              <Text style={styles.bulletPoint}><Text style={styles.bold}>Hydration:</Text> Dehydration can negatively affect cognitive function and reaction speed. Staying properly hydrated is important for maintaining optimal brain and body performance.</Text>
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