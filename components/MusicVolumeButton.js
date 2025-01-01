import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Slider, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const MusicVolumeButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [volume, setVolume] = useState(1.0); // Volume range from 0.0 to 1.0

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/background-music.mp3') // Replace with your music file path
    );
    setSound(sound);
    await sound.playAsync();
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await playSound();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Cleanup the sound on unmount
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#7655ca',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  volumeLabel: {
    color: '#000',
    marginBottom: 5,
  },
  slider: {
    width: 200,
  },
});

export default MusicVolumeButton; 