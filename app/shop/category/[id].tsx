import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Category from "@/components/Product/Category";
import type { CategoryType } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function CategoryPage() {
  const local = useLocalSearchParams();
  const [categories] = useState<CategoryType[]>([
    {
      id: local.id as string,
      name: "Plaka",
      slug: "plaka",
    },
    {
      id: local.id as string,
      name: "Bundle",
      slug: "bundle",
    },
    {
      id: local.id as string,
      name: "Dimensional",
      slug: "dimensional",
    },
  ]);
  return (
    <>
      <Header title="SHOP" />
      <BackButton text="Back to shop" />
      <Category page="shop" local={local} categories={categories} />
    </>
  );
}

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
