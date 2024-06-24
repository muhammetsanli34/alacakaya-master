import { router } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";

const links = [
  {
    title: "Karaman Beige Quarry",
    link: "karaman-beige-quarry",
    image: `https://mobil.alacakaya.com/mobil/images/quarries/1.jpg`,
  },
  {
    title: "Elazığ Cherry Quarry",
    link: "elazig-cherry-quarry",
    image: `https://mobil.alacakaya.com/mobil/images/quarries/2.jpg`,
  },
  {
    title: "Black Pearl Quarry",
    link: "black-pearl-quarry",
    image: `https://mobil.alacakaya.com/mobil/images/quarries/3.jpg`,
  },
  {
    title: "Petrol Green Quarry",
    link: "petrol-green-quarry",
    image: `https://mobil.alacakaya.com/mobil/images/quarries/4.jpg`,
  },
  {
    title: "Kütahya Quarry",
    link: "kutahya-quarry",
    image: `https://mobil.alacakaya.com/mobil/images/quarries/5.jpg`,
  },
];

export default function Quarries() {
  return (
    <>
      <Header title="QUARRIES" />
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          {links.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.filterBtn}
              onPress={() =>
                router.push({
                  pathname: "/quarries/quarry/[name]" as `${string}:${string}`,
                  params: { name: item.link },
                })
              }
            >
              <ImageBackground
                source={{uri: item.image}}
                style={styles.filterImg}
                resizeMode="cover"
              >
                <Text style={styles.filterText}>{item.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: Colors.primaryColor,
    marginVertical: 10,
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20, // Add margin between items vertically
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  itemIcon: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  filterBtn: {
    width: "100%",
  },
  filterImg: {
    width: "100%",
    height: 150,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
