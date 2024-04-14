import React, { useCallback, useMemo, useRef } from 'react';
import type {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Text, View, Animated, Easing, StyleSheet } from 'react-native';
import usePrevious from '../hooks/usePrevious';
import { createNumberArrayWithComma, toAbsoluteInteger } from '../utils';

export interface AnimatedNumberProps {
  animateToNumber: number;
  fontStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  includeComma?: boolean;
  easing?: Animated.TimingAnimationConfig['easing'];
  containerStyle?: StyleProp<ViewStyle>;
}

const AnimatedNumber = ({
  animateToNumber: givenAnimateToNumber,
  fontStyle,
  animationDuration,
  includeComma,
  easing,
  containerStyle,
}: AnimatedNumberProps) => {
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const animateToNumber = toAbsoluteInteger(givenAnimateToNumber);

  const prevNumber = usePrevious(animateToNumber);

  const animateToNumberString = animateToNumber.toString();

  const prevNumberString = prevNumber.toString();

  const NUMBERS = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map((_, i) => i),
    []
  );

  const nextNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(animateToNumberString)
      : Array.from(animateToNumberString, Number);
  }, [animateToNumberString, includeComma]);

  const prevNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(prevNumberString)
      : Array.from(prevNumberString, Number);
  }, [prevNumberString, includeComma]);

  const [height, setHeight] = React.useState(0);

  const animations = useMemo(
    () =>
      height === 0
        ? []
        : nextNumbersArr.map((__, index) => {
            const value = prevNumbersArr[index];
            if (typeof value !== 'number') {
              return new Animated.Value(0);
            }

            const animationHeight = -1 * (height * value);
            return new Animated.Value(animationHeight);
          }),
    [nextNumbersArr, height, prevNumbersArr]
  );

  const setButtonLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  React.useEffect(() => {
    if (height === 0) return;

    if (animationRef.current) {
      animationRef.current.stop();
    }

    const compositions = animations.reduce<Animated.CompositeAnimation[]>(
      (acc, animation, index) => {
        const value = nextNumbersArr[index];
        if (typeof value === 'number') {
          acc.push(
            Animated.timing(animation, {
              toValue: -1 * (height * value),
              duration: animationDuration || 1400,
              useNativeDriver: true,
              easing: easing || Easing.elastic(1.2),
            })
          );
        }

        return acc;
      },
      []
    );

    animationRef.current = Animated.parallel(compositions);
    animationRef.current.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animations, height]);

  return (
    <>
      {height !== 0 && (
        <View
          style={StyleSheet.flatten([
            containerStyle,
            { flexDirection: 'row', height },
          ])}
        >
          {animateToNumber < 0 && (
            <Text style={[fontStyle, { height }]}>-</Text>
          )}
          {nextNumbersArr.map((n, index) => {
            if (typeof n === 'string') {
              return (
                <Text key={index} style={[fontStyle, { height }]}>
                  {n}
                </Text>
              );
            }

            return (
              <View key={index} style={{ height, overflow: 'hidden' }}>
                <Animated.View
                  style={[
                    {
                      transform: [
                        {
                          translateY: animations[index]!,
                        },
                      ],
                    },
                  ]}
                >
                  {NUMBERS.map((number, i) => (
                    <Text style={[fontStyle, { height }]} key={i}>
                      {number}
                    </Text>
                  ))}
                </Animated.View>
              </View>
            );
          })}
        </View>
      )}
      <View style={{ opacity: 0, position: 'absolute' }} pointerEvents="none">
        <Text style={fontStyle} onLayout={setButtonLayout} numberOfLines={1}>
          {animateToNumber}
        </Text>
      </View>
    </>
  );
};

export default AnimatedNumber;
