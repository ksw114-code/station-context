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
}

interface RouteInfo {
  totalTime: number;
  transferCount: number;
  subPath: SubPath[];
}

export default function RouteDetail() {
  const { departureStation, arrivalStation, isRouteMode, clearRoute, setRouteMode, departureTime, timeOption } = useStationStore();
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isRouteMode && departureStation?.lat && arrivalStation?.lat) {
      fetchRoute();
    }
  }, [isRouteMode, departureStation, arrivalStation, departureTime]);

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
    } catch (err) {
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

  const formatDateTime = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return month + '/' + day + ' ' + hours + ':' + minutes;
  };

  const displayTime = timeOption === 'now' ? new Date() : departureTime;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      <div className="bg-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setRouteMode(false)} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">경로 상세</h1>
          <div className="w-6"></div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{departureStation.name}</span>
          <span>→</span>
          <span>{arrivalStation.name}</span>
        </div>
        <div className="mt-2 text-xs text-blue-100 text-center">
          🕐 {formatDateTime(displayTime)} 출발 기준
        </div>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500">경로 검색 중...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>{error}</p>
            <button onClick={fetchRoute} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">다시 시도</button>
          </div>
        </div>
      )}

      {!loading && !error && routes.length > 0 && currentRoute && (
        <>
          <div className="flex border-b">
            <div className="flex-1 text-center py-3 border-r">
              <div className="text-2xl font-bold text-blue-600">{currentRoute.totalTime}분</div>
              <div className="text-xs text-gray-500">소요시간</div>
            </div>
            <div className="flex-1 text-center py-3 border-r">
              <div className="text-2xl font-bold text-gray-700">{currentRoute.subPath.reduce((sum, sp) => sum + (sp.stationCount || 0), 0)}개</div>
              <div className="text-xs text-gray-500">정거장</div>
            </div>
            <div className="flex-1 text-center py-3">
              <div className="text-2xl font-bold text-orange-500">{Math.max(0, currentRoute.transferCount)}회</div>
              <div className="text-xs text-gray-500">환승</div>
            </div>
          </div>

          {routes.length > 1 && (
            <div className="flex gap-2 p-2 border-b overflow-x-auto">
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

          <div className="flex-1 overflow-auto p-4">
            {currentRoute.subPath.map((subPath, idx) => {
              const lineName = getLineName(subPath);
              const lineColor = getLineColor(lineName) || '#888';
              const isSubway = subPath.trafficType === 1;
              const isBus = subPath.trafficType === 2;

              return (
                <div key={idx} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: lineColor }}></div>
                    <div className="w-1 flex-1 min-h-[60px]" style={{ backgroundColor: lineColor }}></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{subPath.startName}</span>
                      {isSubway && <span className="text-xs px-2 py-0.5 rounded text-white" style={{ backgroundColor: lineColor }}>{lineName}</span>}
                      {isBus && <span className="text-xs px-2 py-0.5 rounded bg-green-500 text-white">버스</span>}
                    </div>
                    <div className="text-sm text-gray-500">{subPath.stationCount}개 역 이동 · 약 {subPath.sectionTime}분</div>
                    {idx === currentRoute.subPath.length - 1 && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: lineColor }}></div>
                        <span className="font-bold text-red-500">{subPath.endName}</span>
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">도착</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="p-4 border-t">
        <button onClick={clearRoute} className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">새로운 경로 검색</button>
      </div>
    </div>
  );
}
