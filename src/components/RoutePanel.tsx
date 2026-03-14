import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';

export default function RoutePanel() {
  const { 
    departureStation, 
    arrivalStation, 
    swapStations, 
    clearRoute,
    setRouteMode,
    departureTime,
    setDepartureTime,
    timeOption,
    setTimeOption,
    isFavorite,
    toggleFavorite
  } = useStationStore();

  
  if (!departureStation && !arrivalStation) return null;

  const handleShowDetail = () => {
    if (departureStation && arrivalStation) {
      setRouteMode(true);
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newTime = new Date(departureTime);
    newTime.setHours(hours, minutes);
    setDepartureTime(newTime);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    const newTime = new Date(departureTime);
    newTime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    setDepartureTime(newTime);
  };

  return (
    <div className="bg-white border-b shadow-sm">
      {/* 출발/도착 정보 */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* 출발/도착 아이콘 */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          </div>

          {/* 역 정보 */}
          <div className="flex-1 min-w-0">
            {/* 출발역 */}
            <div className="flex items-center gap-2 mb-1">
              {departureStation ? (
                <>
                  <span className="font-medium truncate">{departureStation.name}</span>
                  <span 
                    className="text-xs px-1.5 py-0.5 rounded text-white flex-shrink-0"
                    style={{ backgroundColor: getLineColor(departureStation.lines[0]) }}
                  >
                    {departureStation.lines[0].replace('호선', '')}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(departureStation.id)}
                    className="flex-shrink-0"
                  >
                    <svg 
                      className={`w-4 h-4 ${isFavorite(departureStation.id) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={isFavorite(departureStation.id) ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm">출발역 선택</span>
              )}
            </div>

            {/* 도착역 */}
            <div className="flex items-center gap-2">
              {arrivalStation ? (
                <>
                  <span className="font-medium truncate">{arrivalStation.name}</span>
                  <span 
                    className="text-xs px-1.5 py-0.5 rounded text-white flex-shrink-0"
                    style={{ backgroundColor: getLineColor(arrivalStation.lines[0]) }}
                  >
                    {arrivalStation.lines[0].replace('호선', '')}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(arrivalStation.id)}
                    className="flex-shrink-0"
                  >
                    <svg 
                      className={`w-4 h-4 ${isFavorite(arrivalStation.id) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={isFavorite(arrivalStation.id) ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm">도착역 선택</span>
              )}
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex items-center gap-1">
            <button 
              onClick={swapStations}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <button 
              onClick={clearRoute}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 시간 선택 - 간결하게 */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <button
          onClick={() => setTimeOption('now')}
          className={`px-3 py-1 rounded-full text-xs ${timeOption === 'now' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          지금 출발
        </button>
        <button
          onClick={() => setTimeOption('custom')}
          className={`px-3 py-1 rounded-full text-xs ${timeOption === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          시간 설정
        </button>
        {timeOption === 'custom' && (
          <>
            <input
              type="date"
              value={departureTime.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="px-2 py-1 border rounded text-xs"
            />
            <input
              type="time"
              value={formatTime(departureTime)}
              onChange={handleTimeChange}
              className="px-2 py-1 border rounded text-xs"
            />
          </>
        )}
      </div>

      {/* 경로 검색 버튼 */}
      {departureStation && arrivalStation && (
        <div className="px-4 pb-3">
          <button 
            onClick={handleShowDetail}
            className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition"
          >
            경로 검색
          </button>
        </div>
      )}
    </div>
  );
}