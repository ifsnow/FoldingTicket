// @flow
import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';

type Props = {|
  isVisible: boolean,
|};

function AirlineLoading({ isVisible }: Props) {
  const {
    animationStyle,
    startAnimation,
    stopAnimation,
  } = useMemo(() => {
    const animationValue = new Animated.Value(0);
    const animationStyle = {
      ...styles.circles,
      transform: [
        {
          translateX: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ([0, -72]: number[]),
          }),
        },
      ],
    };

    const startAnimation = () => {
      animationValue.setValue(0);
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 3000,
          delay: 0,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    const stopAnimation = () => {
      setTimeout(() => {
        animationValue.stopAnimation();
      }, 200);
    };

    return {
      animationStyle,
      startAnimation,
      stopAnimation,
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isVisible, startAnimation, stopAnimation]);

  return (
    <View style={styles.container}>
      <View style={styles.animationSection}>
        <Animated.View style={animationStyle}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </Animated.View>
      </View>
      <Image source={require('./assets/airplane.png')} style={styles.image} />
      <View style={styles.animationSection}>
        <Animated.View style={animationStyle}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  animationSection: {
    flex: 1,
    overflow: 'hidden',
  },
  circles: {
    flexDirection: 'row',
  },
  circle: {
    backgroundColor: '#707070',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 18,
  },
  image: {
    width: 30,
    height: 26,
    zIndex: 2,
  },
});

export default React.memo<Props>(AirlineLoading);
