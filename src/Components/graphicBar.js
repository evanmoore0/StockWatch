import React, { useState, useEffect } from "react";
import { Animated, View } from "react-native";
import normalize from "../utils/Style/normalize";

function GraphicBar(props) {
  const [translation, setTranslation] = useState(50);
  const fade = new Animated.Value(0);

  const handleAnimation = () => {
    fade.setValue(0);
    setTranslation(
      fade.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    );
    Animated.timing(fade, {
      toValue: 1,
      duration: 3000,
      delay: props.delay,
      useNativeDriver: true,
    }).start(() => handleAnimationTwo());
  };

  const handleAnimationTwo = () => {
    fade.setValue(0);
    setTranslation(
      fade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    );
    Animated.timing(fade, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <Animated.View
      style={{
        top: normalize.setNormalize(props.padding),

        transform: [{ scale: translation }],
      }}
    >
      <View
        style={{
          backgroundColor: props.color,
          width: normalize.setNormalize(10) * props.scale,
          height: normalize.setNormalize(props.height),
          borderRadius: normalize.setNormalize(40),
        }}
      ></View>
    </Animated.View>
  );
}

export default GraphicBar;
