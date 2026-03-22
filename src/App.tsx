import { useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SubwayMap from './components/SubwayMap';
import BottomSheet from './components/BottomSheet';
import SearchOverlay from './components/SearchOverlay';
import RoutePanel from './components/RoutePanel';
import RouteDetail from './components/RouteDetail';
import NearbyStations from './components/NearbyStations';
import Onboarding from './components/Onboarding';
import { useStationStore } from './stores/useStationStore';
import { useUserStore } from './stores/useUserStore';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const { isRouteMode, departureStation, arrivalStation } = useStationStore();
  const { onboardingCompleted } = useUserStore();

  const hasRoute = departureStation || arrivalStation;

  // 온보딩 미완료 시 온보딩 화면 표시
  if (!onboardingCompleted) {
    return <Onboarding />;
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative bg-gray-50">
      {/* 헤더 - 검색 및 즐겨찾기 */}
      <Header onSearchClick={() => setShowSearch(true)} />
      
      {/* 경로 패널 - 출발/도착역 선택 시에만 표시 */}
      {hasRoute && <RoutePanel />}
      
      {/* 카테고리 필터 - 경로 검색 중이 아닐 때만 표시 */}
      {!hasRoute && <CategoryFilter />}
      
      {/* 지하철 노선도 */}
      <SubwayMap />
      
      {/* 하단 시트 - 역 상세 정보 */}
      <BottomSheet />
      
      {/* 내 위치 기반 가까운 역 */}
      <NearbyStations />
      
      {/* 검색 오버레이 */}
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
      
      {/* 경로 상세 */}
      {isRouteMode && <RouteDetail />}
      
      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
