import React from 'react'
import { StyleProp, TextStyle } from "react-native"
import Animated from "react-native-reanimated"

export interface Props {
  animateToNumber: number
  fontStyle?: StyleProp<TextStyle>
  animationDuration?: number
  includeComma?: boolean
  easing?: Animated.EasingFunction
}

declare const AnimatedNumber: React.SFC<Props>

export default AnimatedNumber
