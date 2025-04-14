import { LatLng } from "react-native-maps";
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, DocumentData } from 'firebase/firestore';


export const listenToAvoidancePolygons = (
    onUpdate: (polygons: LatLng[][]) => void
) => {
    const q = query(collection(db, 'avoidancePolygons'));

    return onSnapshot(q, (snapshot) => {
        const polygons: LatLng[][] = [];
        snapshot.forEach((doc: DocumentData) => {
            const data = doc.data();
            if (data.coordinates) {
                polygons.push(data.coordinates);
            }
        });
        onUpdate(polygons);
    });
};


