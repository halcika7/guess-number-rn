import React, { FC } from 'react';
import { View, StyleSheet, ShadowPropTypesIOS } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 15,
    padding: 20,
    borderRadius: 10,
  },
});

interface Props {
  style?: { [key: string]: string | number };
}

const Card: FC<Props> = ({ style = {}, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;
