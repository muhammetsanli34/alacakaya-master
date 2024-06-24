import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import iconSet from "@expo/vector-icons/build/FontAwesome5";

import Header from "../components/Header";
import BackButton from "@/components/BackButton";

const paragraph = [
  `Alacakaya Marble, which started factory management in 1984, has constantly renovated and now has a facility with a technical team and equipment that will meet all the requirements of the age.`,
  `After the success achieved with Elazığ Cherry (Rosso Levanto), important steps have been taken to brand all stones in the world, especially Botticino Royal. 75% of the annual factory production of 970,000 square meters is used in the foreign market and 25% in the domestic market.`,
  `Alacakaya Mermer A.Ş. Most of its exports are to the Far East and the Middle East; It also serves the continents of Asia, Europe, South America, North America, Africa and Australia.`,
  `Alacakaya Mermer A.Ş. In addition to producing in standard sizes, it can also make project-based special production in line with customer demands.`,
  `In addition, even more value is added to the marble by applying special methods such as tumbled, brushing and hammering, acid precipitation, leather surface and burning.`,
  `Alacakaya Mermer A.Ş. With our admiration for the millions of years of adventure of marble, we are proud to introduce the resources we have to the world with aesthetic and value-adding applications. We have the desire and belief to serve the sector for many years with the same spirit.`,
];

const data = [
  {
    title: "100,000",
    subtitle: "Cubic Production",
    icon: "cube",
  },
  {
    title: "75",
    subtitle: "Export to the Country",
    icon: "globe",
  },
  {
    title: "500",
    subtitle: "Employee",
    icon: "users",
  },
  {
    title: "75",
    subtitle: "Customer Satisfaction",
    icon: "thumbs-up",
  },
];

export default function AboutUs() {
  return (
    <>
      <Header title="ABOUT US" />
      <ScrollView style={styles.container}>
        <BackButton />
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>
            Alacakaya Marble, with its 5 quarries and 500 employees, is superior
            to its customers. technology, high precision and brand quality.
          </Text>
          {paragraph.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
          ))}

          <Image
            style={styles.inlineImage}
            source={require("../assets/images/corporate/2.jpg")}
          />

          <Text style={styles.altParagraph}>
            Alacakaya Marble Inc. is a company that focuses on the millions of
            years adventure of marble. with the admiration we feel, having
            aesthetic and value-adding applications We are proud of introducing
            our resources to the world. With the same spirit and the desire to
            serve the sector for many more years we believe.
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff7" />
              Innovative and Sharing Management Approach
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff7" />
              Unconditional Customer Satisfaction
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff7" />
              Machine Parks with the Latest Technology
            </Text>
          </View>
        </View>
        <View>
          {data.map((item, i) => (
            <View key={i} style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              <FontAwesome
                name={item.icon as typeof iconSet}
                size={24}
                color="#fff"
              />
            </View>
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
    color: "#fff"
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#fff"
  },
  paragraph: {
    fontSize: 16,
    textAlign: "justify",
    color: "#fff"
  },
  altParagraph: {
    fontSize: 16,
    textAlign: "justify",
    marginTop: 30,
    color: "#fff"
  },
  list: {
    marginLeft: 5,
  },
  listItem: {
    // marginLeft: 10,
    fontSize: 16,
    marginTop: 10,
    color: "#fff"
  },
  inlineImage: {
    width: "100%",
    height: 200,
    marginTop: 30,
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#fff7",
    borderWidth: 3,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff"
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    color: "#fff"
  },
});
