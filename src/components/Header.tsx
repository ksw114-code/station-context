import { useStationStore } from '../stores/useStationStore';
import { stations } from '../data/stations';

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const { favorites } = useStationStore();
  const favoriteStations = stations.filter(s => favorites.includes(s.id));

  return (
    <header className="bg-white shadow-sm z-30 relative">
      {/* 상단 검색바 */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <button
          onClick={onSearchClick}
          className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-left text-gray-500 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          역명 검색
        </button>
      </div>

      {/* 즐겨찾기 바로가기 */}
      {favoriteStations.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-gray-400 flex-shrink-0">⭐ 즐겨찾기</span>
            {favoriteStations.slice(0, 5).map(station => (
              <button
                key={station.id}
                onClick={onSearchClick}
                className="px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-xs text-yellow-700 whitespace-nowrap"
              >
                {station.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}