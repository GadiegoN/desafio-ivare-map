import { useState } from "react";

import { Container } from "./components/ui/container";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import { Stat } from "./components/ui/stat";
import { useUiStore } from "./store/uiStore";

import { MapView } from "./components/map/mapView";

export function App() {
  const [query, setQuery] = useState("Avenida Paulista");
  const [placeName, setPlaceName] = useState("Casa");

  const { selectedLat, selectedLng, setSelected } = useUiStore();

  const lat = "-23.550520";
  const lng = "-46.633308";

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-slate-50 to-white">
      <Container className="space-y-4">
        <Card
          title="Mapa de Locais"
          subtitle="Preview (cores, cards, inputs e botões)."
          right={
            <Button variant="ghost" onClick={() => alert("Ação do header")}>
              Ajuda
            </Button>
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => alert("Primary")}>Primary</Button>
            <Button variant="secondary" onClick={() => alert("Secondary")}>
              Secondary
            </Button>
            <Button variant="danger" onClick={() => alert("Danger")}>
              Danger
            </Button>
            <Button variant="ghost" onClick={() => alert("Ghost")}>
              Ghost
            </Button>
            <Button loading onClick={() => {}}>
              Loading
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Card
              title="Buscar endereço/local"
              subtitle="Geocoding (React Query)."
            >
              <div className="space-y-3">
                <Field
                  label="Buscar"
                  hint="Digite pelo menos 3 caracteres para buscar."
                >
                  <Input
                    value={query}
                    onChange={setQuery}
                    placeholder="Ex: Centro, São Paulo"
                  />
                </Field>

                <div className="flex gap-2">
                  <Button onClick={() => alert(`Buscar: ${query}`)}>
                    Buscar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setQuery("")}
                    disabled={!query}
                  >
                    Limpar
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Resultados (fake)
                  </div>

                  <button
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs hover:bg-slate-50"
                    onClick={() => alert("Selecionou resultado 1")}
                  >
                    Avenida Paulista, São Paulo - SP
                  </button>

                  <button
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs hover:bg-slate-50"
                    onClick={() => alert("Selecionou resultado 2")}
                  >
                    Praça da Sé, São Paulo - SP
                  </button>
                </div>
              </div>
            </Card>

            <Card
              title="Salvar local"
              subtitle="Clique no mapa (depois) ou escolha um resultado para preencher lat/lng."
            >
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Stat label="Latitude" value={lat} />
                  <Stat label="Longitude" value={lng} />
                </div>

                <Field label="Nome do local" hint='Ex: "Casa", "Trabalho"'>
                  <Input
                    value={placeName}
                    onChange={setPlaceName}
                    placeholder="Nome"
                  />
                </Field>

                <Button
                  onClick={() => alert(`Salvar: ${placeName} (${lat}, ${lng})`)}
                >
                  Salvar local
                </Button>
              </div>
            </Card>

            <Card
              title="Locais salvos"
              subtitle="Lista fake só pra visualizar."
            >
              <ul className="space-y-2">
                {[
                  { name: "Casa", lat, lng },
                  { name: "Trabalho", lat: "-23.561000", lng: "-46.655000" },
                ].map((p) => (
                  <li
                    key={p.name}
                    className="rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900">
                          {p.name}
                        </div>
                        <div className="mt-1 font-mono text-xs text-slate-600">
                          {p.lat}, {p.lng}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => alert(`Centralizar em: ${p.name}`)}
                      >
                        Ver no mapa
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card title="Mapa" subtitle="Placeholder.">
            <div className="space-y-2">
              <MapView />
              <div className="px-1 text-xs text-slate-600">
                (Clique para selecionar coordenadas)
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => setSelected(-18.9146, -48.2754)}
                >
                  Testar Zustand
                </button>

                <div>
                  Lat: {selectedLat ?? "-"} | Lng: {selectedLng ?? "-"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
