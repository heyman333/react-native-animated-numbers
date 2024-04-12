import React from 'react';
import { SafeAreaView, Button, Easing } from 'react-native';
import AnimatedNumbers, {
  AnimatedNumberProps,
} from 'react-native-animated-numbers';

const App = () => {
  const [animateToNumber, setAnimateToNumber] = React.useState(483);

  const increase = () => {
    setAnimateToNumber(animateToNumber + 391);
  };

  const decrease = () => {
    setAnimateToNumber(animateToNumber - 311);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <AnimatedNumbers
        includeComma
        animateToNumber={animateToNumber}
        easing={Easing.elastic(1)}
        fontStyle={{ fontSize: 50, fontWeight: 'bold' }}
      />
      <Button title="increase" onPress={increase} />
      <Button title="decrease" onPress={decrease} />
      <Button
        title="random"
        onPress={() => setAnimateToNumber(randomNumber())}
      />
    </SafeAreaView>
  );
};

function randomNumber() {
  return Math.floor(Math.random() * 10000);
}

export default App;
