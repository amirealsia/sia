# Step 3: IPFS 업로드 및 메타데이터 생성 가이드

## 📋 개요
생성된 이미지를 NFT용으로 최적화하고, IPFS에 업로드한 후 OpenSea 호환 메타데이터를 생성합니다.

## 🎯 목표
- 이미지 NFT 규격 최적화 (2048×2048)
- IPFS에 이미지 업로드
- OpenSea 표준 메타데이터 JSON 생성
- 메타데이터도 IPFS에 업로드

---

## 1️⃣ 이미지 최적화 스크립트

### optimize_image.py 생성
`sia-automation/scripts/optimize_image.py`:

```python
from PIL import Image
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

def optimize_for_nft(input_path, output_path, size=(2048, 2048), quality=90):
    """
    NFT용 이미지 최적화
    - 정사각형으로 크롭
    - 2048x2048로 리사이즈
    - 파일 크기 10MB 이하로 압축
    """
    print(f"🖼️  이미지 최적화 시작: {input_path}")

    # 이미지 열기
    img = Image.open(input_path)

    # RGB 모드로 변환 (RGBA → RGB)
    if img.mode == 'RGBA':
        # 흰색 배경 생성
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])  # Alpha 채널을 마스크로 사용
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # 정사각형 크롭 (중앙 기준)
    width, height = img.size
    if width != height:
        min_side = min(width, height)
        left = (width - min_side) // 2
        top = (height - min_side) // 2
        img = img.crop((left, top, left + min_side, top + min_side))

    # 리사이즈
    img = img.resize(size, Image.Resampling.LANCZOS)

    # 파일 저장 (10MB 이하로 압축)
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    q = quality
    while True:
        img.save(output_path, format='JPEG', quality=q, optimize=True)
        file_size = os.path.getsize(output_path)

        if file_size <= 10 * 1024 * 1024 or q <= 70:  # 10MB 이하 or 품질 70 이하
            break
        q -= 5

    file_size_mb = file_size / 1024 / 1024
    print(f"✅ 최적화 완료: {output_path.name} ({file_size_mb:.2f}MB, Q={q})")

    return output_path

if __name__ == "__main__":
    # 테스트
    from datetime import date

    out_dir = BASE_DIR / "out"
    export_dir = BASE_DIR / "export" / date.today().isoformat()

    # 가장 최근 이미지 찾기
    latest_image = max(out_dir.glob("*.png"), key=lambda p: p.stat().st_mtime)

    # 최적화
    output_path = export_dir / f"sia_nft_{date.today().isoformat()}.jpg"
    optimize_for_nft(latest_image, output_path)
```

---

## 2️⃣ IPFS 업로드 스크립트

### upload_ipfs.py 생성
`sia-automation/scripts/upload_ipfs.py`:

```python
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

# 환경변수 로드
BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

NFT_STORAGE_TOKEN = os.getenv("NFT_STORAGE_TOKEN")

def upload_to_ipfs(file_path):
    """
    NFT.Storage를 통해 IPFS에 파일 업로드
    반환: ipfs://CID 형식의 URI
    """
    print(f"☁️  IPFS 업로드 시작: {file_path}")

    if not NFT_STORAGE_TOKEN:
        raise ValueError("❌ NFT_STORAGE_TOKEN이 .env 파일에 설정되지 않았습니다")

    url = "https://api.nft.storage/upload"
    headers = {
        "Authorization": f"Bearer {NFT_STORAGE_TOKEN}"
    }

    with open(file_path, 'rb') as f:
        response = requests.post(
            url,
            headers=headers,
            files={"file": (Path(file_path).name, f, "application/octet-stream")},
            timeout=180
        )

    if response.status_code == 200:
        data = response.json()
        cid = data["value"]["cid"]
        ipfs_url = f"ipfs://{cid}"
        print(f"✅ IPFS 업로드 성공: {ipfs_url}")
        return ipfs_url
    else:
        print(f"❌ IPFS 업로드 실패: {response.status_code}")
        print(response.text)
        return None

if __name__ == "__main__":
    # 테스트
    from datetime import date

    export_dir = BASE_DIR / "export" / date.today().isoformat()
    latest_image = max(export_dir.glob("*.jpg"), key=lambda p: p.stat().st_mtime)

    ipfs_url = upload_to_ipfs(latest_image)
    print(f"IPFS URL: {ipfs_url}")
```

---

## 3️⃣ 메타데이터 생성 스크립트

### make_metadata.py 생성
`sia-automation/scripts/make_metadata.py`:

```python
import json
from datetime import date, datetime
from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

def calculate_day_number():
    """프로젝트 시작일로부터 경과 일수 계산"""
    # 프로젝트 시작일 설정 (예: 2025-01-01)
    start_date = date(2025, 1, 1)
    today = date.today()
    days_elapsed = (today - start_date).days + 1
    return days_elapsed

def create_metadata(image_ipfs_url, params):
    """
    OpenSea 호환 메타데이터 생성

    Args:
        image_ipfs_url: 이미지의 IPFS URL
        params: 이미지 생성 시 사용한 파라미터 (outfit, background, mood 등)

    Returns:
        메타데이터 딕셔너리
    """
    day_num = calculate_day_number()

    metadata = {
        "name": f"Am I Real Sia #{day_num:03d}",
        "description": (
            "Am I real, or just AI?\n\n"
            "A daily photorealistic portrait from SIA, "
            "an AI idol documenting her journey to become real. "
            f"Day {day_num} of 365.\n\n"
            "매일 하나의 사진으로 존재를 증명하는 AI 아이돌 SIA의 {day_num}일째 기록."
        ),
        "image": image_ipfs_url,
        "external_url": "https://amirealsia.io",
        "attributes": [
            {
                "trait_type": "Day",
                "value": day_num
            },
            {
                "trait_type": "Date",
                "value": date.today().isoformat()
            },
            {
                "trait_type": "Outfit",
                "value": params.get("outfit", "Unknown")
            },
            {
                "trait_type": "Background",
                "value": params.get("background", "Unknown")
            },
            {
                "trait_type": "Mood",
                "value": params.get("mood", "Unknown")
            },
            {
                "trait_type": "Camera",
                "value": "iPhone 15 Pro"
            },
            {
                "trait_type": "Style",
                "value": "Photorealistic"
            },
            {
                "trait_type": "AI Model",
                "value": "Flux SDXL"
            }
        ]
    }

    return metadata

def save_metadata(metadata, output_dir):
    """메타데이터 JSON 파일 저장"""
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    filename = f"metadata_{date.today().isoformat()}.json"
    output_path = output_dir / filename

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    print(f"📄 메타데이터 저장: {output_path}")
    return output_path

if __name__ == "__main__":
    # 테스트
    test_params = {
        "outfit": "casual white t-shirt and jeans",
        "background": "clean studio backdrop with soft lighting",
        "mood": "soft smile, gentle eyes"
    }

    metadata = create_metadata("ipfs://test-cid", test_params)
    print(json.dumps(metadata, ensure_ascii=False, indent=2))

    # 저장 테스트
    export_dir = BASE_DIR / "export" / date.today().isoformat()
    save_metadata(metadata, export_dir)
```

---

## 4️⃣ 통합 스크립트

### process_image.py 생성
`sia-automation/scripts/process_image.py`:

```python
from pathlib import Path
from datetime import date
from optimize_image import optimize_for_nft
from upload_ipfs import upload_to_ipfs
from make_metadata import create_metadata, save_metadata

BASE_DIR = Path(__file__).resolve().parents[1]

def process_daily_image(input_image_path, params):
    """
    일일 이미지 처리 파이프라인
    1. 이미지 최적화
    2. IPFS 업로드
    3. 메타데이터 생성
    4. 메타데이터 IPFS 업로드

    Args:
        input_image_path: ComfyUI에서 생성된 원본 이미지 경로
        params: 이미지 생성 파라미터

    Returns:
        {
            "image_path": 최적화된 이미지 경로,
            "image_ipfs": 이미지 IPFS URL,
            "metadata_path": 메타데이터 파일 경로,
            "metadata_ipfs": 메타데이터 IPFS URL
        }
    """
    today = date.today().isoformat()
    export_dir = BASE_DIR / "export" / today

    print(f"\n{'='*50}")
    print(f"🚀 이미지 처리 시작: {today}")
    print(f"{'='*50}\n")

    # Step 1: 이미지 최적화
    optimized_path = export_dir / f"sia_nft_{today}.jpg"
    optimize_for_nft(input_image_path, optimized_path)

    # Step 2: 이미지 IPFS 업로드
    image_ipfs_url = upload_to_ipfs(optimized_path)
    if not image_ipfs_url:
        raise Exception("이미지 IPFS 업로드 실패")

    # Step 3: 메타데이터 생성
    metadata = create_metadata(image_ipfs_url, params)
    metadata_path = save_metadata(metadata, export_dir)

    # Step 4: 메타데이터 IPFS 업로드
    metadata_ipfs_url = upload_to_ipfs(metadata_path)
    if not metadata_ipfs_url:
        raise Exception("메타데이터 IPFS 업로드 실패")

    print(f"\n{'='*50}")
    print(f"✅ 처리 완료!")
    print(f"{'='*50}")

    result = {
        "image_path": str(optimized_path),
        "image_ipfs": image_ipfs_url,
        "metadata_path": str(metadata_path),
        "metadata_ipfs": metadata_ipfs_url,
        "params": params
    }

    # 결과 로그 저장
    log_path = BASE_DIR / "logs" / f"process_{today}.json"
    log_path.parent.mkdir(parents=True, exist_ok=True)

    import json
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    return result

if __name__ == "__main__":
    # 테스트: 가장 최근 이미지 처리
    out_dir = BASE_DIR / "out"
    latest_image = max(out_dir.glob("*.png"), key=lambda p: p.stat().st_mtime)

    test_params = {
        "outfit": "casual white t-shirt and jeans",
        "background": "clean studio backdrop",
        "mood": "soft smile"
    }

    result = process_daily_image(latest_image, test_params)
    print(f"\n📊 결과:")
    print(f"  이미지 IPFS: {result['image_ipfs']}")
    print(f"  메타데이터 IPFS: {result['metadata_ipfs']}")
```

---

## 5️⃣ 테스트 실행

### NFT.Storage API 키 설정
1. https://nft.storage/ 접속
2. 계정 생성 및 로그인
3. **API Keys** → **+ New Key** 클릭
4. 생성된 키를 복사
5. `.env` 파일에 추가:
```env
NFT_STORAGE_TOKEN=your_token_here
```

### 스크립트 테스트
```bash
cd d:\AI\HelloSia\sia-automation

# 이미지 최적화 테스트
python scripts\optimize_image.py

# IPFS 업로드 테스트
python scripts\upload_ipfs.py

# 메타데이터 생성 테스트
python scripts\make_metadata.py

# 통합 처리 테스트
python scripts\process_image.py
```

---

## ✅ 체크리스트

- [ ] optimize_image.py 작성 완료
- [ ] upload_ipfs.py 작성 완료
- [ ] make_metadata.py 작성 완료
- [ ] process_image.py 통합 스크립트 작성
- [ ] NFT.Storage API 키 발급 및 설정
- [ ] 이미지 최적화 테스트 성공
- [ ] IPFS 업로드 테스트 성공
- [ ] 메타데이터 생성 테스트 성공

---

## 🔜 다음 단계

IPFS 업로드가 성공하면 **Step 4: Solana NFT 민팅**으로 진행하세요.

[→ Step 4로 이동](./STEP4_Solana_민팅.md)
