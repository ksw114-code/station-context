export interface StationDetailItem {
  name: string;
  desc: string;
  highlight?: boolean;
  link?: string;
}

export interface StationDetails {
  [category: string]: StationDetailItem[];
}

export const stationDetails: Record<string, StationDetails> = {
  'gangnam': {
    shopping: [
      { name: '신세계백화점 강남점', desc: '🔥 오늘만! 화장품 30% 할인', highlight: true },
      { name: '교보문고 강남점', desc: '베스트셀러 10% 할인' },
    ],
    food: [
      { name: '청담골', desc: '⭐ 4.5 · 한식 · 도보 3분' },
      { name: '을밀대', desc: '⭐ 4.3 · 냉면 · 도보 5분' },
    ],
    culture: [
      { name: 'CGV 강남', desc: '현재 상영중 12편' },
    ],
  },
  'seoul': {
    train: [
      { name: 'KTX 부산행', desc: '14:30 출발 · 잔여 23석', highlight: true },
      { name: 'KTX 광주행', desc: '15:00 출발 · 잔여 45석' },
      { name: 'ITX 춘천행', desc: '14:45 출발 · 잔여 12석' },
    ],
    shopping: [
      { name: '롯데마트 서울역점', desc: '영업중 · 22:00 마감' },
      { name: '롯데아울렛', desc: '🔥 주말 특가 진행중', highlight: true },
    ],
    bus: [
      { name: '공항버스 6001', desc: '인천공항행 · 15분 간격' },
    ],
    airport: [
      { name: '공항철도 직통', desc: '인천공항 43분 · 9,500원' },
    ],
  },
  'jamsil': {
    shopping: [
      { name: '롯데백화점 잠실점', desc: '🔥 창립기념 세일 D-3', highlight: true },
      { name: '롯데월드몰', desc: '영업중 · 22:00 마감' },
      { name: '롯데마트 잠실점', desc: '전단상품 50% 할인' },
    ],
    culture: [
      { name: '롯데월드 어드벤처', desc: '오늘 21:00까지 운영' },
      { name: '롯데콘서트홀', desc: '오늘 공연: 조성진 피아노' },
    ],
  },
  'express-bus': {
    bus: [
      { name: '부산행 고속버스', desc: '15:00 출발 · 잔여 12석', highlight: true },
      { name: '대전행 고속버스', desc: '15:30 출발 · 잔여 28석' },
      { name: '광주행 고속버스', desc: '16:00 출발 · 잔여 5석' },
    ],
    shopping: [
      { name: '신세계백화점 강남점', desc: '센트럴시티 직결' },
      { name: '파미에스테이션', desc: '영업중 · 22:00 마감' },
    ],
  },
  'suseo': {
    train: [
      { name: 'SRT 부산행', desc: '14:20 출발 · 잔여 18석', highlight: true },
      { name: 'SRT 목포행', desc: '15:10 출발 · 잔여 32석' },
    ],
    shopping: [
      { name: '가든파이브', desc: '영업중 · 21:00 마감' },
    ],
  },
  'yongsan': {
    train: [
      { name: 'KTX 목포행', desc: '14:50 출발 · 잔여 15석', highlight: true },
      { name: 'ITX-청춘 춘천행', desc: '15:20 출발 · 잔여 8석' },
    ],
    shopping: [
      { name: '아이파크몰', desc: '🔥 주말 특가 진행중', highlight: true },
      { name: '이마트 용산점', desc: '영업중 · 23:00 마감' },
    ],
  },
  'myeongdong': {
    shopping: [
      { name: '롯데백화점 본점', desc: '영업중 · 20:30 마감' },
      { name: '신세계백화점 본점', desc: '🔥 시코르 세일', highlight: true },
    ],
    food: [
      { name: '명동교자', desc: '⭐ 4.7 · 칼국수 · 웨이팅 30분' },
    ],
  },
  'hongdae': {
    culture: [
      { name: '홍대 걷고싶은거리', desc: '버스킹 공연 17:00~' },
      { name: 'KT&G 상상마당', desc: '인디밴드 공연 19:00' },
    ],
    food: [
      { name: '연남동 맛집거리', desc: '도보 10분 · 120+ 맛집' },
    ],
  },
  'gimpo-airport': {
    airport: [
      { name: '국내선 출발', desc: '오늘 127편 운항' },
      { name: '국제선 출발', desc: '오늘 43편 운항 (일본/중국)' },
    ],
  },
};

export const getStationDetails = (stationId: string): StationDetails | null => {
  return stationDetails[stationId] || null;
};
