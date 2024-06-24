import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { accountDelete } from "@/utils/user";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Personal = () => {
  const { user, signOut } = useAuth();

  const signOutHandler = () => {
    signOut();
    router.push("/");
  }

  const accountDeleteHandler = async () => {
    if (!user) return;

    console.log("Deleting user, userid: ", user.id);
    
    const res = await accountDelete(user.id);
    if (res.ok) {
      signOut();
      router.push({
        pathname: "/",
        params: { deleted: "true" },
      })
    }
  }
  return (
    <>
      <Header title="PERSONAL" />
      <View style={styles.container}>
        <Text style={styles.title}>Name - Surname</Text>
        <Text style={styles.label}>{user?.name_surname}</Text>

        <Text style={styles.title}>Email</Text>
        <Text style={styles.label}>{user?.email}</Text>

        <Text style={styles.title}>Phone</Text>
        <Text style={styles.label}>{user?.phone}</Text>

        <Text style={styles.title}>City / Country</Text>
        <Text style={styles.label}>
          {user?.city} / {user?.country}
        </Text>

        <Text style={styles.title}>Company</Text>
        <Text style={styles.label}>{user?.companyName}</Text>

        <TouchableOpacity onPress={signOutHandler} style={styles.item}>
          <FontAwesome name="sign-out" size={20} color={Colors.grayColor} />
          <Text style={styles.itemText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={accountDeleteHandler} style={styles.item}>
          <FontAwesome name="trash" size={20} color={Colors.grayColor} />
          <Text style={styles.itemText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    color: Colors.grayColor,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.darkPrimaryColor,
    gap: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
});

export default Personal;
