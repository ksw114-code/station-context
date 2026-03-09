import { useState } from 'react';
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
    setTimeOption
  } = useStationStore();

  const [showTimePicker, setShowTimePicker] = useState(false);

  if (!departureStation && !arrivalStation) return null;

  const handleShowDetail = () => {
    if (departureStation && arrivalStation) {
      setRouteMode(true);
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
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

      {/* 시간 선택 */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">출발 시간</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeOption('now')}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                timeOption === 'now' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 border'
              }`}
            >
              지금
            </button>
            <button
              onClick={() => {
                setTimeOption('custom');
                setShowTimePicker(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                timeOption === 'custom' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 border'
              }`}
            >
              시간 설정
            </button>
          </div>
        </div>

        {/* 선택된 시간 표시 */}
        {timeOption === 'custom' && (
          <div className="mt-3 flex items-center gap-3">
            <input
              type="date"
              value={departureTime.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <input
              type="time"
              value={formatTime(departureTime)}
              onChange={handleTimeChange}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        )}

        {/* 현재 선택된 시간 표시 */}
        <div className="mt-2 text-sm text-gray-500">
          {timeOption === 'now' ? (
            <span>현재 시간 기준 검색</span>
          ) : (
            <span>{formatDate(departureTime)} {formatTime(departureTime)} 출발</span>
          )}
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