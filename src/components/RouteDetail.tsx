import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';
import { findRoute } from '../data/routes';
import { stations } from '../data/stations';

export default function RouteDetail() {
  const { departureStation, arrivalStation, isRouteMode, clearRoute } = useStationStore();

  if (!isRouteMode || !departureStation || !arrivalStation) return null;

  const route = findRoute(departureStation.id, arrivalStation.id);
  
  // 역 이름 가져오기
  const getStationName = (id: string) => {
    return stations.find(s => s.id === id)?.name || id;
  };

  // 총 소요시간 계산
  const totalTime = route.reduce((sum, step) => sum + (step.time || 0), 0);
  const totalStops = route.filter(s => s.type === 'board').reduce((sum, step) => sum + (step.stops || 0), 0);
  const transfers = route.filter(s => s.type === 'transfer').length;

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-blue-500 text-white px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={clearRoute} className="p-1">
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
      </div>

      {/* 요약 정보 */}
      <div className="flex border-b">
        <div className="flex-1 text-center py-3 border-r">
          <div className="text-2xl font-bold text-blue-600">{totalTime}분</div>
          <div className="text-xs text-gray-500">소요시간</div>
        </div>
        <div className="flex-1 text-center py-3 border-r">
          <div className="text-2xl font-bold text-gray-700">{totalStops}개</div>
          <div className="text-xs text-gray-500">정거장</div>
        </div>
        <div className="flex-1 text-center py-3">
          <div className="text-2xl font-bold text-orange-500">{transfers}회</div>
          <div className="text-xs text-gray-500">환승</div>
        </div>
      </div>

      {/* 상세 경로 */}
      <div className="flex-1 overflow-auto p-4">
        {route.length > 0 ? (
          <div className="space-y-0">
            {route.map((step, idx) => (
              <div key={idx} className="flex">
                {/* 라인 표시 */}
                <div className="flex flex-col items-center mr-4">
                  <div 
                    className="w-4 h-4 rounded-full border-2 bg-white"
                    style={{ borderColor: getLineColor(step.line || '') }}
                  ></div>
                  {idx < route.length - 1 && (
                    <div 
                      className="w-1 flex-1 min-h-[40px]"
                      style={{ backgroundColor: getLineColor(step.line || step.nextLine || '') }}
                    ></div>
                  )}
                </div>

                {/* 내용 */}
                <div className="flex-1 pb-4">
                  {step.type === 'board' && (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{getStationName(step.station)}</span>
                        <span 
                          className="text-xs px-2 py-0.5 rounded text-white"
                          style={{ backgroundColor: getLineColor(step.line || '') }}
                        >
                          {step.line}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {step.stops}개 역 이동 · 약 {step.time}분
                      </div>
                    </div>
                  )}
                  {step.type === 'transfer' && (
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-600">{getStationName(step.station)}</span>
                        <span className="text-orange-500">환승</span>
                      </div>
                      <div className="text-sm text-orange-600 mt-1">
                        <span 
                          className="text-xs px-1.5 py-0.5 rounded text-white mr-1"
                          style={{ backgroundColor: getLineColor(step.line || '') }}
                        >
                          {step.line}
                        </span>
                        →
                        <span 
                          className="text-xs px-1.5 py-0.5 rounded text-white ml-1"
                          style={{ backgroundColor: getLineColor(step.nextLine || '') }}
                        >
                          {step.nextLine}
                        </span>
                        <span className="ml-2">약 {step.time}분</span>
                      </div>
                    </div>
                  )}
                  {step.type === 'arrive' && (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-500">{getStationName(step.station)}</span>
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">도착</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>경로를 찾을 수 없습니다</p>
            <p className="text-sm mt-1">다른 역을 선택해주세요</p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t">
        <button 
          onClick={clearRoute}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
        >
          새로운 경로 검색
        </button>
      </div>
    </div>
  );
}