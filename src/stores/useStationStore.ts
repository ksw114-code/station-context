import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lines: string[];
  features: CategoryType[];
  lat?: number;
  lng?: number;
}

interface RecentSearch {
  stationId: string;
  stationName: string;
  timestamp: number;
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
  departureStation: Station | null;
  arrivalStation: Station | null;
  setDepartureStation: (station: Station | null) => void;
  setArrivalStation: (station: Station | null) => void;
  swapStations: () => void;
  clearRoute: () => void;
  isRouteMode: boolean;
  setRouteMode: (isRoute: boolean) => void;
  departureTime: Date;
  setDepartureTime: (time: Date) => void;
  timeOption: 'now' | 'custom';
  setTimeOption: (option: 'now' | 'custom') => void;
  recentSearches: RecentSearch[];
  addRecentSearch: (station: Station) => void;
  clearRecentSearches: () => void;
}

export const useStationStore = create<StationState>()(
  persist(
    (set, get) => ({
      selectedStation: null,
      setSelectedStation: (station) => {
        set({ selectedStation: station });
        if (station) {
          set({ isBottomSheetOpen: true });
          get().addRecentSearch(station);
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
      departureStation: null,
      arrivalStation: null,
      setDepartureStation: (station) => {
        set({ departureStation: station, isBottomSheetOpen: false, selectedStation: null });
        if (station) {
          get().addRecentSearch(station);
          if (get().arrivalStation) {
            set({ isRouteMode: true });
          }
        }
      },
      setArrivalStation: (station) => {
        set({ arrivalStation: station, isBottomSheetOpen: false, selectedStation: null });
        if (station) {
          get().addRecentSearch(station);
          if (get().departureStation) {
            set({ isRouteMode: true });
          }
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
      departureTime: new Date(),
      setDepartureTime: (time) => set({ departureTime: time }),
      timeOption: 'now',
      setTimeOption: (option) => {
        if (option === 'now') {
          set({ timeOption: option, departureTime: new Date() });
        } else {
          set({ timeOption: option });
        }
      },
      recentSearches: [],
      addRecentSearch: (station) => {
        const recent = get().recentSearches;
        const filtered = recent.filter(r => r.stationId !== station.id);
        const newRecent: RecentSearch = {
          stationId: station.id,
          stationName: station.name,
          timestamp: Date.now()
        };
        const updated = [newRecent, ...filtered].slice(0, 10);
        set({ recentSearches: updated });
      },
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: 'station-context-storage',
      partialize: (state) => ({ 
        favorites: state.favorites,
        recentSearches: state.recentSearches
      }),
    }
  )
);