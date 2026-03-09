import { useState, useEffect } from 'react';

interface ArrivalInfo {
  line: string;
  destination: string;
  arrivalMessage: string;
  arrivalTime: number;
}

interface RealtimeArrivalProps {
  stationName: string;
}

export default function RealtimeArrival({ stationName }: RealtimeArrivalProps) {
  const [arrivals, setArrivals] = useState<ArrivalInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArrivalInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_SEOUL_API_KEY;
      const url = `http://swopenapi.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/10/${encodeURIComponent(stationName)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.realtimeArrivalList) {
        const arrivalList: ArrivalInfo[] = data.realtimeArrivalList.map((item: any) => ({
          line: item.subwayId === '1001' ? '1호선' :
                item.subwayId === '1002' ? '2호선' :
                item.subwayId === '1003' ? '3호선' :
                item.subwayId === '1004' ? '4호선' :
                item.subwayId === '1005' ? '5호선' :
                item.subwayId === '1006' ? '6호선' :
                item.subwayId === '1007' ? '7호선' :
                item.subwayId === '1008' ? '8호선' :
                item.subwayId === '1009' ? '9호선' : item.subwayNm,
          destination: item.trainLineNm?.split(' - ')[1] || item.bstatnNm || '행선지 정보 없음',
          arrivalMessage: item.arvlMsg2 || '정보 없음',
          arrivalTime: parseInt(item.barvlDt) || 0,
        }));
        setArrivals(arrivalList.slice(0, 6));
      } else {
        setArrivals([]);
      }
    } catch (err) {
      setError('도착 정보를 가져올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stationName) {
      fetchArrivalInfo();
      const interval = setInterval(fetchArrivalInfo, 30000);
      return () => clearInterval(interval);
    }
  }, [stationName]);

  if (loading && arrivals.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        실시간 도착 정보 로딩중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-400 text-sm">
        {error}
      </div>
    );
  }

  if (arrivals.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-sm">
        실시간 도착 정보가 없습니다
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-500">🚇 실시간 도착 정보</div>
        <button 
          onClick={fetchArrivalInfo}
          className="text-xs text-blue-500 hover:text-blue-600"
        >
          새로고침
        </button>
      </div>
      <div className="space-y-2">
        {arrivals.map((arrival, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded">
                {arrival.line}
              </span>
              <span className="text-sm text-gray-700">{arrival.destination}</span>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold ${
                arrival.arrivalMessage.includes('도착') ? 'text-red-500' :
                arrival.arrivalMessage.includes('진입') ? 'text-orange-500' :
                'text-blue-500'
              }`}>
                {arrival.arrivalMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}