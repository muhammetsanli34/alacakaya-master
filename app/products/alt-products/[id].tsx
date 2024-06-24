import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import AltProducts from "@/components/Product/AltProducts";
import Colors from "@/constants/Colors";
import type { Product } from "@/types/types";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AltProductsPage() {
  const [loading, setLoading] = useState(true);
  const [altProducts, setAltProducts] = useState<[] | Product[]>([]);
  const local = useLocalSearchParams();

  useEffect(() => {
    setLoading(true);
    getAltProducts();
  }, [local.category]);

  const getAltProducts = async () => {
    const res = await axios.get(
      `https://mobil.alacakaya.com/get-alt-products-by-category`,
      {
        params: {
          id: local.id,
          category: local.category,
        },
      }
    );
    setAltProducts(res.data);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <>
      <Header title="PRODUCTS" />
      <AltProducts page="products" altProducts={altProducts} />
    </>
  );
}

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
