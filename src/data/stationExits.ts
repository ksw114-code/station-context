export interface ExitInfo {
  exitNumber: string;
  landmark: string;
  facilities?: string[];
}

export interface StationExits {
  stationId: string;
  exits: ExitInfo[];
}

export const stationExits: StationExits[] = [
  {
    stationId: 'gangnam',
    exits: [
      { exitNumber: '1', landmark: 'CGV 강남', facilities: ['엘리베이터'] },
      { exitNumber: '2', landmark: '강남역 지하상가', facilities: [] },
      { exitNumber: '3', landmark: '역삼세무서 방면', facilities: ['에스컬레이터'] },
      { exitNumber: '4', landmark: '강남대로 방면', facilities: [] },
      { exitNumber: '5', landmark: '신논현역 방면', facilities: ['엘리베이터'] },
      { exitNumber: '6', landmark: '강남파이낸스센터', facilities: [] },
      { exitNumber: '7', landmark: '신한은행 방면', facilities: ['에스컬레이터'] },
      { exitNumber: '8', landmark: '뉴욕제과 방면', facilities: [] },
      { exitNumber: '9', landmark: '강남역 11번출구 방면', facilities: [] },
      { exitNumber: '10', landmark: '교보타워 방면', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '11', landmark: '우리은행 방면', facilities: [] },
      { exitNumber: '12', landmark: '강남 CGV', facilities: [] },
    ]
  },
  {
    stationId: 'hongdae',
    exits: [
      { exitNumber: '1', landmark: '홍익대학교 정문', facilities: ['엘리베이터'] },
      { exitNumber: '2', landmark: '상수역 방면', facilities: [] },
      { exitNumber: '3', landmark: '홍대 걷고싶은거리', facilities: ['에스컬레이터'] },
      { exitNumber: '4', landmark: '마포구청 방면', facilities: [] },
      { exitNumber: '5', landmark: '경의선숲길', facilities: ['엘리베이터'] },
      { exitNumber: '6', landmark: '홍대 클럽거리', facilities: [] },
      { exitNumber: '7', landmark: 'AK플라자', facilities: ['에스컬레이터'] },
      { exitNumber: '8', landmark: '연남동 방면', facilities: [] },
      { exitNumber: '9', landmark: '홍대입구 환승주차장', facilities: ['엘리베이터'] },
    ]
  },
  {
    stationId: 'jamsil',
    exits: [
      { exitNumber: '1', landmark: '롯데월드타워', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '2', landmark: '롯데월드 어드벤처', facilities: ['엘리베이터'] },
      { exitNumber: '3', landmark: '석촌호수 서호', facilities: [] },
      { exitNumber: '4', landmark: '잠실역 지하상가', facilities: ['에스컬레이터'] },
      { exitNumber: '5', landmark: '송파구청 방면', facilities: [] },
      { exitNumber: '6', landmark: '잠실나루역 방면', facilities: [] },
      { exitNumber: '7', landmark: '올림픽공원 방면', facilities: ['엘리베이터'] },
      { exitNumber: '8', landmark: '롯데백화점', facilities: ['에스컬레이터'] },
    ]
  },
  {
    stationId: 'express',
    exits: [
      { exitNumber: '1', landmark: '신세계백화점 강남점', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '2', landmark: '고속버스터미널', facilities: ['엘리베이터'] },
      { exitNumber: '3', landmark: '센트럴시티', facilities: ['에스컬레이터'] },
      { exitNumber: '4', landmark: '뉴코아아울렛', facilities: [] },
      { exitNumber: '5', landmark: '반포종합운동장 방면', facilities: [] },
      { exitNumber: '6', landmark: '서초구청 방면', facilities: ['엘리베이터'] },
      { exitNumber: '7', landmark: '예술의전당 방면', facilities: [] },
      { exitNumber: '8', landmark: '파미에스테이션', facilities: ['에스컬레이터'] },
    ]
  },
  {
    stationId: 'seoul',
    exits: [
      { exitNumber: '1', landmark: '서울역사', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '2', landmark: '롯데마트 서울역점', facilities: ['엘리베이터'] },
      { exitNumber: '3', landmark: '남대문시장 방면', facilities: [] },
      { exitNumber: '4', landmark: '서울스퀘어', facilities: ['에스컬레이터'] },
      { exitNumber: '5', landmark: '숭례문 방면', facilities: [] },
      { exitNumber: '6', landmark: '버스환승센터', facilities: ['엘리베이터'] },
      { exitNumber: '7', landmark: '서울로7017', facilities: ['에스컬레이터'] },
      { exitNumber: '8', landmark: '공항철도 방면', facilities: ['엘리베이터'] },
    ]
  },
  {
    stationId: 'myeongdong',
    exits: [
      { exitNumber: '1', landmark: '명동성당 방면', facilities: [] },
      { exitNumber: '2', landmark: '신세계백화점 본점', facilities: ['엘리베이터'] },
      { exitNumber: '3', landmark: '명동 중앙로', facilities: ['에스컬레이터'] },
      { exitNumber: '4', landmark: '롯데영플라자', facilities: [] },
      { exitNumber: '5', landmark: '남산 방면', facilities: [] },
      { exitNumber: '6', landmark: '을지로입구역 방면', facilities: ['엘리베이터'] },
      { exitNumber: '7', landmark: '충무로역 방면', facilities: [] },
      { exitNumber: '8', landmark: '명동관광안내소', facilities: ['에스컬레이터'] },
    ]
  },
  {
    stationId: 'yeouido',
    exits: [
      { exitNumber: '1', landmark: 'IFC몰', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '2', landmark: '여의도공원', facilities: [] },
      { exitNumber: '3', landmark: 'KBS 방면', facilities: ['엘리베이터'] },
      { exitNumber: '4', landmark: '국회의사당 방면', facilities: [] },
      { exitNumber: '5', landmark: '여의도 한강공원', facilities: ['에스컬레이터'] },
      { exitNumber: '6', landmark: '63빌딩 방면', facilities: [] },
    ]
  },
  {
    stationId: 'sindorim',
    exits: [
      { exitNumber: '1', landmark: '디큐브시티', facilities: ['엘리베이터', '에스컬레이터'] },
      { exitNumber: '2', landmark: '신도림 테크노마트', facilities: ['엘리베이터'] },
      { exitNumber: '3', landmark: '구로디지털단지역 방면', facilities: [] },
      { exitNumber: '4', landmark: '대림역 방면', facilities: ['에스컬레이터'] },
    ]
  },
];

export const getStationExits = (stationId: string): ExitInfo[] => {
  const station = stationExits.find(s => s.stationId === stationId);
  return station?.exits || [];
};