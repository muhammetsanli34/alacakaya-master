import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Products from "@/components/Product/Products";
import type { Product } from "@/types/types";
import { getData, storeData } from "@/utils/data-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<[] | Product[]>([]);

  useEffect(() => {
    axios.get("https://mobil.alacakaya.com/get-all-products").then((res) => {
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
      <Header title="SHOP" />
      <Products page="shop" listProducts={listProducts} headerProduct={headerProduct} />
    </>
  );
}


