import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';
import { getCategoryById } from '../data/categories';
import { getStationDetails } from '../data/stationDetails';

export default function BottomSheet() {
  const { 
    selectedStation, 
    isBottomSheetOpen, 
    closeBottomSheet, 
    isFavorite, 
    toggleFavorite,
    setDepartureStation,
    setArrivalStation
  } = useStationStore();

  if (!isBottomSheetOpen || !selectedStation) return null;

  const details = getStationDetails(selectedStation.id);
  const stationIsFavorite = isFavorite(selectedStation.id);

  const handleDeparture = () => {
    setDepartureStation(selectedStation);
  };

  const handleArrival = () => {
    setArrivalStation(selectedStation);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-30 max-h-[70vh] flex flex-col animate-slide-up">
      <div className="flex justify-center py-2">
        <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
      </div>
      <div className="px-4 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">{selectedStation.name}</h2>
            <div className="flex gap-1">
              {selectedStation.lines.map((line) => (
                <span
                  key={line}
                  className="text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getLineColor(line) }}
                >
                  {line.replace('호선', '')}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleFavorite(selectedStation.id)} className="p-2">
              <svg
                className={`w-6 h-6 ${stationIsFavorite ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={stationIsFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
            <button onClick={closeBottomSheet} className="p-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button 
            onClick={handleDeparture}
            className="flex-1 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            출발
          </button>
          <button 
            onClick={handleArrival}
            className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
          >
            도착
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {selectedStation.features.length > 0 && details ? (
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-3">역 주변 정보</div>
            <div className="space-y-3">
              {Object.entries(details).map(([category, items]) => {
                const cat = getCategoryById(category);
                return (
                  <div key={category} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{cat?.icon}</span>
                      <span className="font-semibold text-gray-700">{cat?.name}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            item.highlight ? 'bg-blue-50 border border-blue-200' : 'bg-white'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-gray-800">{item.name}</div>
                            <div className={`text-sm ${item.highlight ? 'text-blue-600' : 'text-gray-500'}`}>
                              {item.desc}
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg">보기</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>이 역에는 등록된 주변 정보가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}