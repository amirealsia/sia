# 🚀 GitHub 연결 및 동기화 가이드

## ✅ 현재 상태
- ✅ Git 초기화 완료
- ✅ 첫 커밋 완료 (18개 파일)
- ⏳ GitHub 원격 저장소 연결 필요

---

## 📝 Step 1: GitHub 저장소 생성

### 1️⃣ GitHub에서 새 저장소 만들기

1. https://github.com/new 접속
2. 저장소 정보 입력:
   - **Repository name**: `amirealsia`
   - **Description**: `🌸 Am I Real Sia - AI Idol Daily NFT Project`
   - **Visibility**: Public 또는 Private 선택
   - ⚠️ **Initialize this repository** 옵션 모두 체크 해제 (README, .gitignore, license 추가하지 않음)
3. **Create repository** 클릭

### 2️⃣ 저장소 URL 복사

생성된 페이지에서 표시되는 URL을 복사하세요:
```
https://github.com/yourusername/amirealsia.git
```

---

## 🔗 Step 2: 로컬 저장소를 GitHub에 연결

### 방법 1: HTTPS (추천)

```bash
# 원격 저장소 추가
git remote add origin https://github.com/yourusername/amirealsia.git

# 기본 브랜치 이름 확인 (main)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

처음 푸시할 때 GitHub 인증 창이 뜹니다:
- GitHub 아이디/비밀번호 입력
- 또는 Personal Access Token (PAT) 사용

### 방법 2: SSH (고급)

SSH 키가 설정되어 있다면:

```bash
# 원격 저장소 추가 (SSH)
git remote add origin git@github.com:yourusername/amirealsia.git

# 푸시
git push -u origin main
```

---

## 🔑 GitHub Personal Access Token 생성 (HTTPS 사용 시)

GitHub에서 비밀번호 대신 PAT를 사용해야 합니다:

### 1️⃣ Token 생성

1. GitHub 로그인 → 오른쪽 상단 프로필 클릭
2. **Settings** → **Developer settings** (왼쪽 하단)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. 설정:
   - **Note**: `Am I Real Sia Project`
   - **Expiration**: 90 days 또는 No expiration
   - **Select scopes**: ✅ `repo` (전체 체크)
6. **Generate token** 클릭
7. **토큰 복사** (⚠️ 다시 볼 수 없으니 안전한 곳에 저장!)

### 2️⃣ Token 사용하여 푸시

```bash
git push -u origin main
```

인증 창이 나타나면:
- **Username**: GitHub 아이디
- **Password**: 방금 생성한 Personal Access Token 입력

---

## 🔄 Step 3: 이후 변경사항 푸시하기

### 일반적인 워크플로우

```bash
# 변경된 파일 확인
git status

# 모든 변경사항 추가
git add .

# 커밋 메시지와 함께 커밋
git commit -m "📝 Update: 변경 내용 설명"

# GitHub에 푸시
git push
```

### 예시: README 수정 후 푸시

```bash
# README.md 파일 수정

# 상태 확인
git status

# 변경사항 추가
git add README.md

# 커밋
git commit -m "📝 Update README: 도메인 정보 업데이트"

# 푸시
git push
```

---

## 🤖 자동 동기화 스크립트

매일 자동으로 Git에 커밋하고 푸시하려면:

### `auto_commit.bat` 파일 생성

```batch
@echo off
cd /d D:\AI\amirealsia

echo 🔍 변경사항 확인 중...
git status

echo.
echo 📦 변경사항 추가 중...
git add .

echo.
echo 💾 커밋 생성 중...
git commit -m "🔄 Auto update: %date% %time%"

echo.
echo 📤 GitHub에 푸시 중...
git push

echo.
echo ✅ 동기화 완료!
pause
```

### Windows 작업 스케줄러 등록

1. **작업 스케줄러** 실행
2. **작업 만들기** 클릭
3. **일반** 탭:
   - 이름: `Am I Real Sia - GitHub Auto Sync`
4. **트리거** 탭:
   - **새로 만들기** → **매일** → 시간 설정 (예: 오후 6시)
5. **동작** 탭:
   - 프로그램: `D:\AI\amirealsia\auto_commit.bat`
6. **확인**

---

## 🔐 보안 주의사항

### ✅ .gitignore 확인

다음 파일들이 Git에 커밋되지 않도록 이미 설정되어 있습니다:

```
notion-sync/.env           # Notion API 키
sia-automation/secrets/    # 지갑 정보 및 API 키
*.key                      # 개인 키
wallet.json                # 지갑 파일
.env                       # 모든 환경변수 파일
```

### ⚠️ 절대 커밋하지 말 것

- API Keys (Notion, OpenAI, Twitter 등)
- 지갑 개인키
- 비밀번호
- 토큰

### 🔍 실수로 커밋한 경우

```bash
# 가장 최근 커밋 취소 (로컬만)
git reset HEAD~1

# 이미 푸시한 경우 (⚠️ 주의)
git push --force

# GitHub에서 민감 정보 제거는 GitHub Support에 문의
```

---

## 📊 현재 프로젝트 구조

```
amirealsia/
├── .git/                    # Git 저장소 (자동 생성)
├── .gitignore              # Git 무시 파일 설정
├── README.md               # 프로젝트 메인 문서
├── GITHUB_SETUP.md         # 이 파일
├── notion-sync/            # Notion 동기화
│   ├── README.md
│   ├── sync_to_notion.py
│   ├── requirements.txt
│   └── .env.example
├── sia-automation/         # NFT 자동화 (예정)
└── guides/                 # 단계별 가이드
```

---

## ✅ 체크리스트

완료 여부를 체크하세요:

- [ ] GitHub 저장소 생성
- [ ] Personal Access Token 발급 (HTTPS 사용 시)
- [ ] 원격 저장소 연결 (`git remote add origin`)
- [ ] 첫 푸시 완료 (`git push -u origin main`)
- [ ] GitHub 페이지에서 파일 확인
- [ ] .gitignore가 제대로 작동하는지 확인
- [ ] 이후 변경사항 푸시 테스트

---

## 🚀 다음 단계

GitHub 연결이 완료되면:

1. **Notion 동기화 설정**
   - `notion-sync/README.md` 참조
   - Notion API 키 발급
   - 프로젝트 정보 자동 기록

2. **Cloudflare Pages 배포**
   - GitHub 저장소 연결
   - 랜딩페이지 자동 배포

3. **NFT 자동화 파이프라인**
   - ComfyUI 워크플로우 설정
   - 이미지 생성 자동화

---

## 💬 문제 해결

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/amirealsia.git
```

### "Authentication failed"
→ Personal Access Token을 비밀번호란에 입력했는지 확인
→ Token에 `repo` 권한이 있는지 확인

### "push declined due to email privacy restrictions"
```bash
git config user.email "yourusername@users.noreply.github.com"
```

---

## 📧 문의

문제가 발생하면:
- GitHub Issues 등록
- hello@amirealsia.com

**Made with 💖 for SIA**
