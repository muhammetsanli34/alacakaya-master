import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { BucketItem } from "../../types/types";
import {
  clearBucket,
  getItems,
  removeItem,
} from "../../utils/bucket-management";
import { Toast, showToast } from "../../utils/toast";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const reservationLengths = [
  { label: "3 hours", value: "10800000" },
  { label: "4 hours", value: "14400000" },
  { label: "5 hours", value: "18000000" },
  { label: "6 hours", value: "21600000" },
  { label: "7 hours", value: "25200000" },
  { label: "8 hours", value: "28800000" },
  { label: "9 hours", value: "32400000" },
  { label: "10 hours", value: "36000000" },
  { label: "11 hours", value: "39600000" },
  { label: "12 hours", value: "43200000" },
  { label: "13 hours", value: "46800000" },
  { label: "14 hours", value: "50400000" },
  { label: "15 hours", value: "54000000" },
  { label: "16 hours", value: "57600000" },
  { label: "17 hours", value: "61200000" },
  { label: "18 hours", value: "64800000" },
  { label: "19 hours", value: "68400000" },
  { label: "20 hours", value: "72000000" },
  { label: "21 hours", value: "75600000" },
  { label: "22 hours", value: "79200000" },
  { label: "23 hours", value: "82800000" },
  { label: "1 day", value: "86400000" },
  { label: "2 days", value: "172800000" },
  { label: "3 days", value: "259200000" },
];

export default function Bucket() {
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const [bucket, setBucket] = useState<BucketItem[] | "loading">("loading");
  const [reservationLength, setReservationLength] = useState("10800000");

  useEffect(() => {
    const updateBucket = async () => {
      setBucket("loading");
      const items = await getItems();
      setBucket(items);
    };

    updateBucket();

    return () => {
      setBucket("loading");
    };
  }, [isFocused]);

  const removeItemHandler = (id: string) => {
    if (!bucket || bucket === "loading") {
      return;
    }
    setBucket("loading");
    const item = bucket.find((item) => item.id === id);
    if (item) {
      bucket.splice(bucket.indexOf(item), 1);
    }
    removeItem(id);
    setBucket([...bucket]);
  };
  const reserveProductsHandler = async () => {
    if (!user) {
      showToast("error", "You must be logged in to reserve products!");
      return;
    }
    if (!bucket || bucket === "loading") {
      showToast("error", "An error occured!");
      return;
    }
    const productIds = bucket.map((item) => item.id);
    console.log("productIds", productIds);

    const res = await axios.post(
      "https://mobil.alacakaya.com/reserve-product",
      {
        userId: user.id,
        productIds: productIds,
        reservation_length: reservationLength,
      }
    );
    if (!res.data.ok) {
      console.log("error", res.data);

      showToast("error", res.data.message);
      return;
    }
    showToast("success", "Products reserved successfully!");

    await clearBucket();
    setBucket([]);
    showToast("success", "Products reserved successfully!");
  };

  console.log("bucket", bucket);

  const redirectToProduct = (id: string) => {
    router.push({
      pathname: "/shop/product/[id]" as `${string}:${string}`,
      params: {
        id: id,
        returnURL: `/shop/bucket`,
      },
    });
  };
  return (
    <>
      <Header title="BUCKET" />
      <Toast />
      {typeof bucket === "string" && bucket === "loading" ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : !bucket || !bucket.length ? (
        <View style={styles.emptyContainer}>
          <FontAwesome
            name="shopping-cart"
            size={54}
            color={Colors.primaryColor}
          />
          <Text
            style={{
              fontSize: 23,
              fontWeight: "500",
              color: Colors.primaryColor,
            }}
          >
            Bucket is empty!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {bucket.map((product) => (
            <Pressable
              onPress={() => redirectToProduct(product.id)}
              key={product.id}
              style={styles.item}
            >
              <Image
                source={`https://mobil.alacakaya.com/mobil/images/products/${product.id}/${product.img}`}
                style={styles.image}
                contentFit="contain"
              />
              <View style={styles.textWrapper}>
                <Text style={styles.title}>{product.name}</Text>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      removeItemHandler(product.id);
                    }}
                  >
                    <FontAwesome name="trash" size={24} color="#ad0303" />
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          ))}
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
              Reservation Length:{" "}
            </Text>

            <RNPickerSelect
              style={{
                inputAndroid: {
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontWeight: "500",
                },
                inputIOS: {
                  color: Colors.primaryColor,
                  fontSize: 16,
                  fontWeight: "500",
                },
              }}
              useNativeAndroidPickerStyle={false}
              value={reservationLength}
              onValueChange={(itemValue) => setReservationLength(itemValue)}
              items={reservationLengths.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </View>
          <TouchableOpacity
            style={styles.reserveProductBtn}
            onPress={reserveProductsHandler}
          >
            <Text style={{ color: "#fff", fontSize: 17 }}>
              Reserve Product(s)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0006",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  reserveProductBtn: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    color: "#fff",
  },
});
