import { useState } from 'react';
import { stations } from '../data/stations';
import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';

export default function NearbyStations() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedStation } = useStationStore();

  // 거리 계산 함수 (km)
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 위치 가져오기
  const getLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('위치 서비스를 지원하지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
        setIsOpen(true);
      },
      () => {
        setError('위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
        setLoading(false);
      }
    );
  };

  // 가까운 역 찾기
  const nearbyStations = userLocation
    ? stations
        .filter(s => s.lat && s.lng)
        .map(s => ({
          ...s,
          distance: getDistance(userLocation.lat, userLocation.lng, s.lat!, s.lng!)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
    : [];

  const handleSelect = (station: typeof stations[0]) => {
    setSelectedStation(station);
    setIsOpen(false);
  };

  return (
    <>
      {/* 내 위치 버튼 */}
      <button
        onClick={getLocation}
        disabled={loading}
        className="absolute bottom-24 right-4 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>

      {/* 에러 메시지 */}
      {error && (
        <div className="absolute bottom-40 right-4 z-20 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 가까운 역 목록 */}
      {isOpen && nearbyStations.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-40 animate-slide-up">
          <div className="flex justify-center py-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <div className="px-4 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold">📍 내 주변 역</h3>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 pb-4 space-y-2">
            {nearbyStations.map((station, idx) => (
              <button
                key={station.id}
                onClick={() => handleSelect(station)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${idx === 0 ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  {idx + 1}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{station.name}</div>
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
                <div className="text-right">
                  <div className="text-blue-500 font-bold">
                    {station.distance < 1 
                      ? `${Math.round(station.distance * 1000)}m` 
                      : `${station.distance.toFixed(1)}km`}
                  </div>
                  <div className="text-xs text-gray-400">
                    도보 {Math.round(station.distance * 1000 / 80)}분
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}