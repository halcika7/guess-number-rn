import React, { FC, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import TextWithFamily from '../components/TextWithFamily';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%',
  },
  button: {
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
  },
  successButton: {
    borderColor: colors.primary,
    color: 'white',
    backgroundColor: colors.primary,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
});

interface Props {
  userChoice: number;
  onGameOver: (val: number) => void;
}

const generateRandom = <T extends number>(
  min: T,
  max: T,
  exclude: T
): number => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);

  const rnd = Math.floor(Math.random() * (maxNum - minNum)) + minNum;

  if (rnd === exclude) {
    return generateRandom(min, max, exclude);
  }

  return rnd;
};

const renderListItem = (
  numOfRound: number,
  itemData: { index: number; item: string }
) => (
  <View key={itemData.index * Math.random()} style={styles.listItem}>
    <TextWithFamily>#{numOfRound - itemData.index}</TextWithFamily>
    <TextWithFamily>{itemData.item}</TextWithFamily>
  </View>
);

const GameScreen: FC<Props> = ({ userChoice, onGameOver }) => {
  const currentLow = useRef<number>(1);
  const currentHigh = useRef<number>(100);
  const initialGuess = generateRandom(
    currentLow.current,
    currentHigh.current,
    userChoice
  );
  const [pastGuesses, setPastGuesses] = useState<string[]>([
    initialGuess.toString(),
  ]);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState<number>(
    Dimensions.get('window').height
  );

  const nextGuessHandler = (direction: 'lower' | 'greater') => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandom(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);

    setPastGuesses(prev => [nextNumber.toString(), ...prev]);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, pastGuesses, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TextWithFamily fontFamily="open-sans-bold">
          Opponent&apos;s Guess
        </TextWithFamily>
        <View style={styles.controls}>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.successButton }}
            onPress={() => nextGuessHandler('lower')}
          >
            <Ionicons name="md-remove" size={24} style={styles.successButton} />
          </TouchableOpacity>
          <NumberContainer>{currentGuess}</NumberContainer>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.successButton }}
            onPress={() => nextGuessHandler('greater')}
          >
            <Ionicons name="md-add" size={24} style={styles.successButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            // eslint-disable-next-line react/jsx-no-bind
            renderItem={item => renderListItem(pastGuesses.length, item)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TextWithFamily fontFamily="open-sans-bold">
        Opponent&apos;s Guess
      </TextWithFamily>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.successButton }}
          onPress={() => nextGuessHandler('lower')}
        >
          <Ionicons name="md-remove" size={24} style={styles.successButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.successButton }}
          onPress={() => nextGuessHandler('greater')}
        >
          <Ionicons name="md-add" size={24} style={styles.successButton} />
        </TouchableOpacity>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          // eslint-disable-next-line react/jsx-no-bind
          renderItem={item => renderListItem(pastGuesses.length, item)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default GameScreen;
