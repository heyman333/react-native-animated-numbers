import React from 'react';
import { Text, View, Animated } from 'react-native';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const AnimatedNumber = ({
  animatedNumber,
  fontStyle,
  animationDuration,
  initialNumber,
}) => {
  const numberArray = Array.from(String(animatedNumber), Number);
  const [numberHeight, setNumberHeight] = React.useState(0);
  const animations = numberArray.map((__, index) => {
    const animationHeight =
      -1 * (numberHeight * Math.floor(Math.random() * 10));
    return new Animated.Value(animationHeight);
  });

  const setButtonLayout = (e) => {
    setNumberHeight(e.nativeEvent.layout.height);
  };

  React.useEffect(() => {
    animations.map((animation, index) => {
      Animated.timing(animation, {
        toValue: -1 * (numberHeight * numberArray[index]),
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    });
  }, [animatedNumber, numberHeight]);

  const getTranslateY = (index) => {
    return animations[index];
  };

  return (
    <>
      {numberHeight !== 0 && (
        <View style={{ flexDirection: 'row' }}>
          {numberArray.map((n, index) => (
            <View
              key={index}
              style={{ height: numberHeight, overflow: 'hidden' }}>
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        translateY: getTranslateY(index),
                      },
                    ],
                  },
                ]}>
                {NUMBERS.map((number, i) => (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[fontStyle, { height: numberHeight }]} key={i}>
                      {number}
                    </Text>
                  </View>
                ))}
              </Animated.View>
            </View>
          ))}
        </View>
      )}
      <Text
        style={[fontStyle, { position: 'absolute', top: -999999 }]}
        onLayout={setButtonLayout}>
        {0}
      </Text>
    </>
  );
};

export default AnimatedNumber;
