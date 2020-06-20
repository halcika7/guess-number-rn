/* eslint-disable global-require */
import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';
import TextWithFamily from '../components/TextWithFamily';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  successButton: {
    borderColor: colors.primary,
    color: colors.primary,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

interface Props {
  rounds: number;
  number: number;
  resetGame: () => void;
}

const GameOverScreen: FC<Props> = ({ rounds, number, resetGame }) => {
  return (
    <View style={styles.screen}>
      <TextWithFamily fontFamily="open-sans-bold">
        The Game is Over
      </TextWithFamily>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <TextWithFamily style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{rounds}</Text>.
        </TextWithFamily>
      </View>
      <TextWithFamily>Number was: {number}</TextWithFamily>
      <TouchableOpacity
        style={{ ...styles.button, ...styles.successButton }}
        onPress={resetGame}
      >
        <TextWithFamily style={styles.successButton}>NEW GAME</TextWithFamily>
      </TouchableOpacity>
    </View>
  );
};

export default GameOverScreen;
