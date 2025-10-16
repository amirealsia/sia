# Step 6: 통합 자동화 스크립트

## 📋 개요
모든 단계를 하나로 통합하여 매일 자동으로 실행되는 완전한 파이프라인을 구축합니다.

## 🎯 목표
- 전체 프로세스를 하나의 스크립트로 통합
- 에러 처리 및 재시도 로직
- 실행 로그 기록
- 실패 시 알림

---

## 1️⃣ 통합 자동화 메인 스크립트

### daily_run.py 생성
`sia-automation/scripts/daily_run.py`:

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Am I Real Sia - Daily Automation Pipeline
매일 자동으로 이미지 생성 → NFT 민팅 → SNS 포스팅
"""

import sys
from pathlib import Path
from datetime import date, datetime
import json
import traceback

# 프로젝트 루트 추가
BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE_DIR / "scripts"))

# 모든 모듈 임포트
from comfy_call import generate_image
from process_image import process_daily_image
from mint_daily_nft import mint_daily_nft
from social_post import post_to_social_media
from make_metadata import calculate_day_number

def log_message(message, level="INFO"):
    """로그 메시지 출력 및 파일 저장"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] [{level}] {message}"
    print(log_line)

    # 로그 파일에 저장
    log_dir = BASE_DIR / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    log_file = log_dir / f"daily_run_{date.today().isoformat()}.log"
    with open(log_file, 'a', encoding='utf-8') as f:
        f.write(log_line + "\n")

def save_daily_result(result):
    """일일 실행 결과 저장"""
    result_dir = BASE_DIR / "logs" / "results"
    result_dir.mkdir(parents=True, exist_ok=True)

    result_file = result_dir / f"result_{date.today().isoformat()}.json"
    with open(result_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    log_message(f"실행 결과 저장: {result_file}")

def main():
    """메인 자동화 파이프라인"""
    try:
        log_message("=" * 60)
        log_message("🌸 Am I Real Sia - Daily Automation Started")
        log_message("=" * 60)

        day_number = calculate_day_number()
        log_message(f"📅 Day {day_number} of 365")

        result = {
            "date": date.today().isoformat(),
            "day_number": day_number,
            "started_at": datetime.now().isoformat(),
            "steps": {}
        }

        # ===== STEP 1: 이미지 생성 =====
        log_message("\n" + "=" * 60)
        log_message("STEP 1: 이미지 생성 (ComfyUI)")
        log_message("=" * 60)

        try:
            image_path, params = generate_image()

            if not image_path:
                raise Exception("이미지 생성 실패")

            result["steps"]["image_generation"] = {
                "status": "success",
                "image_path": str(image_path),
                "params": params
            }

            log_message(f"✅ 이미지 생성 완료: {image_path}")

        except Exception as e:
            log_message(f"❌ 이미지 생성 실패: {str(e)}", "ERROR")
            result["steps"]["image_generation"] = {
                "status": "failed",
                "error": str(e)
            }
            raise

        # ===== STEP 2: 이미지 처리 및 IPFS 업로드 =====
        log_message("\n" + "=" * 60)
        log_message("STEP 2: 이미지 최적화 및 IPFS 업로드")
        log_message("=" * 60)

        try:
            process_result = process_daily_image(image_path, params)

            result["steps"]["image_processing"] = {
                "status": "success",
                "image_ipfs": process_result["image_ipfs"],
                "metadata_ipfs": process_result["metadata_ipfs"]
            }

            log_message(f"✅ IPFS 업로드 완료")
            log_message(f"   이미지: {process_result['image_ipfs']}")
            log_message(f"   메타데이터: {process_result['metadata_ipfs']}")

        except Exception as e:
            log_message(f"❌ 이미지 처리 실패: {str(e)}", "ERROR")
            result["steps"]["image_processing"] = {
                "status": "failed",
                "error": str(e)
            }
            raise

        # ===== STEP 3: NFT 민팅 =====
        log_message("\n" + "=" * 60)
        log_message("STEP 3: Solana NFT 민팅")
        log_message("=" * 60)

        try:
            mint_result = mint_daily_nft(process_result["metadata_ipfs"])

            result["steps"]["nft_minting"] = {
                "status": "success" if mint_result["success"] else "failed",
                "opensea_url": mint_result.get("opensea_url"),
                "nft_address": mint_result.get("nft_address")
            }

            if mint_result["success"]:
                log_message(f"✅ NFT 민팅 완료")
                log_message(f"   OpenSea: {mint_result.get('opensea_url')}")
            else:
                log_message(f"⚠️ NFT 민팅 실패 (계속 진행)", "WARNING")

        except Exception as e:
            log_message(f"❌ NFT 민팅 오류: {str(e)}", "ERROR")
            result["steps"]["nft_minting"] = {
                "status": "failed",
                "error": str(e)
            }
            # 민팅 실패해도 SNS는 포스팅 (이미지는 있으므로)

        # ===== STEP 4: SNS 자동 포스팅 =====
        log_message("\n" + "=" * 60)
        log_message("STEP 4: SNS 자동 포스팅")
        log_message("=" * 60)

        try:
            social_result = post_to_social_media(
                image_path=Path(process_result["image_path"]),
                params=params,
                day_number=day_number,
                opensea_url=result["steps"]["nft_minting"].get("opensea_url"),
                image_ipfs=process_result["image_ipfs"]
            )

            result["steps"]["social_posting"] = {
                "status": "success",
                "posts": social_result
            }

            log_message(f"✅ SNS 포스팅 완료")
            for platform, url in social_result.items():
                if url:
                    log_message(f"   {platform}: {url}")

        except Exception as e:
            log_message(f"❌ SNS 포스팅 실패: {str(e)}", "ERROR")
            result["steps"]["social_posting"] = {
                "status": "failed",
                "error": str(e)
            }

        # ===== 완료 =====
        result["completed_at"] = datetime.now().isoformat()
        result["overall_status"] = "success"

        log_message("\n" + "=" * 60)
        log_message("🎉 모든 작업 완료!")
        log_message("=" * 60)

        # 결과 저장
        save_daily_result(result)

        return 0

    except KeyboardInterrupt:
        log_message("\n⚠️ 사용자에 의해 중단됨", "WARNING")
        return 1

    except Exception as e:
        log_message(f"\n❌ 치명적 오류 발생: {str(e)}", "ERROR")
        log_message(traceback.format_exc(), "ERROR")

        result["overall_status"] = "failed"
        result["error"] = str(e)
        result["completed_at"] = datetime.now().isoformat()

        save_daily_result(result)

        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
```

---

## 2️⃣ 에러 처리 및 재시도 로직

### retry_helper.py 생성
`sia-automation/scripts/retry_helper.py`:

```python
import time
from functools import wraps

def retry_on_failure(max_retries=3, delay=5, exceptions=(Exception,)):
    """
    함수 실패 시 자동 재시도 데코레이터

    Args:
        max_retries: 최대 재시도 횟수
        delay: 재시도 간 대기 시간 (초)
        exceptions: 재시도할 예외 타입
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt < max_retries - 1:
                        print(f"⚠️ 시도 {attempt + 1}/{max_retries} 실패: {str(e)}")
                        print(f"   {delay}초 후 재시도...")
                        time.sleep(delay)
                    else:
                        print(f"❌ 모든 재시도 실패")
                        raise
            return None
        return wrapper
    return decorator

# 사용 예시
if __name__ == "__main__":
    @retry_on_failure(max_retries=3, delay=2)
    def test_function():
        import random
        if random.random() < 0.7:  # 70% 확률로 실패
            raise Exception("테스트 실패")
        return "성공!"

    result = test_function()
    print(f"결과: {result}")
```

---

## 3️⃣ 실패 알림 시스템

### notify.py 생성
`sia-automation/scripts/notify.py`:

```python
import os
from pathlib import Path
from dotenv import load_dotenv
import requests

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

def send_discord_notification(message, webhook_url=None):
    """Discord 웹훅으로 알림 전송"""
    if not webhook_url:
        webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

    if not webhook_url:
        print("⚠️ Discord 웹훅 URL이 설정되지 않았습니다")
        return False

    try:
        data = {
            "content": f"🌸 **Am I Real Sia Automation**\n{message}"
        }
        response = requests.post(webhook_url, json=data, timeout=10)
        return response.status_code == 204
    except Exception as e:
        print(f"Discord 알림 실패: {str(e)}")
        return False

def send_email_notification(subject, body, to_email=None):
    """이메일 알림 전송 (Gmail SMTP)"""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    if not to_email:
        to_email = os.getenv("NOTIFICATION_EMAIL", "amirealsia@gmail.com")

    gmail_user = os.getenv("GMAIL_USER")
    gmail_password = os.getenv("GMAIL_APP_PASSWORD")  # 앱 비밀번호 필요

    if not gmail_user or not gmail_password:
        print("⚠️ Gmail 인증 정보가 설정되지 않았습니다")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = to_email
        msg['Subject'] = f"[Am I Real Sia] {subject}"

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.send_message(msg)
        server.quit()

        print(f"✅ 이메일 알림 전송 완료: {to_email}")
        return True

    except Exception as e:
        print(f"❌ 이메일 알림 실패: {str(e)}")
        return False

# daily_run.py에서 사용할 알림 함수
def notify_completion(success=True, message=""):
    """작업 완료/실패 알림"""
    if success:
        title = "✅ Daily Automation Success"
    else:
        title = "❌ Daily Automation Failed"

    full_message = f"{title}\n\n{message}"

    # Discord 알림
    send_discord_notification(full_message)

    # 실패 시에만 이메일 알림
    if not success:
        send_email_notification(title, full_message)
```

---

## 4️⃣ 통합 테스트

### 전체 파이프라인 테스트
```bash
cd d:\AI\HelloSia\sia-automation

# ComfyUI 서버 먼저 실행 (별도 터미널)
# cd ComfyUI
# python main.py --listen 0.0.0.0 --port 8188

# 메인 스크립트 실행
python scripts\daily_run.py
```

### 예상 실행 시간
- 이미지 생성: 2-5분
- IPFS 업로드: 30초-1분
- NFT 민팅: 1-3분
- SNS 포스팅: 30초-1분
- **총 소요 시간**: 약 5-10분

---

## 5️⃣ 로그 확인

### 로그 파일 위치
```
sia-automation/logs/
├─ daily_run_2025-01-15.log        # 실행 로그
├─ results/
│   └─ result_2025-01-15.json      # 실행 결과
├─ process_2025-01-15.json         # 이미지 처리 결과
├─ mint_result_2025-01-15.json     # 민팅 결과
└─ social_posts_2025-01-15.json    # SNS 포스팅 결과
```

### 로그 확인 명령
```bash
# 오늘의 로그 확인
type logs\daily_run_2025-01-15.log

# 최근 에러만 확인
findstr /C:"ERROR" logs\daily_run_*.log

# 실행 결과 확인
type logs\results\result_2025-01-15.json
```

---

## ✅ 체크리스트

- [ ] daily_run.py 통합 스크립트 작성
- [ ] retry_helper.py 재시도 로직 작성
- [ ] notify.py 알림 시스템 작성
- [ ] 전체 파이프라인 테스트 실행
- [ ] 로그 파일 확인
- [ ] 에러 처리 테스트
- [ ] Discord/Email 알림 테스트

---

## 🔜 다음 단계

통합 스크립트가 정상 작동하면 **Step 7: Windows 작업 스케줄러 설정**으로 진행하세요.

[→ Step 7로 이동](./STEP7_작업스케줄러.md)
