# ⚡ VS Code 완전 자동화 가이드

VS Code에서 단축키만으로 모든 작업을 자동화합니다!

---

## 🚀 빠른 시작

### 1️⃣ 확장프로그램 자동 설치

VS Code를 열면 자동으로 추천 확장프로그램이 표시됩니다.

**또는 수동 설치:**

`Ctrl + Shift + P` → `Extensions: Show Recommended Extensions` 입력

**필수 확장프로그램:**
```
✅ Notion (frenco.vscode-notion)
✅ GitLens (eamodio.gitlens)
✅ Python (ms-python.python)
✅ Prettier (esbenp.prettier-vscode)
✅ Tailwind CSS (bradlc.vscode-tailwindcss)
```

---

## ⌨️ 단축키 모음

### 🔄 Notion 동기화

| 단축키 | 작업 | 설명 |
|--------|------|------|
| `Ctrl + Shift + N` | Notion 동기화 (비공개) | README_PRIVATE.md → Notion |
| `Ctrl + Shift + P` `Ctrl + Shift + N` | Notion 페이지 열기 | 브라우저에서 Notion 열림 |

### 📤 GitHub 동기화

| 단축키 | 작업 | 설명 |
|--------|------|------|
| `Ctrl + Shift + G` | GitHub 배포 | git add → status 확인 |
| `Ctrl + Alt + S` | 전체 동기화 | Notion + GitHub 순서대로 |

### 🌐 웹 페이지 열기

| 단축키 | 작업 | 설명 |
|--------|------|------|
| `Ctrl + Shift + L` | 로컬 랜딩페이지 | http://localhost:3000 |
| `Ctrl + Shift + C` | Cloudflare 대시보드 | dash.cloudflare.com |

### 📋 Task 실행

| 단축키 | 작업 |
|--------|------|
| `Ctrl + Shift + B` | Task 목록 표시 (기본 빌드) |
| `Ctrl + Shift + P` → `Tasks: Run Task` | 모든 Task 목록 |

---

## 📋 사용 가능한 Tasks

### 🔄 동기화 Tasks

#### `🔄 Notion Sync (Private)`
```bash
Ctrl + Shift + B → 선택
```
비공개 정보를 Notion에 자동 동기화

#### `🔄 Notion Sync (Public)`
공개 정보를 Notion에 동기화

#### `📊 Full Sync (Notion + GitHub)`
```bash
단축키: Ctrl + Alt + S
```
Notion 동기화 후 GitHub 푸시까지 자동 실행

### 📤 GitHub Tasks

#### `🚀 Deploy to GitHub`
```bash
단축키: Ctrl + Shift + G
```
변경사항 확인 및 Git 상태 표시

#### `📤 Git Push (Quick)`
빠른 커밋 메시지 입력 후 푸시

### 💻 개발 서버 Tasks

#### `💻 Start Landing Page Dev Server`
```bash
Ctrl + Shift + B → 선택
```
Next.js 개발 서버 시작 (http://localhost:3000)

#### `🎨 Build Landing Page`
프로덕션 빌드 생성

### 🔍 유틸리티 Tasks

#### `🔒 Check Git Ignored Files`
비공개 파일이 제대로 무시되는지 확인

#### `🌐 Open Landing Page (Local)`
```bash
단축키: Ctrl + Shift + L
```

#### `☁️ Open Cloudflare Dashboard`
```bash
단축키: Ctrl + Shift + C
```

#### `📝 Open Notion Page`
```bash
단축키: Ctrl + Shift + P, Ctrl + Shift + N
```

---

## 🎯 일일 워크플로우

### 아침 작업 시작

```
1. VS Code 열기
2. Ctrl + Shift + L → 랜딩페이지 확인
3. 작업 시작!
```

### 파일 수정 후

```
1. 파일 수정 (자동 저장됨)
2. Ctrl + Shift + N → Notion 동기화
3. Ctrl + Shift + G → GitHub 상태 확인
4. 커밋 메시지 입력
5. git push
```

### 빠른 배포

```
단축키: Ctrl + Alt + S
→ Notion 동기화 + GitHub 상태 확인까지 자동!
```

---

## 🔧 고급 자동화

### 1️⃣ 파일 저장 시 자동 실행

이미 설정됨! `README.md` 저장 시 자동으로 알림

### 2️⃣ Git 자동 커밋

Task: `📤 Git Push (Quick)`

```
1. Ctrl + Shift + P
2. "Tasks: Run Task" 입력
3. "📤 Git Push (Quick)" 선택
4. 커밋 메시지 입력
5. 자동 커밋 + 푸시
```

### 3️⃣ 한 번에 모든 작업

```bash
# Task 체인: 순서대로 자동 실행
Ctrl + Shift + P → "📊 Full Sync"
```

실행 순서:
1. Notion 비공개 동기화
2. Git 상태 확인
3. 완료!

---

## 📝 Notion 통합 (확장프로그램)

### 파일을 Notion에 업로드

```
1. README.md 열기
2. Ctrl + Shift + P
3. "Notion: Upload Current File" 입력
4. 엔터!
```

### Notion 페이지를 VS Code에서 편집

```
1. Ctrl + Shift + P
2. "Notion: Open Page" 입력
3. 페이지 선택
4. VS Code에서 편집
5. 저장하면 Notion에 자동 동기화!
```

---

## 🎨 코드 포맷팅 자동화

### 저장 시 자동 포맷

이미 설정됨!

```
파일 저장 (Ctrl + S) → 자동 Prettier 포맷팅
```

### 지원 언어
- ✅ TypeScript / TSX
- ✅ Python (Black formatter)
- ✅ JSON
- ✅ Markdown

---

## 🔐 보안 체크 자동화

### Git Ignore 확인

```bash
Ctrl + Shift + P → "🔒 Check Git Ignored Files"
```

확인 항목:
- ✅ README_PRIVATE.md
- ✅ private/
- ✅ .env

---

## 📊 사용 예시

### 시나리오 1: README 수정 후 동기화

```
1. README.md 수정
2. Ctrl + S (저장)
3. Ctrl + Shift + N (Notion 동기화)
4. Ctrl + Shift + G (GitHub 상태 확인)
5. 터미널에서:
   git commit -m "📝 Update README"
   git push
```

### 시나리오 2: 랜딩페이지 개발

```
1. Ctrl + Shift + B → "💻 Start Landing Page Dev Server"
2. Ctrl + Shift + L (브라우저에서 열기)
3. landing/app/page.tsx 수정
4. 자동 리로드!
```

### 시나리오 3: 빠른 전체 동기화

```
단축키 하나로 끝:
Ctrl + Alt + S

→ Notion 동기화
→ GitHub 상태 확인
→ 완료!
```

---

## 🛠️ 문제 해결

### Task가 안 보여요

```
Ctrl + Shift + P → "Tasks: Run Task"
```

리스트가 나타나지 않으면:
1. `.vscode/tasks.json` 파일 존재 확인
2. VS Code 재시작

### 단축키가 안 먹혀요

```
Ctrl + K, Ctrl + S
```
→ Keyboard Shortcuts 설정 열림
→ 충돌 확인

### Notion 확장프로그램이 안 되요

1. `Ctrl + Shift + X` (확장프로그램)
2. "Notion" 검색
3. 설치 확인
4. Reload 버튼 클릭

---

## 🎯 추천 확장프로그램 (자동 설치 제안됨)

### 필수
- ✅ **Notion** - Notion 통합
- ✅ **GitLens** - Git 강화
- ✅ **Python** - Python 개발
- ✅ **Prettier** - 코드 포맷팅
- ✅ **Tailwind CSS IntelliSense** - Tailwind 자동완성

### 권장
- ⭐ **Git Graph** - Git 히스토리 시각화
- ⭐ **TODO Highlight** - TODO 강조
- ⭐ **Better Comments** - 주석 강조
- ⭐ **Code Spell Checker** - 맞춤법 검사

### AI 도구 (선택)
- 🤖 **GitHub Copilot** - AI 코드 완성
- 🤖 **Continue** - AI 어시스턴트

---

## 🚀 프로 팁

### 1️⃣ Command Palette 마스터하기

```
Ctrl + Shift + P
```

자주 사용하는 명령어:
- `Notion:`
- `Tasks: Run Task`
- `Git:`
- `Prettier:`

### 2️⃣ Multi-cursor 활용

```
Ctrl + Alt + 아래 화살표 → 여러 줄 동시 편집
Alt + 클릭 → 원하는 곳에 커서 추가
```

### 3️⃣ 빠른 파일 탐색

```
Ctrl + P → 파일 이름 입력
```

### 4️⃣ 터미널 토글

```
Ctrl + ` (백틱)
```

---

## 📋 전체 단축키 요약

| 단축키 | 작업 |
|--------|------|
| `Ctrl + Shift + N` | Notion 동기화 (비공개) |
| `Ctrl + Shift + G` | GitHub 상태 확인 |
| `Ctrl + Shift + L` | 로컬 페이지 열기 |
| `Ctrl + Shift + C` | Cloudflare 대시보드 |
| `Ctrl + Alt + S` | 전체 동기화 |
| `Ctrl + Shift + B` | Task 목록 |
| `Ctrl + Shift + P` | Command Palette |
| `Ctrl + `` | 터미널 토글 |
| `Ctrl + P` | 파일 찾기 |
| `Ctrl + K, Ctrl + S` | 단축키 설정 |

---

## 🎉 완성!

이제 VS Code에서 모든 작업을 자동화할 수 있습니다!

**다음 단계:**
1. 확장프로그램 설치 (자동 제안됨)
2. 단축키 연습
3. 일일 워크플로우 적용

---

**Made with 💖 for SIA - Automate everything! ⚡**
