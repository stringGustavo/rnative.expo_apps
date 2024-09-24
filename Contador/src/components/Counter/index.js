import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Buttons from '../Buttons';

export default function Counter() {

  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = (count < 1) ? () => setCount(count) : () => setCount(count - 1);

  return (
    <View style={styles.containerCounter}>
      <Text style={styles.text}>Contador</Text>
      <View style={styles.counter}>
        <Text style={styles.number}>{count}</Text>
      </View>
      <Buttons onIncrement={increment} onDecrement={decrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCounter: {
    alignItems: "center"
  },
  text: {
    color: "#cccccc",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10
  },
  number: {
    color: "#cccccc",
    fontSize: 70
  },
  counter: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#cccccc",
    justifyContent: "center",
    alignItems: "center"
  }
});