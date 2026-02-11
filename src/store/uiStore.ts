import { create } from "zustand";

type UiState = {
  selectedLat: number | null;
  selectedLng: number | null;
  draftName: string;

  setSelected: (lat: number, lng: number) => void;
  setDraftName: (name: string) => void;
  clearDraft: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  selectedLat: null,
  selectedLng: null,
  draftName: "",

  setSelected: (lat, lng) =>
    set({
      selectedLat: lat,
      selectedLng: lng,
    }),

  setDraftName: (name) =>
    set({
      draftName: name,
    }),

  clearDraft: () =>
    set({
      draftName: "",
    }),
}));
