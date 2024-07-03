import Header from "@/components/Header";
import type { Product } from "@/types/types";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { getData, storeData } from "@/utils/data-storage";
import Products from "@/components/Product/Products";
import Loading from "@/components/Loading";

export default function ProductsPage() {
  const [products, setProducts] = useState<[] | Product[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/get-all-products`)
      .then((res) => {
        setProducts(res.data);

        //kayıtlı veri ile gelen veri aynı değilse kaydet
        getData("products").then((stored) => {
          if (stored !== res.data) {
            storeData("products", res.data);
          }
        });
      });
  }, []);

  if (!products.length) {
    return <Loading />;
  }

  const listProducts = products.slice(1, products.length);
  const headerProduct = products[0];

  return (
    <>
      <Header title="PRODUCTS" />
      <Products
        page="products"
        listProducts={listProducts}
        headerProduct={headerProduct}
      />
    </>
  );
}

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
