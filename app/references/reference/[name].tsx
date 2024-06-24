import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigation, useLocalSearchParams, router } from "expo-router";
import { Dimensions } from "react-native";
import GalleryContainer from "../../../components/Gallery";

import Header from "../../../components/Header";
import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";


const references = [
  {
    title: "Atana Hotel",
    link: "atana-hotel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atana-hotel/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atana-hotel/2.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Kabe - Mekke",
    link: "kabe-mekke",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/kabe-mekke/7.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Hotel Galleria",
    link: "hotel-galleria",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/hotel-galleria/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/hotel-galleria/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/hotel-galleria/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/hotel-galleria/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/hotel-galleria/5.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Intourist Palace Hotel",
    link: "intourist-palace-hotel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/intourist-palace-hotel/6.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Royal Mediterranean Hotel",
    link: "royal-mediterranean-hotel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/10.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/royal-mediterranean/11.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Atlantis Hotel Dubai",
    link: "atlantis-hotel-dubai",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/atlantis-hotel-dubai/6.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Pera Palace",
    link: "pera-palace",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/10.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/pera-palace/11.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Cratos Hotel",
    link: "cratos-hotel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/abroad/cratos-hotel/7.jpg`,
    ],
    location: "abroad",
  },
  {
    title: "Savoy Residence",
    link: "savoy-residence",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/savoy-residence/7.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "The Galata Hotel",
    link: "the-galata-hotel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-galata-hotel/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-galata-hotel/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-galata-hotel/3.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Titanic Business",
    link: "titanic-business",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/titanic-business/9.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Acıbadem Maslak",
    link: "acibadem-maslak",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/acibadem-maslak/7.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Sapphire Residence",
    link: "sapphire-residence",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/sapphire-residence/6.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Taksim Divan Otel",
    link: "taksim-divan-otel",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/taksim-divan-otel/10.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Shangri-La Beşiktaş",
    link: "shangri-la-besiktas",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/10.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/11.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/shangri-la-besiktas/12.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Onaltı Dokuz",
    link: "onalti-dokuz",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/onalti-dokuz/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/onalti-dokuz/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/onalti-dokuz/3.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Wyndham Grand",
    link: "wyndham-grand",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/wyndham-grand/7.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "Tekfen Residence",
    link: "tekfen-residence",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/tekfen-residence/6.jpg`,
    ],
    location: "domestic",
  },
  {
    title: "The Grand Tarabya",
    link: "the-grand-tarabya",
    images: [
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/7.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/10.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/11.jpg`,
      `https://mobil.alacakaya.com/mobil/images/references/domestic/the-grand-tarabya/12.jpg`,
    ],
    location: "domestic",
  },
];

export default function Reference() {
  const galleryRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const local = useLocalSearchParams();
  const [reference, setReference] = useState<
    (typeof references)[0] | undefined
  >(undefined);

  useEffect(() => {
    if (local.name) {
      const reference = references.find((ref) => ref.link === local.name);
      setReference(reference);
    }
    return () => {
      setReference(undefined);
    };
  }, [local.name]);

  if (!reference) {
    return <Loading />;
  }
  const images = reference.images;
  return (
    <>
      <Header title={reference.title} />
      {galleryIndex !== null ? (
        <GalleryContainer
          {...{ images, galleryIndex, setGalleryIndex, galleryRef }}
        />
      ) : (
        <ScrollView style={styles.container}>
          <BackButton />
          <View style={styles.wrapper}>
            {reference.images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setGalleryIndex(index);
                }}
                key={index}
              >
                <Image
                  source={{ uri: image}}
                  style={{
                    width: Dimensions.get("window").width / 2 - 15,
                    height: 200,
                    resizeMode: "cover",
                    marginBottom: 10,
                  }}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  galleryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  galleryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  galleryFooterBtn: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0006",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bold: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  backBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#0006",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
