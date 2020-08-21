import React from 'react';
import {SafeAreaView, Button} from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';

const App = () => {
  const [animateToNumber, setAnimateToNumber] = React.useState(483);

  const increase = () => {
    setAnimateToNumber(animateToNumber + 391);
  };

  const decrease = () => { 
    setAnimateToNumber(animateToNumber - 311)
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AnimatedNumbers
        includeComma
        animateToNumber={animateToNumber}
        fontStyle={{fontSize: 50, fontWeight: 'bold'}}
      />
      <Button title="increase" onPress={increase} />
      <Button title="decrease" onPress={decrease} />
    </SafeAreaView>
  );
};

export default App;
