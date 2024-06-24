import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import GalleryContainer from "../../../components/Gallery";

import BackButton from "@/components/BackButton";
import Header from "../../../components/Header";
import Loading from "@/components/Loading";

const quarries = [
  {
    title: "Karaman Beige Quarry",
    link: "karaman-beige-quarry",
    bold: "Our quarry, located in the vicinity of Özdemir village in the central district of Karaman province, was put into production in 2011.",
    paragraphs: [
      "Our quarry is 35 km from Karaman city centre and 290 km from Mersin Port. The possible and probable reserves for our marble fields in this region are calculated to be around 22.000.000 m3. It has an annual average production capacity of 20.000 m3 . In line with supply and demand, the production capacity can be increased to 40.000 m3 if necessary.",
      "Our light-colored beige hearth attracts attention with its homogeneous feature in terms of its unique color and eye-catching natural pattern. It is a product sought after in various projects with its texture and good polish retention feature. Some of the blocks produced are evaluated in our factory for processing, and some are exported to foreign countries. It is sent to Mersin and Izmir ports.",
    ],
    images: [
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/8.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/9.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/10.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/11.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/12.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/karaman/13.jpg`,
    ],
  },
  {
    title: "Elazığ Cherry Quarry",
    link: "elazig-cherry-quarry",
    bold: "It is located in the vicinity of Altıoluk Village, Alacakaya district, Elazığ province, 80 kilometres from Elazığ province and 700 km from Mersin Port.",
    paragraphs: [
      "It is the only quarry operating since the establishment of the company. Since 1984, Elazig Vişne (Rosso Levanto) marble production has been continuing. The annual block production capacity is around 10.000 m3 .  Rubble production is also carried out at the site. Average rubble production is around 10.000 m3 per year. The possible and potential reserves are thought to be around 600.000 m3 . Therefore, it is spread over a wide area.",
      "With its indisputable beauty and unique colour, it has entered the world literature and established itself. Our marble, whose reserves are found only in our quarry, is preferred in important places and various areas with its durable structure as well as its aesthetic appearance. It is thought that the world-famous Elâzığ Cherry (Rosso Levanto) should gain an identity as a semi-precious natural stone. While some of the blocks produced are utilised in our factory for processing, some of them are exported to the foreign market as raw material.",
    ],
    images: [
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/elazig/8.jpg`,
    ],
  },
  {
    title: "Black Pearl Quarry",
    link: "black-pearl-quarry",
    bold: "Our quarry located in Çüngüş district of Diyarbakır province was put into production in 2000.",
    paragraphs: [
      'Our "Black Pearl" quarry located in Çüngüş district of Diyarbakır province is 185 km from our factory and 660 km from Mersin Port. Since 2000, marble production known as "Black Pearl" has been continuing in the quarry. The apparent reserve of our quarry is calculated as approximately 500,000 m3 . Possible and probable reserves are thought to be around 2.000.000 m3. It is spread over a wide area. Annual production is around 3000 m3 on average.',
      "It is among the most sought-after marbles with its natural structure and noble colour. In addition to these features, it polishes very well. Some of the blocks produced are utilised in our factory for processing and some of them are exported to the world through Mersin Port.",
    ],
    images: [
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/black-pearl/7.jpg`,
    ],
  },
  {
    title: "Petrol Green Quarry",
    link: "petrol-green-quarry",
    bold: "Our quarry located in the vicinity of Altıoluk village, Alacakaya district, Elazığ province was put into production in 1995.",
    paragraphs: [
      'Our quarry is located in Altıoluk village, Alacakaya district, Elazig province, 80 km from Elazig province and 700 km from Mersin Port. In our quarry, natural stone known as "Petrol Green" has been produced since 1995. The visible reserve is approximately 100.000 m3 . Possible and potential reserves are estimated to be around 400,000 m3 . An average production of 5.000 m3 is realised.',
      "It offers a perfect appearance with its texture and pattern structure. It has a wide usage area thanks to its unique colour tone and properties. Some of the blocks produced are evaluated in our factory for processing, while the other part is sent to our export department to present to the world.",
    ],
    images: [
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/petrol-green/6.jpg`,
    ],
  },
  {
    title: "Kütahya Quarry",
    link: "kutahya-quarry",
    bold: "Our Kütahya Marble Quarry, located in Pınarcık village of Altıntaş district, Kütahya province, was opened for production in 2021.",
    paragraphs: [
      "Kütahya Marble Quarry is located in Pınarcık village of Altıntaş district of Kütahya province, 15 km to Altıntaş district, 75 km to Afyonkarahisar and 400 km to İzmir Port. Since 2021, when it was included in the production programme, marble production has been continuing in our quarry. The possible and probable reserves of our quarry are thought to be around 9,000,000 m3. The operable reserve is around 900,000 m3.",
      "In our quarry, marbles known as Aliento, Ciello and Bella Stones are produced. Each of these marbles has very good polish holding properties. In addition, they are special stones that have no precedent with their pattern structure and texture. Bella Stones, also known as Afyon Sugar, attracts attention with its natural pattern resembling the sky. Like all our other stones, these stones stand out with their resistance to harsh conditions, their aesthetic and elegant appearance that appeals to different tastes, as well as their hygienic structure that prevents the formation of bacteria. Some of the marble blocks produced in our quarry are processed in our factory to be used in various fields and the other part is exported to the world from Izmir Port.",
    ],
    images: [
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/1.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/2.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/3.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/4.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/5.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/6.jpg`,
      `https://mobil.alacakaya.com/mobil/images/quarries/kutahya/7.jpg`,
    ],
  },
];

export default function Quarry() {
  const galleryRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const local = useLocalSearchParams();
  const [quarry, setQuarry] = useState<(typeof quarries)[0] | undefined>(
    undefined
  );

  useEffect(() => {
    if (local.name) {
      const quarry = quarries.find((quarry) => quarry.link === local.name);
      setQuarry(quarry);
    }
    return () => {
      setQuarry(undefined);
    };
  }, [local.name]);

  if (!quarry) {
    return <Loading />;
  }

  const images = quarry.images;

  return (
    <>
      <Header title={quarry.title} />
      {galleryIndex !== null ? (
        <GalleryContainer
          {...{ images, galleryIndex, setGalleryIndex, galleryRef }}
        />
      ) : (
        <ScrollView style={styles.container}>
          <BackButton />
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Overview of our forge</Text>

            <Text style={styles.bold}>{quarry.bold}</Text>

            {quarry.paragraphs &&
              quarry.paragraphs.map((paragraph, i) => (
                <Text key={i} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}
          </View>
          {/* photos */}
          <View style={styles.imagesContainer}>
            {quarry.images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setGalleryIndex(index);
                }}
                key={index}
              >
                <Image
                  source={{ uri: image }}
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
  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff"
  },
  bold: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff"
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: "#fff"
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
