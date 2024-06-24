import GalleryContainer from "@/components/Gallery";
import Loading from "@/components/Loading";
import SingleProduct from "@/components/Product/SingleProduct";
import type { Product } from "@/types/types";
import { addItem } from "@/utils/bucket-management";
import { Toast, showToast } from "@/utils/toast";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

export default function Product() {
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

  const addItemHandler = (id: string) => {
    addItem(id, 0);
    showToast("success", "Added to bucket");
  };

  if (!product) {
    return <Loading />;
  }

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

  const images = product.image_paths.map(
    (image) =>
      `https://mobil.alacakaya.com/mobil/images/alt_products/${product.id}/${image}`
  );

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
            page: "shop",
            product,
            productDescription,
            isShop: true,
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
