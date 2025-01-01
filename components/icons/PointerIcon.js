import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PointerIcon = ({ size = 20, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 2L22 12L12 22L14 12L2 2Z"
      fill={color}
    />
  </Svg>
);

export default PointerIcon; 