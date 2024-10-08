import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { router, useFocusEffect, useSegments } from "expo-router";
import Colors from "../constants/Colors";
import BackButton from "./BackButton";
import { Reference } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function ReferenceListBase({ type }: { type: "2" | "1" }) {
  const [references, setReferences] = useState<Reference[]>({} as Reference[]);

  const segments = useSegments();

  const fetchReferences = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/get-references/${type}`
      );
      setReferences(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, [segments]);

  return (
    <>
      <View style={styles.container}>
        <BackButton />
        <FlatList
          numColumns={2}
          data={references}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                router.push({
                  pathname:
                    "/references/reference/[id]" as `${string}:${string}`,
                  params: {
                    id: item.id,
                  },
                })
              }
            >
              <Image
                style={styles.itemImage}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.cover_image}`,
                }}
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{ width: "100%", marginTop: 20 }}
          keyExtractor={(item) => item.name}
        />
      </View>
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
    height: 150,
    objectFit: "contain",
  },
  backBtn: {
    backgroundColor: "#0005",
    padding: 10,
  },
});
