import useReportStore from "@/stores/useReportStore";
import useMapStore from "@/stores/useMapStore";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { router } from "expo-router";
import { processDrawnPolygon } from "@/utils/processPolygon";



const ReportOverlay: React.FC = () => {
    const { 
        drawing,
        drawnPolygon,
        stopDrawing, 
        addPoint, 
        removeLastPoint, 
        clearPolygon, 
        setDescription,
        setDrawnPolygon,
    } = useReportStore();

    const {
        mapCenter,        
    } = useMapStore();

    const handleSubmit = async () => {
        // make sure drawnPolygon has at least 3 points

        //have turf js process the polygon to close the polygon,
        //ensure there are no kinks or cross, other validation.
        //merge last points if need be. maybe ask for four min, 
        //if they are within certain distance, merge them?

        // try submitting: clear polygon and stopDrawing if so
        // throw error otherwise
    }

    return (
        <View style={styles.overlayContainer}>

            <View style={styles.topRightGroup}>
                <TouchableOpacity style={styles.smallFAB}>
                    <MaterialIcons name="question-mark" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallFAB} onPress={() => {stopDrawing(); console.log("out of drawing")}}>
                    <MaterialIcons name="exit-to-app" size={24} color="white"/>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomCenterGroup}>
                <TouchableOpacity 
                    style={styles.largeFAB}
                    onPress={() => {
                        if (drawnPolygon.length > 0) {
                            removeLastPoint();
                        } else {
                            console.warn("removing last point when drawnPoly is empty");
                        }
                    }}
                >
                    <MaterialCommunityIcons name="eraser" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.largeFAB} 
                    onPress={() => {
                        if (mapCenter) {
                            addPoint(mapCenter);
                            console.log("drawn polygon", drawnPolygon);
                        } else {
                            console.warn("map center is null when trying to add point")
                        }
                    }}
                >
                    <MaterialIcons name="add" size={30} color="white"/>
                </TouchableOpacity>
            </View>

            <View style={styles.cornerFABs}>
                <TouchableOpacity style={styles.smallFAB}>
                    <MaterialCommunityIcons name="restart" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.smallFAB}
                    onPress={() => {
                        const { cleaned, error } = processDrawnPolygon(drawnPolygon);
                        if (error) {
                            console.warn('polygon invalid');
                        } else {
                            console.log('old polygon: ', drawnPolygon)
                            setDrawnPolygon(cleaned);
                            
                            router.push("/ReportSubmitScreen");
                            console.log("new polygon", drawnPolygon);
                        }
                    }}
                >
                    <MaterialIcons name="check" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.centerMarker}/>
            
        </View>
    );

}

export default ReportOverlay;

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        padding: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        zIndex: 999,
        pointerEvents: 'box-none',
    }, 
    topRightGroup: {
        position: 'absolute',
        top: 40,
        right: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 120, // space for 2 FABs with spacing
        pointerEvents: 'box-none',
    },
    bottomCenterGroup: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12%', // space between large FABs
        pointerEvents: 'box-none',
    },
    cornerFABs: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 0, 
        bottom: 30,
        justifyContent: 'space-between'
    },
    smallFAB: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    largeFAB: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerMarker: {
        position: 'absolute',
        top: '50%', // assuming 24x24 icon
        left: '50%',
        width: 20,
        height: 20,
        //maybe needed to adjust if it seems off center
        transform: [
            {translateX: +1},
            {translateY: +6},
        ],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.25)',
        borderRadius: 12,
        borderWidth: 2,
        zIndex: 1000,
    },

});