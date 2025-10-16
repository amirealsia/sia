# Step 4: Solana NFT 민팅 가이드

## 📋 개요
IPFS에 업로드된 메타데이터를 사용하여 Solana 블록체인에 NFT를 민팅합니다.

## 🎯 목표
- Crossmint API를 통한 Solana NFT 민팅
- OpenSea 자동 인덱싱 확인
- 민팅 결과 로깅

---

## 1️⃣ Crossmint API 키 발급

### 계정 생성 및 API 키 발급
1. https://www.crossmint.com/ 접속
2. **Sign Up** → 개발자 계정 생성
3. **Dashboard** → **API Keys** 이동
4. **Create New API Key** 클릭
5. API Key 복사

### .env 파일에 추가
```env
CROSSMINT_API_KEY=your_crossmint_api_key_here
```

---

## 2️⃣ Solana NFT 민팅 스크립트

### mint_solana.py 생성
`sia-automation/scripts/mint_solana.py`:

```python
import requests
import os
from pathlib import Path
from dotenv import load_dotenv
import json
import time

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

CROSSMINT_API_KEY = os.getenv("CROSSMINT_API_KEY")
SOLANA_WALLET_ADDRESS = os.getenv("SOLANA_WALLET_ADDRESS")

def mint_nft(metadata_ipfs_url, recipient=None):
    """
    Crossmint API를 통해 Solana NFT 민팅

    Args:
        metadata_ipfs_url: 메타데이터의 IPFS URL
        recipient: NFT를 받을 지갑 주소 (기본값: 본인 지갑)

    Returns:
        민팅 결과 딕셔너리
    """
    print(f"\n💎 NFT 민팅 시작...")

    if not CROSSMINT_API_KEY:
        raise ValueError("❌ CROSSMINT_API_KEY가 설정되지 않았습니다")

    if not recipient:
        recipient = SOLANA_WALLET_ADDRESS

    # Crossmint API 엔드포인트
    url = "https://www.crossmint.com/api/2022-06-09/collections/default/nfts"

    headers = {
        "X-API-KEY": CROSSMINT_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "recipient": f"solana:{recipient}",
        "metadata": {
            "uri": metadata_ipfs_url
        }
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=60)

        if response.status_code == 200 or response.status_code == 201:
            result = response.json()
            print(f"✅ NFT 민팅 성공!")
            print(f"   민팅 ID: {result.get('id')}")
            return {
                "success": True,
                "mint_id": result.get('id'),
                "result": result
            }
        else:
            print(f"❌ NFT 민팅 실패: {response.status_code}")
            print(f"   응답: {response.text}")
            return {
                "success": False,
                "error": response.text
            }

    except Exception as e:
        print(f"❌ 민팅 중 오류 발생: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }

def check_mint_status(mint_id, max_retries=10):
    """
    민팅 상태 확인 (Crossmint는 비동기 처리)

    Args:
        mint_id: 민팅 ID
        max_retries: 최대 재시도 횟수

    Returns:
        민팅 상태 정보
    """
    print(f"\n🔍 민팅 상태 확인 중...")

    url = f"https://www.crossmint.com/api/2022-06-09/collections/default/nfts/{mint_id}"

    headers = {
        "X-API-KEY": CROSSMINT_API_KEY
    }

    for attempt in range(max_retries):
        try:
            response = requests.get(url, headers=headers, timeout=30)

            if response.status_code == 200:
                result = response.json()
                status = result.get('onChain', {}).get('status', 'pending')

                print(f"   시도 {attempt + 1}/{max_retries}: {status}")

                if status == 'success':
                    print(f"✅ 민팅 완료!")
                    print(f"   NFT 주소: {result.get('onChain', {}).get('mintHash')}")
                    return result

                elif status == 'failed':
                    print(f"❌ 민팅 실패: {result}")
                    return result

            time.sleep(10)  # 10초 대기 후 재시도

        except Exception as e:
            print(f"⚠️ 상태 확인 중 오류: {str(e)}")
            time.sleep(10)

    print(f"⏰ 민팅 상태 확인 타임아웃")
    return None

def save_mint_result(result, output_dir):
    """민팅 결과 저장"""
    from datetime import date

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    filename = f"mint_result_{date.today().isoformat()}.json"
    output_path = output_dir / filename

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"📄 민팅 결과 저장: {output_path}")
    return output_path

if __name__ == "__main__":
    # 테스트
    test_metadata_url = "ipfs://your-test-cid"

    result = mint_nft(test_metadata_url)

    if result["success"]:
        mint_id = result["mint_id"]
        final_result = check_mint_status(mint_id)

        if final_result:
            logs_dir = BASE_DIR / "logs"
            save_mint_result(final_result, logs_dir)
```

---

## 3️⃣ 대체 방법: Tatum API 사용

### mint_tatum.py (선택사항)
`sia-automation/scripts/mint_tatum.py`:

```python
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

TATUM_API_KEY = os.getenv("TATUM_API_KEY")  # .env에 추가 필요

def mint_nft_tatum(metadata_uri):
    """
    Tatum API를 통한 Solana NFT 민팅
    """
    url = "https://api.tatum.io/v3/nft/mint"

    headers = {
        "x-api-key": TATUM_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "chain": "SOL",
        "to": os.getenv("SOLANA_WALLET_ADDRESS"),
        "url": metadata_uri,
        "fromPrivateKey": os.getenv("SOLANA_PRIVATE_KEY")
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        print(f"✅ Tatum 민팅 성공: {result}")
        return result
    else:
        print(f"❌ Tatum 민팅 실패: {response.text}")
        return None
```

---

## 4️⃣ OpenSea 컬렉션 설정

### OpenSea 컬렉션 생성
1. https://opensea.io/ 접속
2. **Profile** → **My Collections** → **Create a collection**
3. 컬렉션 정보 입력:

| 항목 | 값 |
|------|-----|
| Logo | 600×600 PNG (SIA 프로필 이미지) |
| Featured Image | 600×400 PNG (대표 이미지) |
| Banner | 1400×400 PNG (배너 이미지) |
| Name | Am I Real Sia |
| URL | amirealsia |
| Description | 매일 존재를 증명하는 AI 아이돌의 365일 여정 |
| Category | Art |
| Blockchain | Solana |
| Creator Earnings | 5% |

### 컬렉션 URL
```
https://opensea.io/collection/amirealsia
```

---

## 5️⃣ 통합 민팅 함수

### 전체 민팅 프로세스
`sia-automation/scripts/mint_daily_nft.py`:

```python
from pathlib import Path
from datetime import date
from mint_solana import mint_nft, check_mint_status, save_mint_result
import json

BASE_DIR = Path(__file__).resolve().parents[1]

def mint_daily_nft(metadata_ipfs_url):
    """
    일일 NFT 민팅 전체 프로세스

    Args:
        metadata_ipfs_url: 메타데이터 IPFS URL

    Returns:
        민팅 결과
    """
    print(f"\n{'='*50}")
    print(f"💎 일일 NFT 민팅 시작")
    print(f"{'='*50}\n")

    # Step 1: NFT 민팅
    result = mint_nft(metadata_ipfs_url)

    if not result["success"]:
        print(f"❌ 민팅 실패")
        return result

    # Step 2: 민팅 상태 확인
    mint_id = result["mint_id"]
    final_result = check_mint_status(mint_id)

    if not final_result:
        print(f"⚠️ 민팅 상태 확인 실패")
        return result

    # Step 3: 결과 저장
    today = date.today().isoformat()
    export_dir = BASE_DIR / "export" / today
    save_mint_result(final_result, export_dir)

    # OpenSea URL 생성
    nft_address = final_result.get('onChain', {}).get('mintHash')
    opensea_url = f"https://opensea.io/assets/solana/{nft_address}" if nft_address else None

    print(f"\n{'='*50}")
    print(f"✅ 민팅 완료!")
    print(f"{'='*50}")
    print(f"OpenSea URL: {opensea_url}")

    return {
        "success": True,
        "mint_id": mint_id,
        "nft_address": nft_address,
        "opensea_url": opensea_url,
        "metadata_url": metadata_ipfs_url
    }

if __name__ == "__main__":
    # 테스트: 가장 최근 메타데이터 사용
    from datetime import date

    export_dir = BASE_DIR / "export" / date.today().isoformat()
    metadata_files = list(export_dir.glob("metadata_*.json"))

    if metadata_files:
        latest_metadata = max(metadata_files, key=lambda p: p.stat().st_mtime)

        # 메타데이터에서 IPFS URL 추출 (실제로는 이전 단계에서 전달받음)
        with open(latest_metadata, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 실제 구현에서는 process_image.py의 결과에서 metadata_ipfs를 받아옴
        print("⚠️ 테스트 모드: 실제 metadata_ipfs URL을 전달해야 합니다")
```

---

## 6️⃣ 테스트 실행

### 테스트넷에서 테스트 (권장)
```bash
# Phantom Wallet을 Devnet으로 변경
# 테스트 SOL 받기: https://solfaucet.com/

cd d:\AI\HelloSia\sia-automation
python scripts\mint_solana.py
```

### 메인넷 실행 (실제 민팅)
- Phantom Wallet을 Mainnet으로 변경
- 실제 SOL이 필요 (가스비)
- Crossmint 무료 한도: 월 100회

---

## ✅ 체크리스트

- [ ] Crossmint API 키 발급 및 설정
- [ ] mint_solana.py 작성 완료
- [ ] Phantom Wallet 준비 (Devnet SOL)
- [ ] 테스트 민팅 성공
- [ ] OpenSea 컬렉션 생성
- [ ] 메인넷 민팅 테스트 성공

---

## 🔜 다음 단계

NFT 민팅이 성공하면 **Step 5: SNS 자동 포스팅**으로 진행하세요.

[→ Step 5로 이동](./STEP5_SNS_자동포스팅.md)
