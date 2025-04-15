import React from 'react';
import useReportStore from '@/stores/useReportStore';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const ReportSubmitScreen: React.FC = () => {
    const {
        drawnPolygon,
        description, 
        setDescription,
    } = useReportStore();


    return (
        <View style={styles.modalContainer}>
            <Text>This is the report submission form</Text>
            <TouchableOpacity style={styles.submitButton} onPress={() => console.log(drawnPolygon)}>
                <Text style={{color: "white"}}>Submit</Text>
            </TouchableOpacity>
        </View>
    );


};

export default ReportSubmitScreen;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 30,
        justifyContent: 'space-between'
    },
    submitButton: {
        backgroundColor: '#333',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 100, // full pill-style
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%', // most of the horizontal space
        alignSelf: 'center', // centers it within parent,
    },
});