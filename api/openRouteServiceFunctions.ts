import orsApi from './ors';
import polyline from '@mapbox/polyline';

interface SendCoords {
    longitude: number,
    latitude: number
}

interface ResponseCoords {
    longitude: number,
    latitude: number
}

/**
 * Gets the directions - simple version, no options included
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

export const getDirectionsOptions = async (
    origin: SendCoords,
    destination: SendCoords
    ) => {
    try {
        const url = 'v2/directions/wheelchair/json';
        const body = {
            "coordinates":[
                [origin.longitude, origin.latitude],
                [destination.longitude, destination.latitude]
            ],
            "options":{
                "avoid_polygons":{
                    "type": "Polygon",
                    "coordinates":[
                        [ // NOTE: make sure to draw ur polygon coords clockwise and close the loop. last point = first point
                            //This polygon blocks off the stretch of 24th along NHB till speedway.
                            [-97.73880962447286,30.287599148121558],
                            [-97.73676837823595,30.287466561128372],
                            [-97.73691740727152,30.287020053623767],
                            [-97.73891575115749,30.287195537164923],
                            [-97.73880962447286,30.287599148121558]
                        ]
                    ]
                }
            }
        };

        const response = await orsApi.post(url, body);
        const encodedPolyline = response.data.routes[0].geometry;
        const decodedPolyline = polyline.decode(encodedPolyline);
        console.log(decodedPolyline[0]);
        const formattedPolyline = decodedPolyline.map(([latitude, longitude]: [number, number]) => ({
            latitude, longitude
        }));
        console.log(formattedPolyline);
        return formattedPolyline;

    } catch (error) {
        console.error("Error fetching route", error);
    }
}

