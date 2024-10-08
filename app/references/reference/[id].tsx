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
import {
  Link,
  useNavigation,
  useLocalSearchParams,
  router,
  useSegments,
} from "expo-router";
import { Dimensions } from "react-native";
import GalleryContainer from "../../../components/Gallery";

import Header from "../../../components/Header";
import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";
import { Reference as IReference } from "@/types/types";
import axios from "axios";

export default function Reference() {
  const galleryRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const segments = useSegments();
  const localSearchParams = useLocalSearchParams();

  const [reference, setReference] = useState<IReference | null>(null);

  const fetchReference = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/get-reference-by-id/${localSearchParams.id}`
      );
      setReference(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("localSearchParams.id", localSearchParams.id);
    fetchReference();
  }, [localSearchParams.id]);

  if (!reference) {
    return <Loading />;
  }
  const images = reference.gallery.map((image) => image.image_url);
  return (
    <>
      <Header title={reference.name} />
      {galleryIndex !== null ? (
        <GalleryContainer
          {...{ images, galleryIndex, setGalleryIndex, galleryRef }}
        />
      ) : (
        <ScrollView style={styles.container}>
          <BackButton />
          <View style={styles.wrapper}>
            {reference.gallery.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setGalleryIndex(index);
                }}
                key={index}
              >
                <Image
                  source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${image.image_url}` }}
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
