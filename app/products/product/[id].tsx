import GalleryContainer from "@/components/Gallery";
import Loading from "@/components/Loading";
import SingleProduct from "@/components/Product/SingleProduct";
import Colors from "@/constants/Colors";
import type { Product } from "@/types/types";
import { addItem } from "@/utils/bucket-management";
import { Toast, showToast } from "@/utils/toast";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Product() {
  const insets = useSafeAreaInsets();

  const galleryRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const local = useLocalSearchParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (local.id) {
      getProduct(local.id as string);
    }

    return () => {
      setProduct(undefined);
    };
  }, [local.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getProduct(local.id as string);
    setRefreshing(false);
  };

  const getProduct = async (id: string) => {
    try {
      const productRes = await axios.get(
        "https://mobil.alacakaya.com/get-alt-product/" + id
      );
      const getProduct = productRes.data;
      console.log("getProduct", getProduct);
      console.log("id :>> ", id);

      let data = new FormData();
      data.append("productId", getProduct.id);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://mobil.alacakaya.com/is-product-reserved",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      const reservedRes = await axios.request(config);
      const { reserved, remainingTime } = reservedRes.data;

      getProduct.is_reserved = reserved;
      getProduct.remainingTime = remainingTime;
      setProduct(getProduct);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  if (!product) {
    return <Loading />;
  }

  const addItemHandler = (id: string) => {
    addItem(id, 0);
    showToast("success", "Added to bucket");
  };

  const images = product.image_paths.map(
    (image) =>
      `https://mobil.alacakaya.com/mobil/images/alt_products/${product.id}/${image}`
  );

  const productDescription = [
    {
      label: "Product Name",
      value: product.name || "-",
    },
    {
      label: "Product Code",
      value: product.code || "-",
    },
    {
      label: "Product Thickness",
      value: product.thickness || "-",
    },
    {
      label: "Product Size",
      value: product.size || "-",
    },
    {
      label: "Product Quantity",
      value: product.quantity || "-",
    },
  ];
  return (
    <>
      {/* <Header title={product.name} /> */}
      {galleryIndex !== null ? (
        <GalleryContainer
          {...{ images, galleryIndex, setGalleryIndex, galleryRef }}
        />
      ) : (
        <SingleProduct
          {...{
            page: "products",
            product,
            productDescription,
            isShop: false,
            refreshing,
            images,
            onRefresh,
            addItemHandler,
            setGalleryIndex,
          }}
        />
      )}
      <Toast />
    </>
  );
}

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
  },
  topBarwrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
