import React, { FC } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import TextWithFamily from './TextWithFamily';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? colors.primary : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
  },
  title: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
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
