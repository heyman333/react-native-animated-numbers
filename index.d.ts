import React from 'react'
import { StyleProp, TextStyle, EasingFunction } from "react-native"

export interface Props {
  animateToNumber: number
  fontStyle?: StyleProp<TextStyle>
  animationDuration?: number
  includeComma?: boolean
  easing?: EasingFunction
}

declare const AnimatedNumber: React.SFC<Props>

export default AnimatedNumber