export interface TimetableInfo {
  line: string;
  direction: string;
  firstTrain: string;
  lastTrain: string;
}

export interface StationTimetable {
  stationId: string;
  timetable: TimetableInfo[];
}

export const stationTimetables: StationTimetable[] = [
  {
    stationId: 'gangnam',
    timetable: [
      { line: '2호선', direction: '외선 (잠실방면)', firstTrain: '05:28', lastTrain: '00:48' },
      { line: '2호선', direction: '내선 (신도림방면)', firstTrain: '05:30', lastTrain: '00:50' },
      { line: '신분당선', direction: '정자방면', firstTrain: '05:30', lastTrain: '00:00' },
      { line: '신분당선', direction: '신사방면', firstTrain: '05:35', lastTrain: '00:05' },
    ]
  },
  {
    stationId: 'hongdae',
    timetable: [
      { line: '2호선', direction: '외선 (잠실방면)', firstTrain: '05:30', lastTrain: '00:45' },
      { line: '2호선', direction: '내선 (신도림방면)', firstTrain: '05:28', lastTrain: '00:47' },
      { line: '경의중앙선', direction: '문산방면', firstTrain: '05:20', lastTrain: '23:40' },
      { line: '경의중앙선', direction: '용문방면', firstTrain: '05:25', lastTrain: '23:50' },
      { line: '공항철도', direction: '인천공항방면', firstTrain: '05:35', lastTrain: '00:00' },
      { line: '공항철도', direction: '서울역방면', firstTrain: '05:40', lastTrain: '00:10' },
    ]
  },
  {
    stationId: 'jamsil',
    timetable: [
      { line: '2호선', direction: '외선 (강남방면)', firstTrain: '05:25', lastTrain: '00:42' },
      { line: '2호선', direction: '내선 (건대방면)', firstTrain: '05:27', lastTrain: '00:44' },
      { line: '8호선', direction: '모란방면', firstTrain: '05:30', lastTrain: '00:30' },
      { line: '8호선', direction: '암사방면', firstTrain: '05:28', lastTrain: '00:28' },
    ]
  },
  {
    stationId: 'express',
    timetable: [
      { line: '3호선', direction: '대화방면', firstTrain: '05:30', lastTrain: '00:35' },
      { line: '3호선', direction: '오금방면', firstTrain: '05:28', lastTrain: '00:33' },
      { line: '7호선', direction: '장암방면', firstTrain: '05:32', lastTrain: '00:40' },
      { line: '7호선', direction: '청라국제도시방면', firstTrain: '05:30', lastTrain: '00:38' },
      { line: '9호선', direction: '중앙보훈병원방면', firstTrain: '05:35', lastTrain: '00:00' },
      { line: '9호선', direction: '개화방면', firstTrain: '05:33', lastTrain: '23:58' },
    ]
  },
  {
    stationId: 'seoul',
    timetable: [
      { line: '1호선', direction: '소요산방면', firstTrain: '05:20', lastTrain: '00:30' },
      { line: '1호선', direction: '인천/신창방면', firstTrain: '05:18', lastTrain: '00:28' },
      { line: '4호선', direction: '당고개방면', firstTrain: '05:30', lastTrain: '00:35' },
      { line: '4호선', direction: '오이도방면', firstTrain: '05:28', lastTrain: '00:33' },
      { line: '공항철도', direction: '인천공항방면', firstTrain: '05:20', lastTrain: '23:40' },
      { line: '경의중앙선', direction: '문산방면', firstTrain: '05:15', lastTrain: '23:30' },
    ]
  },
  {
    stationId: 'myeongdong',
    timetable: [
      { line: '4호선', direction: '당고개방면', firstTrain: '05:35', lastTrain: '00:40' },
      { line: '4호선', direction: '오이도방면', firstTrain: '05:33', lastTrain: '00:38' },
    ]
  },
  {
    stationId: 'yeouido',
    timetable: [
      { line: '5호선', direction: '방화방면', firstTrain: '05:30', lastTrain: '00:20' },
      { line: '5호선', direction: '마천/하남방면', firstTrain: '05:28', lastTrain: '00:18' },
      { line: '9호선', direction: '중앙보훈병원방면', firstTrain: '05:32', lastTrain: '00:05' },
      { line: '9호선', direction: '개화방면', firstTrain: '05:30', lastTrain: '00:03' },
    ]
  },
  {
    stationId: 'sindorim',
    timetable: [
      { line: '1호선', direction: '소요산방면', firstTrain: '05:15', lastTrain: '00:25' },
      { line: '1호선', direction: '인천/신창방면', firstTrain: '05:13', lastTrain: '00:23' },
      { line: '2호선', direction: '외선 (신림방면)', firstTrain: '05:28', lastTrain: '00:45' },
      { line: '2호선', direction: '내선 (영등포방면)', firstTrain: '05:30', lastTrain: '00:47' },
    ]
  },
];

export const getStationTimetable = (stationId: string): TimetableInfo[] => {
  const station = stationTimetables.find(s => s.stationId === stationId);
  return station?.timetable || [];
};