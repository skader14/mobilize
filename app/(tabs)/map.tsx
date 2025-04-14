import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Polygon } from 'react-native-maps';
import useMapStore from '@/stores/useMapStore';
import useReportStore from '@/stores/useReportStore';
import { listenToAvoidancePolygons } from '@/api/reports';
import ReportOverlay from '../../components/ReportOverlay';

const MapScreen = () => {
    const { 
        avoidancePolygons, 
        setUserLocation, 
        setDestination, 
        setRouteCoordinates, 
        setAvoidancePolygons,
        setMapCenter,
    } = useMapStore();
    const {
        drawing,
        drawnPolygon,
        description,
        startDrawing,
        stopDrawing,
        addPoint,
        removeLastPoint,
        clearPolygon,
        setDescription
    } = useReportStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = listenToAvoidancePolygons((polygons) => {
            setAvoidancePolygons(polygons);
            setLoading(false);
        });
        return () => unsubscribe(); //Clean up the listener when the component unmounts.
    }, []); //empty dependency array means we only run on first render.


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }


    
    return (
        <View style={styles.container}>
            <MapView
                style={[StyleSheet.absoluteFillObject, {zIndex: 0}]}
                onRegionChangeComplete={(region) => {
                    setMapCenter({ latitude: region.latitude, longitude: region.longitude })
                }}
                initialRegion={{
                    latitude: 30.2849,
                    longitude: -97.7341,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                
            >
                {avoidancePolygons.map((polygon, idx) => (
                    <Polygon
                        key={`polygon-${idx}`}
                        coordinates={polygon}
                        fillColor="rgba(255,0,0,0.5)"
                        strokeColor="black"
                        strokeWidth={3}
                    />
                ))}
                {drawing && drawnPolygon.length > 2 && 
                <Polygon 
                    coordinates={drawnPolygon}
                    fillColor="rgba(0,255,0,0.3)"
                    strokeColor="green"
                    strokeWidth={2}
                    />
                }
            </MapView>
            {/* Floating Action Buttons to move between navigation, reporting, and home */}
            {!drawing && 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.circle}>
                        <MaterialIcons name="home-filled" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.middleCircle}>
                        <MaterialIcons name="directions" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circle} onPress={() => {startDrawing(); console.log("in drawing")}}>
                        <MaterialIcons name="report" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            }

            {/* Overlay for submitting a report */}
            {drawing && <ReportOverlay />}
            
        </View> 
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 70, // distance from bottom of screen
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-evenly", // even spacing across width
        paddingHorizontal: 20, // controls how far out they spread
        alignItems: "center",
      },
      circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#333", // or any color
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Android shadow
      },
      middleCircle: {
        width: 70,
        height: 70,
        bottom: 10, 
        borderRadius: 40,
        backgroundColor: "#333", // or any color
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Android shadow
      },
});

