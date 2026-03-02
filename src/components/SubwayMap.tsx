import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { stations } from '../data/stations';
import StationMarker from './StationMarker';

export default function SubwayMap() {
  return (
    <div className="flex-1 relative overflow-hidden bg-gray-100">
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
        <p className="text-sm text-gray-600">🗺️ 역을 클릭하여 정보를 확인하세요</p>
      </div>

      <TransformWrapper 
        initialScale={0.5} 
        minScale={0.3} 
        maxScale={2} 
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button onClick={() => zoomIn()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-lg font-bold text-gray-600">+</button>
              <button onClick={() => zoomOut()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-lg font-bold text-gray-600">−</button>
              <button onClick={() => resetTransform()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs text-gray-600">리셋</button>
            </div>

            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
              <div className="relative">
                {/* 실제 노선도 이미지 */}
                <img 
                  src="/subway-map.jpg" 
                  alt="서울 지하철 노선도" 
                  className="max-w-none"
                  style={{ width: '1500px' }}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}