import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const backgroundImage = require("../assets/images/background.jpg");

const BackgroundImage = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={backgroundImage} style={styles.backgroundImage} /> */}
    </View>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    backgroundColor: "#101116",
    flex: 1,
    zIndex: -1, // Place the background image behind other components
    opacity: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.6,
    width: null,
    height: null,
  },
});