export type GeoResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export async function geocode(query: string): Promise<GeoResult[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=5&q=" +
    encodeURIComponent(q);

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding HTTP ${res.status}`);
  }

  return (await res.json()) as GeoResult[];
}
