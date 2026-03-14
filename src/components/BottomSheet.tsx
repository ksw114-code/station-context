import { useStationStore } from '../stores/useStationStore';
import { getLineColor } from '../data/lines';
import { getCategoryById } from '../data/categories';
import { getStationDetails } from '../data/stationDetails';
import { getStationExits } from '../data/stationExits';
import { getStationTimetable } from '../data/stationTimetable';
import { getCurrentCongestion, getCongestionLevel, stationCongestions } from '../data/congestion';
import RealtimeArrival from './RealtimeArrival';
import { useState } from 'react';

export default function BottomSheet() {
  const { selectedStation, isBottomSheetOpen, closeBottomSheet, toggleFavorite, isFavorite } = useStationStore();
  const [activeTab, setActiveTab] = useState<'info' | 'exits' | 'timetable' | 'congestion' | 'realtime'>('info');

  if (!isBottomSheetOpen || !selectedStation) return null;

  const detail = getStationDetails(selectedStation.id) as { address?: string; phone?: string; facilities?: string[] } | null;
  const exits = getStationExits(selectedStation.id);
  const timetable = getStationTimetable(selectedStation.id);
  const congestion = getCurrentCongestion(selectedStation.id);
  const stationCongestionData = stationCongestions.find(s => s.stationId === selectedStation.id);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-30 max-h-[70vh] flex flex-col animate-slide-up">
      {/* 핸들 */}
      <div className="flex justify-center py-2">
        <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* 헤더 */}
      <div className="px-4 pb-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {selectedStation.lines.map(line => (
              <span
                key={line}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: getLineColor(line) }}
              >
                {line.replace('호선', '')}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold">{selectedStation.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(selectedStation.id)}
            className="p-2"
          >
            <svg
              className={`w-6 h-6 ${isFavorite(selectedStation.id) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill={isFavorite(selectedStation.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button onClick={closeBottomSheet} className="p-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${activeTab === 'info' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          역정보
        </button>
        <button
          onClick={() => setActiveTab('exits')}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${activeTab === 'exits' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          🚪출구
        </button>
        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${activeTab === 'timetable' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          🕐첫/막차
        </button>
        <button
          onClick={() => setActiveTab('congestion')}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${activeTab === 'congestion' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          👥혼잡도
        </button>
        <button
          onClick={() => setActiveTab('realtime')}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${activeTab === 'realtime' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          🚇실시간
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 역 정보 탭 */}
        {activeTab === 'info' && (
          <>
            {/* 카테고리 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedStation.features.map(feature => {
                const category = getCategoryById(feature);
                return category ? (
                  <span key={feature} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                ) : null;
              })}
            </div>

            {/* 상세 정보 */}
            {detail && (
              <div className="space-y-3">
                {detail.address && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">📍</span>
                    <div>
                      <div className="text-xs text-gray-500">주소</div>
                      <div className="text-sm">{detail.address}</div>
                    </div>
                  </div>
                )}
                {detail.phone && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">📞</span>
                    <div>
                      <div className="text-xs text-gray-500">전화번호</div>
                      <div className="text-sm">{detail.phone}</div>
                    </div>
                  </div>
                )}
                {detail.facilities && Array.isArray(detail.facilities) && detail.facilities.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">🏢</span>
                    <div>
                      <div className="text-xs text-gray-500">편의시설</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {detail.facilities.map((f: string, idx: number) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!detail && (
              <div className="text-center py-8 text-gray-400">
                상세 정보가 없습니다
              </div>
            )}
          </>
        )}

        {/* 출구 정보 탭 */}
        {activeTab === 'exits' && (
          <>
            {exits.length > 0 ? (
              <div className="space-y-2">
                {exits.map((exit) => (
                  <div key={exit.exitNumber} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {exit.exitNumber}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{exit.landmark}</div>
                      {exit.facilities && exit.facilities.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {exit.facilities.map((f, idx) => (
                            <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              {f === '엘리베이터' ? '🛗 ' : ''}
                              {f === '에스컬레이터' ? '📶 ' : ''}
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">🚪</p>
                <p>출구 정보가 없습니다</p>
                <p className="text-sm mt-1">추후 업데이트 예정입니다</p>
              </div>
            )}
          </>
        )}

        {/* 첫차/막차 탭 */}
        {activeTab === 'timetable' && (
          <>
            {timetable.length > 0 ? (
              <div className="space-y-3">
                {timetable.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span 
                        className="px-2 py-1 rounded text-white text-xs font-bold"
                        style={{ backgroundColor: getLineColor(item.line) }}
                      >
                        {item.line.replace('호선', '')}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{item.direction}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-center flex-1">
                        <div className="text-xs text-gray-500 mb-1">🌅 첫차</div>
                        <div className="text-xl font-bold text-blue-600">{item.firstTrain}</div>
                      </div>
                      <div className="w-px bg-gray-200"></div>
                      <div className="text-center flex-1">
                        <div className="text-xs text-gray-500 mb-1">🌙 막차</div>
                        <div className="text-xl font-bold text-purple-600">{item.lastTrain}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-gray-400 text-center mt-2">
                  * 평일 기준이며, 주말/공휴일은 다를 수 있습니다
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">🕐</p>
                <p>시간표 정보가 없습니다</p>
                <p className="text-sm mt-1">추후 업데이트 예정입니다</p>
              </div>
            )}
          </>
        )}

        {/* 혼잡도 탭 */}
        {activeTab === 'congestion' && (
          <>
            {congestion.length > 0 ? (
              <div className="space-y-4">
                {/* 현재 시간 혼잡도 */}
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-blue-600 font-medium">현재 시간 ({new Date().getHours()}시) 기준</div>
                </div>

                {congestion.map((item, idx) => {
                  const levelInfo = getCongestionLevel(item.level);
                  return (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span 
                            className="px-2 py-1 rounded text-white text-xs font-bold"
                            style={{ backgroundColor: getLineColor(item.line) }}
                          >
                            {item.line.replace('호선', '')}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{item.direction}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${levelInfo.bgColor} ${levelInfo.color}`}>
                          {levelInfo.emoji} {levelInfo.text}
                        </div>
                      </div>
                      
                      {/* 혼잡도 바 */}
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4].map((level) => (
                          <div 
                            key={level}
                            className={`flex-1 h-2 rounded ${item.level >= level ? 
                              (level === 1 ? 'bg-green-500' : level === 2 ? 'bg-blue-500' : level === 3 ? 'bg-orange-500' : 'bg-red-500') 
                              : 'bg-gray-200'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* 시간대별 혼잡도 */}
                {stationCongestionData && stationCongestionData.lines.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">📊 시간대별 혼잡도</div>
                    {stationCongestionData.lines[0].directions[0] && (
                      <div className="bg-white border rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-2">{stationCongestionData.lines[0].line} {stationCongestionData.lines[0].directions[0].direction}</div>
                        <div className="flex gap-0.5 items-end h-16">
                          {stationCongestionData.lines[0].directions[0].hourly.map((h, idx) => {
                            const height = h.level * 25;
                            const colors = ['bg-green-400', 'bg-blue-400', 'bg-orange-400', 'bg-red-400'];
                            const isCurrentHour = h.hour === new Date().getHours();
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center">
                                <div 
                                  className={`w-full rounded-t ${colors[h.level - 1]} ${isCurrentHour ? 'ring-2 ring-black' : ''}`}
                                  style={{ height: height + '%' }}
                                ></div>
                                <div className={`text-xs mt-1 ${isCurrentHour ? 'font-bold' : 'text-gray-400'}`}>{h.hour}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-xs text-gray-400 text-center mt-2">
                  * 평일 기준 예상 혼잡도입니다
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">👥</p>
                <p>혼잡도 정보가 없습니다</p>
                <p className="text-sm mt-1">추후 업데이트 예정입니다</p>
              </div>
            )}
          </>
        )}

        {/* 실시간 도착 탭 */}
        {activeTab === 'realtime' && (
          <RealtimeArrival stationName={selectedStation.name} />
        )}
      </div>
    </div>
  );
}
