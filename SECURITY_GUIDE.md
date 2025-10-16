# 🔐 보안 및 공개/비공개 분리 가이드

## 📂 프로젝트 구조

```
amirealsia/
├── README.md                    ✅ 공개 - GitHub에 노출
├── README_PRIVATE.md            🔒 비공개 - Git 제외
│
├── public/                      ✅ 공개 - GitHub에 노출
│   └── (공개해도 되는 파일들)
│
├── private/                     🔒 비공개 - Git 제외
│   ├── api_keys.md             🔒 API 키 관리
│   ├── strategy.md             🔒 전략 및 계획
│   └── notion_sync_log.json    🔒 동기화 로그
│
├── notion-sync/
│   ├── sync_to_page.py         ✅ 공개 (코드만)
│   ├── sync_private.py         ✅ 공개 (코드만)
│   ├── .env                    🔒 비공개 - Git 제외
│   └── project_snapshot.json   🔒 비공개 - Git 제외
│
└── .gitignore                   ✅ 공개 (보안 설정 포함)
```

---

## 🎯 원칙

### ✅ GitHub (공개 저장소)에 올라가는 것
- 프로젝트 소개 (README.md)
- 공개해도 되는 코드
- 공개 문서 및 가이드
- 이미지 샘플 (NFT 작품)
- 기술 스택 정보

### 🔒 Notion (비공개)에만 저장되는 것
- API 키 및 토큰
- 지갑 개인키
- 상세한 프로젝트 계획
- 수익 전략
- 개인 메모 및 TODO
- README_PRIVATE.md (상세 정보)

### ❌ 절대 공개하면 안 되는 것
- `NOTION_API_KEY`
- `GitHub Personal Access Token`
- `OpenAI API Key`
- `NFT Wallet Private Keys`
- `Email 비밀번호`
- `.env` 파일들
- 개인 신상 정보

---

## 🛡️ .gitignore 설정

이미 설정된 보호 항목:

```gitignore
# 비공개 문서
README_PRIVATE.md
private/
PRIVATE_*.md
*.private.md

# API 키 및 환경변수
.env
.env.*
secrets/
*_token.txt
*_key.txt

# Notion 동기화 로그
notion-sync/.env
notion-sync/project_snapshot.json
```

---

## 🔄 동기화 전략

### GitHub 동기화 (공개)

```bash
# 공개 정보만 커밋
git add README.md public/
git commit -m "📝 Update public documentation"
git push
```

**자동으로 제외되는 것:**
- `README_PRIVATE.md`
- `private/` 폴더
- `.env` 파일
- API 키 및 토큰

### Notion 동기화 (비공개)

```bash
# 비공개 정보를 Notion에 동기화
cd notion-sync
python sync_private.py
```

**Notion에 올라가는 것:**
- README_PRIVATE.md 정보
- 비공개 파일 목록
- Git 커밋 히스토리
- 환경변수 파일 상태 (내용은 제외)

---

## 📝 사용 방법

### 1️⃣ 공개 정보 작성 (GitHub용)

`README.md` - 누구나 볼 수 있음:
```markdown
# 🌸 Am I Real Sia

프로젝트 소개, 컨셉, 링크 등
단, API 키나 개인 정보는 절대 포함하지 말 것!
```

### 2️⃣ 비공개 정보 작성 (Notion용)

`README_PRIVATE.md` - 나만 봄:
```markdown
# 🔒 Am I Real Sia - 비공개 정보

## API 키
- Notion: ntn_YOUR_NOTION_API_KEY_HERE
- GitHub: ghp_YOUR_GITHUB_TOKEN_HERE

## 상세 전략
- NFT 가격 책정
- 마케팅 플랜
- 수익 목표
```

### 3️⃣ 동기화

```bash
# 공개 정보 → GitHub
git add README.md
git commit -m "📝 Update public readme"
git push

# 비공개 정보 → Notion
cd notion-sync
python sync_private.py
```

---

## 🔍 확인 방법

### GitHub에 비공개 정보가 올라갔는지 확인

```bash
# Git에서 추적 중인 파일 확인
git ls-files

# 특정 파일이 무시되는지 확인
git check-ignore -v README_PRIVATE.md
# 출력: .gitignore:8:README_PRIVATE.md    README_PRIVATE.md
```

✅ 위와 같이 출력되면 안전하게 무시됨

### Notion 동기화 확인

```bash
# 비공개 동기화 실행
python sync_private.py

# 출력 확인
✅ README_PRIVATE: XXX 단어
✅ 비공개 파일: XX개
✅ Notion 업데이트 완료!
```

---

## ⚠️ 실수 방지

### 실수 1: API 키를 README.md에 작성

❌ **잘못된 예:**
```markdown
# README.md
API Key: ntn_EXAMPLE_KEY_DONT_COMMIT_REAL_KEYS_HERE
```

✅ **올바른 예:**
```markdown
# README.md
API 키는 .env 파일에 설정하세요.

# README_PRIVATE.md (Git 제외)
API Key: ntn_YOUR_REAL_NOTION_API_KEY_HERE
```

### 실수 2: .env 파일을 Git에 커밋

이미 .gitignore에 설정되어 있어서 자동으로 차단됩니다!

```bash
git add .env
# 출력: The following paths are ignored by one of your .gitignore files:
#       .env
```

---

## 🚨 응급 상황

### 실수로 API 키를 GitHub에 푸시한 경우

#### 1️⃣ 즉시 API 키 재발급
- Notion Integration 키 재생성
- GitHub Personal Access Token 재발급

#### 2️⃣ Git 히스토리에서 제거

```bash
# 가장 최근 커밋 취소 (푸시 전)
git reset HEAD~1

# 이미 푸시한 경우 (⚠️ 주의 필요)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch README_PRIVATE.md" \
  --prune-empty --tag-name-filter cat -- --all

git push --force
```

#### 3️⃣ GitHub에 문의
- 완전 삭제를 원하면 GitHub Support에 연락

---

## 📊 보안 체크리스트

작업 전 확인:

- [ ] `README.md`에 API 키가 없는지 확인
- [ ] `README_PRIVATE.md`가 `.gitignore`에 있는지 확인
- [ ] `.env` 파일이 Git에 포함되지 않는지 확인
- [ ] `git status`로 추적 중인 파일 확인
- [ ] 비공개 폴더 `private/`가 제외되는지 확인

푸시 전 확인:

- [ ] `git diff`로 커밋 내용 검토
- [ ] API 키나 토큰이 포함되지 않았는지 확인
- [ ] `.gitignore`가 제대로 작동하는지 확인

---

## 🎯 권장 워크플로우

### 일상적인 작업

```bash
# 1. 작업 시작
cd d:\AI\amirealsia

# 2. 공개 파일 수정
# - README.md
# - public/ 폴더

# 3. 비공개 파일 수정
# - README_PRIVATE.md
# - private/ 폴더

# 4. 공개 정보만 커밋
git add README.md public/
git status  # 확인!
git commit -m "📝 Update: 변경사항"
git push

# 5. 비공개 정보는 Notion에
cd notion-sync
python sync_private.py
```

---

## 💡 팁

### VS Code에서 비공개 파일 구분

`.vscode/settings.json`에 이미 설정됨:
```json
{
  "files.exclude": {
    "**/.env": true
  }
}
```

비공개 파일이 탐색기에서 흐리게 표시됩니다.

### GitHub에서 확인

저장소 페이지에서:
- `README.md` ✅ 보임
- `README_PRIVATE.md` ❌ 안 보임
- `private/` 폴더 ❌ 안 보임

---

## 📞 문의

보안 문제 발견 시:
- 즉시 API 키 재발급
- GitHub 저장소 Private으로 전환
- hello@amirealsia.com으로 연락

---

**Made with 💖 for SIA - Your secrets are safe! 🔒**
