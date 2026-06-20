import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export function useCountUpAnimation(value: number, duration = 1200) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [value]);

  return displayValue;
}