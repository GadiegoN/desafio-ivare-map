import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { geocode } from "../../lib/geocoding";
import { useUiStore } from "../../store/uiStore";
import { Card } from "../ui/card";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchBox() {
  const [q, setQ] = useState("");
  const setSelected = useUiStore((s) => s.setSelected);

  const query = useQuery({
    queryKey: ["geocode", q],
    queryFn: () => geocode(q),
    enabled: q.trim().length >= 3,
  });

  return (
    <Card
      title="Buscar endereço/local"
      subtitle="Digite pelo menos 3 caracteres e selecione um resultado."
    >
      <div className="space-y-3">
        <Field label="Buscar" hint="Ex: Terminal Central Uberlândia">
          <Input value={q} onChange={setQ} placeholder="Buscar..." />
        </Field>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setQ("")}
            disabled={q.length === 0}
          >
            Limpar
          </Button>
        </div>

        {query.isFetching && (
          <p className="text-xs text-slate-600">Buscando...</p>
        )}

        {query.isError && (
          <p className="text-xs text-red-600">
            Erro: {(query.error as Error).message}
          </p>
        )}

        {query.data && query.data.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              Resultados
            </div>

            {query.data.map((r) => (
              <button
                key={`${r.lat}-${r.lon}-${r.display_name}`}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs hover:bg-slate-50"
                onClick={() => setSelected(Number(r.lat), Number(r.lon))}
              >
                {r.display_name}
              </button>
            ))}
          </div>
        )}

        {query.data &&
          query.data.length === 0 &&
          q.trim().length >= 3 &&
          !query.isFetching && (
            <p className="text-xs text-slate-600">Nenhum resultado.</p>
          )}
      </div>
    </Card>
  );
}
