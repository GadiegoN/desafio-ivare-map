import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useUiStore } from "../../store/uiStore";

export function MapController() {
  const map = useMap();
  const { selectedLat, selectedLng } = useUiStore();

  useEffect(() => {
    if (selectedLat == null || selectedLng == null) return;

    map.setView([selectedLat, selectedLng], map.getZoom(), {
      animate: true,
    });
  }, [map, selectedLat, selectedLng]);

  return null;
}
