import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUiStore } from "../../store/uiStore";
import { listPlaces, savePlace, removePlace } from "../../lib/placesStorage";
import type { SavedPlace } from "../../types";
import { Card } from "../ui/card";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Stat } from "../ui/stat";

export function PlacesPanel() {
  const qc = useQueryClient();

  const selectedLat = useUiStore((s) => s.selectedLat);
  const selectedLng = useUiStore((s) => s.selectedLng);
  const draftName = useUiStore((s) => s.draftName);
  const setDraftName = useUiStore((s) => s.setDraftName);
  const setSelected = useUiStore((s) => s.setSelected);
  const clearDraft = useUiStore((s) => s.clearDraft);

  const placesQuery = useQuery<SavedPlace[]>({
    queryKey: ["places"],
    queryFn: async () => listPlaces(),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (selectedLat == null || selectedLng == null) {
        throw new Error("Selecione um ponto no mapa.");
      }
      if (draftName.trim().length < 2) {
        throw new Error('Informe um nome (ex: "Casa").');
      }

      return savePlace({
        name: draftName,
        latitude: selectedLat,
        longitude: selectedLng,
      });
    },
    onSuccess: async () => {
      clearDraft();
      await qc.invalidateQueries({ queryKey: ["places"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      removePlace(id);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["places"] });
    },
  });

  const canSave =
    selectedLat != null && selectedLng != null && draftName.trim().length >= 2;

  return (
    <div className="space-y-4">
      <Card
        title="Salvar local"
        subtitle="Selecione no mapa (ou pela busca) e salve com um nome."
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat
              label="Latitude"
              value={selectedLat != null ? selectedLat.toFixed(6) : "-"}
            />
            <Stat
              label="Longitude"
              value={selectedLng != null ? selectedLng.toFixed(6) : "-"}
            />
          </div>

          <Field label="Nome do local" hint='Ex: "Casa", "Trabalho"'>
            <Input
              value={draftName}
              onChange={setDraftName}
              placeholder="Nome"
            />
          </Field>

          <Button
            onClick={() => saveMutation.mutate()}
            disabled={!canSave || saveMutation.isPending}
            loading={saveMutation.isPending}
          >
            Salvar local
          </Button>

          {saveMutation.isError && (
            <p className="text-xs text-red-600">
              {(saveMutation.error as Error).message}
            </p>
          )}
        </div>
      </Card>

      <Card title="Locais salvos" subtitle="Clique para centralizar no mapa.">
        {placesQuery.isLoading && (
          <p className="text-xs text-slate-600">Carregando...</p>
        )}

        {placesQuery.data && placesQuery.data.length === 0 && (
          <p className="text-xs text-slate-600">Nenhum local salvo ainda.</p>
        )}

        {placesQuery.data && placesQuery.data.length > 0 && (
          <ul className="space-y-2">
            {placesQuery.data.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      {p.name}
                    </div>
                    <div className="mt-1 font-mono text-xs text-slate-600">
                      {p.latitude.toFixed(6)}, {p.longitude.toFixed(6)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(p.latitude, p.longitude)}
                    >
                      Ver no mapa
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      loading={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(p.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
