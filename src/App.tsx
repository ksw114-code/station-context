import { useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SubwayMap from './components/SubwayMap';
import BottomSheet from './components/BottomSheet';
import SearchOverlay from './components/SearchOverlay';
import RoutePanel from './components/RoutePanel';
import RouteDetail from './components/RouteDetail';
import { useStationStore } from './stores/useStationStore';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const { isRouteMode } = useStationStore();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative">
      <Header onSearchClick={() => setShowSearch(true)} />
      <RoutePanel />
      <CategoryFilter />
      <SubwayMap />
      <BottomSheet />
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
      {isRouteMode && <RouteDetail />}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}