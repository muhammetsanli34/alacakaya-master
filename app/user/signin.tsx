import Colors from "@/constants/Colors";
import type { User } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import FormData from "form-data";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { storeData } from "../../utils/data-storage";
import { Toast, showToast } from "../../utils/toast";

export default function SignIn() {
  const [btnLoading, setBtnLoading] = useState(false);
  const { signIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const signInHandler = async () => {
    setBtnLoading(true);
    var formdata = new FormData();
    formdata.append("email", form.email);
    formdata.append("password", form.password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://mobil.alacakaya.com/signin`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    try {
      const req = await axios.request(config);
      console.log(req.data);
      if (req.data.error) {
        showToast("error", req.data.error);
        setBtnLoading(false);
        return;
      }
      showToast("success", "Sign in successful!");
      await storeData("user", req.data);
      signIn(req.data as User);

      setTimeout(() => {
        router.push("/");
        setForm({ email: "", password: "" });
        setBtnLoading(false);
      }, 1000);
    } catch (e) {
      showToast("error", "An error occured!");
      setBtnLoading(false);
    }
  };

  return (
    <>
      <Header title="SIGN IN" />
      <View style={styles.container}>
        <FontAwesome name="user" size={64} color={Colors.primaryColor} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#fff9"}
          onChangeText={(text) => setForm({ ...form, email: text })}
          value={form.email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={"#fff9"}
          onChangeText={(text) => setForm({ ...form, password: text })}
          value={form.password}
        />
        <TouchableOpacity onPress={signInHandler} style={styles.button}>
          {btnLoading ? (
            <ActivityIndicator color={"#000"} />
          ) : (
            <>
              <FontAwesome name="sign-in" size={24} color="black" />
              <Text style={{ fontSize: 16 }}>Sign In</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff5",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8",
    padding: 10,
    gap: 10,
    borderRadius: 10,
  },
});
