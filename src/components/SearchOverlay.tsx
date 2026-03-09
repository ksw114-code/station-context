import { useState } from 'react';
import { stations } from '../data/stations';
import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';
import { getCategoryById } from '../data/categories';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [selectMode, setSelectMode] = useState<'info' | 'departure' | 'arrival'>('info');
  const { favorites, setSelectedStation, setDepartureStation, setArrivalStation, departureStation, arrivalStation } = useStationStore();

  if (!isOpen) return null;

  const filteredStations = query
    ? stations.filter(s => s.name.includes(query))
    : [];

  const favoriteStations = stations.filter(s => favorites.includes(s.id));

  const handleSelect = (stationId: string) => {
    const station = stations.find(s => s.id === stationId);
    if (station) {
      if (selectMode === 'departure') {
        setDepartureStation(station);
      } else if (selectMode === 'arrival') {
        setArrivalStation(station);
      } else {
        setSelectedStation(station);
      }
      onClose();
      setQuery('');
      setSelectMode('info');
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-40 flex flex-col">
      {/* 헤더 */}
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <button onClick={() => { onClose(); setSelectMode('info'); }}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="역명 검색"
          autoFocus
          className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 선택 모드 버튼 */}
      <div className="px-4 py-2 border-b flex gap-2">
        <button
          onClick={() => setSelectMode('info')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectMode === 'info' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          역 정보
        </button>
        <button
          onClick={() => setSelectMode('departure')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectMode === 'departure' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          출발역 {departureStation && `(${departureStation.name})`}
        </button>
        <button
          onClick={() => setSelectMode('arrival')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectMode === 'arrival' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          도착역 {arrivalStation && `(${arrivalStation.name})`}
        </button>
      </div>

      {/* 검색 결과 / 즐겨찾기 */}
      <div className="flex-1 overflow-auto p-4">
        {query ? (
          <>
            <div className="text-xs text-gray-400 mb-2">검색 결과</div>
            {filteredStations.length > 0 ? (
              filteredStations.map(station => (
                <button
                  key={station.id}
                  onClick={() => handleSelect(station.id)}
                  className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div className="flex-1 text-left">
                    <div className="text-gray-800">{station.name}</div>
                    <div className="flex gap-1 mt-1">
                      {station.lines.map(line => (
                        <span
                          key={line}
                          className="text-xs px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: getLineColor(line) }}
                        >
                          {line.replace('호선', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {station.features.slice(0, 3).map(f => (
                      <span key={f} className="text-sm">{getCategoryById(f)?.icon}</span>
                    ))}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                검색 결과가 없습니다
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-xs text-gray-400 mb-2">즐겨찾기</div>
            {favoriteStations.length > 0 ? (
              favoriteStations.map(station => (
                <button
                  key={station.id}
                  onClick={() => handleSelect(station.id)}
                  className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
                >
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div className="flex-1 text-left">
                    <div className="text-gray-800">{station.name}</div>
                    <div className="flex gap-1 mt-1">
                      {station.lines.map(line => (
                        <span
                          key={line}
                          className="text-xs px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: getLineColor(line) }}
                        >
                          {line.replace('호선', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>즐겨찾기한 역이 없습니다</p>
                <p className="text-sm mt-1">역을 선택하고 ⭐ 버튼을 눌러보세요</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}