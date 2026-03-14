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
  const { 
    favorites, 
    setSelectedStation, 
    setDepartureStation, 
    setArrivalStation, 
    departureStation, 
    arrivalStation,
    recentSearches,
    clearRecentSearches
  } = useStationStore();

  if (!isOpen) return null;

  const filteredStations = query
    ? stations.filter(s => s.name.includes(query))
    : [];

  const favoriteStations = stations.filter(s => favorites.includes(s.id));
  const recentStations = recentSearches
    .map(r => stations.find(s => s.id === r.stationId))
    .filter(Boolean);

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

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return minutes + '분 전';
    if (hours < 24) return hours + '시간 전';
    return days + '일 전';
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
          출발 {departureStation && '✓'}
        </button>
        <button
          onClick={() => setSelectMode('arrival')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectMode === 'arrival' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          도착 {arrivalStation && '✓'}
        </button>
      </div>

      {/* 검색 결과 / 최근 검색 / 즐겨찾기 */}
      <div className="flex-1 overflow-auto">
        {query ? (
          /* 검색 결과 */
          <div className="p-4">
            <div className="text-sm font-medium text-gray-600 mb-3">검색 결과</div>
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
          </div>
        ) : (
          /* 최근 검색 + 즐겨찾기 */
          <>
            {/* 최근 검색 섹션 */}
            {recentStations.length > 0 && (
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-base font-bold text-gray-700 flex items-center gap-2">
                    <span>🕐</span> 최근 검색
                  </div>
                  <button 
                    onClick={clearRecentSearches}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    전체 삭제
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm">
                  {recentStations.map((station, idx) => {
                    if (!station) return null;
                    const recentInfo = recentSearches[idx];
                    return (
                      <button
                        key={station.id + '-' + idx}
                        onClick={() => handleSelect(station.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{station.name}</span>
                            <span className="text-xs text-gray-400">{formatTimeAgo(recentInfo.timestamp)}</span>
                          </div>
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* 구분선 */}
            {recentStations.length > 0 && favoriteStations.length > 0 && (
  <div className="h-6 bg-gray-100 border-t border-b border-gray-200 flex items-center justify-center">
    <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
  </div>
)}

            {/* 즐겨찾기 섹션 */}
            <div className="p-4">
              <div className="text-base font-bold text-gray-700 flex items-center gap-2 mb-3">
                <span>⭐</span> 즐겨찾기
              </div>
              {favoriteStations.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm border">
                  {favoriteStations.map(station => (
                    <button
                      key={station.id}
                      onClick={() => handleSelect(station.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <div className="flex-1 text-left">
                        <div className="text-gray-800 font-medium">{station.name}</div>
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                  <p className="text-base">즐겨찾기한 역이 없습니다</p>
                  <p className="text-sm mt-2">역을 선택하고 ⭐ 버튼을 눌러보세요</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}