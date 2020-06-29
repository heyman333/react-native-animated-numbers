import React from 'react';
import { Text, View, Animated, Easing } from 'react-native';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const AnimatedNumber = ({
  animatedNumber,
  fontStyle,
  animationDuration,
  includeComma,
  startWithZero,
  easing,
}) => {
  const animatedNumbersArr = Array.from(String(animatedNumber), Number);

  if (includeComma) {
    const reducedArray = new Array(
      Math.ceil(String(animatedNumber).length / 3),
    ).fill(0);

    reducedArray.map((__, index) => {
      if (index === 0) {
        return;
      }

      animatedNumbersArr.splice(
        String(animatedNumber).length - index * 3,
        0,
        ',',
      );
    });
  }

  const [numberHeight, setNumberHeight] = React.useState(0);
  const animations = animatedNumbersArr.map((__, index) => {
    const animationHeight = startWithZero
      ? 0
      : -1 * (numberHeight * Math.floor(Math.random() * 10));
    return new Animated.Value(animationHeight);
  });

  const setButtonLayout = (e) => {
    setNumberHeight(e.nativeEvent.layout.height);
  };

  React.useEffect(() => {
    animations.map((animation, index) => {
      if (typeof animatedNumbersArr[index] !== 'number') {
        return;
      }

      Animated.timing(animation, {
        toValue: -1 * (numberHeight * animatedNumbersArr[index]),
        duration: animationDuration || 1400,
        useNativeDriver: true,
        easing: easing || Easing.elastic(1.2),
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
          {animatedNumbersArr.map((n, index) => {
            if (typeof n === 'string') {
              return (
                <Text key={index} style={[fontStyle, { height: numberHeight }]}>
                  {n}
                </Text>
              );
            }

            return (
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
                    <View style={{ flexDirection: 'row' }} key={i}>
                      <Text style={[fontStyle, { height: numberHeight }]}>
                        {number}
                      </Text>
                    </View>
                  ))}
                </Animated.View>
              </View>
            );
          })}
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
