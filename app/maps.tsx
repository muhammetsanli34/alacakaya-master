import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Header from "../components/Header";
import { Toast } from "../utils/toast";

export default function Maps() {
  return (
    <>
      <Header title="MAPS" />
      <Toast />
      <ScrollView>
        {/* MAP */}
        <View style={styles.container}>
          <FontAwesome name="map" size={64} color={Colors.primaryColor} />
          <Text style={styles.addressText}>
            Organize Sanayi Bölgesi, Yazıkonak Pk. 23280 {"\n"}
            Elazığ / Türkiye
          </Text>
          <MapView showsUserLocation={false} initialRegion={
            {
              latitude: 38.619736,
              longitude: 39.29813,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          } style={{width: "100%", height: 300, marginTop: 30}} >
            <Marker style={styles.mapMarker} coordinate={{latitude: 38.619736, longitude: 39.29813}}>
              <FontAwesome name="map-marker" size={24} color="red" />
              <Text style={styles.mapMarkerText}>Alacakaya Marble and Mineral Works</Text>
            </Marker>
          </MapView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    color: Colors.primaryColor,
  },
  mapMarker:{
    alignItems: "center",
    justifyContent: "center",
  },
  mapMarkerText:{
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  }
});
