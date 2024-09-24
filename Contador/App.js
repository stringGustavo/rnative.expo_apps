import { StyleSheet, View } from 'react-native';

import Counter from './src/components/Counter/index.js';
import Footer from './src/components/Footer/index.js';
import Header from './src/components/Header/index.js';

export default function App() {
  return (
    <View style={styles.container}>
        <Header />
      <View style={styles.content}>
        <Counter />
      </View>
        <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#17003d",
    width: 100,
    height: 200
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
