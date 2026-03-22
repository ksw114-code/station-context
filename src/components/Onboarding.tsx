import { useState } from 'react';
import { 
  useUserStore, 
  INTEREST_CATEGORIES, 
  AGE_GROUP_OPTIONS, 
  OCCUPATION_OPTIONS 
} from '../stores/useUserStore';

export default function Onboarding() {
  const {
    ageGroup,
    occupation,
    interests,
    locationConsent,
    dataShareConsent,
    onboardingStep,
    setAgeGroup,
    setOccupation,
    addInterest,
    removeInterest,
    setLocationConsent,
    setDataShareConsent,
    setOnboardingStep,
    completeOnboarding,
  } = useUserStore();

  const [isAnimating, setIsAnimating] = useState(false);

  // 다음 단계로 이동
  const goNext = () => {
    if (onboardingStep < 3) {
      setIsAnimating(true);
      setTimeout(() => {
        setOnboardingStep(onboardingStep + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  // 이전 단계로 이동
  const goBack = () => {
    if (onboardingStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setOnboardingStep(onboardingStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  // 온보딩 완료
  const handleComplete = () => {
    completeOnboarding();
  };

  // 관심사 토글
  const toggleInterest = (interestId: string) => {
    if (interests.includes(interestId)) {
      removeInterest(interestId);
    } else {
      addInterest(interestId);
    }
  };

  // 단계별 완료 조건 체크
  const canProceedStep1 = ageGroup !== null && occupation !== null;
  const canProceedStep2 = interests.length >= 3;
  const canComplete = locationConsent !== 'none';

  // 진행률 계산
  const progress = (onboardingStep / 3) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white z-50 flex flex-col">
      {/* 상단 진행 바 */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {onboardingStep} / 3 단계
          </span>
          {onboardingStep > 1 && (
            <button 
              onClick={goBack}
              className="text-sm text-blue-500 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
          )}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className={`flex-1 overflow-auto transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Step 1: 기본 정보 */}
        {onboardingStep === 1 && (
          <div className="px-6 py-8">
            {/* 로고 & 인사 */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🚇</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                STATION CONTEXT
              </h1>
              <p className="text-gray-500">
                역 주변 생활을 더 스마트하게!
              </p>
            </div>

            {/* 연령대 선택 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                연령대를 선택해주세요
              </h2>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUP_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAgeGroup(option.value as typeof ageGroup)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all
                      ${ageGroup === option.value 
                        ? 'bg-blue-500 text-white shadow-md scale-105' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 직업 선택 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                직업을 선택해주세요
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {OCCUPATION_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setOccupation(option.value as typeof occupation)}
                    className={`p-4 rounded-xl text-center transition-all
                      ${occupation === option.value 
                        ? 'bg-blue-500 text-white shadow-md scale-105' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 관심사 선택 */}
        {onboardingStep === 2 && (
          <div className="px-6 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                관심 있는 카테고리를 선택해주세요
              </h1>
              <p className="text-gray-500">
                최소 3개 이상 선택해주세요 ({interests.length}개 선택됨)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {INTEREST_CATEGORIES.map(category => {
                const isSelected = interests.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleInterest(category.id)}
                    className={`p-4 rounded-xl text-left transition-all
                      ${isSelected 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-semibold">{category.name}</span>
                      {isSelected && (
                        <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                      {category.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* 선택된 관심사 표시 */}
            {interests.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700 mb-2">선택한 관심사:</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map(id => {
                    const category = INTEREST_CATEGORIES.find(c => c.id === id);
                    return category ? (
                      <span key={id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {category.icon} {category.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: 데이터 활용 동의 */}
        {onboardingStep === 3 && (
          <div className="px-6 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                더 나은 서비스를 위해
              </h1>
              <p className="text-gray-500">
                맞춤 추천을 위한 설정을 선택해주세요
              </p>
            </div>

            {/* 위치 정보 동의 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">위치 정보 활용</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    역 도착 시 자동으로 주변 정보를 추천해드려요
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'full', label: '항상 사용', desc: '백그라운드에서도 위치 감지' },
                  { value: 'partial', label: '앱 사용 중에만', desc: '앱이 열려있을 때만' },
                  { value: 'none', label: '사용 안 함', desc: '직접 역을 검색합니다' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setLocationConsent(option.value as typeof locationConsent)}
                    className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all
                      ${locationConsent === option.value 
                        ? 'bg-blue-50 border-2 border-blue-500' 
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${locationConsent === option.value 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                      }`}
                    >
                      {locationConsent === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 익명 통계 동의 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">익명 통계 제공</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    익명화된 이용 통계로 서비스를 개선해요
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    ※ 개인 식별 정보는 수집하지 않습니다
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setDataShareConsent(!dataShareConsent)}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-all
                  ${dataShareConsent 
                    ? 'bg-green-50 border-2 border-green-500' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-7 rounded-full relative transition-colors
                    ${dataShareConsent ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform
                      ${dataShareConsent ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                  <span className="font-medium text-gray-800">
                    {dataShareConsent ? '동의함' : '동의 안 함'}
                  </span>
                </div>
                {dataShareConsent && (
                  <div className="flex items-center gap-1 text-green-600">
                    <span className="text-sm font-medium">+포인트 적립</span>
                    <span className="text-lg">💰</span>
                  </div>
                )}
              </button>

              {dataShareConsent && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✨ 월 최대 <strong>1,000P</strong> 적립 가능!
                  </p>
                </div>
              )}
            </div>

            {/* 개인정보 처리방침 링크 */}
            <p className="text-center text-xs text-gray-400 mt-6">
              시작하면{' '}
              <button className="text-blue-500 underline">이용약관</button> 및{' '}
              <button className="text-blue-500 underline">개인정보처리방침</button>에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 bg-white border-t">
        {onboardingStep === 1 && (
          <button
            onClick={goNext}
            disabled={!canProceedStep1}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${canProceedStep1 
                ? 'bg-blue-500 text-white hover:bg-blue-600 active:scale-98' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            다음
          </button>
        )}

        {onboardingStep === 2 && (
          <button
            onClick={goNext}
            disabled={!canProceedStep2}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${canProceedStep2 
                ? 'bg-blue-500 text-white hover:bg-blue-600 active:scale-98' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {canProceedStep2 ? '다음' : `${3 - interests.length}개 더 선택해주세요`}
          </button>
        )}

        {onboardingStep === 3 && (
          <button
            onClick={handleComplete}
            disabled={!canComplete}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${canComplete 
                ? 'bg-blue-500 text-white hover:bg-blue-600 active:scale-98' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            🚇 시작하기
          </button>
        )}
      </div>
    </div>
  );
}
