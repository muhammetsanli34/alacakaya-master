import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { router } from "expo-router";
import { Product } from "@/types/types";
import Colors from "@/constants/Colors";

interface Props {
  altProducts: Product[];
  page: "shop" | "products";
}

const AltProducts = ({ altProducts, page }: Props) => {
  return (
    <View style={styles.container}>
      <BackButton />
      {altProducts.length > 0 ? (
        <FlatList
          data={altProducts}
          numColumns={2}
          renderItem={({ item: product }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/${page}/product/[id]` as `${string}:${string}`,
                  params: {
                    id: product.id,
                  },
                })
              }
              style={styles.item}
            >
              <Image
                style={styles.itemImage}
                source={{
                  uri: `https://mobil.alacakaya.com/mobil/images/cover_images/${product.cover_image}`,
                }}
              />
              <Text style={styles.itemText}>{product.name}</Text>
            </TouchableOpacity>
          )}
          style={{ width: "100%", marginTop: 20 }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
          No products found
        </Text>
      )}
    </View>
  );
};
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
    alignItems: "center",
  },
  item: {
    flex: 1,
    padding: 5,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  itemImage: {
    width: "100%",
    height: 160,
    objectFit: "contain",
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
});

export default AltProducts;
