import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";

import Header from "../../components/Header";
import BackButton from "@/components/BackButton";


const references = [
  {
    title: "Atana Hotel - BAE",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/1.jpg`,
    link: "atana-hotel",
  },
  {
    title: "Kâbe - Mekke, Suudi Arabistan",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/2.jpg`,
    link: "kabe-mekke",
  },
  {
    title: "Hotel Galleria - Jeddah",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/3.jpg`,
    link: "hotel-galleria",
  },
  {
    title: "Intourist Palace Hotel - Gürcistan",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/4.jpg`,
    link: "intourist-palace-hotel",
  },
  {
    title: "Royal Mediterranean Hotel - China",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/5.jpg`,
    link: "royal-mediterranean-hotel",
  },
  {
    title: "Atlantis Hotel Dubai - BAE",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/6.jpg`,
    link: "atlantis-hotel-dubai",
  },
  {
    title: "Pera Palace - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/7.jpg`,
    link: "pera-palace",
  },
  {
    title: "Cratos Hotel - Cyprus",
    image: `https://mobil.alacakaya.com/mobil/images/references/abroad/8.jpg`,
    link: "cratos-hotel",
  },
];

export default function Abroad() {
  return (
    <>
      <Header title="ABROAD" />
      <View style={styles.container}>
        <BackButton />

        <FlatList
          data={references}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/references/reference/[name]" as `${string}:${string}`,
                  params: {
                    name: item.link,
                  },
                })
              }
              style={styles.item}
            >
              <Image style={styles.itemImage} source={{ uri: item.image }} />
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          style={{ width: "100%", marginTop: 20 }}
          keyExtractor={(item) => item.title}
        />
      </View>
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
    alignItems: "center",
  },
  item: {
    flex: 1,
    padding: 5,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  itemImage: {
    width: "100%",
    height: 150,
    objectFit: "contain",
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
});
