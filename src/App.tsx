import { Container } from "./components/ui/container";
import { Card } from "./components/ui/card";

import { MapView } from "./components/map/mapView";
import { SearchBox } from "./components/search/searchBox";
import { PlacesPanel } from "./components/places/placesPanel";

export function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-slate-50 to-white">
      <Container className="space-y-4">
        <Card
          title="Mapa de Locais"
          subtitle="Selecione pontos no mapa, busque endereços e salve seus favoritos."
          right={
            <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                React
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Leaflet
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                React Query
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Zustand
              </span>
            </div>
          }
        >
          <div className="text-sm text-slate-600">
            Clique no mapa para selecionar coordenadas / Busque por endereço
            para centralizar / Salve locais personalizados com nome
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <SearchBox />

            <PlacesPanel />
          </div>

          <Card
            title="Mapa"
            subtitle="Clique no mapa para selecionar coordenadas."
          >
            <MapView />
          </Card>
        </div>
      </Container>
    </div>
  );
}
