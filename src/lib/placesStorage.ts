import type { SavedPlace } from "../types";

const KEY = "saved_places_v1";

function read(): SavedPlace[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedPlace[];
  } catch {
    return [];
  }
}

function write(items: SavedPlace[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listPlaces(): SavedPlace[] {
  return read().sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));
}

export function savePlace(input: {
  name: string;
  latitude: number;
  longitude: number;
}): SavedPlace {
  const item: SavedPlace = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    latitude: input.latitude,
    longitude: input.longitude,
    createdAtISO: new Date().toISOString(),
  };

  const items = read();
  items.unshift(item);
  write(items);

  return item;
}
