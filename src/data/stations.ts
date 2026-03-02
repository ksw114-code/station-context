export type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lines: string[];
  features: CategoryType[];
}

export const stations: Station[] = [
  { id: 'seoul', name: '서울역', x: 285, y: 395, lines: ['1호선', '4호선'], features: ['train', 'shopping', 'bus', 'airport'] },
  { id: 'yongsan', name: '용산', x: 285, y: 445, lines: ['1호선'], features: ['train', 'shopping'] },
  { id: 'sindorim', name: '신도림', x: 155, y: 520, lines: ['1호선', '2호선'], features: ['shopping'] },
  { id: 'yeongdeungpo', name: '영등포', x: 185, y: 490, lines: ['1호선'], features: ['train', 'shopping'] },
  { id: 'hongdae', name: '홍대입구', x: 220, y: 370, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'sinchon', name: '신촌', x: 245, y: 370, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'cityhall', name: '시청', x: 310, y: 365, lines: ['1호선', '2호선'], features: ['culture'] },
  { id: 'euljiro3', name: '을지로3가', x: 350, y: 370, lines: ['2호선', '3호선'], features: ['food'] },
  { id: 'dongdaemun', name: '동대문', x: 410, y: 365, lines: ['1호선', '4호선'], features: ['shopping'] },
  { id: 'wangsimni', name: '왕십리', x: 450, y: 385, lines: ['2호선', '5호선'], features: ['shopping'] },
  { id: 'seongsu', name: '성수', x: 475, y: 405, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'konkuk', name: '건대입구', x: 500, y: 425, lines: ['2호선', '7호선'], features: ['shopping', 'food'] },
  { id: 'jamsil', name: '잠실', x: 545, y: 470, lines: ['2호선', '8호선'], features: ['shopping', 'culture'] },
  { id: 'samsung', name: '삼성', x: 505, y: 505, lines: ['2호선'], features: ['shopping'] },
  { id: 'gangnam', name: '강남', x: 430, y: 535, lines: ['2호선'], features: ['shopping', 'culture', 'food'] },
  { id: 'gyodae', name: '교대', x: 390, y: 545, lines: ['2호선', '3호선'], features: ['culture'] },
  { id: 'sadang', name: '사당', x: 340, y: 580, lines: ['2호선', '4호선'], features: [] },
  { id: 'snu', name: '서울대입구', x: 280, y: 560, lines: ['2호선'], features: ['culture'] },
  { id: 'dangsan', name: '당산', x: 175, y: 430, lines: ['2호선', '9호선'], features: [] },
  { id: 'hapjeong', name: '합정', x: 195, y: 390, lines: ['2호선', '6호선'], features: ['culture', 'food'] },
  { id: 'gyeongbok', name: '경복궁', x: 290, y: 320, lines: ['3호선'], features: ['culture'] },
  { id: 'anguk', name: '안국', x: 330, y: 335, lines: ['3호선'], features: ['culture'] },
  { id: 'chungmuro', name: '충무로', x: 345, y: 395, lines: ['3호선', '4호선'], features: ['culture'] },
  { id: 'express-bus', name: '고속터미널', x: 355, y: 510, lines: ['3호선', '7호선', '9호선'], features: ['bus', 'shopping'] },
  { id: 'apgujeong', name: '압구정', x: 445, y: 475, lines: ['3호선'], features: ['shopping', 'food'] },
  { id: 'sinsa', name: '신사', x: 420, y: 495, lines: ['3호선'], features: ['shopping', 'food'] },
  { id: 'myeongdong', name: '명동', x: 325, y: 395, lines: ['4호선'], features: ['shopping', 'food'] },
  { id: 'dongdaemun-ddp', name: '동대문역사문화공원', x: 390, y: 375, lines: ['2호선', '4호선', '5호선'], features: ['shopping', 'culture'] },
  { id: 'gwanghwamun', name: '광화문', x: 305, y: 345, lines: ['5호선'], features: ['culture'] },
  { id: 'yeouido', name: '여의도', x: 210, y: 475, lines: ['5호선', '9호선'], features: ['shopping'] },
  { id: 'sinnonhyeon', name: '신논현', x: 415, y: 520, lines: ['9호선'], features: ['shopping'] },
  { id: 'suseo', name: '수서', x: 540, y: 560, lines: ['3호선'], features: ['train', 'shopping'] },
  { id: 'gimpo-airport', name: '김포공항', x: 115, y: 415, lines: ['5호선', '9호선'], features: ['airport'] },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find(station => station.id === id);
};

export const searchStations = (query: string): Station[] => {
  return stations.filter(station => 
    station.name.toLowerCase().includes(query.toLowerCase())
  );
};
