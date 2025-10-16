# Step 1: 환경 설정 가이드

## 📋 개요
Am I Real Sia 프로젝트를 실행하기 위한 기본 환경을 설정합니다.

## 🎯 목표
- Python 환경 구축
- 필수 라이브러리 설치
- API 키 및 계정 준비
- 프로젝트 폴더 구조 생성

---

## 1️⃣ Python 설치 및 가상환경 설정

### Python 설치 (3.10 또는 3.11 권장)
1. [Python 공식 사이트](https://www.python.org/downloads/) 접속
2. Python 3.10 또는 3.11 다운로드
3. 설치 시 **"Add Python to PATH"** 체크 필수
4. 설치 확인:
```bash
python --version
```

### 가상환경 생성
```bash
# HelloSia 폴더로 이동
cd d:\AI\HelloSia

# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 활성화 확인 (프롬프트 앞에 (venv) 표시됨)
```

---

## 2️⃣ 프로젝트 폴더 구조 생성

```bash
# HelloSia 폴더에서 실행
mkdir sia-automation
cd sia-automation

# 하위 폴더 생성
mkdir comfyui_workflows
mkdir refs
mkdir poses
mkdir prompts
mkdir out
mkdir export
mkdir scripts
mkdir secrets
mkdir logs
```

### 폴더 구조 설명
```
sia-automation/
├─ comfyui_workflows/    # ComfyUI 워크플로우 JSON 파일
├─ refs/                 # 얼굴 레퍼런스 이미지 (3-5장)
├─ poses/               # 포즈 가이드 이미지
├─ prompts/             # 테마/의상 프리셋 JSON
├─ out/                 # ComfyUI 생성 결과 (원본)
├─ export/             # NFT용 최적화된 이미지
├─ scripts/            # Python 자동화 스크립트
├─ secrets/            # API 키 및 환경변수 (.env)
└─ logs/               # 실행 로그 및 에러 기록
```

---

## 3️⃣ 필수 라이브러리 설치

### requirements.txt 생성
`sia-automation/requirements.txt` 파일을 생성하고 다음 내용 입력:

```txt
# 이미지 처리
Pillow==10.1.0

# HTTP 요청
requests==2.31.0

# 환경변수 관리
python-dotenv==1.0.0

# IPFS 업로드
ipfshttpclient==0.8.0a2

# Solana 블록체인
solana==0.30.2
solders==0.18.1

# SNS API
tweepy==4.14.0          # Twitter/X
praw==7.7.1             # Reddit
atproto==0.0.24         # Bluesky
requests-oauthlib==1.3.1

# OpenAI API (댓글 자동응답용)
openai==1.3.0

# 날짜/시간 처리
python-dateutil==2.8.2

# JSON 처리
orjson==3.9.10
```

### 라이브러리 설치
```bash
# 가상환경 활성화 상태에서
pip install -r requirements.txt
```

---

## 4️⃣ 필수 계정 및 API 키 준비

### 📧 Gmail 계정
- **계정**: amirealsia@gmail.com
- **용도**: Cloudflare Email Routing, SNS 인증

### 🔑 준비해야 할 API 키 목록

#### 1) NFT.Storage (IPFS 업로드)
- 사이트: https://nft.storage/
- 가입 후 API Key 발급
- **무료**: 무제한 업로드

#### 2) Crossmint (Solana NFT 민팅)
- 사이트: https://www.crossmint.com/
- 가입 후 API Key 발급
- **무료**: 월 100회 민팅

#### 3) OpenAI API (댓글 자동응답)
- 사이트: https://platform.openai.com/
- API Key 발급
- **유료**: 사용량 기반 과금

#### 4) Meta for Developers (Instagram)
- 사이트: https://developers.facebook.com/
- Instagram Business 계정 연결
- Graph API 앱 생성
- **무료**: 기본 사용

#### 5) Reddit API
- 사이트: https://www.reddit.com/prefs/apps
- Script 앱 생성
- client_id, client_secret 발급
- **무료**

#### 6) X (Twitter) API (선택)
- 사이트: https://developer.x.com/
- API v2 접근 (유료 플랜 필요)
- **유료**: Basic $100/월

#### 7) Bluesky
- 사이트: https://bsky.app/
- 계정만 있으면 됨
- **무료**

---

## 5️⃣ 환경변수 파일 생성

### `.env` 파일 생성
`sia-automation/secrets/.env` 파일 생성:

```env
# NFT.Storage API
NFT_STORAGE_TOKEN=your_nft_storage_token_here

# Crossmint API
CROSSMINT_API_KEY=your_crossmint_api_key_here

# Solana Wallet
SOLANA_WALLET_ADDRESS=your_solana_wallet_address_here
SOLANA_PRIVATE_KEY=your_solana_private_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Instagram/Meta
META_ACCESS_TOKEN=your_meta_access_token_here
IG_USER_ID=your_instagram_user_id_here

# Reddit API
REDDIT_CLIENT_ID=your_reddit_client_id_here
REDDIT_CLIENT_SECRET=your_reddit_client_secret_here
REDDIT_USERNAME=amirealsia
REDDIT_PASSWORD=your_reddit_password_here

# Bluesky
BLUESKY_HANDLE=amirealsia.io
BLUESKY_PASSWORD=your_bluesky_password_here

# Project Settings
PROJECT_NAME=AmIRealSia
BASE_DOMAIN=amirealsia.io
```

⚠️ **보안 주의사항**
- `.env` 파일은 절대 Git에 커밋하지 않기
- `.gitignore`에 `secrets/` 폴더 추가
- API 키는 절대 공개하지 않기

---

## 6️⃣ Phantom Wallet 설치 (Solana 지갑)

### 설치 방법
1. https://phantom.app/ 접속
2. Chrome 확장프로그램 설치
3. 새 지갑 생성
4. **시드 구문(12단어) 안전하게 백업**
5. 지갑 주소 복사 → `.env`에 입력

### 테스트넷 SOL 받기
```
1. Phantom에서 네트워크를 "Devnet"으로 변경
2. https://solfaucet.com/ 접속
3. 지갑 주소 입력 후 SOL 요청
4. 테스트용 SOL 수령
```

---

## 7️⃣ ComfyUI 설치

### ComfyUI 설치 (이미 설치되어 있다면 Skip)
```bash
# ComfyUI 클론
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# 의존성 설치
pip install -r requirements.txt

# ComfyUI 실행 테스트
python main.py
```

### 필수 확장팩 설치
ComfyUI Manager를 통해 다음 설치:
- **IPAdapter** (얼굴 일관성)
- **ControlNet** (포즈 제어)
- **WAS Node Suite** (이미지 처리)
- **FaceDetailer** (얼굴 디테일 향상)

---

## ✅ 체크리스트

환경 설정 완료 확인:
- [ ] Python 3.10/3.11 설치 완료
- [ ] 가상환경 생성 및 활성화
- [ ] 프로젝트 폴더 구조 생성
- [ ] requirements.txt 설치 완료
- [ ] `.env` 파일 생성 (API 키는 나중에 입력 가능)
- [ ] Phantom Wallet 설치 및 지갑 생성
- [ ] ComfyUI 설치 및 실행 확인

---

## 🔜 다음 단계

환경 설정이 완료되면 **Step 2: ComfyUI 이미지 생성 가이드**로 진행하세요.

[→ Step 2로 이동](./STEP2_ComfyUI_이미지생성.md)
