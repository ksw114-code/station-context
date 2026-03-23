import { categories } from '../data/categories';
import { useStationStore } from '../stores/useStationStore';
import { useUserStore } from '../stores/useUserStore';

type CategoryType = 'shopping' | 'train' | 'bus' | 'culture' | 'food' | 'airport';

// 온보딩 관심사 ID → 카테고리 ID 매핑
const interestToCategoryMap: Record<string, string> = {
  'restaurant': 'food',
  'cafe': 'food',
  'shopping': 'shopping',
  'movie': 'culture',
  'beauty': 'shopping',
  'entertainment': 'culture',
  'culture': 'culture',
  'health': 'culture',
  'accommodation': 'shopping',
  'transport': 'bus',
};

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStationStore();
  const { interests } = useUserStore();

  // 사용자 관심사를 카테고리 ID로 변환
  const userCategoryIds = interests
    .map(interest => interestToCategoryMap[interest])
    .filter(Boolean);

  // 카테고리 정렬: 관심사 먼저, 나머지는 뒤로
  const sortedCategories = [...categories].sort((a, b) => {
    const aIsInterest = userCategoryIds.includes(a.id);
    const bIsInterest = userCategoryIds.includes(b.id);
    
    if (aIsInterest && !bIsInterest) return -1;
    if (!aIsInterest && bIsInterest) return 1;
    return 0;
  });

  // 관심사 카테고리 개수 (구분선용)
  const interestCount = sortedCategories.filter(cat => 
    userCategoryIds.includes(cat.id)
  ).length;

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
      
      {sortedCategories.map((cat, index) => (
        <div key={cat.id} className="flex items-center">
          {/* 관심사와 일반 카테고리 사이 구분선 */}
          {index === interestCount && interestCount > 0 && (
            <div className="w-px h-6 bg-gray-300 mr-2" />
          )}
          <button
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-blue-500 text-white'
                : userCategoryIds.includes(cat.id)
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'  // 관심사는 파란 테두리
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            {/* 관심사 표시 */}
            {userCategoryIds.includes(cat.id) && selectedCategory !== cat.id && (
              <span className="text-xs">⭐</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
