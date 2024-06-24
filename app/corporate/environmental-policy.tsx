import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import Header from "../../components/Header";
import BackButton from "@/components/BackButton";

export default function EnvironmentalPolicy() {
  return (
    <>
      <Header title="ENVIRONMENTAL POLICY" />
      <ScrollView style={styles.container}>
        <BackButton />
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>
            Alacakaya Marble and Mining Inc. has been committed to the
            environment since the day it was founded. has adopted the principle
            of working in a sensitive manner, in harmony with the environment.
          </Text>
          <Text style={styles.paragraph}>
            With the movement brought about by nature consciousness, the
            environment within its own environmental consultancy services
            together with engineers.
          </Text>
          <Text style={styles.paragraph}>
            Under this consultancy service, environmental and
            environmental-related The studies are monitored, reported and the
            report records are kept regularly. archived. However, within the
            framework of a specific programme in coordination with "Provincial
            Directorates of Environment and Urbanisation" is being studied.
          </Text>
          <Text style={styles.paragraph}>
            Depending on all these studies, environmental impact regulations
            systematically reported and as a result, the necessary measures are
            taken Measures are fulfilled within the framework of the
            legislation. Environment and for a peaceful and harmonious working
            order at least twice a year for all studies are reported and
            necessary precautions are taken sensitively is provided.
          </Text>
          <Text style={styles.paragraph}>
            Alacakaya Marble A.Ş., environmentally sensitive and responsible
            mining consciousness continues to make production by acting with.
            Turkey's leading As one of the leading marble producers, we are
            committed to the principle of green nature. continues to work.
          </Text>

          <Image
            style={styles.inlineImage}
            source={require("../../assets/images/corporate/7.jpg")}
          />
          <Text style={styles.altParagraph}>
            Alacakaya Marble Inc. is conscious about environmental management
            that protects nature and minimising the impact on the environment
            and European to realise the principles of the Union and to protect
            the environment within these principles aims to be sensitive.
          </Text>
          <Text style={styles.altParagraph}>In carrying out their work;</Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff" />
              To be sensitive and respectful to the environment,
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff" />
              To improve the environmental management system and its effects,
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff" />
              Ensuring that employees work consciously and sensitively on
              environmental management behaviour,
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff" />
              Minimal environmental impact during and after mining activities to
              ensure that
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} color="#fff" />
              By adopting the principle of being sensitive to the environment
              according to the principles of the European Union activities.
            </Text>
          </View>
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
    color: "#fff",
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
  bold: {
    fontWeight: "600",
    color: "#fff",
  },
  altParagraph: {
    fontSize: 16,
    textAlign: "justify",
    marginTop: 30,
    color: "#fff",
  },
  list: {
    marginLeft: 5,
  },
  listItem: {
    // marginLeft: 10,
    fontSize: 16,
    marginTop: 10,
    color: "#fff",
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
    borderColor: "#0005",
    borderWidth: 3,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
});
