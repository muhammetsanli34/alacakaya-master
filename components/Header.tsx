import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useAuth } from "../context/AuthContext";

const logo = require("../assets/images/logo.png");

const Header = ({ title }: { title: string }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 5 }]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <MaterialIcons
          name="menu"
          size={25}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.divider}>|</Text>
      <Text style={styles.title}>{title}</Text>
      {user && (
        <Pressable
          style={{ marginRight: 5 }}
          onPress={() => router.push("/shop/bucket")}
        >
          <FontAwesome
            name="shopping-cart"
            size={24}
            color={Colors.primaryColor}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 10,
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 3,
    backgroundColor: Colors.darkPrimaryColor,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkPrimaryColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor,
    maxWidth: 200,
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: "contain",
  },
  divider: {
    fontSize: 20,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    color: Colors.primaryColor,
  },
});
