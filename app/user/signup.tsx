import {
  View,
  StyleSheet,
  ImageSourcePropType,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Toast, showToast, toastConfig } from "../../utils/toast";
import axios from "axios";
import FormData from "form-data";

import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Header from "../../components/Header";
import Colors from "@/constants/Colors";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name_surname: "",
    phone: "",
    countryCode: { callingCode: "+90", cca2: "TR", flag: "🇹🇷" } as ICountry,
    country: "",
    city: "",
    companyName: "",
  });
  const signUpHandler = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.passwordConfirm ||
      !form.name_surname ||
      !form.phone ||
      !form.country ||
      !form.city ||
      !form.companyName
    ) {
      showToast("error", "Please fill in all fields!");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      showToast("error", "Please enter a valid email!");
      return;
    }

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(form.password)) {
      showToast("error", "Password must contain at least 8 characters!");
      return;
    } else if (form.password != form.passwordConfirm) {
      showToast("error", "Passwords do not match!");
      return;
    }

    var formdata = new FormData();
    formdata.append("email", form.email);
    formdata.append("password", form.password);
    formdata.append("passwordConfirm", form.passwordConfirm);
    formdata.append("name_surname", capitalize(form.name_surname));
    formdata.append("phone", `${form.countryCode.callingCode} ${form.phone}`);
    formdata.append("country", capitalize(form.country));
    formdata.append("city", capitalize(form.city));
    formdata.append("companyName", capitalize(form.companyName));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://mobil.alacakaya.com/signup`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    const req = await axios.request(config);
    console.log("dataa", req.data);
    if (req.data.success) {
      showToast("success", req.data.success, 5000);
      setForm({
        email: "",
        password: "",
        passwordConfirm: "",
        name_surname: "",
        phone: "",
        countryCode: { callingCode: "+90", cca2: "TR", flag: "🇹🇷" } as ICountry,
        country: "",
        city: "",
        companyName: "",
      });
    } else {
      showToast("error", req.data.error);
    }
  };

  const capitalize = (str: string) => {
    str = str.toLowerCase();
    let words = str.split(" ");
    let result = "";
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      result += capitalized + " ";
    }
    return result.trim();
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header title="SIGN UP" />
        <ScrollView
          contentContainerStyle={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="user" size={64} color={Colors.primaryColor} />
          <TextInput
            style={styles.input}
            placeholder="Name Surname"
            onChangeText={(text) => setForm({ ...form, name_surname: text })}
            placeholderTextColor={"#fff9"}
            value={form.name_surname}
          />
          <PhoneInput
            phoneInputStyles={{
              container: {
                width: "90%",
                margin: 12,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 10,
                backgroundColor: "#fff5",
              },
              input: { color: "#000" },
            }}
            placeholder="Phone Number"
            placeholderTextColor="#fff7"
            defaultCountry="TR"
            value={form?.phone}
            onChangePhoneNumber={(text: string) => {
              if (!form?.countryCode) {
                showToast("error", "Please first select country code!");
                return;
              }
              setForm({ ...form, phone: text });
            }}
            selectedCountry={form?.countryCode as any}
            onChangeSelectedCountry={(text: any) =>
              setForm({ ...form, countryCode: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="Country"
            onChangeText={(text) => setForm({ ...form, country: text })}
            value={form.country}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="City"
            onChangeText={(text) => setForm({ ...form, city: text })}
            value={form.city}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="Company Name"
            onChangeText={(text) => setForm({ ...form, companyName: text })}
            value={form.companyName}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
            value={form.email}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, password: text })}
            value={form.password}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff9"}
            placeholder="Password Confirm"
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, passwordConfirm: text })}
            value={form.passwordConfirm}
          />
          <TouchableOpacity onPress={signUpHandler} style={styles.button}>
            <FontAwesome name="sign-in" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </>
  );
}

interface CustomInputProps {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    width: "90%",
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
