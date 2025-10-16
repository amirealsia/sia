# 🔄 Notion & GitHub 자동 동기화

Am I Real Sia 프로젝트를 Notion과 GitHub에 자동으로 동기화하는 도구입니다.

## ✨ 기능

### 📊 자동 수집 정보
- ✅ README.md 내용 및 섹션 분석
- ✅ Git 커밋 히스토리 (최근 10개)
- ✅ 프로젝트 파일 구조 및 통계
- ✅ 파일 타입별 분류
- ✅ 타임스탬프 기록

### 🎯 동기화 대상
- **Notion**: 프로젝트 현황 대시보드 자동 생성
- **GitHub**: 자동 커밋 및 푸시 (선택 사항)

---

## 🚀 설치 및 설정

### 1️⃣ Python 패키지 설치

```bash
cd notion-sync
pip install -r requirements.txt
```

### 2️⃣ Notion Integration 생성

#### Step 1: Notion에서 Integration 만들기
1. https://www.notion.so/my-integrations 접속
2. **+ New integration** 클릭
3. 정보 입력:
   - **Name**: Am I Real Sia Sync
   - **Associated workspace**: 본인의 워크스페이스 선택
   - **Capabilities**: ✅ Read content, ✅ Update content, ✅ Insert content
4. **Submit** 클릭
5. **Internal Integration Secret** 복사 → 이것이 API 키입니다

#### Step 2: Notion 데이터베이스 생성
1. Notion에서 새 페이지 생성
2. `/database` 입력 후 **Table - Inline** 선택
3. 데이터베이스 이름: **Am I Real Sia - Project Logs**
4. 컬럼 설정:
   - `Name` (제목) - 자동 생성됨
   - `Status` (Select) - 옵션: In Progress, Completed, On Hold
   - `Last Updated` (Date)

#### Step 3: Integration 연결
1. 생성한 데이터베이스 페이지 열기
2. 오른쪽 상단 **⋯** (점 3개) 클릭
3. **Connections** → **Connect to** 클릭
4. 방금 만든 Integration 선택 (Am I Real Sia Sync)

#### Step 4: 데이터베이스 ID 확인
데이터베이스 URL 예시:
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6?v=...
                                 ^^^^^^^^^^^^^^^^
                                 이 부분이 Database ID
```

### 3️⃣ 환경변수 설정

`.env.example` 파일을 `.env`로 복사하고 수정:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```env
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a1b2c3d4e5f6xxxxxxxxxxxx

# 프로젝트 정보
PROJECT_NAME=Am I Real Sia
PROJECT_PATH=d:/AI/amirealsia
```

---

## 📖 사용 방법

### 단순 실행 (Notion에만 동기화)

```bash
python sync_to_notion.py
```

실행 결과:
```
============================================================
🌸 Am I Real Sia - Notion 프로젝트 동기화
============================================================

🔍 프로젝트 정보 수집 중...
✅ README: 2847 단어
✅ Git: 5 커밋
✅ 파일: 42개
💾 로컬 저장: d:\AI\amirealsia\notion-sync\project_snapshot.json

📤 Notion에 업로드 중...
✅ Notion 페이지 생성 완료: xxxxx-xxxxx-xxxxx

============================================================
✨ 동기화 완료!
============================================================
```

### GitHub에도 동기화하기

Git이 초기화되어 있지 않다면:

```bash
cd d:\AI\amirealsia

# Git 초기화
git init

# 원격 저장소 연결
git remote add origin https://github.com/yourusername/amirealsia.git

# 첫 커밋
git add .
git commit -m "🌸 Initial commit: Am I Real Sia project"
git push -u origin main
```

이후 자동 푸시:

```bash
# 변경사항 커밋
git add .
git commit -m "📝 Update: $(date +%Y-%m-%d)"
git push
```

---

## ⚙️ 자동화 설정

### Windows 작업 스케줄러로 매일 자동 실행

#### 1️⃣ 배치 파일 생성

`run_sync.bat` 파일 생성:

```batch
@echo off
cd /d D:\AI\amirealsia\notion-sync
python sync_to_notion.py
```

#### 2️⃣ 작업 스케줄러 등록

1. **작업 스케줄러** 실행 (Windows 검색)
2. **작업 만들기** 클릭
3. **일반** 탭:
   - 이름: `Am I Real Sia Notion Sync`
   - 설명: `프로젝트 정보를 Notion에 자동 동기화`
4. **트리거** 탭:
   - **새로 만들기** → **매일** 선택
   - 시간: 원하는 시간 설정 (예: 오전 9시)
5. **동작** 탭:
   - **새로 만들기** → **프로그램 시작**
   - 프로그램/스크립트: `D:\AI\amirealsia\notion-sync\run_sync.bat`
6. **확인** 클릭

---

## 📊 생성되는 Notion 페이지 구조

```
📊 프로젝트 현황
  업데이트: 2025년 10월 16일 22:30

📁 파일 통계
  • 총 파일 수: 42개
  • 디렉토리 수: 8개

🔄 Git 정보
  • 브랜치: main
  • 총 커밋 수: 5개

  최근 커밋
    • a1b2c3d: 📝 Update README with domain change
    • e4f5g6h: 🌸 Initial project setup
    ...

📝 README 섹션
  • 브랜드 핵심 콘셉트
  • 브랜드 아이덴티티
  • 인프라 및 랜딩페이지
  ...
```

---

## 🔐 보안 주의사항

### ⚠️ 절대 Git에 커밋하지 말 것
- `.env` 파일 (API 키 포함)
- `project_snapshot.json` (민감 정보 포함 가능)

### ✅ .gitignore 확인

프로젝트 루트에 `.gitignore` 파일 생성:

```gitignore
# Notion Sync
notion-sync/.env
notion-sync/project_snapshot.json
notion-sync/__pycache__/

# Python
*.pyc
__pycache__/
.venv/
venv/

# 환경변수
.env
.env.local
```

---

## 🛠️ 문제해결

### "NOTION_API_KEY가 설정되지 않았습니다"
→ `.env` 파일이 `notion-sync/` 폴더에 있는지 확인
→ API 키가 `secret_`로 시작하는지 확인

### "Could not find database"
→ Database ID가 올바른지 확인
→ Integration이 데이터베이스에 연결되어 있는지 확인

### Git 관련 오류
→ 프로젝트 폴더가 Git 저장소인지 확인: `git status`
→ 커밋이 없으면 Git 정보가 수집되지 않을 수 있음 (정상 동작)

---

## 📦 출력 파일

### `project_snapshot.json`
로컬에 저장되는 프로젝트 스냅샷:

```json
{
  "readme": {
    "title": "Am I Real Sia",
    "word_count": 2847,
    "sections": ["브랜드 핵심 콘셉트", ...]
  },
  "git": {
    "branch": "main",
    "total_commits": 5,
    "commits": [...]
  },
  "files": {
    "total_files": 42,
    "file_types": {
      ".py": 8,
      ".md": 3,
      ".json": 2
    }
  },
  "timestamp": "2025-10-16T22:30:00"
}
```

---

## 🚀 향후 확장 계획

- [ ] NFT 생성 로그 자동 기록
- [ ] AI 댓글 응답 통계 연동
- [ ] SNS 포스트 히스토리 기록
- [ ] 일일 대시보드 자동 생성
- [ ] Slack/Discord 알림 연동

---

## 💬 문의

문제가 발생하면 GitHub Issues에 등록하거나
hello@amirealsia.com으로 연락주세요.

**Made with 💖 for SIA**
