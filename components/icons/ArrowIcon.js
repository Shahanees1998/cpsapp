import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

const ArrowIcon = ({ size = 20, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polygon points="9,18 15,12 9,6" fill={color} />
  </Svg>
);

export default ArrowIcon; 