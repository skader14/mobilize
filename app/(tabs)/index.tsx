import "react-native-get-random-values";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import ors from "../../api/ors";
import { getDirections } from "@/api/openRouteServiceFunctions";

import { ThemedView } from "@/components/ThemedView";

interface Coords {
  latitude: number,
  longitude: number
}

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details?.geometry?.location) {
              setSelectedLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
            console.log("Latitude:", selectedLocation?.latitude);
            console.log("Longitude:", selectedLocation?.longitude);
            console.log("\n");
          }}
          onFail={(error) => {
            console.error("Error:", error);
          }}
          onNotFound={() => console.log("No results found")}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
            components: "country:us",
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "100%",
              zIndex: 1,
            },
            textInput: styles.searchInput,
            listView: {
              ...styles.listView,
              position: "absolute",
              top: 45,
              width: "100%",
            },
            row: styles.row,
            description: styles.description,
          }}
          enablePoweredByContainer={false}
          minLength={2}
          debounce={200}
        />
      </View>
      <View style={{position: "absolute", top: 150, zIndex: 2, backgroundColor: 'blue'}}>
        <Button 
          title="hello"
          onPress={() => getDirections({latitude: 30.2672, longitude: -97.743}, {latitude: 30.2672, longitude: -97.745})}/>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.2849,
          longitude: -97.7341,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          selectedLocation
            ? {
                ...selectedLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
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
  searchContainer: {
    position: "absolute",
    width: "90%",
    top: 50,
    alignSelf: "center",
    zIndex: 1,
  },
  searchInput: {
    height: 45,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listView: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    padding: 13,
    minHeight: 44,
  },
  description: {
    fontSize: 15,
  },
});
