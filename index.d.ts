import React from 'react'
import { StyleProp, TextStyle, Easing } from "react-native"

export interface Props {
  animateToNumber: number
  startNumber: number
  fontStyle?: StyleProp<TextStyle>
  animationDuration?: number
  includeComma?: boolean
  easing?: Easing
}

declare const AnimatedNumber: React.SFC<Props>

export default AnimatedNumber