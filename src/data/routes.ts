// 노선별 역 순서 (간단한 버전)
export const lineStations: Record<string, string[]> = {
  '1호선': ['sindorim', 'yeongdeungpo', 'yongsan', 'seoul', 'cityhall', 'dongdaemun'],
  '2호선': ['hongdae', 'sinchon', 'cityhall', 'euljiro3', 'dongdaemun-ddp', 'wangsimni', 'seongsu', 'konkuk', 'jamsil', 'samsung', 'gangnam', 'gyodae', 'sadang', 'snu', 'sindorim', 'dangsan', 'hapjeong', 'hongdae'],
  '3호선': ['gyeongbok', 'anguk', 'euljiro3', 'chungmuro', 'gyodae', 'express-bus', 'sinsa', 'apgujeong', 'suseo'],
  '4호선': ['seoul', 'myeongdong', 'chungmuro', 'dongdaemun-ddp', 'dongdaemun', 'sadang'],
  '5호선': ['gimpo-airport', 'yeouido', 'gwanghwamun', 'dongdaemun-ddp', 'wangsimni'],
  '9호선': ['gimpo-airport', 'dangsan', 'yeouido', 'express-bus', 'sinnonhyeon'],
};

// 환승역 정보
export const transferStations: Record<string, string[]> = {
  'seoul': ['1호선', '4호선'],
  'cityhall': ['1호선', '2호선'],
  'sindorim': ['1호선', '2호선'],
  'euljiro3': ['2호선', '3호선'],
  'dongdaemun-ddp': ['2호선', '4호선', '5호선'],
  'wangsimni': ['2호선', '5호선'],
  'gyodae': ['2호선', '3호선'],
  'sadang': ['2호선', '4호선'],
  'chungmuro': ['3호선', '4호선'],
  'express-bus': ['3호선', '7호선', '9호선'],
  'yeouido': ['5호선', '9호선'],
  'gimpo-airport': ['5호선', '9호선'],
  'dangsan': ['2호선', '9호선'],
  'hapjeong': ['2호선', '6호선'],
  'konkuk': ['2호선', '7호선'],
  'jamsil': ['2호선', '8호선'],
  'dongdaemun': ['1호선', '4호선'],
};

export interface RouteStep {
  type: 'board' | 'transfer' | 'arrive';
  station: string;
  stationName: string;
  line?: string;
  nextLine?: string;
  stops?: number;
  time?: number;
}

// 간단한 경로 찾기 (실제로는 더 복잡한 알고리즘 필요)
export function findRoute(fromId: string, toId: string): RouteStep[] {
  const routes: RouteStep[] = [];
  
  // 같은 노선에 있는지 확인
  for (const [line, stations] of Object.entries(lineStations)) {
    const fromIdx = stations.indexOf(fromId);
    const toIdx = stations.indexOf(toId);
    
    if (fromIdx !== -1 && toIdx !== -1) {
      const stops = Math.abs(toIdx - fromIdx);
      routes.push({
        type: 'board',
        station: fromId,
        stationName: '',
        line: line,
        stops: stops,
        time: stops * 2,
      });
      routes.push({
        type: 'arrive',
        station: toId,
        stationName: '',
        line: line,
      });
      return routes;
    }
  }

  // 환승이 필요한 경우 (간단한 1회 환승)
  for (const [transferStation, lines] of Object.entries(transferStations)) {
    for (const line1 of lines) {
      for (const line2 of lines) {
        if (line1 === line2) continue;
        
        const line1Stations = lineStations[line1] || [];
        const line2Stations = lineStations[line2] || [];
        
        const fromIdx = line1Stations.indexOf(fromId);
        const transferIdx1 = line1Stations.indexOf(transferStation);
        const transferIdx2 = line2Stations.indexOf(transferStation);
        const toIdx = line2Stations.indexOf(toId);
        
        if (fromIdx !== -1 && transferIdx1 !== -1 && transferIdx2 !== -1 && toIdx !== -1) {
          const stops1 = Math.abs(transferIdx1 - fromIdx);
          const stops2 = Math.abs(toIdx - transferIdx2);
          
          routes.push({
            type: 'board',
            station: fromId,
            stationName: '',
            line: line1,
            stops: stops1,
            time: stops1 * 2,
          });
          routes.push({
            type: 'transfer',
            station: transferStation,
            stationName: '',
            line: line1,
            nextLine: line2,
            time: 3,
          });
          routes.push({
            type: 'board',
            station: transferStation,
            stationName: '',
            line: line2,
            stops: stops2,
            time: stops2 * 2,
          });
          routes.push({
            type: 'arrive',
            station: toId,
            stationName: '',
            line: line2,
          });
          return routes;
        }
      }
    }
  }

  return routes;
}