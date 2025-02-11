import orsApi from './ors'

interface SendCoords {
    longitude: number,
    latitude: number
}

interface ResponseCoords {
    longitude: number,
    latitude: number
}

export const getDirections = async (
    origin: SendCoords,
    destination: SendCoords) => { //: Promise<ResponseCoords[]>
    try {
        const url = `/v2/directions/wheelchair?start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;
        const response = await orsApi.get(url);
        
        const polylineCoords = response.data.features[0].geometry.coordinates;
        const finalReturnCoords = polylineCoords.map(([longitude, latitude]: [number, number]) => ({
            longitude, latitude
        }));
        console.log(finalReturnCoords);
        return response
    } catch (error) {
        console.error("Error fetching route", error);
    }
}

