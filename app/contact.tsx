import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import FormData from "form-data";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Header from "../components/Header";
import type { FormType } from "../types/types";
import { Toast, showToast } from "../utils/toast";

export default function Contact() {
  const [btnLoading, setBtnLoading] = useState(false);

  const [form, setForm] = useState<FormType>({
    email: "",
    name: "",
    message: "",
    phone: "",
    countryCode: { callingCode: "+90", cca2: "TR", flag: "🇹🇷" } as ICountry,
  });

  const contactHandler = async () => {
    if (!form.email || !form.message || !form.name || !form.phone) {
      showToast("error", "Please fill all fields!");
      return;
    }
    setBtnLoading(true);
    var formdata = new FormData();
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("phone", `${form.countryCode.callingCode} ${form.phone}`);
    formdata.append("message", form.message);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://mobil.alacakaya.com/api/contact`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    try {
      const req = await axios.request(config);
      console.log(req.data);
      if (req.data.error) {
        showToast("error", req.data.message);
        setBtnLoading(false);
        return;
      }
      showToast("success", req.data.message);
      setForm({
        email: "",
        name: "",
        message: "",
        phone: "",
        countryCode: { callingCode: "+90", cca2: "TR", flag: "🇹🇷" } as ICountry,
      });
      setBtnLoading(false);
    } catch (e) {
      showToast("error", "An error occured!");
      setBtnLoading(false);
    }
  };

  return (
    <>
      <Header title="CONTACT" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* CONTACT FORM */}
        <View style={styles.wrapper}>
          <FontAwesome name="phone" size={64} color={Colors.primaryColor} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setForm({ ...form, name: text })}
            value={form?.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
            value={form?.email}
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
            placeholderTextColor="#0007"
            defaultCountry="TR"
            value={form?.phone}
            onChangePhoneNumber={(text: string) => {
              setForm({ ...form, phone: text });
            }}
            selectedCountry={form?.countryCode as any}
            onChangeSelectedCountry={(text: ICountry) =>
              setForm({ ...form, countryCode: text })
            }
          />
          <TextInput
            style={styles.messageInput}
            placeholder="Message"
            onChangeText={(text) => setForm({ ...form, message: text })}
            value={form?.message}
          />
          <TouchableOpacity onPress={contactHandler} style={styles.button}>
            {btnLoading ? (
              <ActivityIndicator color={"#000"} />
            ) : (
              <>
                <FontAwesome name="sign-in" size={24} color="black" />
                <Text style={{ fontSize: 16 }}>Send</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
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
  messageInput: {
    height: 100,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
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
  addressText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  mapMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapMarkerText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
