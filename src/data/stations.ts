export type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lines: string[];
  features: CategoryType[];
  lat?: number;
  lng?: number;
}

export const stations: Station[] = [
  // 1호선
  { id: 'seoul', name: '서울역', x: 285, y: 395, lines: ['1호선', '4호선'], features: ['train', 'shopping', 'bus', 'airport'], lat: 37.5547, lng: 126.9707 },
  { id: 'yongsan', name: '용산', x: 285, y: 445, lines: ['1호선'], features: ['train', 'shopping'], lat: 37.5299, lng: 126.9648 },
  { id: 'sindorim', name: '신도림', x: 155, y: 520, lines: ['1호선', '2호선'], features: ['shopping'], lat: 37.5088, lng: 126.8912 },
  { id: 'yeongdeungpo', name: '영등포', x: 185, y: 490, lines: ['1호선'], features: ['train', 'shopping'], lat: 37.5157, lng: 126.9074 },
  { id: 'guro', name: '구로', x: 140, y: 540, lines: ['1호선'], features: ['shopping'], lat: 37.5033, lng: 126.8824 },
  { id: 'jonggak', name: '종각', x: 310, y: 360, lines: ['1호선'], features: ['shopping', 'culture'], lat: 37.5701, lng: 126.9830 },

  // 2호선
  { id: 'hongdae', name: '홍대입구', x: 220, y: 370, lines: ['2호선'], features: ['culture', 'food'], lat: 37.5571, lng: 126.9237 },
  { id: 'sinchon', name: '신촌', x: 245, y: 370, lines: ['2호선'], features: ['culture', 'food'], lat: 37.5553, lng: 126.9366 },
  { id: 'ewha', name: '이대', x: 235, y: 365, lines: ['2호선'], features: ['shopping', 'culture'], lat: 37.5569, lng: 126.9469 },
  { id: 'cityhall', name: '시청', x: 310, y: 365, lines: ['1호선', '2호선'], features: ['culture'], lat: 37.5647, lng: 126.9770 },
  { id: 'euljiro3', name: '을지로3가', x: 350, y: 370, lines: ['2호선', '3호선'], features: ['food'], lat: 37.5663, lng: 126.9919 },
  { id: 'dongdaemun', name: '동대문', x: 410, y: 365, lines: ['1호선', '4호선'], features: ['shopping'], lat: 37.5714, lng: 127.0094 },
  { id: 'wangsimni', name: '왕십리', x: 450, y: 385, lines: ['2호선', '5호선'], features: ['shopping'], lat: 37.5614, lng: 127.0380 },
  { id: 'seongsu', name: '성수', x: 475, y: 405, lines: ['2호선'], features: ['culture', 'food'], lat: 37.5446, lng: 127.0558 },
  { id: 'konkuk', name: '건대입구', x: 500, y: 425, lines: ['2호선', '7호선'], features: ['shopping', 'food'], lat: 37.5403, lng: 127.0702 },
  { id: 'jamsil', name: '잠실', x: 545, y: 470, lines: ['2호선', '8호선'], features: ['shopping', 'culture'], lat: 37.5133, lng: 127.1001 },
  { id: 'samsung', name: '삼성', x: 505, y: 505, lines: ['2호선'], features: ['shopping'], lat: 37.5089, lng: 127.0630 },
  { id: 'gangnam', name: '강남', x: 430, y: 535, lines: ['2호선'], features: ['shopping', 'culture', 'food'], lat: 37.4979, lng: 127.0276 },
  { id: 'yeoksam', name: '역삼', x: 460, y: 525, lines: ['2호선'], features: ['food'], lat: 37.5007, lng: 127.0367 },
  { id: 'seolleung', name: '선릉', x: 480, y: 515, lines: ['2호선'], features: ['culture'], lat: 37.5044, lng: 127.0490 },
  { id: 'gyodae', name: '교대', x: 390, y: 545, lines: ['2호선', '3호선'], features: ['culture'], lat: 37.4934, lng: 127.0145 },
  { id: 'sadang', name: '사당', x: 340, y: 580, lines: ['2호선', '4호선'], features: [], lat: 37.4765, lng: 126.9816 },
  { id: 'snu', name: '서울대입구', x: 280, y: 560, lines: ['2호선'], features: ['culture'], lat: 37.4812, lng: 126.9527 },
  { id: 'silim', name: '신림', x: 240, y: 550, lines: ['2호선'], features: ['food'], lat: 37.4842, lng: 126.9296 },
  { id: 'dangsan', name: '당산', x: 175, y: 430, lines: ['2호선', '9호선'], features: [], lat: 37.5349, lng: 126.9025 },
  { id: 'hapjeong', name: '합정', x: 195, y: 390, lines: ['2호선', '6호선'], features: ['culture', 'food'], lat: 37.5495, lng: 126.9137 },

  // 3호선
  { id: 'gyeongbok', name: '경복궁', x: 290, y: 320, lines: ['3호선'], features: ['culture'], lat: 37.5759, lng: 126.9738 },
  { id: 'anguk', name: '안국', x: 330, y: 335, lines: ['3호선'], features: ['culture'], lat: 37.5760, lng: 126.9851 },
  { id: 'chungmuro', name: '충무로', x: 345, y: 395, lines: ['3호선', '4호선'], features: ['culture'], lat: 37.5614, lng: 126.9946 },
  { id: 'express-bus', name: '고속터미널', x: 355, y: 510, lines: ['3호선', '7호선', '9호선'], features: ['bus', 'shopping'], lat: 37.5048, lng: 127.0049 },
  { id: 'apgujeong', name: '압구정', x: 445, y: 475, lines: ['3호선'], features: ['shopping', 'food'], lat: 37.5270, lng: 127.0285 },
  { id: 'sinsa', name: '신사', x: 420, y: 495, lines: ['3호선'], features: ['shopping', 'food'], lat: 37.5168, lng: 127.0201 },
  { id: 'suseo', name: '수서', x: 540, y: 560, lines: ['3호선'], features: ['train', 'shopping'], lat: 37.4872, lng: 127.1020 },

  // 4호선
  { id: 'myeongdong', name: '명동', x: 325, y: 395, lines: ['4호선'], features: ['shopping', 'food'], lat: 37.5609, lng: 126.9860 },
  { id: 'dongdaemun-ddp', name: '동대문역사문화공원', x: 390, y: 375, lines: ['2호선', '4호선', '5호선'], features: ['shopping', 'culture'], lat: 37.5653, lng: 127.0093 },
  { id: 'hyehwa', name: '혜화', x: 370, y: 330, lines: ['4호선'], features: ['culture'], lat: 37.5822, lng: 127.0019 },

  // 5호선
  { id: 'gwanghwamun', name: '광화문', x: 305, y: 345, lines: ['5호선'], features: ['culture'], lat: 37.5708, lng: 126.9779 },
  { id: 'yeouido', name: '여의도', x: 210, y: 475, lines: ['5호선', '9호선'], features: ['shopping'], lat: 37.5216, lng: 126.9243 },
  { id: 'gimpo-airport', name: '김포공항', x: 115, y: 415, lines: ['5호선', '9호선'], features: ['airport'], lat: 37.5624, lng: 126.8015 },

  // 6호선
  { id: 'itaewon', name: '이태원', x: 340, y: 430, lines: ['6호선'], features: ['food', 'culture'], lat: 37.5345, lng: 126.9946 },
  { id: 'sangsu', name: '상수', x: 205, y: 385, lines: ['6호선'], features: ['culture', 'food'], lat: 37.5479, lng: 126.9234 },
  { id: 'mangwon', name: '망원', x: 185, y: 380, lines: ['6호선'], features: ['food'], lat: 37.5559, lng: 126.9105 },
  { id: 'gongdeok', name: '공덕', x: 245, y: 430, lines: ['5호선', '6호선'], features: ['shopping'], lat: 37.5440, lng: 126.9519 },

  // 7호선
  { id: 'cheongdam', name: '청담', x: 470, y: 485, lines: ['7호선'], features: ['shopping', 'food'], lat: 37.5178, lng: 127.0528 },
  { id: 'nonhyeon', name: '논현', x: 440, y: 515, lines: ['7호선'], features: ['food'], lat: 37.5112, lng: 127.0217 },
  { id: 'nowon', name: '노원', x: 500, y: 200, lines: ['4호선', '7호선'], features: ['shopping'], lat: 37.6554, lng: 127.0617 },

  // 8호선
  { id: 'mongchon', name: '몽촌토성', x: 555, y: 485, lines: ['8호선'], features: ['culture'], lat: 37.5173, lng: 127.1126 },
  { id: 'cheonho', name: '천호', x: 590, y: 440, lines: ['5호선', '8호선'], features: ['shopping'], lat: 37.5387, lng: 127.1237 },

  // 9호선
  { id: 'sinnonhyeon', name: '신논현', x: 415, y: 520, lines: ['9호선'], features: ['shopping'], lat: 37.5045, lng: 127.0252 },
  { id: 'sports-complex', name: '종합운동장', x: 525, y: 490, lines: ['9호선'], features: ['culture'], lat: 37.5107, lng: 127.0735 },

  // 추가 역들
  { id: 'kkachisan', name: '까치산', x: 130, y: 470, lines: ['2호선', '5호선'], features: [], lat: 37.5320, lng: 126.8474 },
  { id: 'mullae', name: '문래', x: 165, y: 450, lines: ['2호선'], features: ['culture'], lat: 37.5175, lng: 126.8984 },
  { id: 'yeongdeungpo-gu', name: '영등포구청', x: 180, y: 460, lines: ['2호선', '5호선'], features: [], lat: 37.5252, lng: 126.8965 },
  { id: 'guro-digital', name: '구로디지털단지', x: 175, y: 545, lines: ['2호선'], features: ['shopping'], lat: 37.4851, lng: 126.9015 },
  { id: 'daerim', name: '대림', x: 165, y: 530, lines: ['2호선', '7호선'], features: [], lat: 37.4930, lng: 126.8963 },
  { id: 'boramae', name: '보라매', x: 220, y: 520, lines: ['7호선'], features: ['culture'], lat: 37.4893, lng: 126.9218 },
  { id: 'noryangjin', name: '노량진', x: 230, y: 480, lines: ['1호선', '9호선'], features: ['food'], lat: 37.5133, lng: 126.9425 },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find(station => station.id === id);
};

export const searchStations = (query: string): Station[] => {
  return stations.filter(station =>
    station.name.toLowerCase().includes(query.toLowerCase())
  );
};