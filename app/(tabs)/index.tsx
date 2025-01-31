import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // UT Austin coordinates
  const utAustinRegion = {
    latitude: 30.2849,
    longitude: -97.7341,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={utAustinRegion}
      />
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
});
