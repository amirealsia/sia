# 🌸 Am I Real Sia - 자동화 가이드

## 📖 개요
이 가이드는 **Am I Real Sia** 프로젝트의 완전 자동화 시스템을 구축하는 방법을 단계별로 설명합니다.

매일 자동으로:
1. 실사풍 이미지 생성 (ComfyUI)
2. IPFS 업로드 및 메타데이터 생성
3. Solana NFT 민팅
4. 여러 SNS에 자동 포스팅

---

## 🎯 최종 목표

**매일 같은 시간, 완전 자동으로:**
- ✅ 새로운 이미지가 생성되고
- ✅ NFT가 OpenSea에 등록되며
- ✅ Instagram, Reddit, Bluesky 등에 포스팅됩니다

---

## 📚 가이드 목차

### [Step 1: 환경 설정](./STEP1_환경설정.md)
- Python 및 가상환경 설정
- 필수 라이브러리 설치
- API 키 및 계정 준비
- 프로젝트 폴더 구조 생성

**소요 시간**: 약 1-2시간

---

### [Step 2: ComfyUI 이미지 생성](./STEP2_ComfyUI_이미지생성.md)
- 얼굴 레퍼런스 이미지 준비
- IPAdapter + ControlNet 워크플로우 구성
- 매일 다른 스타일/의상 자동 적용
- Python 스크립트로 워크플로우 자동 실행

**소요 시간**: 약 2-3시간

---

### [Step 3: IPFS 업로드 및 메타데이터 생성](./STEP3_IPFS_업로드.md)
- 이미지 NFT 규격 최적화 (2048×2048)
- IPFS에 이미지 업로드 (NFT.Storage)
- OpenSea 표준 메타데이터 JSON 생성
- 메타데이터 IPFS 업로드

**소요 시간**: 약 1시간

---

### [Step 4: Solana NFT 민팅](./STEP4_Solana_민팅.md)
- Crossmint API 연동
- Solana 블록체인 NFT 발행
- OpenSea 자동 인덱싱 확인
- 민팅 결과 로깅

**소요 시간**: 약 1-2시간

---

### [Step 5: SNS 자동 포스팅](./STEP5_SNS_자동포스팅.md)
- OpenAI로 일일 스토리 자동 생성
- Reddit 자동 포스팅
- Bluesky 자동 포스팅
- Instagram 자동 포스팅 (선택)
- 통합 멀티 플랫폼 포스팅

**소요 시간**: 약 2-3시간

---

### [Step 6: 통합 자동화](./STEP6_통합_자동화.md)
- 전체 프로세스를 하나의 스크립트로 통합
- 에러 처리 및 재시도 로직
- 실행 로그 기록
- Discord/Email 알림 시스템

**소요 시간**: 약 1시간

---

### [Step 7: Windows 작업 스케줄러 설정](./STEP7_작업스케줄러.md)
- 매일 정해진 시간 자동 실행 설정
- ComfyUI 서버 자동 시작
- 실행 실패 시 재시도 설정
- 백업 및 모니터링

**소요 시간**: 약 30분

---

### [🛡️ Step 8: 컨텐츠 안전 필터](./STEP8_컨텐츠_안전필터.md)
- OpenAI Moderation API 연동
- 이미지 생성 안전 필터
- AI 스토리 출력 검증
- 댓글/대화 입력 필터링
- 통합 안전 시스템 테스트

**소요 시간**: 약 1-2시간

---

## ⏱️ 전체 소요 시간

- **최소**: 약 10-12시간 (API 키 발급 대기 시간 제외)
- **권장**: 2-3일에 걸쳐 천천히 진행

---

## 🔧 필수 준비물

### 하드웨어
- **CPU**: Intel i7-3770 이상
- **RAM**: 32GB (DDR3 1600MHz 권장)
- **GPU**: RTX 3060 12GB 이상
- **저장공간**: SSD 500GB 이상

### 소프트웨어
- **OS**: Windows 10/11
- **Python**: 3.10 또는 3.11
- **ComfyUI**: 최신 버전
- **VS Code**: 권장

### 계정 및 API 키
- ✅ Gmail (amirealsia@gmail.com)
- ✅ Cloudflare (도메인 + 이메일 라우팅)
- ✅ NFT.Storage (IPFS 업로드)
- ✅ Crossmint (Solana NFT 민팅)
- ✅ OpenAI (스토리 생성)
- ✅ Phantom Wallet (Solana 지갑)
- ✅ Reddit API
- ✅ Bluesky 계정
- ✅ Instagram Business 계정 (선택)

---

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 프로젝트 폴더 생성
cd d:\AI\HelloSia
mkdir sia-automation

# 가상환경 생성
python -m venv venv
venv\Scripts\activate

# 라이브러리 설치
pip install -r requirements.txt
```

### 2. API 키 설정
`.env` 파일에 모든 API 키 입력

### 3. 테스트 실행
```bash
cd sia-automation
python scripts\daily_run.py
```

### 4. 자동 스케줄 설정
Windows 작업 스케줄러에 등록 (Step 7 참조)

---

## 📊 자동화 흐름도

```
매일 오전 9시
    ↓
┌─────────────────┐
│ ComfyUI 서버    │ ← 8:55 자동 시작
│ 자동 시작       │
└─────────────────┘
    ↓
┌─────────────────┐
│ 1. 이미지 생성   │ ← Flux 실사풍
│   (ComfyUI)      │   얼굴 일관성 유지
└─────────────────┘
    ↓
┌─────────────────┐
│ 2. 이미지 최적화 │ ← 2048×2048
│   & IPFS 업로드  │   NFT.Storage
└─────────────────┘
    ↓
┌─────────────────┐
│ 3. 메타데이터    │ ← OpenSea 표준
│   생성 & 업로드  │   IPFS 업로드
└─────────────────┘
    ↓
┌─────────────────┐
│ 4. NFT 민팅      │ ← Crossmint API
│   (Solana)       │   OpenSea 연동
└─────────────────┘
    ↓
┌─────────────────┐
│ 5. 스토리 생성   │ ← OpenAI GPT
│   (AI 캡션)      │   감성적 문장
└─────────────────┘
    ↓
┌─────────────────┐
│ 6. SNS 포스팅    │ ← Reddit
│   (멀티 플랫폼)  │   Bluesky
│                  │   Instagram
└─────────────────┘
    ↓
┌─────────────────┐
│ 7. 로그 저장     │ ← 결과 기록
│   & 알림         │   Discord 알림
└─────────────────┘

🛡️ 전 단계에 안전 필터 적용
- 이미지 생성: 네거티브 프롬프트
- 스토리 생성: 출력 검증
- 모든 텍스트: Moderation API
```

---

## 💡 유용한 팁

### 비용 절감
- NFT.Storage: 무료 무제한
- Crossmint: 월 100회 무료
- OpenAI: 저렴한 모델 사용 (GPT-3.5)
- Reddit/Bluesky: 완전 무료

### 안정성 향상
- 에러 로그 매일 확인
- API 키 백업
- 결과 파일 주간 백업

### 품질 개선
- 레퍼런스 이미지 주기적 업데이트
- 프롬프트 프리셋 다양화
- 팬 피드백 반영

---

## 🆘 문제 해결

### 이미지 생성 실패
→ [Step 2 가이드](./STEP2_ComfyUI_이미지생성.md#6️⃣-테스트-실행) 참조

### NFT 민팅 실패
→ [Step 4 가이드](./STEP4_Solana_민팅.md#6️⃣-테스트-실행) 참조

### SNS 포스팅 실패
→ [Step 5 가이드](./STEP5_SNS_자동포스팅.md#✅-체크리스트) 참조

### 작업 스케줄러 오류
→ [Step 7 가이드](./STEP7_작업스케줄러.md#7️⃣-문제-해결) 참조

### 부적절한 컨텐츠 생성
→ [Step 8 가이드](./STEP8_컨텐츠_안전필터.md#6️⃣-daily_runpy-업데이트) 참조

---

## 📞 지원

문제가 발생하면:
1. 해당 단계 가이드의 "문제 해결" 섹션 확인
2. 로그 파일 확인 (`logs/`)
3. GitHub Issues에 질문

---

## 🎉 완료 후

모든 설정이 완료되면:
- ✅ 매일 자동으로 NFT가 생성됩니다
- ✅ OpenSea에서 컬렉션 확인 가능
- ✅ SNS에서 자동 포스트 확인 가능
- ✅ 365일 동안 자동 운영!

---

**Let's make SIA real! 🌸**
