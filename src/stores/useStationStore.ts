import { create } from 'zustand';

type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lines: string[];
  features: CategoryType[];
}

interface StationState {
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType | null) => void;
  favorites: string[];
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isBottomSheetOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  
  // 경로 탐색
  departureStation: Station | null;
  arrivalStation: Station | null;
  setDepartureStation: (station: Station | null) => void;
  setArrivalStation: (station: Station | null) => void;
  swapStations: () => void;
  clearRoute: () => void;
  isRouteMode: boolean;
  setRouteMode: (isRoute: boolean) => void;
}

export const useStationStore = create<StationState>((set, get) => ({
  selectedStation: null,
  setSelectedStation: (station) => {
    set({ selectedStation: station });
    if (station) {
      set({ isBottomSheetOpen: true });
    }
  },
  selectedCategory: null,
  setSelectedCategory: (category) => {
    const current = get().selectedCategory;
    set({ selectedCategory: current === category ? null : category });
  },
  favorites: [],
  toggleFavorite: (stationId) => {
    const favorites = get().favorites;
    if (favorites.includes(stationId)) {
      set({ favorites: favorites.filter(id => id !== stationId) });
    } else {
      set({ favorites: [...favorites, stationId] });
    }
  },
  isFavorite: (stationId) => {
    return get().favorites.includes(stationId);
  },
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isBottomSheetOpen: false,
  openBottomSheet: () => set({ isBottomSheetOpen: true }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false, selectedStation: null }),

  // 경로 탐색
  departureStation: null,
  arrivalStation: null,
  setDepartureStation: (station) => {
    set({ departureStation: station, isBottomSheetOpen: false, selectedStation: null });
    if (station && get().arrivalStation) {
      set({ isRouteMode: true });
    }
  },
  setArrivalStation: (station) => {
    set({ arrivalStation: station, isBottomSheetOpen: false, selectedStation: null });
    if (station && get().departureStation) {
      set({ isRouteMode: true });
    }
  },
  swapStations: () => {
    const { departureStation, arrivalStation } = get();
    set({ departureStation: arrivalStation, arrivalStation: departureStation });
  },
  clearRoute: () => {
    set({ departureStation: null, arrivalStation: null, isRouteMode: false });
  },
  isRouteMode: false,
  setRouteMode: (isRoute) => set({ isRouteMode: isRoute }),
}));