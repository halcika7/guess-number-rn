import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
  },
});

interface Props {
  fontFamily?: string;
  style?: { [key: string]: string | number };
}

const TextWithFamily: FC<Props> = ({
  children,
  fontFamily = 'open-sans',
  style = {},
}) => {
  return <Text style={{ fontFamily, ...style }}>{children}</Text>;
};

export default TextWithFamily;
