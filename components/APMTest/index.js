import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Icons
export const HeartIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
  </Svg>
);

export const ClubIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path d="M11.5 12.5a3.493 3.493 0 0 1-2.684-1.254 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5z" />
  </Svg>
);

export const SpadeIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907z" />
  </Svg>
);

export const TriangleIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
  </Svg>
);

export const TrophyIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
  </Svg>
);

export const BugIcon = ({ color }) => (
  <Svg width={60} height={60} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <Path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z" />
    <Path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z" />
  </Svg>
);

// Random color function
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#000'); // Default color

  useEffect(() => {
    // Initialize the icons with random colors
    setColors(new Array(5).fill(0).map(() => getRandomColor()));
  }, []);

  const handleIconClick = (index) => {
    setSelectedColor(colors[index]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clickable Icons</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleIconClick(0)}>
          <HeartIcon color={selectedColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconClick(1)}>
          <ClubIcon color={selectedColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconClick(2)}>
          <SpadeIcon color={selectedColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconClick(3)}>
          <TriangleIcon color={selectedColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconClick(4)}>
          <TrophyIcon color={selectedColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
