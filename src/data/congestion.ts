export interface CongestionInfo {
  line: string;
  direction: string;
  level: number; // 1: 여유, 2: 보통, 3: 혼잡, 4: 매우혼잡
  message: string;
}

export interface HourlyCongestion {
  hour: number;
  level: number;
}

export interface StationCongestion {
  stationId: string;
  lines: {
    line: string;
    directions: {
      direction: string;
      hourly: HourlyCongestion[];
    }[];
  }[];
}

// 시간대별 혼잡도 데이터 (평일 기준)
export const stationCongestions: StationCongestion[] = [
  {
    stationId: 'gangnam',
    lines: [
      {
        line: '2호선',
        directions: [
          {
            direction: '외선 (잠실방면)',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 3 }, { hour: 8, level: 4 },
              { hour: 9, level: 3 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 4 }, { hour: 19, level: 4 }, { hour: 20, level: 3 },
              { hour: 21, level: 2 }, { hour: 22, level: 2 }, { hour: 23, level: 1 },
            ]
          },
          {
            direction: '내선 (신도림방면)',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 2 }, { hour: 8, level: 3 },
              { hour: 9, level: 2 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 3 }, { hour: 17, level: 4 },
              { hour: 18, level: 4 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      },
      {
        line: '신분당선',
        directions: [
          {
            direction: '정자방면',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 2 }, { hour: 8, level: 3 },
              { hour: 9, level: 2 }, { hour: 10, level: 1 }, { hour: 11, level: 1 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 1 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 4 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 1 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      }
    ]
  },
  {
    stationId: 'hongdae',
    lines: [
      {
        line: '2호선',
        directions: [
          {
            direction: '외선 (잠실방면)',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 2 }, { hour: 8, level: 3 },
              { hour: 9, level: 2 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 3 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 2 }, { hour: 23, level: 2 },
            ]
          },
          {
            direction: '내선 (신도림방면)',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 3 }, { hour: 8, level: 4 },
              { hour: 9, level: 3 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 3 }, { hour: 19, level: 2 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      }
    ]
  },
  {
    stationId: 'jamsil',
    lines: [
      {
        line: '2호선',
        directions: [
          {
            direction: '외선 (강남방면)',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 3 }, { hour: 8, level: 4 },
              { hour: 9, level: 3 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 4 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      },
      {
        line: '8호선',
        directions: [
          {
            direction: '모란방면',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 2 }, { hour: 8, level: 3 },
              { hour: 9, level: 2 }, { hour: 10, level: 1 }, { hour: 11, level: 1 },
              { hour: 12, level: 1 }, { hour: 13, level: 1 }, { hour: 14, level: 1 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 3 }, { hour: 19, level: 2 }, { hour: 20, level: 2 },
              { hour: 21, level: 1 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      }
    ]
  },
  {
    stationId: 'seoul',
    lines: [
      {
        line: '1호선',
        directions: [
          {
            direction: '소요산방면',
            hourly: [
              { hour: 6, level: 2 }, { hour: 7, level: 3 }, { hour: 8, level: 4 },
              { hour: 9, level: 3 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 3 }, { hour: 17, level: 4 },
              { hour: 18, level: 4 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
          {
            direction: '인천방면',
            hourly: [
              { hour: 6, level: 1 }, { hour: 7, level: 2 }, { hour: 8, level: 3 },
              { hour: 9, level: 2 }, { hour: 10, level: 2 }, { hour: 11, level: 2 },
              { hour: 12, level: 2 }, { hour: 13, level: 2 }, { hour: 14, level: 2 },
              { hour: 15, level: 2 }, { hour: 16, level: 2 }, { hour: 17, level: 3 },
              { hour: 18, level: 4 }, { hour: 19, level: 3 }, { hour: 20, level: 2 },
              { hour: 21, level: 2 }, { hour: 22, level: 1 }, { hour: 23, level: 1 },
            ]
          },
        ]
      }
    ]
  },
];

export const getCongestionLevel = (level: number): { text: string; color: string; bgColor: string; emoji: string } => {
  switch (level) {
    case 1:
      return { text: '여유', color: 'text-green-600', bgColor: 'bg-green-100', emoji: '😊' };
    case 2:
      return { text: '보통', color: 'text-blue-600', bgColor: 'bg-blue-100', emoji: '🙂' };
    case 3:
      return { text: '혼잡', color: 'text-orange-600', bgColor: 'bg-orange-100', emoji: '😰' };
    case 4:
      return { text: '매우혼잡', color: 'text-red-600', bgColor: 'bg-red-100', emoji: '😫' };
    default:
      return { text: '정보없음', color: 'text-gray-600', bgColor: 'bg-gray-100', emoji: '❓' };
  }
};

export const getCurrentCongestion = (stationId: string): CongestionInfo[] => {
  const station = stationCongestions.find(s => s.stationId === stationId);
  if (!station) return [];

  const currentHour = new Date().getHours();
  const result: CongestionInfo[] = [];

  station.lines.forEach(line => {
    line.directions.forEach(dir => {
      const hourData = dir.hourly.find(h => h.hour === currentHour);
      const level = hourData?.level || 2;
      const levelInfo = getCongestionLevel(level);

      result.push({
        line: line.line,
        direction: dir.direction,
        level: level,
        message: levelInfo.text
      });
    });
  });

  return result;
};