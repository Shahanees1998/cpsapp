import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StatsDisplay = ({ cps, timePassed, score }) => {
    return (
        <View style={styles.statsBoardContainer}>
            <StatBox icon="speed" label={`${isNaN(cps) ? 0.0 : cps} Click/s`} />
            <StatBox icon="timer" label={`${timePassed.toFixed(1)} s`} />
            <StatBox icon="score" label={`${score} Score`} />
        </View>
    );
};

const StatBox = ({ icon, label }) => {
    return (
        <View style={styles.statBox}>

            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
};

const Stats = () => {
    const cps = 5.0;
    const timePassed = 10;
    const score = 100;
    return (

        <View style={styles.container}>
            <StatsDisplay cps={cps} timePassed={timePassed} score={score} />
        </View>

    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    statsBoardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#434f65',
        margin: 5,
        width: "100%"
    },

    statLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        textAlign: "center"
    },
});

export default Stats;