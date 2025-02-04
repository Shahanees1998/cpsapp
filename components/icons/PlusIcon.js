import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

const PlusIcon = ({ size = 20, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" />
  </Svg>
);


export default PlusIcon; 