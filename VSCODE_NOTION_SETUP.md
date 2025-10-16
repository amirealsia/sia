# 🔌 VS Code Notion 확장프로그램 연결 가이드

설치된 확장프로그램:
- ✅ **vscode-notion** (frenco)
- ✅ **notion-cli** (marcflausino)

---

## 🚀 빠른 설정

### Step 1: Notion API 키 환경변수 설정

Windows 환경변수에 추가:

1. **시스템 환경 변수** 열기:
   - Windows 검색 → "환경 변수" 입력
   - **시스템 환경 변수 편집** 클릭

2. **사용자 변수** 섹션에서 **새로 만들기** 클릭:
   ```
   변수 이름: NOTION_API_KEY
   변수 값: ntn_YOUR_NOTION_API_KEY_HERE
   ```

3. **확인** 클릭 후 VS Code 재시작

---

## 📋 방법 1: vscode-notion 사용

### 설정 방법

1. **VS Code 명령 팔레트** 열기: `Ctrl + Shift + P`
2. `Notion: Add Page` 입력
3. Notion API 키 입력 요청 시:
   ```
   ntn_YOUR_NOTION_API_KEY_HERE
   ```

### 주요 기능

#### 📝 Notion 페이지를 VS Code에서 편집

```
Ctrl + Shift + P → Notion: Open Page
```

- Notion 페이지를 마크다운으로 열기
- VS Code에서 편집 후 Notion에 동기화

#### 📤 현재 파일을 Notion에 업로드

```
Ctrl + Shift + P → Notion: Upload Current File
```

- 현재 편집 중인 파일을 Notion 페이지로 생성
- 마크다운 지원

#### 🔄 Notion 페이지 새로고침

```
Ctrl + Shift + P → Notion: Refresh Pages
```

---

## 🖥️ 방법 2: notion-cli 사용

### CLI 명령어

프로젝트 루트에서 실행:

#### README를 Notion에 업로드

```bash
# Notion 페이지 생성
notion-cli create --title "Am I Real Sia README" --file README.md

# 기존 페이지 업데이트
notion-cli update --page-id 28eca89869388007b5b7ff1e95f9abc9 --file README.md
```

#### Git 커밋 로그를 Notion에 업로드

```bash
# 최근 커밋 로그 추출
git log --oneline -10 > commits.txt

# Notion에 업로드
notion-cli append --page-id 28eca89869388007b5b7ff1e95f9abc9 --file commits.txt
```

---

## 🎯 우리 프로젝트에 적용하기

### 1️⃣ README.md를 Notion과 동기화

**VS Code에서:**

1. `README.md` 파일 열기
2. `Ctrl + Shift + P` → `Notion: Upload Current File`
3. 페이지 제목: `Am I Real Sia - README`

**또는 터미널에서:**

```bash
# README를 기존 페이지에 추가
notion-cli update --page-id 28eca89869388007b5b7ff1e95f9abc9 --file README.md
```

### 2️⃣ 가이드 문서들을 Notion으로 이동

```bash
cd guides

# 각 가이드를 Notion에 업로드
for file in *.md; do
  notion-cli create --title "Guide: $file" --file "$file"
done
```

### 3️⃣ 프로젝트 구조를 Notion에 자동 기록

이미 만든 Python 스크립트 사용:

```bash
cd notion-sync
python sync_to_page.py
```

---

## ⚙️ VS Code 단축키 설정

`.vscode/keybindings.json` 파일 생성:

```json
[
  {
    "key": "ctrl+alt+n",
    "command": "notion.uploadCurrentFile",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+o",
    "command": "notion.openPage",
    "when": "editorTextFocus"
  }
]
```

이제:
- `Ctrl + Alt + N`: 현재 파일을 Notion에 업로드
- `Ctrl + Alt + O`: Notion 페이지 열기

---

## 🔄 자동 동기화 설정

### VS Code Task 만들기

`.vscode/tasks.json` 생성:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Sync to Notion",
      "type": "shell",
      "command": "cd notion-sync && python sync_to_page.py",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Upload README to Notion",
      "type": "shell",
      "command": "notion-cli update --page-id 28eca89869388007b5b7ff1e95f9abc9 --file README.md",
      "group": "build"
    }
  ]
}
```

**실행 방법:**
- `Ctrl + Shift + B` → Task 선택

---

## 📊 Notion 확장프로그램 명령어 모음

### vscode-notion

| 명령어 | 설명 |
|--------|------|
| `Notion: Add Page` | 새 Notion 페이지 생성 |
| `Notion: Open Page` | 기존 페이지 열기 |
| `Notion: Upload Current File` | 현재 파일 업로드 |
| `Notion: Refresh Pages` | 페이지 목록 새로고침 |
| `Notion: Search Pages` | 페이지 검색 |

### notion-cli

```bash
# 페이지 생성
notion-cli create --title "제목" --file 파일.md

# 페이지 업데이트
notion-cli update --page-id PAGE_ID --file 파일.md

# 페이지에 내용 추가
notion-cli append --page-id PAGE_ID --file 파일.md

# 페이지 읽기
notion-cli read --page-id PAGE_ID

# 페이지 목록
notion-cli list
```

---

## 🎨 실전 워크플로우

### 시나리오 1: README 수정 후 자동 업데이트

1. VS Code에서 `README.md` 수정
2. `Ctrl + S` 저장
3. `Ctrl + Shift + P` → `Notion: Upload Current File`
4. Notion에 자동 반영 ✅

### 시나리오 2: Notion에서 작성 → VS Code로 가져오기

1. Notion에서 문서 작성
2. VS Code에서 `Ctrl + Shift + P` → `Notion: Open Page`
3. 페이지 선택
4. VS Code에서 편집 → Notion 자동 동기화 ✅

### 시나리오 3: 매일 자동 프로젝트 스냅샷

Windows 작업 스케줄러 + Python 스크립트:

```batch
@echo off
cd /d D:\AI\amirealsia\notion-sync
python sync_to_page.py
```

매일 오전 9시 실행 → Notion에 프로젝트 현황 자동 기록 ✅

---

## 🔐 보안 주의사항

### ⚠️ API 키 노출 방지

1. **환경변수 사용** (위에서 설정)
2. **VS Code settings.json**에 직접 입력하지 말 것
3. **Git에 커밋하지 말 것**

`.vscode/settings.json`에 이미 환경변수 참조로 설정됨:
```json
"notion.token": "${env:NOTION_API_KEY}"
```

---

## 🧪 테스트

### 1️⃣ 확장프로그램 작동 확인

```
Ctrl + Shift + P → Notion: 입력
```

명령어 목록이 나타나면 설치 성공!

### 2️⃣ API 연결 확인

```
Ctrl + Shift + P → Notion: Open Page
```

페이지 목록이 표시되면 연결 성공!

### 3️⃣ 파일 업로드 테스트

1. 간단한 마크다운 파일 생성:
   ```markdown
   # 테스트
   Notion 연결 테스트입니다.
   ```

2. `Ctrl + Shift + P` → `Notion: Upload Current File`
3. Notion에서 확인

---

## 💡 유용한 팁

### 📌 Notion 페이지 ID 빠르게 가져오기

Notion 페이지 URL:
```
https://notion.so/Am-I-Real-Sia-28eca89869388007b5b7ff1e95f9abc9
                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                이 부분이 Page ID
```

### 📌 마크다운 <-> Notion 변환

VS Code의 마크다운을 Notion 블록으로 자동 변환:
- `# 제목` → Heading 1
- `## 소제목` → Heading 2
- `- 리스트` → Bulleted List
- ` ```코드``` ` → Code Block

### 📌 이미지 업로드

마크다운에 이미지 링크:
```markdown
![설명](https://이미지-url.com/image.png)
```

Notion에 자동으로 임베드됩니다.

---

## 🎯 다음 단계

VS Code + Notion 연결이 완료되었으니:

1. ✅ README를 Notion에 동기화
2. ✅ 가이드 문서들을 Notion으로 이동
3. ✅ 자동 동기화 스케줄 설정
4. ⏳ 랜딩페이지 구축 시작

---

## 💬 문의

문제가 발생하면:
- VS Code 출력 패널 확인: `View` → `Output` → `Notion` 선택
- 확장프로그램 로그 확인
- GitHub Issues 등록

**Made with 💖 for SIA**
