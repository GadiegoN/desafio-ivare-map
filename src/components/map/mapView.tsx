import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useUiStore } from "../../store/uiStore";
import { MapController } from "./mapController";
import { useQuery } from "@tanstack/react-query";
import { listPlaces } from "../../lib/placesStorage";
import type { SavedPlace } from "../../types";

const UBERLANDIA: LatLngExpression = [-18.9146, -48.2754];

function ClickHandler() {
  const setSelected = useUiStore((s) => s.setSelected);

  useMapEvents({
    click(e) {
      setSelected(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const savedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function MapView() {
  const { selectedLat, selectedLng } = useUiStore();

  const placesQuery = useQuery<SavedPlace[]>({
    queryKey: ["places"],
    queryFn: async () => listPlaces(),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-105">
        <MapContainer center={UBERLANDIA} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapController />
          <ClickHandler />

          {selectedLat && selectedLng && (
            <Marker position={[selectedLat, selectedLng]} icon={selectedIcon} />
          )}

          {placesQuery.data?.map((p) => (
            <Marker
              key={p.id}
              position={[p.latitude, p.longitude]}
              icon={savedIcon}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
