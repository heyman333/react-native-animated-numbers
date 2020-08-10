import React from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const usePrevious = (value) =>{
	const ref = React.useRef();
	React.useEffect(() => {
		ref.current = value;
	});

	if (typeof ref.current === 'undefined') {
		return 0;
	}
	
	return ref.current;
};

const AnimatedNumber = ({
	animateToNumber,
	fontStyle,
	animationDuration,
	includeComma,
	easing,
}) => {
	const prevNumber = usePrevious(animateToNumber);
	const animateToNumbersArr = Array.from(String(animateToNumber), Number);
	const prevNumberersArr = Array.from(String(prevNumber), Number);

	if (includeComma) {
		const reducedArray = new Array(
			Math.ceil(String(animateToNumber).length / 3)
		).fill(0);

		const startReducedArray = new Array(
			Math.ceil(String(prevNumber).length / 3)
		).fill(0);

		reducedArray.map((__, index) => {
			if (index === 0) {
				return;
			}

			animateToNumbersArr.splice(
				String(animateToNumber).length - index * 3,
				0,
				','
			);
		});

		startReducedArray.map((__, index) => {
			if (index === 0) {
				return;
			}

			prevNumberersArr.splice(String(prevNumber).length - index * 3, 0, ',');
		});
	}

	const [numberHeight, setNumberHeight] = React.useState(0);
	const animations = animateToNumbersArr.map((__, index) => {
		if (typeof prevNumberersArr[index] !== 'number') {
			return new Animated.Value(0);
		}

		const animationHeight = -1 * (numberHeight * prevNumberersArr[index]);
		return new Animated.Value(animationHeight);
	});

	const setButtonLayout = (e) => {
		setNumberHeight(e.nativeEvent.layout.height);
	};

	React.useEffect(() => {
		animations.map((animation, index) => {
			if (typeof animateToNumbersArr[index] !== 'number') {
				return;
			}

			Animated.timing(animation, {
				toValue: -1 * (numberHeight * animateToNumbersArr[index]),
				duration: animationDuration || 1400,
				useNativeDriver: true,
				easing: easing || Easing.elastic(1.2),
			}).start();
		});
	}, [animateToNumber, numberHeight]);

	const getTranslateY = (index) => {
		return animations[index];
	};

	return (
		<>
			{numberHeight !== 0 && (
				<View style={{ flexDirection: 'row' }}>
					{animateToNumbersArr.map((n, index) => {
						if (typeof n === 'string') {
							return (
								<Text key={index} style={[fontStyle, { height: numberHeight }]}>
									{n}
								</Text>
							);
						}

						return (
							<View key={index} style={{ height: numberHeight, overflow: 'hidden' }}>
								<Animated.View
									style={[
										{
											transform: [
												{
													translateY: getTranslateY(index),
												},
											],
										},
									]}
								>
									{NUMBERS.map((number, i) => (
										<View style={{ flexDirection: 'row' }} key={i}>
											<Text style={[fontStyle, { height: numberHeight }]}>{number}</Text>
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
				onLayout={setButtonLayout}
			>
				{0}
			</Text>
		</>
	);
};

export default AnimatedNumber;
