import orsApi from './ors'

interface SendCoords {
    longitude: number,
    latitude: number
}

interface ResponseCoords {
    longitude: number,
    latitude: number
}

/**
 * Gets the directions
 * @param origin - longitude and latitude of starting location for directions
 * @param destination - longitude and latitude of ending location for directions
 * @returns An array of ResponseCoords objects, containing longitude and latitude
 */
export const getDirections = async (
    origin: SendCoords,
    destination: SendCoords) => { //: Promise<ResponseCoords[]>
    try {
        const url = `/v2/directions/wheelchair?start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;
        const response = await orsApi.get(url);
        
        const polylineCoords = response.data.features[0].geometry.coordinates;
        
        const polylineCoordsFormatted = polylineCoords.map(([longitude, latitude]: [number, number]) => ({
            longitude, latitude
        }));
        console.log("polylineCoordsFormatted: ", polylineCoordsFormatted);
        return polylineCoordsFormatted
    } catch (error) {
        console.error("Error fetching route", error);
    }
}

