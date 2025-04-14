import { create } from 'zustand';
import { LatLng } from 'react-native-maps';

type MapStore = { 
    userLocation: LatLng | null; 
    destination: LatLng | null; 
    routeCoordinates: LatLng[]; 
    avoidancePolygons: LatLng[][];
    mapCenter: LatLng | null;


    // Actions
    setUserLocation: (location: LatLng) => void;
    setDestination: (location: LatLng) => void;
    setRouteCoordinates: (coords: LatLng[]) => void;
    addAvoidancePolygon: (polygon: LatLng[]) => void;
    clearAvoidancePolygons: () => void; 
    setAvoidancePolygons: (polygons: LatLng[][]) => void;
    setMapCenter: (location: LatLng) => void;
};


const useMapStore = create<MapStore> ((set) => ({ 
    userLocation: null,
    destination: null,
    routeCoordinates: [],
    avoidancePolygons: [],
    mapCenter: null,


    setUserLocation: (location) => set({ userLocation: location }),
    setDestination: (location) => set({ destination: location }), 
    setRouteCoordinates: (coords) => set({ routeCoordinates: coords }),
    addAvoidancePolygon: (polygon) => 
        set((state) => ({ 
            avoidancePolygons: [...state.avoidancePolygons, polygon], 
        })),
    clearAvoidancePolygons: () => set({ avoidancePolygons: [] }),
    setAvoidancePolygons: (polygons) => set({ avoidancePolygons: polygons }),
    setMapCenter: (location) => set({ mapCenter: location }),

}));

export default useMapStore