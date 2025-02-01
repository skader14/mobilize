import { StyleSheet, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { ThemedView } from "@/components/ThemedView";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  // UT Austin coordinates
  const utAustinRegion = {
    latitude: 30.2849,
    longitude: -97.7341,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [searchText, setSearchText] = useState("");

  return (
    <ThemedView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyC0FdW0B5CE6hdM1sC6BCwUwpl5tFL949s",
          language: "en",
        }}
        styles={{
          textInputContainer: styles.searchBar,
        }}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Where to?"
        value={searchText}
        placeholderTextColor="gray"
        onChangeText={setSearchText}
      />
      <MapView style={styles.map} initialRegion={utAustinRegion} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    position: "absolute",
    top: "7.5%",
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    height: 45,
    color: "black",
  },
});
