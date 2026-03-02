import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { stations } from '../data/stations';
import { lineColors } from '../data/lines';
import StationMarker from './StationMarker';

export default function SubwayMap() {
  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
        <p className="text-sm text-gray-600">🗺️ 역을 클릭하여 정보를 확인하세요</p>
      </div>
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={2} centerOnInit={true}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button onClick={() => zoomIn()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-lg font-bold text-gray-600">+</button>
              <button onClick={() => zoomOut()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-lg font-bold text-gray-600">−</button>
              <button onClick={() => resetTransform()} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs text-gray-600">리셋</button>
            </div>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
              <svg viewBox="0 0 700 700" className="w-full h-full" style={{ minWidth: '700px', minHeight: '700px' }}>
                <rect width="100%" height="100%" fill="white" />
                <path d="M 220 370 L 310 365 L 410 365 L 450 385 L 500 425 L 545 470 L 505 505 L 430 535 L 340 580 L 280 560 L 175 430 L 195 390 L 220 370" fill="none" stroke={lineColors['2호선']} strokeWidth="4" strokeLinecap="round" />
                <path d="M 285 280 L 285 445 L 185 490 L 155 520" fill="none" stroke={lineColors['1호선']} strokeWidth="4" strokeLinecap="round" />
                <path d="M 290 320 L 350 370 L 355 510 L 445 475 L 540 560" fill="none" stroke={lineColors['3호선']} strokeWidth="4" strokeLinecap="round" />
                <path d="M 285 395 L 345 395 L 390 375 L 340 580" fill="none" stroke={lineColors['4호선']} strokeWidth="4" strokeLinecap="round" />
                <path d="M 115 415 L 210 475 L 305 345 L 450 385" fill="none" stroke={lineColors['5호선']} strokeWidth="4" strokeLinecap="round" />
                <path d="M 115 415 L 175 430 L 210 475 L 355 510 L 415 520" fill="none" stroke={lineColors['9호선']} strokeWidth="4" strokeLinecap="round" />
                {stations.map((station) => (
                  <StationMarker key={station.id} station={station} />
                ))}
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
