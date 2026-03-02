interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-4 py-3 z-30 relative">
      <div className="flex items-center gap-3">
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={onSearchClick}
          className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-left text-gray-500 text-sm"
        >
          역명 검색 · 즐겨찾기
        </button>
      </div>
    </header>
  );
}
