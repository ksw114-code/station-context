import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 사용자 프로필 타입 정의
export interface UserProfile {
  // 기본 정보
  ageGroup: '10s' | '20s' | '30s' | '40s' | '50s+' | null;
  occupation: 'student' | 'office' | 'freelance' | 'homemaker' | 'other' | null;
  
  // 관심사 (최소 3개 선택)
  interests: string[];
  
  // 자주 가는 역 (온보딩에서 선택)
  frequentStations: string[];
  
  // 동의 항목
  locationConsent: 'full' | 'partial' | 'none';  // 위치 정보 활용 동의
  dataShareConsent: boolean;  // 익명 통계 제공 동의 (포인트 적립)
  
  // 온보딩 완료 여부
  onboardingCompleted: boolean;
  onboardingStep: number;  // 현재 온보딩 단계 (1, 2, 3)
  
  // 메타 정보
  createdAt: string | null;
  updatedAt: string | null;
}

// 스토어 액션 타입
interface UserStoreActions {
  // 기본 정보 설정
  setAgeGroup: (ageGroup: UserProfile['ageGroup']) => void;
  setOccupation: (occupation: UserProfile['occupation']) => void;
  
  // 관심사 관리
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  setInterests: (interests: string[]) => void;
  
  // 자주 가는 역 관리
  addFrequentStation: (stationId: string) => void;
  removeFrequentStation: (stationId: string) => void;
  setFrequentStations: (stations: string[]) => void;
  
  // 동의 설정
  setLocationConsent: (consent: UserProfile['locationConsent']) => void;
  setDataShareConsent: (consent: boolean) => void;
  
  // 온보딩 관리
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
  // 전체 프로필 업데이트
  updateProfile: (updates: Partial<UserProfile>) => void;
  
  // 프로필 초기화
  resetProfile: () => void;
}

// 초기 상태
const initialState: UserProfile = {
  ageGroup: null,
  occupation: null,
  interests: [],
  frequentStations: [],
  locationConsent: 'none',
  dataShareConsent: false,
  onboardingCompleted: false,
  onboardingStep: 1,
  createdAt: null,
  updatedAt: null,
};

// 스토어 생성
export const useUserStore = create<UserProfile & UserStoreActions>()(
  persist(
    (set, get) => ({
      // 초기 상태
      ...initialState,
      
      // 기본 정보 설정
      setAgeGroup: (ageGroup) => set({ 
        ageGroup, 
        updatedAt: new Date().toISOString() 
      }),
      
      setOccupation: (occupation) => set({ 
        occupation, 
        updatedAt: new Date().toISOString() 
      }),
      
      // 관심사 관리
      addInterest: (interest) => {
        const current = get().interests;
        if (!current.includes(interest)) {
          set({ 
            interests: [...current, interest],
            updatedAt: new Date().toISOString()
          });
        }
      },
      
      removeInterest: (interest) => {
        set({ 
          interests: get().interests.filter(i => i !== interest),
          updatedAt: new Date().toISOString()
        });
      },
      
      setInterests: (interests) => set({ 
        interests,
        updatedAt: new Date().toISOString()
      }),
      
      // 자주 가는 역 관리
      addFrequentStation: (stationId) => {
        const current = get().frequentStations;
        if (!current.includes(stationId)) {
          set({ 
            frequentStations: [...current, stationId],
            updatedAt: new Date().toISOString()
          });
        }
      },
      
      removeFrequentStation: (stationId) => {
        set({ 
          frequentStations: get().frequentStations.filter(s => s !== stationId),
          updatedAt: new Date().toISOString()
        });
      },
      
      setFrequentStations: (stations) => set({ 
        frequentStations: stations,
        updatedAt: new Date().toISOString()
      }),
      
      // 동의 설정
      setLocationConsent: (consent) => set({ 
        locationConsent: consent,
        updatedAt: new Date().toISOString()
      }),
      
      setDataShareConsent: (consent) => set({ 
        dataShareConsent: consent,
        updatedAt: new Date().toISOString()
      }),
      
      // 온보딩 관리
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      
      completeOnboarding: () => set({ 
        onboardingCompleted: true,
        onboardingStep: 3,
        createdAt: get().createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
      
      resetOnboarding: () => set({ 
        onboardingCompleted: false,
        onboardingStep: 1
      }),
      
      // 전체 프로필 업데이트
      updateProfile: (updates) => set({ 
        ...updates,
        updatedAt: new Date().toISOString()
      }),
      
      // 프로필 초기화
      resetProfile: () => set(initialState),
    }),
    {
      name: 'station-context-user', // localStorage 키
      version: 1, // 버전 관리 (스키마 변경 시 마이그레이션용)
    }
  )
);

// 카테고리 옵션 (온보딩 관심사 선택용)
export const INTEREST_CATEGORIES = [
  { id: 'restaurant', name: '맛집', icon: '🍽️', description: '한식, 중식, 일식, 양식 등' },
  { id: 'cafe', name: '카페', icon: '☕', description: '커피, 디저트, 베이커리' },
  { id: 'shopping', name: '쇼핑', icon: '🛒', description: '백화점, 마트, 편의점' },
  { id: 'movie', name: '영화', icon: '🎬', description: '영화관, CGV, 메가박스' },
  { id: 'beauty', name: '미용', icon: '💇', description: '미용실, 네일샵' },
  { id: 'entertainment', name: '오락', icon: '🎮', description: 'PC방, 노래방, 볼링장' },
  { id: 'culture', name: '문화', icon: '📚', description: '도서관, 전시회, 공연장' },
  { id: 'health', name: '헬스', icon: '🏋️', description: '헬스장, 필라테스, 요가' },
  { id: 'accommodation', name: '숙박', icon: '🏨', description: '호텔, 모텔, 게스트하우스' },
  { id: 'transport', name: '교통', icon: '🚌', description: '버스정류장, 따릉이, 주차장' },
] as const;

// 연령대 옵션
export const AGE_GROUP_OPTIONS = [
  { value: '10s', label: '10대' },
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s+', label: '50대 이상' },
] as const;

// 직업 옵션
export const OCCUPATION_OPTIONS = [
  { value: 'student', label: '학생', icon: '📚' },
  { value: 'office', label: '직장인', icon: '💼' },
  { value: 'freelance', label: '프리랜서', icon: '💻' },
  { value: 'homemaker', label: '주부', icon: '🏠' },
  { value: 'other', label: '기타', icon: '👤' },
] as const;
