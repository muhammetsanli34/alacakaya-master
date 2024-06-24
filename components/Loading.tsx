import React, { useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";

export default function Loading() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <Image
          source={require("../assets/images/logoWhite.png")}
          style={{ width: 250, height: 100, resizeMode: "contain" }}
        />
        </Animated.View>
    </View>
  );
}
