import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.accent,
    fontSize: 22,
  },
});

const NumberContainer: FC<{}> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

export default NumberContainer;
