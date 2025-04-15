import { LatLng } from "react-native-maps";
import { polygon as turfPolygon } from '@turf/helpers';
import { kinks } from '@turf/kinks';

export function processDrawnPolygon(polygon: LatLng[]): {cleaned: LatLng[], error?: string} {
    const coords = polygon.map((pt) => [pt.longitude, pt.latitude]);

    //maybe implement check for min pts: needs at least three

    //close the loop of the polyon
    // TODO: check if last point can be smoothed.
    if (
        coords[0][0] !== coords[coords.length - 1][0] ||
        coords[0][1] !== coords[coords.length - 1][1]
    ) {
        coords.push(coords[0]);
    }

    const turfPoly = turfPolygon([coords]);

    //check for kinks in polygon
    const kinksFound = kinks(turfPoly);
    if (kinksFound.features.length > 0) {
        return { cleaned: [], error: "Polygon crosses over itself."};
    }

    const cleaned: LatLng[] = turfPoly.geometry.coordinates[0].map(
        ([lng, lat]) => ({ latitude: lat, longitude: lng})
    );

    return { cleaned };
    
}



