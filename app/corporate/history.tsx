import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

import Header from "../../components/Header";
import BackButton from "@/components/BackButton";

const paragraph = [
  `Alacakaya Mermer A.Ş., one of the strong brands in the Natural Stone Industry of Anatolia, which is considered the cradle of civilization. It has nearly half a century of experience in the sector.`,
  `In 1967, it stepped into the sector with the discovery of marble, which was later called Rosso Levanto. Founded in 1984 under the leadership of Kemal Arslan and Cemil Yaşlı, the company has adopted an innovative and sharing management approach, quality production logic developed day by day and unconditional customer satisfaction as its basic principles.`,
  `Alacakaya Mermer A.Ş. continues its production with its state-of-the-art machinery park in its factory spread over a total area of 17,000 m2, 8,000 m2 of which is closed, in the Elazığ Organized Industrial Zone.`,
  `It is an important employment provider for the region with its average annual block capacity of 100,000 cubic meters and around 500 personnel.`,
  `Alacakaya Mermer A.Ş., which processes the stones obtained from various quarries in Elazığ, Malatya, Ağrı, Adana, Karaman, Adıyaman and Diyarbakır in its own facilities, has ensured the use of these marbles in projects in various regions of the world and has made significant contributions to the branding of Turkish Marble varieties in the world. has happened. It is the main producer of Rosso Levanto (Elazığ Sour Cherry), which is in great demand all over the world.`,
  `Alacakaya Mermer A.Ş. It is one of the important representatives of the Turkish natural stone industry with its powerful machinery park in its quarries, maximum production capacity in its factory and sustainable products. Alacakaya Mermer A.Ş., which exports to dozens of countries without compromising on service and quality. will continue its work with the same determination and perseverance.`,
  `In its activities; It carries the principle of treating its personnel and sub-industry honestly, being sharing in workers and business relations, and encouraging creativity by supporting and encouraging subordinate staff in internal company practices. In customer relations, meeting the demands and needs of customers with an uninterrupted service approach without any self-interest is the basic service approach.`,
  `Alacakaya Mermer A.Ş. For years, it has been on its way to achieve greater perfection, preserving its initial desire and excitement. Alacakaya Marble Inc. It is aware of its responsibility for the development and progress of the sector and is always determined to move forward and achieve perfection.`,
];

export default function History() {
  return (
    <>
      <Header title="HISTORY" />
      <ScrollView style={styles.container}>
        <BackButton />
        <View style={styles.wrapper}>
          {paragraph.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
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
  wrapper: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#fff",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "justify",
    color: "#fff",
  },
  altParagraph: {
    fontSize: 16,
    textAlign: "justify",
    marginTop: 30,
    color: "#fff",
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
});
