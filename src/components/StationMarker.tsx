import { getLineColor } from '../data/lines';
import { getCategoryById } from '../data/categories';
import { useStationStore } from '../stores/useStationStore';

type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lines: string[];
  features: CategoryType[];
}

interface StationMarkerProps {
  station: Station;
}

export default function StationMarker({ station }: StationMarkerProps) {
  const { selectedStation, selectedCategory, setSelectedStation } = useStationStore();

  const isSelected = selectedStation?.id === station.id;
  const mainColor = getLineColor(station.lines[0]);
  const isMultiLine = station.lines.length > 1;
  const hasFeatures = station.features.length > 0;
  const matchesFilter = !selectedCategory || station.features.includes(selectedCategory);
  const opacity = matchesFilter ? 1 : 0.3;

  return (
    <g
      className="station-marker cursor-pointer"
      onClick={() => setSelectedStation(station)}
      style={{ opacity }}
    >
      {hasFeatures && matchesFilter && (
        <>
          <rect
            x={station.x - station.features.length * 8}
            y={station.y - 28}
            width={station.features.length * 16}
            height={16}
            rx={8}
            fill="white"
            stroke="#e5e5e5"
          />
          {station.features.map((feature, idx) => {
            const cat = getCategoryById(feature);
            return (
              <text
                key={feature}
                x={station.x - station.features.length * 8 + 8 + idx * 16}
                y={station.y - 16}
                fontSize="10"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {cat?.icon}
              </text>
            );
          })}
        </>
      )}
      <circle
        cx={station.x}
        cy={station.y}
        r={isMultiLine ? 8 : 6}
        fill="white"
        stroke={isSelected ? '#3B82F6' : mainColor}
        strokeWidth={isSelected ? 3 : 2}
      />
      {isMultiLine && (
        <circle
          cx={station.x}
          cy={station.y}
          r={4}
          fill="white"
          stroke={mainColor}
          strokeWidth={1}
        />
      )}
      <text
        x={station.x}
        y={station.y + 18}
        textAnchor="middle"
        fontSize="10"
        fontWeight={isSelected ? 'bold' : 'normal'}
        fill={isSelected ? '#3B82F6' : '#333'}
        className="pointer-events-none select-none"
      >
        {station.name}
      </text>
    </g>
  );
}