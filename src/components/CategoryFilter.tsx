import { categories } from '../data/categories';
import { useStationStore } from '../stores/useStationStore';

type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStationStore();

  return (
    <div className="bg-white border-b px-4 py-2 flex gap-2 overflow-x-auto">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
          selectedCategory === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id as CategoryType)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
            selectedCategory === cat.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}