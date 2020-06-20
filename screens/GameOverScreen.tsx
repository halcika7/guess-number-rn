/* eslint-disable global-require */
import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import TextWithFamily from '../components/TextWithFamily';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
});

interface Props {
  rounds: number;
  number: number;
  resetGame: () => void;
}

const GameOverScreen: FC<Props> = ({ rounds, number, resetGame }) => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default GameOverScreen;
