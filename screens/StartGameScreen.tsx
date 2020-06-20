import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TextWithFamily from '../components/TextWithFamily';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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
  failButton: {
    borderColor: colors.accent,
    color: colors.accent,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  startGameButton: {
    color: 'green',
    borderColor: 'green',
  },
});

interface Props {
  onStartGame: (val: number) => void;
}

const StartGameScreen: FC<Props> = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const dismissKeyboard = () => Keyboard.dismiss();

  const numberInputHandler = (inputValue: string) => {
    setEnteredValue(inputValue.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setSelectedNumber(undefined);
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue, 10);

    if (
      Number.isNaN(choosenNumber) ||
      choosenNumber <= 0 ||
      choosenNumber > 99
    ) {
      Alert.alert(
        'Invalid number!!',
        'Number has to be a number between 1 and 99.',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(choosenNumber);
    setEnteredValue('');
    dismissKeyboard();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <TextWithFamily>You selected</TextWithFamily>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.startGameButton }}
          onPress={() => onStartGame(selectedNumber as number)}
        >
          <Text style={styles.startGameButton}>START GAME</Text>
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.screen}>
        <TextWithFamily fontFamily="open-sans-bold" style={styles.title}>
          Start a New Game!
        </TextWithFamily>
        <Card style={styles.inputContainer}>
          <TextWithFamily>Select a Number</TextWithFamily>
          <Input
            style={styles.input}
            maxLength={2}
            keyboardType="number-pad"
            changeValue={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.failButton }}
              onPress={resetInputHandler}
            >
              <Text style={styles.failButton}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.successButton }}
              onPress={confirmInputHandler}
            >
              <Text style={styles.successButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;
