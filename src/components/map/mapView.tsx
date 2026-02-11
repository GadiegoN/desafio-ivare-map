import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useUiStore } from "../../store/uiStore";
import { MapController } from "./mapController";

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

export function MapView() {
  const { selectedLat, selectedLng } = useUiStore();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200/70 px-4 py-3 text-sm font-semibold text-slate-900">
        Mapa
      </div>

      <div className="h-105">
        <MapContainer center={UBERLANDIA} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapController />
          <ClickHandler />

          {selectedLat && selectedLng && (
            <Marker position={[selectedLat, selectedLng]} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
