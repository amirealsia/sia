# 🎯 빠른 참조 가이드

amirealsia.com 프로젝트의 모든 단축키와 링크를 한눈에!

---

## ⌨️ VS Code 단축키

### 주요 작업

| 단축키 | 기능 | 설명 |
|--------|------|------|
| `Ctrl + Shift + C` | ☁️ Cloudflare 대시보드 | DNS, 이메일 설정 |
| `Ctrl + Shift + P, P` | 🚀 Cloudflare Pages | 배포 관리 (빠른 접근!) |
| `Ctrl + Shift + L` | 🌐 로컬 페이지 열기 | localhost:3000 |
| `Ctrl + Shift + G` | 🚀 Git 배포 준비 | 상태 확인 |
| `Ctrl + Shift + N` | 🔄 Notion 동기화 | 비공개 정보 업데이트 |
| `Ctrl + Alt + S` | 📊 전체 동기화 | Notion + GitHub |

### 추가 기능

| 단축키 | 기능 |
|--------|------|
| `Ctrl + Shift + P, N` | 📝 Notion 페이지 열기 |

---

## 🌐 중요 링크

### 프로덕션

- **웹사이트**: https://amirealsia.com
- **www**: https://www.amirealsia.com
- **이메일**: hello@amirealsia.com

### 대시보드

- **Cloudflare**: https://dash.cloudflare.com
- **Cloudflare Pages**: https://dash.cloudflare.com/?to=/:account/pages
- **GitHub 저장소**: https://github.com/amirealsia/sia
- **Notion 페이지**: https://notion.so/28eca89869388007b5b7ff1e95f9abc9

### 로컬 개발

- **Dev Server**: http://localhost:3000
- **프로젝트 경로**: `d:\AI\amirealsia`

---

## 📂 프로젝트 구조

```
amirealsia/
├── landing/              # Next.js 랜딩페이지
│   ├── app/
│   │   ├── page.tsx     # 메인 페이지
│   │   ├── layout.tsx   # SEO 메타데이터
│   │   └── globals.css  # 스타일
│   └── package.json
│
├── notion-sync/          # Notion 동기화
│   ├── sync_to_page.py  # 공개 정보 동기화
│   ├── sync_private.py  # 비공개 정보 동기화
│   └── .env             # API 키 (비공개)
│
├── .vscode/              # VS Code 설정
│   ├── tasks.json       # 자동화 작업
│   ├── keybindings.json # 단축키
│   └── settings.json    # 설정
│
├── README.md             # 공개 프로젝트 소개
├── README_PRIVATE.md     # 비공개 상세 문서
│
└── 가이드 문서/
    ├── DEPLOY_CHECKLIST.md
    ├── DNS_SETUP_QUICK.md
    ├── CLOUDFLARE_PAGES_SETUP.md
    ├── CLOUDFLARE_EMAIL_SETUP.md
    ├── VSCODE_AUTOMATION.md
    └── SECURITY_GUIDE.md
```

---

## 🔄 일반 작업 흐름

### 1️⃣ 로컬 개발

```bash
# 개발 서버 시작
cd landing
npm run dev

# 또는 VS Code에서:
Ctrl + Shift + L
```

### 2️⃣ 코드 수정 후 배포

```bash
# 변경사항 확인
git status

# 커밋 및 푸시
git add .
git commit -m "Update landing page"
git push

# 또는 VS Code에서:
Ctrl + Shift + G  # Git 상태 확인
# 터미널에서 커밋/푸시
```

→ **Cloudflare Pages 자동 재배포!**

### 3️⃣ Notion 동기화

```bash
# 비공개 정보 동기화
cd notion-sync
python sync_private.py

# 또는 VS Code에서:
Ctrl + Shift + N
```

### 4️⃣ 전체 동기화

```bash
# Notion + GitHub 한 번에
Ctrl + Alt + S
```

---

## 🚀 배포 체크리스트

### 첫 배포 (한 번만)

- [ ] `Ctrl + Shift + P, P` - Cloudflare Pages 열기
- [ ] GitHub 저장소 연결 (`amirealsia/sia`)
- [ ] 빌드 설정:
  ```
  Build command: cd landing && npm run build
  Build output directory: landing/.next
  NODE_VERSION = 22
  ```
- [ ] 커스텀 도메인 추가: `amirealsia.com`
- [ ] www 추가: `www.amirealsia.com`

### 이후 배포 (자동)

```bash
git push
```

→ **완료!** Cloudflare Pages가 자동으로 처리합니다.

---

## 📧 이메일 설정

### 수신

`hello@amirealsia.com` → `amirealsia@gmail.com`

### 확인

```
Cloudflare → Email Routing → Status: Active
```

### 테스트

1. 다른 계정에서 `hello@amirealsia.com`으로 메일 발송
2. `amirealsia@gmail.com`에서 수신 확인

---

## 🔐 보안 중요 사항

### ✅ GitHub에 올라가는 것

- `README.md` (공개 소개)
- 코드 (landing/, notion-sync/)
- 가이드 문서
- VS Code 설정

### 🔒 절대 올라가지 않는 것

- `README_PRIVATE.md`
- `.env` (API 키)
- `private/` 폴더
- `PRIVATE_*.md` 파일

### 확인 방법

```bash
git check-ignore -v README_PRIVATE.md .env private/
```

모두 무시되면 안전! ✅

---

## 🛠️ VS Code 작업 (Tasks)

Tasks 메뉴로 실행 (`Ctrl + Shift + P` → `Tasks: Run Task`):

1. 🔄 Notion Sync (Private)
2. 🔄 Notion Sync (Public)
3. 📤 Git Push (Quick)
4. 🚀 Deploy to GitHub
5. 💻 Start Landing Page Dev Server
6. 🎨 Build Landing Page
7. 🔒 Check Git Ignored Files
8. 📊 Full Sync (Notion + GitHub)
9. 📧 Test Email (Open Browser)
10. 🌐 Open Landing Page (Local)
11. ☁️ Open Cloudflare Dashboard
12. 📝 Open Notion Page
13. 🚀 Open Cloudflare Pages

**추천:** 자주 쓰는 작업은 단축키로!

---

## 📊 모니터링

### 웹사이트 상태

```
https://amirealsia.com
https://www.amirealsia.com
```

→ 정상 작동 시: 랜딩페이지 표시

### DNS 상태

```
https://dnschecker.org/
도메인: amirealsia.com
```

→ CNAME: `amirealsia.pages.dev` 확인

### 배포 상태

```
Cloudflare Pages → Deployments
```

→ 최근 배포 상태 및 로그 확인

### 이메일 상태

```
Cloudflare → Email Routing
```

→ Status: Active 확인

---

## 🔧 문제 해결 빠른 가이드

### 웹사이트가 안 열려요

1. DNS 전파 대기 (최대 24시간)
2. https://dnschecker.org/ 확인
3. Cloudflare DNS 레코드 확인

### 배포가 실패했어요

1. Cloudflare Pages → Deployments → 로그 확인
2. `NODE_VERSION = 22` 설정 확인
3. Build command 확인: `cd landing && npm run build`

### 이메일이 안 와요

1. Cloudflare Email Routing → Status 확인
2. MX 레코드 확인 (자동 설정됨)
3. Gmail 스팸함 확인

### Git push가 막혔어요

1. 실수로 API 키 포함 여부 확인
2. `.gitignore` 확인
3. 민감 정보 제거 후 재시도

---

## 📚 상세 가이드

자세한 내용은 다음 문서 참고:

- [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md) - 배포 단계별 가이드
- [DNS_SETUP_QUICK.md](DNS_SETUP_QUICK.md) - DNS 설정
- [CLOUDFLARE_PAGES_SETUP.md](CLOUDFLARE_PAGES_SETUP.md) - Pages 상세
- [CLOUDFLARE_EMAIL_SETUP.md](CLOUDFLARE_EMAIL_SETUP.md) - 이메일 상세
- [VSCODE_AUTOMATION.md](VSCODE_AUTOMATION.md) - 자동화 상세
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) - 보안 가이드

---

## 🎉 자주 쓰는 명령어

### 로컬 개발

```bash
# 개발 서버
cd landing && npm run dev

# 빌드 테스트
cd landing && npm run build
```

### Git

```bash
# 상태 확인
git status

# 빠른 커밋
git add .
git commit -m "Update"
git push

# 브랜치 확인
git branch
```

### Notion 동기화

```bash
# 비공개 동기화
cd notion-sync && python sync_private.py

# 공개 동기화
cd notion-sync && python sync_to_page.py
```

---

## 💡 팁

### 1. 단축키 외우기

가장 자주 쓰는 3개만 외우세요:
- `Ctrl + Shift + C` - Cloudflare
- `Ctrl + Shift + L` - 로컬 페이지
- `Ctrl + Shift + N` - Notion 동기화

### 2. 자동 배포 활용

코드 수정 후 `git push`만 하면 자동 배포!
매번 Cloudflare 접속할 필요 없습니다.

### 3. DNS 변경 후 대기

DNS 변경 후 최대 24시간 대기.
보통 15분 내 적용됩니다.

### 4. 이메일 테스트

첫 설정 후 반드시 테스트 메일 발송!

### 5. 로컬에서 먼저 확인

배포 전 항상 `npm run dev`로 로컬 확인!

---

**이 파일을 북마크하세요! 📌**

모든 작업이 이 가이드에 있습니다. 🚀
