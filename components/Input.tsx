import React, { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

interface Props {
  style?: { [key: string]: string | number };
  autoCorrect?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  maxLength: number;
  value: string;
  changeValue: (val: string) => void;
}

const Input: FC<Props> = ({
  style = {},
  autoCorrect = false,
  keyboardType = 'default',
  maxLength,
  value,
  changeValue,
}) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      autoCorrect={autoCorrect}
      maxLength={maxLength}
      keyboardType={keyboardType}
      value={value}
      onChangeText={changeValue}
      autoCapitalize="none"
    />
  );
};

export default Input;
