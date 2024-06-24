import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  url?: Href<string>;
  text?: string;
};

const BackButton = (props: Props) => {
  const navigationHandler = () => {
    if (props.url) {
      router.push(props.url);
      return;
    }
    router.back();
  }
  return (
    <TouchableOpacity
      onPress={navigationHandler}
      style={styles.backBtn}
    >
      <Ionicons name="arrow-back-circle" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default BackButton;
