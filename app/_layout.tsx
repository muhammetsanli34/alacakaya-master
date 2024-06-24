import FontAwesome from "@expo/vector-icons/FontAwesome";
import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import { SplashScreen, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import Colors from "../constants/Colors";
import Screens from "../constants/Screens";
import { AuthProvider, useAuth } from "../context/AuthContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // TwemojiMozilla: require('../assets/fonts/TwemojiMozilla.woff2'),
    ...FontAwesome.font,
  });
  const [isConnected, setIsConnected] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  //check network connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected);

      setIsConnected(state.isConnected as boolean);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  if (!loaded) {
    return null;
  }

  if (!isConnected) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="wifi" size={100} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          No Internet Connection
        </Text>
        <BackgroundImage />
      </View>
    );
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
      <BackgroundImage />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user, signOut } = useAuth();
  return (
    <Drawer
      backBehavior="history"
      screenOptions={{
        drawerType: "slide",
        drawerItemStyle: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        },
        drawerActiveBackgroundColor: Colors.darkPrimaryColor,
        sceneContainerStyle: {
          backgroundColor: "transparent",
        },
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.wrapper}>
              {Screens.map((screen) =>
                (screen.title == "SHOP" || screen.title == "PERSONAL") &&
                !user ? null : (
                  <TouchableOpacity
                    key={screen.title}
                    onPress={() => props.navigation.navigate(screen.path)}
                    style={styles.item}
                  >
                    <FontAwesome
                      name={screen.icon as any}
                      size={20}
                      color={Colors.grayColor}
                      style={{ width: 30 }}
                    />
                    <Text style={styles.itemText}>{screen.title}</Text>
                  </TouchableOpacity>
                )
              )}
              {!user && (
                <View style={styles.userContainer}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("user/signin")}
                    style={styles.userWrapper}
                  >
                    <FontAwesome
                      name="user"
                      size={30}
                      color={Colors.grayColor}
                    />
                    <Text style={styles.itemText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("user/signup")}
                    style={styles.userWrapper}
                  >
                    <FontAwesome
                      name="sign-in"
                      size={30}
                      color={Colors.grayColor}
                    />
                    <Text style={styles.itemText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        );
      }}
    ></Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkPrimaryColor,
  },
  wrapper: {
    marginVertical: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 30,
    elevation: 4,
    //ios shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // padding: 5,
    backgroundColor: Colors.darkPrimaryColor,
  },
  itemText: {
    color: Colors.grayColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 50,
    gap: 20,
  },
  userWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.grayColor,
    borderWidth: 1,
    padding: 10,
  },
});
