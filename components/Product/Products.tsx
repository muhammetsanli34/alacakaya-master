import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface Props {
  listProducts: any;
  headerProduct: any;
  page: "shop" | "products";
}

const Products = ({ listProducts, headerProduct, page }: Props) => {
  console.log(listProducts[0], "listProducts");
  return (
    <FlatList
      data={listProducts}
      numColumns={2}
      columnWrapperStyle={{
        gap: 0,
      }}
      ListHeaderComponent={() => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/${page}/category/[id]` as `${string}:${string}`,
              params: {
                id: headerProduct.id,
                coverImage: headerProduct.cover_image,
                categoryImage1: headerProduct.category_image_1,
                categoryImage2: headerProduct.category_image_2,
                categoryImage3: headerProduct.category_image_3,
              },
            })
          }
          key={headerProduct.id}
          style={styles.headerItem}
        >
          <ImageBackground
            source={{
              uri: `https://mobil.alacakaya.com/mobil/images/cover_images/${headerProduct.cover_image}`,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          >
            <LinearGradient
              // Button Linear Gradient
              //start from bottom to top
              start={[0, 1]}
              end={[0, 0]}
              locations={[0, 1]}
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={{}}
            >
              <Text style={styles.itemName}>{headerProduct.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )}
      ListHeaderComponentStyle={{
        width: "100%",
        height: 200,
        marginBottom: 10,
      }}
      renderItem={({ item: product }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/${page}/category/[id]` as `${string}:${string}`,
              params: { id: product.id, coverImage: product.cover_image },
            })
          }
          key={product.id}
          style={styles.item}
        >
          <ImageBackground
            source={{
              uri: `https://mobil.alacakaya.com/mobil/images/cover_images/${product.cover_image}`,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          >
            <LinearGradient
              // Button Linear Gradient
              //start from bottom to top
              start={[0, 1]}
              end={[0, 0]}
              locations={[0, 1]}
              colors={["rgba(0,0,0,1)", "transparent"]}
              style={{}}
            >
              <Text style={styles.itemName}>{product.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerItem: {
    width: "100%",
    height: 200,
  },
  item: {
    width: "50%",
    height: 200,
  },
  itemPhoto: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  itemName: {
    fontSize: 19,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
