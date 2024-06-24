import Colors from "@/constants/Colors";
import { Product } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Countdown from "../Countdown";

interface Props {
  product: Product;
  productDescription: { label: string; value: string }[];
  refreshing: boolean;
  images: string[];
  isShop: boolean;
  page: "shop" | "products";
  setGalleryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onRefresh: () => void;
  addItemHandler: (id: string) => void;
}

const SingleProduct = ({
  product,
  productDescription,
  refreshing,
  images,
  isShop,
  page,
  onRefresh,
  addItemHandler,
  setGalleryIndex,
}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container, { paddingTop: insets.top + 5 }]}
    >
      {/* header */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </Pressable>
        {isShop ? (
          <View style={styles.topBar.wrapper as StyleProp<ViewStyle>}>
            <TouchableOpacity
              onPress={() => addItemHandler(product.id)}
              style={styles.bucketBtn}
            >
              <Text style={styles.bucketBtnText}>Add to bucket</Text>
            </TouchableOpacity>
            <Pressable
              style={{ marginRight: 5 }}
              onPress={() => router.push(`/${page}/bucket` as `${string}:${string}`)}
            >
              <FontAwesome
                name="shopping-cart"
                size={24}
                color={Colors.primaryColor}
              />
            </Pressable>
          </View>
        ) : null}
      </View>
      <Text style={styles.title}>{product.name}</Text>

      {product.is_reserved ? (
        // ürün rezerve edildiyse
        <Countdown timeInMilliseconds={product.remainingTime} />
      ) : null}
      {/* ürün detay */}
      <View style={styles.wrapper}>
        {/* photos */}
        <View style={styles.imagesContainer}>
          {images.length > 0 &&
            images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setGalleryIndex(index);
                }}
                key={index}
              >
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{
                    width: Dimensions.get("window").width / 2 - 15,
                    height: 200,
                    resizeMode: "cover",
                    marginBottom: 10,
                    borderColor: Colors.primaryColor,
                    borderWidth: 3,
                    borderRadius: 10,
                  }}
                />
              </TouchableWithoutFeedback>
            ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 10,
            marginHorizontal: 10,
            paddingVertical: 1,
            borderColor: Colors.primaryColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              color: Colors.primaryColor,
              borderColor: Colors.primaryColor,
              borderBottomWidth: 2,
              fontSize: 20,
            }}
          >
            DESCRIPTION
          </Text>
        </View>
        {/* ürün açıklaması */}
        <View style={{ marginTop: 10, marginBottom: 90 }}>
          {productDescription.map((desc, index) => (
            <View
              key={desc.label}
              style={{ width: "100%", flexDirection: "row" }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  {desc.label}
                </Text>
                <Text style={{ color: "#fff", fontSize: 16 }}>:</Text>
              </View>
              <Text style={{ width: "50%", color: "#fff", paddingLeft: 20 }}>
                {desc.value}
              </Text>
            </View>
          ))}
        </View>
        {product.content && (
          <View style={{ marginVertical: 30 }}>
            <Markdown>{product.content}</Markdown>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  imagesContainer: {
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
    alignItems: "center",
  },
  topBar: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  },
  bucketBtn: {
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: Colors.primaryColor,
    color: "#fff",
    fontWeight: "bold",
  },
  bucketBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 23,
    color: Colors.primaryColor,
    marginLeft: 10,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16,
  },
  backBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#0006",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
});
