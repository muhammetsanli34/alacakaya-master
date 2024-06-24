import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return null;
  }
};
