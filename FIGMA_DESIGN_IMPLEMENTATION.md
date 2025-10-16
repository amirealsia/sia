# 🎨 Figma 디자인 적용 가이드

선택하신 NFT 랜딩페이지 디자인 적용 방법입니다.

---

## 📋 선택된 디자인

**Figma URL**: https://www.figma.com/community/file/1525544901440427466/nft-landing-page-design-for-web3-digital-collectibles

**디자인 특징**:
- ✅ Web3/NFT 특화 디자인
- ✅ 모던하고 고급스러운 레이아웃
- ✅ 다크/라이트 모드 지원
- ✅ 애니메이션 친화적 구조
- ✅ 디지털 컬렉터블 최적화

---

## 🚀 방법 1: Figma에서 직접 작업 (추천!)

### 1단계: Figma 파일 복제

1. **Figma 링크 열기**:
   ```
   https://www.figma.com/community/file/1525544901440427466/nft-landing-page-design-for-web3-digital-collectibles
   ```

2. **Duplicate 버튼 클릭** (우측 상단)
   - 내 Figma 계정으로 복사됨
   - 자유롭게 편집 가능

### 2단계: 디자인 커스터마이징

#### 브랜드 컬러 변경

**현재 프로젝트 컬러**:
```
Pink: #FF69B4, #FFB6C1 (핑크 계열)
Blue: #87CEEB, #4169E1 (블루 계열)
Gold: #FFD700 (액센트)
Background: Gradient (pink-50 → white → blue-50)
```

**Figma에서 변경하기**:
1. 왼쪽 레이어 패널에서 "Design System" 또는 "Colors" 찾기
2. 각 색상 클릭 → 우측 패널에서 색상 변경
3. `Cmd/Ctrl + G` (글로벌 스타일 업데이트)

#### 텍스트 수정

**변경할 텍스트**:
```
프로젝트명: "Am I Real Sia"
태그라인: "Am I real, or just AI?"
설명: "365-day AI art journey..."
블록체인: "Solana"
총 공급량: "365 Unique NFTs"
```

**Figma에서 변경하기**:
1. 텍스트 레이어 더블클릭
2. 내용 수정
3. `Esc` 키로 완료

#### 이미지 교체

**교체할 이미지**:
- Hero 이미지: SIA 캐릭터 메인 비주얼
- NFT 갤러리: 작품 샘플 4-6개
- 배경 패턴: 커스텀 브랜드 패턴

**Figma에서 교체하기**:
1. 이미지 레이어 선택
2. 우측 패널 → "Fill" → "Image"
3. "Choose Image..." 클릭 → 새 이미지 업로드

### 3단계: 에셋 내보내기

#### 이미지 추출
1. 내보낼 요소 선택 (이미지, 아이콘 등)
2. 우측 하단 "Export" 섹션
3. 포맷 선택:
   - **PNG**: 사진, 복잡한 그래픽 (2x 해상도)
   - **SVG**: 아이콘, 로고, 벡터
   - **JPG**: 대용량 사진 (압축 필요시)
4. **Export** 버튼 클릭

**저장 경로**:
```
landing/public/images/
├── hero/
│   ├── sia-main.png (메인 캐릭터)
│   └── background.svg (배경 패턴)
├── nfts/
│   ├── day-001.png
│   ├── day-002.png
│   └── ...
└── icons/
    ├── solana.svg
    ├── opensea.svg
    └── ...
```

---

## 🛠️ 방법 2: Figma VS Code 확장프로그램 사용

### VS Code에서 Figma 디자인 보기

**이미 설치됨**: `figma.figma-vscode-extension` ✅

#### 사용 방법:

1. **VS Code에서 Figma 열기**:
   ```
   Ctrl + Shift + P → "Figma: Open"
   ```

2. **Figma 파일 URL 입력**:
   ```
   https://www.figma.com/file/1525544901440427466
   ```

3. **로그인** (최초 1회):
   - Figma 계정으로 인증

4. **디자인 탐색**:
   - 좌측: Figma 디자인 미리보기
   - 우측: 코드 에디터
   - 디자인 요소 클릭 → CSS 자동 표시!

#### Dev Mode 활용:

1. **Dev Mode 활성화**:
   - Figma 우측 상단 토글 (⚡)

2. **CSS 코드 확인**:
   - 요소 선택 → CSS 자동 생성
   - Tailwind CSS 스타일로 변환

3. **간격/크기 측정**:
   - 요소 선택 → `Alt` 키 누르기
   - 모든 간격 자동 표시

---

## 🎯 방법 3: 수동 구현 (최고 품질!)

### 디자인 분석

이 NFT 템플릿의 주요 섹션:

1. **Hero Section**
   - 대형 배경 이미지
   - 중앙 정렬 타이틀
   - CTA 버튼 2개
   - 애니메이션: Fade in + Slide up

2. **About/Features**
   - 3컬럼 아이콘 카드
   - 그라데이션 배경
   - Hover 효과

3. **NFT Gallery**
   - 그리드 레이아웃 (3-4컬럼)
   - 카드 hover 시 확대
   - Lightbox 팝업

4. **Roadmap**
   - 타임라인 스타일
   - 체크박스 진행도
   - 수직 라인 연결

5. **Team/Community**
   - 원형 프로필 이미지
   - 소셜 링크
   - 애니메이션 효과

6. **Footer**
   - 2-3컬럼 레이아웃
   - 링크 그룹
   - 소셜 아이콘

### 구현 단계별 가이드

#### 1. 컬러 시스템 추출

```tsx
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        sia: {
          pink: {
            50: '#fff5f7',
            100: '#ffe3e9',
            500: '#ff69b4',
            600: '#ff1493',
            700: '#d4006f',
          },
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#87ceeb',
            600: '#4169e1',
            700: '#1e40af',
          },
          gold: '#ffd700',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
        }
      },
      backgroundImage: {
        'sia-gradient': 'linear-gradient(135deg, #fff5f7 0%, #ffffff 50%, #f0f9ff 100%)',
        'sia-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }
    }
  }
}
```

#### 2. 타이포그래피

```tsx
// 폰트 설정
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Tailwind config
fontFamily: {
  sans: ['var(--font-inter)'],
  heading: ['var(--font-poppins)'],
}
```

#### 3. Hero Section 구현

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-sia-gradient" />

  {/* Animated Background Pattern */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-20 w-72 h-72 bg-sia-pink-500 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-sia-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-6xl md:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-sia-pink-600 to-sia-blue-600 bg-clip-text text-transparent"
    >
      🌸 Am I Real Sia
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-2xl md:text-4xl font-light italic mb-8 text-gray-700"
    >
      "Am I real, or just AI?"
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <button className="group px-8 py-4 bg-sia-pink-600 text-white rounded-full font-semibold hover:bg-sia-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
        <span className="flex items-center gap-2">
          Explore Collection
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>

      <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200">
        View Roadmap
      </button>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>
```

#### 4. NFT Gallery Grid

```tsx
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-5xl font-heading font-bold text-center mb-16">
      Featured Artworks
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          {/* NFT Image */}
          <Image
            src={nft.image}
            alt={nft.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white font-semibold text-xl mb-2">{nft.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{nft.description}</p>
            <button className="px-4 py-2 bg-sia-pink-600 text-white rounded-full font-semibold hover:bg-sia-pink-700 transition-colors">
              View Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

#### 5. Roadmap Timeline

```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    <h2 className="text-5xl font-heading font-bold text-center mb-16">
      Roadmap
    </h2>

    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sia-pink-500 to-sia-blue-500" />

      {roadmapItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative flex items-start gap-6 mb-12 last:mb-0"
        >
          {/* Checkpoint */}
          <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
            item.completed ? 'bg-gradient-to-br from-sia-pink-500 to-sia-blue-500' : 'bg-gray-200'
          } shadow-lg`}>
            {item.completed ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-2xl">{item.icon}</span>
            )}
          </div>

          {/* Content Card */}
          <div className="flex-1 p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-sm font-semibold bg-sia-pink-100 text-sia-pink-700 rounded-full">
                {item.quarter}
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <ul className="space-y-2">
              {item.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-start gap-2 text-gray-700">
                  <span className="text-sia-pink-500 mt-1">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

## 📦 필요한 패키지 설치

```bash
# Framer Motion (애니메이션)
npm install framer-motion

# React Icons (아이콘)
npm install react-icons

# 이미 설치됨:
# - next-intl (다국어) ✅
# - tailwindcss ✅
```

---

## 🎬 적용 순서

### 1️⃣ Figma에서 디자인 복제 및 커스터마이징 (30분)
- 컬러 변경
- 텍스트 수정
- 이미지 준비

### 2️⃣ 에셋 내보내기 (15분)
- 이미지 추출 (PNG 2x)
- 아이콘 추출 (SVG)
- `landing/public/` 폴더에 저장

### 3️⃣ 컴포넌트 구현 (2-3시간)
- Hero Section
- About/Features
- NFT Gallery
- Roadmap
- Footer

### 4️⃣ 애니메이션 추가 (30분)
- Framer Motion 설치
- Scroll animations
- Hover effects

### 5️⃣ 반응형 확인 (30분)
- 모바일 (375px)
- 태블릿 (768px)
- 데스크톱 (1440px)

### 6️⃣ 다크 모드 추가 (옵션, 1시간)
- 다크 모드 토글
- 색상 변수 추가

---

## 🔥 빠른 시작

지금 바로 시작하려면:

```bash
# 1. Figma 링크 열기
start https://www.figma.com/community/file/1525544901440427466/nft-landing-page-design-for-web3-digital-collectibles

# 2. VS Code에서 Figma 확장프로그램 사용
Ctrl + Shift + P → "Figma: Open"

# 3. 필요한 패키지 설치
cd landing
npm install framer-motion react-icons

# 4. 개발 서버 실행 (이미 실행 중!)
# http://localhost:3001

# 5. 다국어 페이지 확인
# http://localhost:3001/en (English)
# http://localhost:3001/ko (한국어)
# http://localhost:3001/ja (日本語)
# http://localhost:3001/zh (中文)
```

---

## ✅ 현재 완료 상황

- ✅ **다국어 지원** (EN, KO, JA, ZH)
- ✅ **언어 전환 버튼** (우측 상단 고정)
- ✅ **기본 섹션 구조**
- ✅ **반응형 레이아웃**
- ⏳ **Figma 디자인 적용** ← 지금 진행
- ⏳ **고급 애니메이션**
- ⏳ **NFT 이미지 추가**

---

## 💡 다음 단계

Figma 디자인을 확인하시고:

1. **마음에 드는 섹션**을 알려주시면 해당 부분 코드를 작성해드리겠습니다
2. **스크린샷**을 공유해주시면 직접 구현해드리겠습니다
3. **원하는 기능**을 말씀해주시면 추가해드리겠습니다

**지금 바로 Figma에서 디자인을 확인해보세요!** 🎨
