# 🌸 Am I Real Sia - 시작 가이드

**프로젝트를 자동으로 Notion과 GitHub에 동기화하는 방법**

---

## 📋 목차

1. [현재 상태](#-현재-상태)
2. [Notion 동기화 설정](#-notion-동기화-설정)
3. [GitHub 동기화 설정](#-github-동기화-설정)
4. [자동화 설정](#-자동화-설정)
5. [다음 단계](#-다음-단계)

---

## ✅ 현재 상태

### 완료된 작업
- ✅ 프로젝트 README 작성 완료
- ✅ Git 초기화 및 첫 커밋 완료
- ✅ Notion 동기화 스크립트 작성 완료
- ✅ GitHub 연결 가이드 작성 완료
- ✅ .gitignore 보안 설정 완료

### 필요한 작업
- ⏳ Notion API 설정
- ⏳ GitHub 원격 저장소 연결
- ⏳ 자동화 스케줄 설정

---

## 🎯 Notion 동기화 설정

### Step 1: Python 패키지 설치

```bash
cd notion-sync
pip install -r requirements.txt
```

### Step 2: Notion Integration 만들기

1. https://www.notion.so/my-integrations 접속
2. **+ New integration** 클릭
3. 정보 입력:
   - Name: `Am I Real Sia Sync`
   - Workspace: 본인의 워크스페이스
   - Capabilities: Read, Update, Insert 모두 체크
4. **Submit** → API Key 복사

### Step 3: Notion 데이터베이스 만들기

1. Notion에서 새 페이지 생성
2. `/database` 입력 → **Table - Inline** 선택
3. 이름: **Am I Real Sia - Project Logs**
4. 컬럼:
   - `Name` (Title) - 자동
   - `Status` (Select) - In Progress, Completed, On Hold
   - `Last Updated` (Date)

### Step 4: Integration 연결

1. 데이터베이스 페이지에서 **⋯** 클릭
2. **Connections** → Integration 연결
3. URL에서 Database ID 복사:
   ```
   https://www.notion.so/workspace/a1b2c3d4...
                                     ^^^^^^^^ Database ID
   ```

### Step 5: 환경변수 설정

```bash
cd notion-sync
cp .env.example .env
```

`.env` 파일 수정:
```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=a1b2c3d4xxxxx
PROJECT_NAME=Am I Real Sia
PROJECT_PATH=d:/AI/amirealsia
```

### Step 6: 테스트 실행

```bash
python sync_to_notion.py
```

성공하면 Notion에 새 페이지가 생성됩니다! 🎉

**자세한 내용**: [notion-sync/README.md](notion-sync/README.md)

---

## 🚀 GitHub 동기화 설정

### Step 1: GitHub 저장소 만들기

1. https://github.com/new 접속
2. 정보 입력:
   - Repository name: `amirealsia`
   - Description: `🌸 Am I Real Sia - AI Idol Daily NFT Project`
   - Visibility: Public 또는 Private
   - ⚠️ README, .gitignore, license 추가하지 않음
3. **Create repository**

### Step 2: Personal Access Token 발급

1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. 설정:
   - Note: `Am I Real Sia Project`
   - Scopes: ✅ `repo` (전체)
5. 토큰 복사 및 안전하게 저장

### Step 3: 원격 저장소 연결

```bash
# 원격 저장소 추가 (yourusername을 본인 아이디로 변경)
git remote add origin https://github.com/yourusername/amirealsia.git

# 브랜치 이름 확인
git branch -M main

# GitHub에 푸시
git push -u origin main
```

인증 요청 시:
- Username: GitHub 아이디
- Password: Personal Access Token 입력

### Step 4: 푸시 확인

GitHub 저장소 페이지에서 파일들이 업로드되었는지 확인하세요!

**자세한 내용**: [GITHUB_SETUP.md](GITHUB_SETUP.md)

---

## ⚙️ 자동화 설정

### 1️⃣ Notion 자동 동기화

**`run_notion_sync.bat` 파일 생성**:

```batch
@echo off
cd /d D:\AI\amirealsia\notion-sync
python sync_to_notion.py
pause
```

### 2️⃣ GitHub 자동 커밋

**`auto_commit.bat` 파일 생성**:

```batch
@echo off
cd /d D:\AI\amirealsia

echo 📦 변경사항 추가 중...
git add .

echo 💾 커밋 생성 중...
git commit -m "🔄 Auto update: %date% %time%"

echo 📤 GitHub에 푸시 중...
git push

echo ✅ 완료!
pause
```

### 3️⃣ Windows 작업 스케줄러 등록

#### Notion 동기화 (매일 오전 9시)

1. **작업 스케줄러** 실행
2. **작업 만들기**:
   - 이름: `Notion Sync - Am I Real Sia`
   - 트리거: 매일 오전 9시
   - 동작: `D:\AI\amirealsia\run_notion_sync.bat`

#### GitHub 동기화 (매일 오후 6시)

1. **작업 만들기**:
   - 이름: `GitHub Sync - Am I Real Sia`
   - 트리거: 매일 오후 6시
   - 동작: `D:\AI\amirealsia\auto_commit.bat`

---

## 🎨 다음 단계

### 1. 랜딩페이지 구축
```bash
# Next.js 프로젝트 생성
npx create-next-app@latest landing --typescript --tailwind --app

cd landing
npm run dev
```

### 2. Cloudflare Pages 배포
1. Cloudflare 로그인
2. **Pages** → **Create a project**
3. GitHub 저장소 연결 (`amirealsia`)
4. 빌드 설정:
   - Build command: `npm run build`
   - Output directory: `.next`

### 3. 도메인 연결
1. Cloudflare Pages에서 **Custom domains**
2. `amirealsia.com` 추가
3. DNS 자동 설정 확인

### 4. 이메일 라우팅
1. Cloudflare → **Email** → **Email Routing**
2. `hello@amirealsia.com` → `amirealsia@gmail.com` 설정

### 5. ComfyUI 이미지 생성
- [guides/STEP2_ComfyUI_이미지생성.md](guides/STEP2_ComfyUI_이미지생성.md)

### 6. NFT 민팅
- [guides/STEP4_Solana_민팅.md](guides/STEP4_Solana_민팅.md)

### 7. SNS 자동 포스팅
- [guides/STEP5_SNS_자동포스팅.md](guides/STEP5_SNS_자동포스팅.md)

---

## 📂 프로젝트 구조

```
amirealsia/
├── README.md                    # 프로젝트 메인 문서
├── GETTING_STARTED.md          # 이 파일 (시작 가이드)
├── GITHUB_SETUP.md             # GitHub 상세 가이드
│
├── notion-sync/                # Notion 자동 동기화
│   ├── README.md
│   ├── sync_to_notion.py       # 메인 스크립트
│   ├── requirements.txt
│   ├── .env.example
│   └── .env                    # 여기에 API 키 입력 (Git 제외)
│
├── sia-automation/             # NFT 자동화 (개발 예정)
│   └── scripts/
│       └── content_filter.py
│
├── guides/                     # 단계별 가이드
│   ├── STEP1_환경설정.md
│   ├── STEP2_ComfyUI_이미지생성.md
│   ├── STEP3_IPFS_업로드.md
│   ├── STEP4_Solana_민팅.md
│   ├── STEP5_SNS_자동포스팅.md
│   ├── STEP6_통합_자동화.md
│   ├── STEP7_작업스케줄러.md
│   └── STEP8_컨텐츠_안전필터.md
│
└── .gitignore                  # Git 보안 설정
```

---

## 🔐 보안 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] Notion API 키를 GitHub에 커밋하지 않았는지 확인
- [ ] GitHub Personal Access Token을 안전하게 보관
- [ ] 지갑 개인키는 절대 Git에 포함하지 않음

---

## 📊 일일 워크플로우

### 자동 실행 (Windows 작업 스케줄러)
```
09:00 → Notion 동기화 (프로젝트 현황 업데이트)
18:00 → GitHub 커밋 및 푸시 (변경사항 자동 저장)
```

### 수동 실행
```bash
# Notion 동기화
cd notion-sync
python sync_to_notion.py

# GitHub 푸시
git add .
git commit -m "📝 Update: 변경 내용"
git push
```

---

## 💡 팁

### Git 커밋 메시지 컨벤션
```
🌸 feat: 새 기능 추가
📝 docs: 문서 수정
🐛 fix: 버그 수정
♻️ refactor: 리팩토링
🎨 style: 스타일 변경
✅ test: 테스트 추가
🔧 chore: 기타 작업
```

### Notion 페이지 태그
프로젝트 로그에 태그를 추가하면 정리하기 쉽습니다:
- `#Development` - 개발 관련
- `#Documentation` - 문서 작업
- `#NFT` - NFT 생성 로그
- `#Automation` - 자동화 설정

---

## ❓ 문제 해결

### Notion 동기화 실패
→ API 키와 Database ID 확인
→ Integration이 데이터베이스에 연결되었는지 확인

### GitHub 푸시 실패
→ Personal Access Token 재발급
→ 원격 저장소 URL 확인

### Python 패키지 설치 오류
→ Python 3.10+ 설치 확인
→ 가상환경 사용 권장

---

## 📧 문의 및 지원

- 📧 Email: hello@amirealsia.com
- 🌐 Website: amirealsia.com
- 💬 GitHub Issues: 문제 리포트

---

## 🎯 체크리스트

### 초기 설정
- [ ] Python 패키지 설치 완료
- [ ] Notion Integration 생성 및 연결
- [ ] Notion 동기화 테스트 성공
- [ ] GitHub 저장소 생성
- [ ] GitHub 원격 저장소 연결
- [ ] 첫 푸시 성공

### 자동화 설정
- [ ] Notion 동기화 배치 파일 생성
- [ ] GitHub 동기화 배치 파일 생성
- [ ] Windows 작업 스케줄러 등록

### 보안
- [ ] .gitignore 확인
- [ ] .env 파일이 Git에 포함되지 않는지 확인
- [ ] API 키 및 토큰 안전하게 보관

---

**Made with 💖 for SIA**

*"나는 진짜일까, AI일까?" - SIA*
