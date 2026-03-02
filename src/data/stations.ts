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
  // 1호선
  { id: 'seoul', name: '서울역', x: 285, y: 395, lines: ['1호선', '4호선'], features: ['train', 'shopping', 'bus', 'airport'] },
  { id: 'yongsan', name: '용산', x: 285, y: 445, lines: ['1호선'], features: ['train', 'shopping'] },
  { id: 'sindorim', name: '신도림', x: 155, y: 520, lines: ['1호선', '2호선'], features: ['shopping'] },
  { id: 'yeongdeungpo', name: '영등포', x: 185, y: 490, lines: ['1호선'], features: ['train', 'shopping'] },
  { id: 'guro', name: '구로', x: 140, y: 540, lines: ['1호선'], features: ['shopping'] },
  { id: 'suwon', name: '수원', x: 200, y: 650, lines: ['1호선'], features: ['train', 'shopping', 'culture'] },
  { id: 'incheon', name: '인천', x: 50, y: 500, lines: ['1호선'], features: ['train', 'shopping'] },
  { id: 'dongmyo', name: '동묘앞', x: 420, y: 350, lines: ['1호선', '6호선'], features: ['culture', 'shopping'] },
  { id: 'jongno3', name: '종로3가', x: 340, y: 350, lines: ['1호선', '3호선', '5호선'], features: ['culture', 'food'] },
  { id: 'jongno5', name: '종로5가', x: 380, y: 350, lines: ['1호선'], features: ['culture'] },
  { id: 'jonggak', name: '종각', x: 310, y: 360, lines: ['1호선'], features: ['shopping', 'culture'] },

  // 2호선
  { id: 'hongdae', name: '홍대입구', x: 220, y: 370, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'sinchon', name: '신촌', x: 245, y: 370, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'ewha', name: '이대', x: 235, y: 365, lines: ['2호선'], features: ['shopping', 'culture'] },
  { id: 'cityhall', name: '시청', x: 310, y: 365, lines: ['1호선', '2호선'], features: ['culture'] },
  { id: 'euljiro3', name: '을지로3가', x: 350, y: 370, lines: ['2호선', '3호선'], features: ['food'] },
  { id: 'euljiro4', name: '을지로4가', x: 380, y: 370, lines: ['2호선', '5호선'], features: ['food'] },
  { id: 'dongdaemun', name: '동대문', x: 410, y: 365, lines: ['1호선', '4호선'], features: ['shopping'] },
  { id: 'wangsimni', name: '왕십리', x: 450, y: 385, lines: ['2호선', '5호선'], features: ['shopping'] },
  { id: 'seongsu', name: '성수', x: 475, y: 405, lines: ['2호선'], features: ['culture', 'food'] },
  { id: 'konkuk', name: '건대입구', x: 500, y: 425, lines: ['2호선', '7호선'], features: ['shopping', 'food'] },
  { id: 'jamsil', name: '잠실', x: 545, y: 470, lines: ['2호선', '8호선'], features: ['shopping', 'culture'] },
  { id: 'jamsilnaru', name: '잠실나루', x: 560, y: 450, lines: ['2호선'], features: [] },
  { id: 'samsung', name: '삼성', x: 505, y: 505, lines: ['2호선'], features: ['shopping'] },
  { id: 'coex', name: '삼성(코엑스)', x: 510, y: 510, lines: ['2호선'], features: ['shopping', 'culture'] },
  { id: 'gangnam', name: '강남', x: 430, y: 535, lines: ['2호선'], features: ['shopping', 'culture', 'food'] },
  { id: 'yeoksam', name: '역삼', x: 460, y: 525, lines: ['2호선'], features: ['food'] },
  { id: 'seolleung', name: '선릉', x: 480, y: 515, lines: ['2호선'], features: ['culture'] },
  { id: 'gyodae', name: '교대', x: 390, y: 545, lines: ['2호선', '3호선'], features: ['culture'] },
  { id: 'seocho', name: '서초', x: 410, y: 550, lines: ['2호선'], features: ['culture'] },
  { id: 'sadang', name: '사당', x: 340, y: 580, lines: ['2호선', '4호선'], features: [] },
  { id: 'nakseongdae', name: '낙성대', x: 300, y: 570, lines: ['2호선'], features: ['culture'] },
  { id: 'snu', name: '서울대입구', x: 280, y: 560, lines: ['2호선'], features: ['culture'] },
  { id: 'silim', name: '신림', x: 240, y: 550, lines: ['2호선'], features: ['food'] },
  { id: 'gasan', name: '가산디지털단지', x: 160, y: 560, lines: ['1호선', '7호선'], features: ['shopping'] },
  { id: 'dangsan', name: '당산', x: 175, y: 430, lines: ['2호선', '9호선'], features: [] },
  { id: 'hapjeong', name: '합정', x: 195, y: 390, lines: ['2호선', '6호선'], features: ['culture', 'food'] },
  { id: 'yeouido', name: '여의도', x: 210, y: 475, lines: ['5호선', '9호선'], features: ['shopping'] },
  { id: 'yeouinaru', name: '여의나루', x: 200, y: 460, lines: ['5호선'], features: ['culture'] },

  // 3호선
  { id: 'gyeongbok', name: '경복궁', x: 290, y: 320, lines: ['3호선'], features: ['culture'] },
  { id: 'anguk', name: '안국', x: 330, y: 335, lines: ['3호선'], features: ['culture'] },
  { id: 'chungmuro', name: '충무로', x: 345, y: 395, lines: ['3호선', '4호선'], features: ['culture'] },
  { id: 'dongguk', name: '동대입구', x: 360, y: 410, lines: ['3호선'], features: ['culture'] },
  { id: 'yaksu', name: '약수', x: 400, y: 420, lines: ['3호선', '6호선'], features: [] },
  { id: 'geumho', name: '금호', x: 420, y: 430, lines: ['3호선'], features: [] },
  { id: 'oksu', name: '옥수', x: 440, y: 440, lines: ['3호선'], features: [] },
  { id: 'express-bus', name: '고속터미널', x: 355, y: 510, lines: ['3호선', '7호선', '9호선'], features: ['bus', 'shopping'] },
  { id: 'apgujeong', name: '압구정', x: 445, y: 475, lines: ['3호선'], features: ['shopping', 'food'] },
  { id: 'sinsa', name: '신사', x: 420, y: 495, lines: ['3호선'], features: ['shopping', 'food'] },
  { id: 'jamwon', name: '잠원', x: 400, y: 500, lines: ['3호선'], features: [] },
  { id: 'suseo', name: '수서', x: 540, y: 560, lines: ['3호선'], features: ['train', 'shopping'] },
  { id: 'daecheong', name: '대청', x: 520, y: 550, lines: ['3호선'], features: [] },
  { id: 'ilwon', name: '일원', x: 550, y: 575, lines: ['3호선'], features: [] },
  { id: 'daehwa', name: '대화', x: 100, y: 200, lines: ['3호선'], features: [] },

  // 4호선
  { id: 'myeongdong', name: '명동', x: 325, y: 395, lines: ['4호선'], features: ['shopping', 'food'] },
  { id: 'dongdaemun-ddp', name: '동대문역사문화공원', x: 390, y: 375, lines: ['2호선', '4호선', '5호선'], features: ['shopping', 'culture'] },
  { id: 'hyehwa', name: '혜화', x: 370, y: 330, lines: ['4호선'], features: ['culture'] },
  { id: 'hansung', name: '한성대입구', x: 385, y: 315, lines: ['4호선'], features: ['culture'] },
  { id: 'sungshin', name: '성신여대입구', x: 400, y: 300, lines: ['4호선'], features: ['food'] },
  { id: 'miasamgeori', name: '미아사거리', x: 420, y: 270, lines: ['4호선'], features: ['shopping'] },
  { id: 'nowon', name: '노원', x: 500, y: 200, lines: ['4호선', '7호선'], features: ['shopping'] },
  { id: 'danggogae', name: '당고개', x: 530, y: 150, lines: ['4호선'], features: [] },
  { id: 'namtaeryeong', name: '남태령', x: 340, y: 600, lines: ['4호선'], features: [] },
  { id: 'gwacheon', name: '과천', x: 350, y: 630, lines: ['4호선'], features: ['culture'] },
  { id: 'sanbon', name: '산본', x: 340, y: 680, lines: ['4호선'], features: ['shopping'] },

  // 5호선
  { id: 'gwanghwamun', name: '광화문', x: 305, y: 345, lines: ['5호선'], features: ['culture'] },
  { id: 'jongno3-5', name: '종로3가', x: 340, y: 355, lines: ['1호선', '3호선', '5호선'], features: ['culture'] },
  { id: 'cheonggu', name: '청구', x: 405, y: 400, lines: ['5호선', '6호선'], features: [] },
  { id: 'haengdang', name: '행당', x: 440, y: 400, lines: ['5호선'], features: [] },
  { id: 'majang', name: '마장', x: 460, y: 395, lines: ['5호선'], features: [] },
  { id: 'dapsimni', name: '답십리', x: 480, y: 390, lines: ['5호선'], features: [] },
  { id: 'janghanpyeong', name: '장한평', x: 500, y: 385, lines: ['5호선'], features: [] },
  { id: 'gunja', name: '군자', x: 520, y: 380, lines: ['5호선', '7호선'], features: [] },
  { id: 'gimpo-airport', name: '김포공항', x: 115, y: 415, lines: ['5호선', '9호선'], features: ['airport'] },
  { id: 'gaehwa', name: '개화산', x: 90, y: 420, lines: ['5호선'], features: [] },
  { id: 'banghwa', name: '방화', x: 70, y: 425, lines: ['5호선'], features: [] },

  // 6호선
  { id: 'itaewon', name: '이태원', x: 340, y: 430, lines: ['6호선'], features: ['food', 'culture'] },
  { id: 'hangangjin', name: '한강진', x: 360, y: 445, lines: ['6호선'], features: [] },
  { id: 'noksapyeong', name: '녹사평', x: 320, y: 440, lines: ['6호선'], features: [] },
  { id: 'samgakji', name: '삼각지', x: 300, y: 425, lines: ['4호선', '6호선'], features: [] },
  { id: 'hyochang', name: '효창공원앞', x: 280, y: 420, lines: ['6호선'], features: ['culture'] },
  { id: 'sangsu', name: '상수', x: 205, y: 385, lines: ['6호선'], features: ['culture', 'food'] },
  { id: 'mangwon', name: '망원', x: 185, y: 380, lines: ['6호선'], features: ['food'] },
  { id: 'mapo', name: '마포구청', x: 215, y: 370, lines: ['6호선'], features: [] },
  { id: 'gwangheungchang', name: '광흥창', x: 225, y: 410, lines: ['6호선'], features: [] },
  { id: 'daehung', name: '대흥', x: 235, y: 420, lines: ['6호선'], features: [] },
  { id: 'gongdeok', name: '공덕', x: 245, y: 430, lines: ['5호선', '6호선'], features: ['shopping'] },

  // 7호선
  { id: 'cheongdam', name: '청담', x: 470, y: 485, lines: ['7호선'], features: ['shopping', 'food'] },
  { id: 'gangnamdgu', name: '강남구청', x: 480, y: 495, lines: ['7호선'], features: [] },
  { id: 'hak-dong', name: '학동', x: 460, y: 505, lines: ['7호선'], features: [] },
  { id: 'nonhyeon', name: '논현', x: 440, y: 515, lines: ['7호선'], features: ['food'] },
  { id: 'banpo', name: '반포', x: 380, y: 520, lines: ['7호선'], features: [] },
  { id: 'naebang', name: '내방', x: 360, y: 530, lines: ['7호선'], features: [] },
  { id: 'isu', name: '이수', x: 345, y: 555, lines: ['4호선', '7호선'], features: [] },
  { id: 'namsung', name: '남성', x: 330, y: 565, lines: ['7호선'], features: [] },
  { id: 'taereung', name: '태릉입구', x: 530, y: 280, lines: ['6호선', '7호선'], features: [] },
  { id: 'jangam', name: '장암', x: 570, y: 150, lines: ['7호선'], features: [] },
  { id: 'dobong', name: '도봉산', x: 490, y: 160, lines: ['1호선', '7호선'], features: ['culture'] },

  // 8호선
  { id: 'mongchon', name: '몽촌토성', x: 555, y: 485, lines: ['8호선'], features: ['culture'] },
  { id: 'gangdong', name: '강동구청', x: 580, y: 460, lines: ['8호선'], features: [] },
  { id: 'cheonho', name: '천호', x: 590, y: 440, lines: ['5호선', '8호선'], features: ['shopping'] },
  { id: 'amsa', name: '암사', x: 620, y: 420, lines: ['8호선'], features: ['culture'] },
  { id: 'bokjeong', name: '복정', x: 530, y: 590, lines: ['8호선'], features: [] },
  { id: 'moran', name: '모란', x: 540, y: 610, lines: ['8호선'], features: ['shopping'] },

  // 9호선
  { id: 'sinnonhyeon', name: '신논현', x: 415, y: 520, lines: ['9호선'], features: ['shopping'] },
  { id: 'eonju', name: '언주', x: 450, y: 510, lines: ['9호선'], features: [] },
  { id: 'seonjeongneung', name: '선정릉', x: 470, y: 505, lines: ['9호선'], features: ['culture'] },
  { id: 'samseong-jungang', name: '삼성중앙', x: 495, y: 500, lines: ['9호선'], features: [] },
  { id: 'bongeunsa', name: '봉은사', x: 510, y: 495, lines: ['9호선'], features: ['culture'] },
  { id: 'sports-complex', name: '종합운동장', x: 525, y: 490, lines: ['9호선'], features: ['culture'] },
  { id: 'seokchon', name: '석촌', x: 560, y: 495, lines: ['8호선', '9호선'], features: [] },
  { id: 'songpa', name: '송파', x: 575, y: 505, lines: ['9호선'], features: [] },
  { id: 'olympic', name: '올림픽공원', x: 590, y: 480, lines: ['5호선', '9호선'], features: ['culture'] },
  { id: 'gaehwasan', name: '개화', x: 95, y: 410, lines: ['9호선'], features: [] },
  { id: 'noryangjin', name: '노량진', x: 230, y: 480, lines: ['1호선', '9호선'], features: ['food'] },
  { id: 'dongjak', name: '동작', x: 280, y: 500, lines: ['4호선', '9호선'], features: [] },

  // 신분당선
  { id: 'sinsa-sinbundang', name: '신사', x: 420, y: 495, lines: ['신분당선'], features: ['shopping'] },
  { id: 'gangnam-sinbundang', name: '강남', x: 430, y: 540, lines: ['신분당선'], features: ['shopping'] },
  { id: 'yangjae', name: '양재', x: 420, y: 570, lines: ['3호선', '신분당선'], features: [] },
  { id: 'yangjae-citizen', name: '양재시민의숲', x: 430, y: 590, lines: ['신분당선'], features: ['culture'] },
  { id: 'cheonggyesan', name: '청계산입구', x: 440, y: 610, lines: ['신분당선'], features: [] },
  { id: 'pangyo', name: '판교', x: 460, y: 640, lines: ['신분당선'], features: ['shopping'] },
  { id: 'jeongja', name: '정자', x: 480, y: 660, lines: ['신분당선'], features: ['shopping'] },

  // 경의중앙선
  { id: 'yongsan-jungang', name: '용산', x: 285, y: 445, lines: ['경의중앙선'], features: ['train'] },
  { id: 'oksu-jungang', name: '옥수', x: 440, y: 440, lines: ['경의중앙선'], features: [] },
  { id: 'wangsimni-jungang', name: '왕십리', x: 450, y: 385, lines: ['경의중앙선'], features: [] },
  { id: 'cheongnyangni', name: '청량리', x: 470, y: 340, lines: ['1호선', '경의중앙선'], features: ['train', 'shopping'] },
  { id: 'hoegi', name: '회기', x: 490, y: 330, lines: ['1호선', '경의중앙선'], features: ['culture'] },
  { id: 'hongdae-jungang', name: '홍대입구', x: 220, y: 370, lines: ['경의중앙선'], features: ['culture'] },
  { id: 'dmcity', name: '디지털미디어시티', x: 180, y: 340, lines: ['경의중앙선', '6호선'], features: ['culture'] },

  // 공항철도
  { id: 'seoul-arex', name: '서울역', x: 285, y: 395, lines: ['공항철도'], features: ['airport', 'train'] },
  { id: 'hongdae-arex', name: '홍대입구', x: 220, y: 370, lines: ['공항철도'], features: [] },
  { id: 'dmcity-arex', name: '디지털미디어시티', x: 180, y: 340, lines: ['공항철도'], features: [] },
  { id: 'gimpo-arex', name: '김포공항', x: 115, y: 415, lines: ['공항철도'], features: ['airport'] },
  { id: 'incheon-airport-1', name: '인천공항1터미널', x: 30, y: 450, lines: ['공항철도'], features: ['airport'] },
  { id: 'incheon-airport-2', name: '인천공항2터미널', x: 20, y: 440, lines: ['공항철도'], features: ['airport'] },

// 추가 역들
  { id: 'kkachisan', name: '까치산', x: 130, y: 470, lines: ['2호선', '5호선'], features: [] },
  { id: 'sinjeong', name: '신정', x: 115, y: 480, lines: ['2호선'], features: [] },
  { id: 'yangcheon', name: '양천구청', x: 140, y: 455, lines: ['2호선'], features: [] },
  { id: 'dorimcheon', name: '도림천', x: 145, y: 495, lines: ['2호선'], features: [] },
  { id: 'mullae', name: '문래', x: 165, y: 450, lines: ['2호선'], features: ['culture'] },
  { id: 'yeongdeungpo-gu', name: '영등포구청', x: 180, y: 460, lines: ['2호선', '5호선'], features: [] },
  { id: 'sindaebang', name: '신대방', x: 200, y: 530, lines: ['2호선'], features: [] },
  { id: 'guro-digital', name: '구로디지털단지', x: 175, y: 545, lines: ['2호선'], features: ['shopping'] },
  { id: 'daerim', name: '대림', x: 165, y: 530, lines: ['2호선', '7호선'], features: [] },
  { id: 'ogeum', name: '오금', x: 580, y: 520, lines: ['3호선', '5호선'], features: [] },
  { id: 'macheon', name: '마천', x: 610, y: 540, lines: ['5호선'], features: [] },
  { id: 'bangi', name: '방이', x: 570, y: 500, lines: ['5호선'], features: [] },
  { id: 'godeok', name: '고덕', x: 610, y: 430, lines: ['5호선'], features: [] },
  { id: 'sangil', name: '상일동', x: 630, y: 440, lines: ['5호선'], features: [] },
  { id: 'bupyeong', name: '부평구청', x: 30, y: 480, lines: ['7호선'], features: [] },
  { id: 'onsu', name: '온수', x: 120, y: 550, lines: ['1호선', '7호선'], features: [] },
  { id: 'cheonwang', name: '천왕', x: 105, y: 540, lines: ['7호선'], features: [] },
  { id: 'gwangmyeong', name: '광명사거리', x: 130, y: 580, lines: ['7호선'], features: [] },
  { id: 'boramae', name: '보라매', x: 220, y: 520, lines: ['7호선'], features: ['culture'] },
  { id: 'jangseungbaegi', name: '장승배기', x: 260, y: 540, lines: ['7호선'], features: [] },
  { id: 'sinpung', name: '신풍', x: 195, y: 510, lines: ['7호선'], features: [] },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find(station => station.id === id);
};

export const searchStations = (query: string): Station[] => {
  return stations.filter(station =>
    station.name.toLowerCase().includes(query.toLowerCase())
  );
};