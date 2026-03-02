import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';

export default function RoutePanel() {
  const { 
    departureStation, 
    arrivalStation, 
    swapStations, 
    clearRoute,
    setRouteMode
  } = useStationStore();

  if (!departureStation && !arrivalStation) return null;

  const handleShowDetail = () => {
    if (departureStation && arrivalStation) {
      setRouteMode(true);
    }
  };

  return (
    <div className="bg-white border-b shadow-sm px-4 py-3">
      {/* 출발/도착 정보 */}
      <div className="flex items-center gap-3">
        {/* 아이콘 라인 */}
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="w-0.5 h-8 bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
        </div>

        {/* 역 정보 */}
        <div className="flex-1">
          {/* 출발역 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500 w-10">출발</span>
            {departureStation ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">{departureStation.name}</span>
                <span 
                  className="text-xs px-1.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: getLineColor(departureStation.lines[0]) }}
                >
                  {departureStation.lines[0].replace('호선', '')}
                </span>
              </div>
            ) : (
              <span className="text-gray-400">출발역을 선택하세요</span>
            )}
          </div>

          {/* 도착역 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 w-10">도착</span>
            {arrivalStation ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">{arrivalStation.name}</span>
                <span 
                  className="text-xs px-1.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: getLineColor(arrivalStation.lines[0]) }}
                >
                  {arrivalStation.lines[0].replace('호선', '')}
                </span>
              </div>
            ) : (
              <span className="text-gray-400">도착역을 선택하세요</span>
            )}
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={swapStations}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            title="출발/도착 바꾸기"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
          <button 
            onClick={clearRoute}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            title="초기화"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 경로 검색 버튼 */}
      {departureStation && arrivalStation && (
        <button 
          onClick={handleShowDetail}
          className="w-full mt-3 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          경로 검색
        </button>
      )}
    </div>
  );
}