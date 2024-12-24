import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Dot = ({ id, x, y, onHit, onMiss }) => {
    const handleClick = () => {
        onHit(id);
    };

    return (
        <TouchableOpacity
            onPress={handleClick}
            style={[
                styles.dot,
                {
                    top: `${y}%`,
                    left: `${x}%`,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 15,
    },
});

export default Dot;