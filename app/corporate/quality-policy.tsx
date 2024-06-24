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

export default function QualityPolicy() {
  return (
    <>
      <Header title="QUALITY POLICY" />
      <ScrollView style={styles.container}>
        <BackButton />
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>
            To utilise the underground resources of our country in the most
            appropriate and effective way to contribute to the country's
            economy, to use our products internationally to promote in the best
            way in the international market.
          </Text>
          <Text style={styles.paragraph}>
            To increase market share and competitiveness, to be a leader in the
            marble sector position, quality management system and its
            effectiveness continuously to maximise the satisfaction of our
            employees by improving and not to compromise on quality is the main
            policy of our company.
          </Text>
          <Text style={styles.subtitle}>Our Quality Management System</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>ALACAKAYA MERMER A.Ş.</Text> vision In
            line with the current and developing technologies, the consumer
            expectations, meets the expectations of the Quality Management
            System, international ISO to fulfil the requirements of the 9001
            standard has been certified and is continuously improving.
            Continuous improvement based on data-based work in line with the
            approach
            <Text style={styles.bold}> ALACAKAYA MERMER A.Ş.</Text> all
            efficiency in processes to be able to compete at international level
            to achieve excellence by raising the level of excellence has been
            determined.
          </Text>
          <Text style={styles.paragraph}>
            The Total Quality journey increases the efficiency of all systems.
            As a result, customers have access to better quality products and
            services, more to have the opportunity to have favourable
            conditions.
          </Text>
          <Text style={styles.paragraph}>
            Within the company, at every step taken in the quality journey,
            units and language unity has developed between people, team spirit
            and communication is continuous as a result of the improvement in
            the company's performance. The contribution of employees to the
            success of the company to be aware of their contribution to the
            company's culture, and to further enhance the company culture.
            reinforced.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>ALACAKAYA MERMER A.Ş.</Text>' in Total
            Quality activities, Quality Circles at the beginning of 2001
            applications. Since 11 March 2002, Quality Management System
            Standard. NQA (National Quality Assurance ISO 9001:2008 Quality
            Management Certificate No: 14422) System Certificate has been
            passed.
          </Text>
          <Image
            style={styles.inlineImage}
            source={require("../../assets/images/corporate/5.jpg")}
          />
          <Text style={styles.altParagraph}>
            Annual Management Review Meetings and Monthly Continuity of
            developments is ensured through Personnel Training Programmes has
            been studied.
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} colour="#fff" />
              Changing Internal and External Conditions
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} colour="#fff" />
              Adaptive and Preventive Approaches
            </Text>
            <Text style={styles.listItem}>
              <FontAwesome name="check" size={20} colour="#fff" />
              Ease of Use of Modern Technologies
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
