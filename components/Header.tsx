import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import TextWithFamily from './TextWithFamily';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
});

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <View style={styles.header}>
      <TextWithFamily fontFamily="open-sans-bold" style={styles.title}>
        {title}
      </TextWithFamily>
    </View>
  );
};

export default Header;
