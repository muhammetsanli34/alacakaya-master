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
    title: "Savoy Residence - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/1.jpg`,
    link: "savoy-residence",
  },
  {
    title: "The Galata Hotel - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/2.jpg`,
    link: "the-galata-hotel",
  },
  {
    title: "Titanic Business - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/3.jpg`,
    link: "titanic-business",
  },
  {
    title: "Acıbadem Maslak - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/4.jpg`,
    link: "acibadem-maslak",
  },
  {
    title: "Sapphire Residence - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/5.jpg`,
    link: "sapphire-residence",
  },
  {
    title: "Taksim Divan Otel - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/6.jpg`,
    link: "taksim-divan-otel",
  },
  {
    title: "Shangri-La Beşiktaş",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/7.jpg`,
    link: "shangri-la-besiktas",
  },
  {
    title: "Onaltı Dokuz - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/8.jpg`,
    link: "onalti-dokuz",
  },
  {
    title: "Wyndham Grand - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/9.jpg`,
    link: "wyndham-grand",
  },
  {
    title: "Tekfen Residence - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/10.jpg`,
    link: "tekfen-residence",
  },
  {
    title: "The Grand Tarabya - İstanbul",
    image: `https://mobil.alacakaya.com/mobil/images/references/domestic/11.jpg`,
    link: "the-grand-tarabya",
  },
];

export default function Domestic() {
  return (
    <>
      <Header title="DOMESTIC" />
      <View style={styles.container}>
        <BackButton />

        <FlatList
          data={references}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/references/reference/[name]` as `${string}:${string}`,
                  params: { name: item.link },
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
  },
  item: {
    flex: 1,
    alignItems: "center",
    padding: 5,
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
    objectFit: "cover",
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
});
