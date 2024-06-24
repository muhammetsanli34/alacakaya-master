import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import type { CountdownProps } from "@/types/types";

const Countdown: React.FC<CountdownProps> = ({ timeInMilliseconds }) => {
  const [time, setTime] = useState(timeInMilliseconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        if (time <= 0) {
          clearInterval(interval);
          return 0;
        }
        return time - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  const days = Math.floor(time / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.reservedText}>This item is already reserved.</Text>
      <Text style={styles.timeLeftText}>Time left:</Text>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <Text style={styles.text}>{days}</Text>
          <Text style={styles.label}>Days</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{hours}</Text>
          <Text style={styles.label}>Hours</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{minutes}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{seconds}</Text>
          <Text style={styles.label}>Seconds</Text>
        </View>
      </View>
    </View>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    maxWidth: "80%",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    borderRadius: 10,
    flex: 1,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
  label: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 15,
  },
  reservedText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 10,
    marginTop: 20,
  },
  timeLeftText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});
