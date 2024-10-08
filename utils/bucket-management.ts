import { storeData, getData, removeData } from "./data-storage";
import { BucketItem, Product } from "../types/types";

export async function addItem(id: string, value: number) {
  const products = (await getData("products")) as Product[];
  const data = (await getData("bucket")) as BucketItem[];
  const product = products.find((item) => item.id === id);
  if (!product) {
    return "Product not found.";
  }
  //bucket yoksa oluştur
  if (!data) {
    storeData("bucket", [
      {
        id,
        name: product.name,
        img: product.image_paths[0],
        count: 1,
      },
    ]);
    return "Product added to bucket.";
  }
  const index = data.findIndex((item) => item.id === id);
  //ürün varsa sayısını arttır
  if (index > -1) {
    if (value) {
        data[index].count = value;
    }else {
        data[index].count++;
    }
  } 
  //ürün yoksa ekle
  else {
    data.push({
      id,
      name: product.name,
      img: product.image_paths[0],
      count: 1,
    });
  }
  storeData("bucket", data);
  return "Product added to bucket.";
}

export async function removeItem(id: string) {
  const data = (await getData("bucket")) as BucketItem[];
  const item = data.find((item) => item.id === id);
  if (item) {
    data.splice(data.indexOf(item), 1);
  }
  storeData("bucket", data);
}

export async function clearBucket() {
  removeData("bucket");
}

export async function getItems() {
  const data = (await getData("bucket")) as BucketItem[];
  return data;
}
