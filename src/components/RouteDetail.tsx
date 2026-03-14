import { useState, useEffect } from 'react';
import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';

interface SubPath {
  trafficType: number;
  sectionTime: number;
  stationCount: number;
  startName: string;
  endName: string;
  lane?: { name: string; subwayCode: number }[];
  passStopList?: { stations: { stationName: string }[] };
}

interface RouteInfo {
  totalTime: number;
  transferCount: number;
  subPath: SubPath[];
}

export default function RouteDetail() {
  const { departureStation, arrivalStation, isRouteMode, clearRoute, setRouteMode, departureTime, setDepartureTime, timeOption, setTimeOption } = useStationStore();
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isRouteMode && departureStation?.lat && arrivalStation?.lat) {
      fetchRoute();
    }
  }, [isRouteMode, departureStation, arrivalStation]);

  const fetchRoute = async () => {
    if (!departureStation?.lat || !arrivalStation?.lat) {
      setError('출발역 또는 도착역의 좌표 정보가 없습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_ODSAY_API_KEY;
      const searchTime = timeOption === 'now' ? new Date() : departureTime;
      const searchDate = searchTime.toISOString().split('T')[0].replace(/-/g, '');
      const searchHour = searchTime.getHours().toString().padStart(2, '0');
      const searchMin = searchTime.getMinutes().toString().padStart(2, '0');
      const searchTimeStr = searchHour + searchMin;

      const url = 'https://api.odsay.com/v1/api/searchPubTransPathT?SX=' + departureStation.lng + '&SY=' + departureStation.lat + '&EX=' + arrivalStation.lng + '&EY=' + arrivalStation.lat + '&SearchDate=' + searchDate + '&SearchTime=' + searchTimeStr + '&apiKey=' + apiKey;

      const response = await fetch(url);
      const data = await response.json();

      if (data.result?.path) {
        const pathList: RouteInfo[] = data.result.path.map((path: any) => {
          const busCount = path.info.busTransitCount || 0;
          const subwayCount = path.info.subwayTransitCount || 0;
          return {
            totalTime: path.info.totalTime,
            transferCount: busCount + subwayCount - 1,
            subPath: path.subPath.filter((sp: any) => sp.trafficType !== 3)
          };
        });
        setRoutes(pathList);
      } else {
        setError('경로를 찾을 수 없습니다.');
      }
    } catch {
      setError('경로 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isRouteMode || !departureStation || !arrivalStation) return null;

  const currentRoute = routes[selectedRoute];

  const getLineName = (subPath: SubPath) => {
    if (subPath.lane && subPath.lane.length > 0) {
      const code = subPath.lane[0].subwayCode;
      const lineMap: Record<number, string> = {
        1: '1호선', 2: '2호선', 3: '3호선', 4: '4호선',
        5: '5호선', 6: '6호선', 7: '7호선', 8: '8호선',
        9: '9호선', 100: '분당선', 101: '공항철도', 102: '자기부상',
        104: '경의중앙', 107: '에버라인', 108: '경춘선', 109: '신분당선',
        110: '의정부', 112: '경강선', 113: '우이신설', 114: '서해선',
        115: '김포골드', 116: '수인분당', 117: 'GTX-A'
      };
      return lineMap[code] || subPath.lane[0].name || '지하철';
    }
    return '지하철';
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
  };

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return month + '/' + day + ' (' + weekday + ')';
  };

  const displayTime = timeOption === 'now' ? new Date() : departureTime;

  const getArrivalTime = () => {
    if (!currentRoute) return null;
    const arrival = new Date(displayTime);
    arrival.setMinutes(arrival.getMinutes() + currentRoute.totalTime);
    return arrival;
  };

  const arrivalTime = getArrivalTime();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newTime = new Date(departureTime);
    newTime.setHours(hours, minutes);
    setDepartureTime(newTime);
    setTimeOption('custom');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    const newTime = new Date(departureTime);
    newTime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    setDepartureTime(newTime);
    setTimeOption('custom');
  };

  const handleApplyTime = () => {
    setShowTimePicker(false);
    fetchRoute();
  };

  const handleSetNow = () => {
    setTimeOption('now');
    setShowTimePicker(false);
    fetchRoute();
  };

  const handleShare = async () => {
    const shareText = departureStation.name + ' → ' + arrivalStation.name + '\n' +
      '소요시간: ' + currentRoute.totalTime + '분\n' +
      '출발: ' + formatDate(displayTime) + ' ' + formatTime(displayTime) + '\n' +
      '도착: ' + (arrivalTime ? formatTime(arrivalTime) : '') + '\n' +
      'STATION CONTEXT';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'STATION CONTEXT 경로',
          text: shareText
        });
      } catch {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('경로 정보가 복사되었습니다!');
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setRouteMode(false)} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">경로 상세</h1>
          <button onClick={handleShare} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        
        {/* 출발/도착역 */}
        <div className="flex items-center justify-center gap-3 text-base">
          <span className="font-medium">{departureStation.name}</span>
          <span>→</span>
          <span className="font-medium">{arrivalStation.name}</span>
        </div>

        {/* 시간 표시 */}
        <button 
          onClick={() => setShowTimePicker(true)}
          className="mt-3 mx-auto flex items-center gap-2 bg-blue-400 hover:bg-blue-300 px-4 py-2 rounded-full transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-base font-medium">
            {formatDate(displayTime)} {formatTime(displayTime)} 출발
          </span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 시간 선택 모달 */}
      {showTimePicker && (
        <div className="absolute inset-0 bg-black/50 z-60 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-5 mx-4 w-full max-w-sm">
            <h3 className="text-lg font-bold text-center mb-4">출발 시간 설정</h3>
            
            <button
              onClick={handleSetNow}
              className={`w-full py-3 mb-3 rounded-lg text-base font-medium ${timeOption === 'now' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              지금 출발
            </button>
            
            <div className="text-sm text-gray-500 text-center mb-2">또는 시간 직접 설정</div>
            
            <div className="flex gap-2 mb-4">
              <input
                type="date"
                value={departureTime.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="flex-1 px-3 py-3 border rounded-lg text-base"
              />
              <input
                type="time"
                value={formatTime(departureTime)}
                onChange={handleTimeChange}
                className="px-3 py-3 border rounded-lg text-base"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowTimePicker(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium"
              >
                취소
              </button>
              <button
                onClick={handleApplyTime}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500">경로 검색 중...</p>
          </div>
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>{error}</p>
            <button onClick={fetchRoute} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">다시 시도</button>
          </div>
        </div>
      )}

      {/* 경로 결과 */}
      {!loading && !error && routes.length > 0 && currentRoute && (
        <>
          {/* 요약 정보 */}
          <div className="flex border-b">
            <div className="flex-1 text-center py-4 border-r">
              <div className="text-3xl font-bold text-blue-600">{currentRoute.totalTime}분</div>
              <div className="text-sm text-gray-500">소요시간</div>
            </div>
            <div className="flex-1 text-center py-4 border-r">
              <div className="text-3xl font-bold text-gray-700">{currentRoute.subPath.reduce((sum, sp) => sum + (sp.stationCount || 0), 0)}개</div>
              <div className="text-sm text-gray-500">정거장</div>
            </div>
            <div className="flex-1 text-center py-4">
              <div className="text-3xl font-bold text-orange-500">{Math.max(0, currentRoute.transferCount)}회</div>
              <div className="text-sm text-gray-500">환승</div>
            </div>
          </div>

          {/* 도착 예정 시간 */}
          {arrivalTime && (
            <div className="bg-green-50 px-4 py-3 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">🏁</span>
                <span className="text-green-800 font-medium">도착 예정</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{formatTime(arrivalTime)}</div>
                <div className="text-xs text-green-600">{formatDate(arrivalTime)}</div>
              </div>
            </div>
          )}

          {/* 경로 선택 탭 */}
          {routes.length > 1 && (
            <div className="flex gap-2 p-3 border-b overflow-x-auto">
              {routes.slice(0, 3).map((route, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRoute(idx)}
                  className={selectedRoute === idx ? 'px-4 py-2 rounded-lg text-sm whitespace-nowrap bg-blue-500 text-white' : 'px-4 py-2 rounded-lg text-sm whitespace-nowrap bg-gray-100 text-gray-600'}
                >
                  {idx === 0 ? '최단' : idx === 1 ? '최소환승' : '추천'} {route.totalTime}분
                </button>
              ))}
            </div>
          )}

          {/* 상세 경로 */}
          <div className="flex-1 overflow-auto p-4">
            {currentRoute.subPath.map((subPath, idx) => {
              const lineName = getLineName(subPath);
              const lineColor = getLineColor(lineName) || '#888';
              const isSubway = subPath.trafficType === 1;
              const isBus = subPath.trafficType === 2;
              const nextSubPath = currentRoute.subPath[idx + 1];
              const isTransfer = nextSubPath && idx < currentRoute.subPath.length - 1;

              return (
                <div key={idx}>
                  {/* 출발역/환승역 */}
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: lineColor }}></div>
                      <div className="w-1 flex-1 min-h-[60px]" style={{ backgroundColor: lineColor }}></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-base">{subPath.startName}</span>
                        {isSubway && <span className="text-xs px-2 py-0.5 rounded text-white" style={{ backgroundColor: lineColor }}>{lineName}</span>}
                        {isBus && <span className="text-xs px-2 py-0.5 rounded bg-green-500 text-white">버스</span>}
                      </div>
                      <div className="text-sm text-gray-500">{subPath.stationCount}개 역 이동 · 약 {subPath.sectionTime}분</div>
                    </div>
                  </div>

                  {/* 환승 정보 */}
                  {isTransfer && (
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <div className="w-1 flex-1 min-h-[40px] bg-orange-300"></div>
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-orange-600 font-bold text-sm">🔄 환승</span>
                            <span className="text-orange-800 font-medium">{subPath.endName}</span>
                          </div>
                          <div className="text-sm text-orange-700">
                            <span style={{ color: lineColor }}>{lineName}</span>
                            <span className="mx-2">→</span>
                            <span style={{ color: getLineColor(getLineName(nextSubPath)) || '#888' }}>{getLineName(nextSubPath)}</span>
                          </div>
                          <div className="text-xs text-orange-500 mt-1">환승 소요 약 3-5분</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 도착역 (마지막 구간만) */}
                  {idx === currentRoute.subPath.length - 1 && (
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-red-500">{subPath.endName}</span>
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">도착</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 하단 버튼 */}
      <div className="p-4 border-t">
        <button onClick={clearRoute} className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">새로운 경로 검색</button>
      </div>
    </div>
  );
}