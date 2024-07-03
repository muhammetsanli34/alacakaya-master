import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { CategoryType } from "@/types/types";

interface Props {
  categories: CategoryType[];
  local: any;
  page: "shop" | "products";
}
const Category = ({ categories, local, page }: Props) => {
  const getImagePath = (index) => {
    if (local[`categoryImage${index + 1}`]) {
      return `${process.env.EXPO_PUBLIC_API_URL}/mobil/images/category_images/${
        local[`categoryImage${index + 1}`]
      }`;
    } else {
      return `${process.env.EXPO_PUBLIC_API_URL}/mobil/images/cover_images/${local.coverImage}`;
    }
  };
  return (
    <ScrollView style={styles.container}>
      {categories.map((product, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/${page}/alt-products/[id]` as `${string}:${string}`,
                params: {
                  id: product.id,
                  category: product.slug,
                },
              })
            }
            key={product.slug}
            style={styles.item}
          >
            <ImageBackground
              source={{
                // uri: `${process.env.EXPO_PUBLIC_API_URL}/mobil/images/category_images/${
                //   local[`categoryImage${index + 1}`] ? local[`categoryImage${index + 1}`] : local.coverImage
                // }`,
                uri: getImagePath(index),
              }}
              style={styles.item}
              resizeMode="cover"
            >
              <Text style={styles.title}>{product.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 150,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    fontSize: 25,
    position: "absolute",
    bottom: 3,
    right: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
  },
});
export default Category;
