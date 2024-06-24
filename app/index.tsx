import Colors from "@/constants/Colors";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";
import { showToast, Toast } from "@/utils/toast";

const productsIcon = require("../assets/icons/product.png");
const shopIcon = require("../assets/icons/shop.png");
const corporateIcon = require("../assets/icons/corporate.png");
const referancesIcon = require("../assets/icons/references.png");
const aboutIcon = require("../assets/icons/about-us.png");
const quarriesIcon = require("../assets/icons/quarries.png");
const accountIcon = require("../assets/icons/account.png");
const mapsIcon = require("../assets/icons/maps.png");
const contactIcon = require("../assets/icons/contact.png");

const menu: MenuItems[] = [
  {
    title: "PRODUCTS",
    icon: productsIcon,
    href: "/products",
  },
  {
    title: "SHOP",
    icon: shopIcon,
    href: "/shop",
  },
  {
    title: "CORPORATE",
    icon: corporateIcon,
    href: "/corporate",
  },
  {
    title: "REFERENCES",
    icon: referancesIcon,
    href: "/references",
  },
  {
    title: "ABOUT US",
    icon: aboutIcon,
    href: "/about-us",
  },
  {
    title: "QUARRIES",
    icon: quarriesIcon,
    href: "/quarries",
  },
  {
    title: "PERSONAL",
    icon: accountIcon,
    href: "/personal",
  },
  {
    title: "MAPS",
    icon: mapsIcon,
    href: "/maps",
  },
  {
    title: "CONTACT",
    icon: contactIcon,
    href: "/contact",
  },
];

interface Slides {
  data: SlideData[];
  loading: boolean;
}

interface SlideData {
  content_type: string;
  content: string;
  link: string;
}

export default function Home() {
  const { user } = useAuth();
  console.log("user",user);
  

  const params = useLocalSearchParams<{ deleted?: string }>();
  console.log(params);


  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [slides, setSlides] = useState<Slides>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getSlides();
  }, []);
  useEffect(() => {
    // hesap silme işlemi sonrası ana sayfaya yönlendirildiğinden
    // hesap silme işlemi başarılıysa
    if (params.deleted == "true") {
      console.log("Account Removed Successfully");

      showToast("info", "Account Removed Successfully", 3000);
    }
  }, [params.deleted]);

  const getSlides = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/swiper`);
    const data = res.data;
    console.log(data);

    setSlides({ data, loading: false });
  };
  const navigationHandler = (href: `${string}:${string}`) => {
    router.push(href);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getSlides();
    setRefreshing(false);
  };

  const swiperNavigationHandler = (link: string) => {
    if (link.includes("alt-products")) {
      const id = link.split("alt-products/")[1];
      router.push({
        pathname: link as `${string}:${string}`,
        params: {
          id: id,
        },
      });
    }
    else {
      router.push(link as `${string}:${string}`);
    }
  };
  return (
    <>
      <Header title="HOME" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <View style={styles.welcomeContainer}>
          <Text style={{ color: Colors.primaryColor }}>
            Hi, {user ? user.name_surname : "Guest"}
          </Text>
          <Text
            style={{
              color: Colors.primaryColor,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            WELCOME
          </Text>
        </View>

        {/* slayt */}
        {slides.loading ? (
          <Text>Loading...</Text>
        ) : slides.data.length > 0 ? (
          <Swiper
            loop={true}
            // autoplay={true}
            style={styles.swiper}
            autoplayTimeout={3}
            showsButtons={true}
            activeDotColor={Colors.primaryColor}
            prevButton={
              <Text style={{ color: Colors.primaryColor, fontSize: 50 }}>
                ‹
              </Text>
            }
            nextButton={
              <Text style={{ color: Colors.primaryColor, fontSize: 50 }}>
                ›
              </Text>
            }
          >
            {slides.data.map((item, index: number) =>
              item.content_type == "image" ? (
                <TouchableHighlight
                  onPress={() => swiperNavigationHandler(item.link)}
                  key={index}
                  style={styles.slideChild}
                >
                  <Image
                    style={styles.slideChild}
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API_URL}/mobil/images/swiper/${item.content}`,
                    }}
                  />
                </TouchableHighlight>
              ) : (
                <View key={index} style={styles.slideChild}>
                  <Video
                    //autoPlay
                    // useNativeControls
                    useNativeControls
                    style={styles.slideChild}
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API_URL}/mobil/images/swiper/${item.content}`,
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                  />
                </View>
              )
            )}
          </Swiper>
        ) : null}

        {/* menu */}
        <View style={styles.menuContainer}>
          {menu.map((item, index) =>
            !user &&
              (item.title == "SHOP" || item.title == "PERSONAL") ? null : (
              <Pressable
                key={index}
                style={styles.menuItem}
                onPress={() => navigationHandler(item.href as `${string}:${string}`)}
              >
                <>
                  <Image style={styles.itemIcon} source={item.icon} />
                  <Text style={styles.itemText}>{item.title}</Text>
                </>
              </Pressable>
            )
          )}
          <View style={styles.footer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 26, color: "#292a2e" }}
            >
              ALACAKAYA
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#292a2e" }}
            >
              © {new Date().getFullYear()}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  swiper: {
    height: width,
  },
  slideChild: {
    flex: 1,
    width,
    height: width,
  },
  container: {
    flex: 1,
  },
  welcomeContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  menuContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
  },
  menuItem: {
    width: "30%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkPrimaryColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 5,
  },
  itemText: {
    fontSize: Dimensions.get("window").width < 350 ? 12 : 13,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  itemIcon: {
    width: 65,
    height: 65,
    objectFit: "contain",
    marginBottom: 10,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
});

type MenuItems = {
  title: string;
  icon: ImageSourcePropType;
  href?: string;
};
