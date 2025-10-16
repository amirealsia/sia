# 🎨 Figma에서 고급 NFT 랜딩페이지 만들기

Figma 디자인을 Next.js로 변환하여 고급스러운 랜딩페이지를 만드는 완벽 가이드입니다.

---

## 🚀 방법 1: Figma Community에서 NFT 템플릿 가져오기 (추천!)

### 1단계: Figma 계정 만들기

1. https://figma.com 접속
2. **Sign up for free** 클릭
3. Google 계정으로 간편 가입

### 2단계: NFT 프로젝트 템플릿 찾기

**Figma Community 탐색:**
```
https://www.figma.com/community/search?model_type=files&q=nft%20landing%20page
```

**추천 검색 키워드:**
- `NFT landing page`
- `Crypto website`
- `Web3 landing`
- `NFT marketplace`
- `Digital art portfolio`
- `Blockchain website`

### 3단계: 무료 템플릿 복제하기

1. 마음에 드는 디자인 클릭
2. **Duplicate** 버튼 클릭 (우측 상단)
3. 내 Figma 계정으로 복사됨

**고급 템플릿 추천:**
- **Moonbirds** 스타일 - 깔끔하고 아티스틱
- **Bored Ape Yacht Club** 스타일 - 대담하고 화려
- **Art Blocks** 스타일 - 미니멀하고 세련됨
- **Azuki** 스타일 - 일본 애니메이션 감성

### 4단계: 디자인 커스터마이징

#### 텍스트 수정
```
🌸 Am I Real Sia
"Am I real, or just AI?"
365-Day AI Art Journey
```

#### 색상 테마 변경
- **Primary**: 핑크 계열 (#FF69B4, #FFB6C1)
- **Secondary**: 블루 계열 (#87CEEB, #4169E1)
- **Accent**: 골드 (#FFD700)
- **Background**: 그라데이션 (pink-50 → white → blue-50)

#### 이미지 교체
- 히어로 이미지: SIA 캐릭터 메인 비주얼
- 갤러리: NFT 작품 샘플 (4-6개)
- 아이콘: 커스텀 아이콘 추가

---

## 🎯 방법 2: Figma to Code 플러그인 사용 (자동 변환)

### 추천 플러그인

#### 1. **Anima** (가장 추천!)
- Next.js, React 직접 내보내기
- Tailwind CSS 지원
- 반응형 자동 생성

**사용법:**
1. Figma 플러그인 → Anima 검색 및 설치
2. 디자인 프레임 선택
3. **Export to Code** 클릭
4. Framework: **Next.js** 선택
5. CSS: **Tailwind CSS** 선택
6. **Download** 클릭

**가격:**
- Free: 기본 기능
- Pro ($31/월): 고급 컴포넌트, 반응형

#### 2. **Figma to Code (HTML, Tailwind, Flutter, SwiftUI)**
- 완전 무료!
- Tailwind CSS 직접 생성
- 컴포넌트별 추출 가능

**사용법:**
1. 플러그인 설치
2. 프레임 선택
3. **Generate Code** 클릭
4. 코드 복사 → `landing/app/page.tsx`에 붙여넣기

#### 3. **Figma to React**
- React/Next.js 컴포넌트 생성
- TypeScript 지원
- Props 자동 생성

---

## 🛠️ 방법 3: 수동으로 디자인 구현 (최고 퀄리티!)

### 준비물
- Figma 디자인 파일
- 디자인 시스템 (색상, 폰트, 간격)

### 1단계: Figma Dev Mode 활성화

1. Figma 파일 열기
2. 우측 상단 **Dev Mode** 토글 (⚡)
3. 요소 클릭 → CSS 코드 자동 표시!

### 2단계: 디자인 시스템 추출

#### 색상 팔레트
```tsx
// tailwind.config.ts에 추가
colors: {
  sia: {
    pink: {
      50: '#fff5f7',
      100: '#ffe3e9',
      500: '#ff69b4',
      600: '#ff1493',
    },
    blue: {
      50: '#f0f9ff',
      500: '#87ceeb',
      600: '#4169e1',
    },
    gold: '#ffd700',
  }
}
```

#### 타이포그래피
```tsx
// Figma에서 확인
fontFamily: {
  heading: ['Inter', 'sans-serif'],
  body: ['Poppins', 'sans-serif'],
}
```

#### 간격 시스템
```tsx
// Figma의 Auto Layout 값 확인
spacing: {
  section: '80px',  // 섹션 간격
  card: '24px',     // 카드 패딩
  element: '16px',  // 요소 간격
}
```

### 3단계: 섹션별 구현

#### Hero Section
```tsx
// Figma에서 측정한 값으로 구현
<section className="relative h-screen flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-br from-sia-pink-50 via-white to-sia-blue-50" />
  <div className="relative z-10 text-center space-y-8">
    <h1 className="text-7xl font-bold text-gray-900">
      🌸 Am I Real Sia
    </h1>
    <p className="text-3xl font-light italic text-gray-700">
      "Am I real, or just AI?"
    </p>
    <button className="px-8 py-4 bg-sia-pink-600 text-white rounded-full">
      Explore Collection
    </button>
  </div>
</section>
```

### 4단계: 이미지 및 에셋 내보내기

#### Figma에서 이미지 추출
1. 이미지/아이콘 선택
2. 우측 하단 **Export** 섹션
3. 포맷: **PNG** (일반), **SVG** (아이콘)
4. 해상도: **2x** (Retina)
5. **Export** 클릭

#### 저장 위치
```
landing/
├── public/
│   ├── images/
│   │   ├── hero-sia.png       (메인 캐릭터)
│   │   ├── nft-1.png          (작품 샘플)
│   │   ├── nft-2.png
│   │   └── bg-pattern.svg     (배경 패턴)
│   └── icons/
│       ├── twitter.svg
│       ├── opensea.svg
│       └── instagram.svg
```

### 5단계: 애니메이션 추가

#### Figma에서 모션 확인
- **Smart Animate** 프로토타입 확인
- Ease in/out 타이밍
- 이동 거리 및 방향

#### Framer Motion으로 구현
```bash
npm install framer-motion
```

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  <h1>Am I Real Sia</h1>
</motion.div>
```

---

## 🎨 방법 4: AI 디자인 도구 활용

### 1. v0.dev by Vercel (AI 코드 생성)

**사용법:**
1. https://v0.dev 접속
2. 프롬프트 입력:
   ```
   Create a luxury NFT landing page for "Am I Real Sia"
   - AI idol character
   - 365-day art project
   - Pink and blue gradient theme
   - Solana blockchain
   - Modern, elegant design
   - Include hero, about, gallery, roadmap sections
   ```
3. AI가 Next.js + Tailwind 코드 생성
4. **Copy Code** → 프로젝트에 붙여넣기

**장점:**
- 몇 초 만에 프로토타입 완성
- 수정 요청 가능 (프롬프트로)
- 실제 작동하는 코드

### 2. Galileo AI (Figma 디자인 생성)

1. https://galileo.ai 접속
2. 텍스트로 디자인 요청
3. Figma 파일로 내보내기
4. 위 방법으로 코드로 변환

---

## 📐 디자인 참고 사이트

### 프리미엄 NFT 프로젝트 벤치마킹

1. **Azuki** - https://azuki.com
   - 일본 애니 감성
   - 부드러운 애니메이션
   - 스토리텔링 강조

2. **Doodles** - https://doodles.app
   - 귀엽고 친근한 디자인
   - 밝은 색상
   - 캐릭터 중심

3. **Moonbirds** - https://moonbirds.xyz
   - 세련된 다크 모드
   - 미니멀 디자인
   - 프리미엄 느낌

4. **World of Women** - https://worldofwomen.art
   - 여성적이고 우아함
   - 아트 갤러리 스타일
   - 핑크/퍼플 계열

### 디자인 영감 사이트

- **Awwwards** - https://awwwards.com/websites/nft/
- **Dribbble** - https://dribbble.com/search/nft-landing-page
- **Behance** - https://behance.net/search/projects/nft
- **Land-book** - https://land-book.com/gallery/nft

---

## 🎯 Am I Real Sia 맞춤 추천 플로우

### 단계 1: Figma 템플릿 선택 (30분)

**추천 템플릿 스타일:**
- **Doodles 스타일**: 귀엽고 친근한 캐릭터
- **World of Women 스타일**: 우아하고 예술적
- 핑크/블루 그라데이션 중심

**Figma Community 검색:**
```
"NFT character collection"
"AI art landing page"
"Digital idol website"
```

### 단계 2: 커스터마이징 (1-2시간)

1. **컬러 변경**
   - Primary: Pink (#FF69B4)
   - Secondary: Sky Blue (#87CEEB)
   - Background: 그라데이션

2. **텍스트 수정**
   - 프로젝트명
   - 설명
   - 로드맵

3. **이미지 교체**
   - SIA 캐릭터 이미지
   - NFT 샘플 (임시: AI 생성 이미지)

### 단계 3: 코드로 변환 (1시간)

**방법 A: Anima 플러그인 (빠름)**
- 플러그인으로 Next.js 코드 자동 생성
- 다운로드 후 `landing/` 폴더에 병합

**방법 B: 수동 구현 (퀄리티 높음)**
- Dev Mode로 CSS 확인
- 섹션별로 구현
- Tailwind CSS 사용

### 단계 4: 최적화 (30분)

1. **반응형 확인**
   - 모바일 (375px)
   - 태블릿 (768px)
   - 데스크톱 (1440px)

2. **성능 최적화**
   - 이미지 압축 (TinyPNG)
   - Next.js Image 컴포넌트 사용
   - Lazy loading

3. **애니메이션 추가**
   - Framer Motion
   - Scroll animations
   - Hover effects

---

## 🚀 빠른 시작 (지금 바로!)

### 옵션 1: 무료 템플릿으로 시작 (추천!)

```bash
# 1. Figma Community 템플릿 복제
https://www.figma.com/community/file/1234567890/nft-landing-page

# 2. Anima 플러그인 설치
# Figma → Plugins → Anima

# 3. 코드 생성 및 다운로드
# Export to Next.js + Tailwind

# 4. 프로젝트에 적용
cd landing
# 다운로드한 파일 병합
```

### 옵션 2: v0.dev AI 생성 (가장 빠름!)

```bash
# 1. v0.dev 접속
https://v0.dev

# 2. 프롬프트 입력
"Create a luxury NFT landing page for Am I Real Sia,
an AI idol with 365-day art collection.
Use pink/blue gradient, modern design, include hero,
gallery, roadmap sections. Solana blockchain."

# 3. 생성된 코드 복사
# 4. landing/app/page.tsx에 붙여넣기
```

### 옵션 3: 기존 페이지 개선

```bash
# 현재 랜딩페이지를 기반으로
# Figma 참고하여 단계적 업그레이드

# 1. 섹션별 개선
# 2. 애니메이션 추가
# 3. 이미지 고급화
```

---

## 📦 필요한 도구

### Figma
- **가격**: 무료 (개인)
- **URL**: https://figma.com
- **용도**: 디자인 탐색 및 수정

### Anima (옵션)
- **가격**: 무료 / $31/월
- **URL**: https://animaapp.com
- **용도**: Figma → Next.js 자동 변환

### Framer Motion
```bash
npm install framer-motion
```
- **가격**: 무료
- **용도**: 애니메이션

### Image Optimization
- **TinyPNG**: https://tinypng.com (무료)
- **Squoosh**: https://squoosh.app (무료)
- **ImageOptim**: https://imageoptim.com (무료)

---

## 💡 프로 팁

### 1. 레이어 구조 활용
Figma의 레이어 계층 = React 컴포넌트 구조
```
Frame (Section)
└── Container (div)
    ├── Heading (h1)
    ├── Text (p)
    └── Button (button)
```

### 2. Auto Layout = Flexbox
Figma의 Auto Layout 설정 = CSS Flexbox
- Direction → `flex-row` / `flex-col`
- Spacing → `gap-4`
- Padding → `p-4`
- Alignment → `items-center`, `justify-center`

### 3. 컴포넌트 재사용
Figma의 Component = React Component
- Card 컴포넌트
- Button 컴포넌트
- NFT Item 컴포넌트

### 4. 디자인 시스템 우선
색상, 폰트, 간격을 먼저 정의하면
코딩이 10배 빨라집니다!

```tsx
// design-system.ts
export const colors = {
  sia: {
    pink: '#FF69B4',
    blue: '#87CEEB',
    gold: '#FFD700',
  }
}

export const fonts = {
  heading: 'Inter',
  body: 'Poppins',
}

export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '48px',
  xl: '80px',
}
```

---

## 🎬 다음 단계

1. ✅ Figma Community에서 NFT 템플릿 찾기
2. ✅ 템플릿 복제 및 커스터마이징
3. ✅ Anima 또는 v0.dev로 코드 생성
4. ✅ 로컬에서 테스트 (`npm run dev`)
5. ✅ 이미지 및 콘텐츠 교체
6. ✅ 애니메이션 추가
7. ✅ 배포 (`git push`)

---

## 🆘 도움이 필요하면

1. **Figma 템플릿 찾기 어려움**
   → 추천 키워드와 URL 제공 가능

2. **코드 변환이 어려움**
   → 스크린샷 주시면 직접 코드 작성

3. **디자인 개선 아이디어**
   → 경쟁사 벤치마킹 분석 제공

**지금 바로 시작하세요!** 🚀

Figma Community에서 마음에 드는 템플릿을 찾았다면 URL을 알려주세요!
