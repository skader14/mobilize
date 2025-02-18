import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import * as Location from 'expo-location';

import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search for a place'
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('Selected:', { data, details });
            if (details?.geometry?.location) {
              setSelectedLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
          onFail={(error) => {
            console.error('Error:', error);
          }}
          onNotFound={() => console.log('No results found')}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
            components: 'country:us',
            location: userLocation 
              ? `${userLocation.latitude},${userLocation.longitude}`
              : undefined,
            rankby: 'distance',
            radius: 10000,
          }}
          styles={{
            container: {
              flex: 0,
              position: 'absolute',
              width: '100%',
              zIndex: 1,
            },
            textInput: {
              ...styles.searchInput,
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              borderColor: '#2c2c2e',
            },
            listView: {
              ...styles.listView,
              backgroundColor: '#1c1c1e',
              position: 'absolute',
              top: 45,
              width: '100%',
            },
            row: {
              ...styles.row,
              backgroundColor: '#1c1c1e',
            },
            description: {
              ...styles.description,
              color: '#ffffff',
            },
            separator: {
              height: 1,
              backgroundColor: '#2c2c2e',
            },
          }}
          enablePoweredByContainer={false}
          minLength={2}
          debounce={200}
        />
      </View>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 30.2849,
          longitude: -97.7341,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={selectedLocation ? {
          ...selectedLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
        {userLocation && (
          <Marker 
            coordinate={userLocation}
            pinColor="blue"
            title="You are here"
          />
        )}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    top: 70,
    alignSelf: 'center',
    zIndex: 1,
  },
  searchInput: {
    height: 55,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
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