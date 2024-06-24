import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import Header from "../../components/Header";


const references = {
  abroad: [
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
  ],
  domestic: [
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
  ],
};
export default function References() {
  return (
    <>
      <Header title="REFERENCES" />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => router.push("/references/abroad")}
          >
            <ImageBackground
              source={{uri: references.abroad[0].image}}
              style={styles.filterImg}
              resizeMode="cover"
            >
              <Text style={styles.filterText}>Abroad</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => router.push("/references/domestic")}
          >
            <ImageBackground
              source={{uri: references.domestic[1].image}}
              style={styles.filterImg}
              resizeMode="cover"
            >
              <Text style={styles.filterText}>Domestic</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
