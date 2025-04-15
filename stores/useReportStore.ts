import { create } from 'zustand';
import { LatLng } from 'react-native-maps';

type ReportStore = {
    drawing: boolean;
    drawnPolygon: LatLng[];
    description: string;

    //Actions
    startDrawing: () => void;
    stopDrawing: () => void;
    addPoint: (point: LatLng) => void;
    removeLastPoint: () => void;
    clearPolygon: () => void;
    setDescription: (desc: string) => void;
    setDrawnPolygon: (polygon: LatLng[]) => void;
}

const useReportStore = create<ReportStore> ((set) => ({
    drawing: false,
    drawnPolygon: [],
    description: "",

    startDrawing: () => set( { drawing: true, drawnPolygon: [] }),
    stopDrawing: () => set({ drawing: false }),
    addPoint: (point) => set((state) => ({
        drawnPolygon: [...state.drawnPolygon, point],
    })),
    removeLastPoint: () => set((state) => ({
        drawnPolygon: state.drawnPolygon.slice(0, -1)
    })),
    clearPolygon: () => set({ drawnPolygon: []}),
    setDescription: (desc) => set({ description: desc }),
    setDrawnPolygon: (polygon) => set({ drawnPolygon: polygon}),
}));

export default useReportStore;