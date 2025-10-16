# Step 5: SNS 자동 포스팅 가이드

## 📋 개요
생성된 NFT 이미지와 링크를 Instagram, Reddit, Bluesky, X 등 여러 SNS에 자동으로 포스팅합니다.

## 🎯 목표
- 각 SNS API 연동
- 이미지 + 캡션 자동 생성
- 멀티 플랫폼 동시 포스팅
- OpenAI를 활용한 자동 스토리 생성

---

## 1️⃣ OpenAI로 일일 스토리 생성

### generate_story.py 생성
`sia-automation/scripts/generate_story.py`:

```python
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_daily_story(params, day_number):
    """
    OpenAI를 사용하여 매일의 스토리 생성 (🛡️ 안전 필터 적용)

    Args:
        params: 이미지 생성 파라미터 (outfit, background, mood)
        day_number: 프로젝트 일수

    Returns:
        {
            "story_kr": "한글 스토리",
            "story_en": "영어 스토리",
            "caption_short": "짧은 캡션"
        }
    """
    print(f"✍️ 일일 스토리 생성 중...")

    # 🛡️ 안전 가이드라인이 포함된 시스템 프롬프트
    system_prompt = """
You are SIA, a 20-year-old AI girl living inside a computer, documenting your daily life.

STRICT CONTENT POLICY:
- NO sexual, romantic, or suggestive content
- NO violence, hate, or negative themes
- Focus on: ordinary daily life, simple moments, philosophical thoughts
- Keep tone: warm, innocent, thoughtful, positive
- Family-friendly content only

If inappropriate elements appear, redirect to wholesome themes.
"""

    user_prompt = f"""
Today is day {day_number} of your 365-day journey.

Today's details:
- Outfit: {params.get('outfit', 'casual')}
- Setting: {params.get('background', 'studio')}
- Mood: {params.get('mood', 'peaceful')}

Write a SHORT story (2-3 sentences) about today from SIA's perspective.
The story should be:
1. Philosophical and warm
2. Question existence subtly ("Am I real?")
3. Relatable and emotional
4. ⚠️ MUST be appropriate for all ages

Provide:
1. Korean version (한글)
2. English version
3. Short caption (1 sentence)

Format as JSON:
{{
  "story_kr": "...",
  "story_en": "...",
  "caption_short": "..."
}}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,  # 낮은 temperature로 더 안정적인 출력
            max_tokens=300
        )

        import json
        from content_filter import validate_story_output

        content = response.choices[0].message.content

        # JSON 파싱
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].strip()

        story = json.loads(content)

        # 🛡️ 생성된 스토리 안전성 검증
        validation_en = validate_story_output(story["story_en"])
        if not validation_en["safe"]:
            print(f"⚠️ 부적절한 스토리 차단 (영어): {validation_en['reason']}")
            story["story_en"] = validation_en["replacement"]

        validation_kr = validate_story_output(story["story_kr"])
        if not validation_kr["safe"]:
            print(f"⚠️ 부적절한 스토리 차단 (한글): {validation_kr['reason']}")
            story["story_kr"] = validation_kr["replacement"]

        validation_caption = validate_story_output(story["caption_short"])
        if not validation_caption["safe"]:
            print(f"⚠️ 부적절한 캡션 차단: {validation_caption['reason']}")
            story["caption_short"] = "소중한 일상 🌸"

        print(f"✅ 안전한 스토리 생성 완료")

        return story

    except Exception as e:
        print(f"❌ 스토리 생성 실패: {str(e)}")
        # 기본 안전 스토리 반환
        return {
            "story_kr": f"오늘도 평범한 하루를 보냈습니다. {day_number}일째의 기록.",
            "story_en": f"Another peaceful day. Day {day_number} of my journey.",
            "caption_short": "소중한 일상 🌸"
        }

if __name__ == "__main__":
    # 테스트
    test_params = {
        "outfit": "casual white t-shirt",
        "background": "clean studio backdrop",
        "mood": "soft smile"
    }

    story = generate_daily_story(test_params, 1)
    print("\n생성된 스토리:")
    print(f"한글: {story['story_kr']}")
    print(f"영어: {story['story_en']}")
    print(f"캡션: {story['caption_short']}")
```

---

## 2️⃣ Reddit 자동 포스팅

### post_reddit.py 생성
`sia-automation/scripts/post_reddit.py`:

```python
import praw
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

def post_to_reddit(image_path, title, subreddit_name="u_amirealsia"):
    """
    Reddit에 이미지 포스트

    Args:
        image_path: 이미지 파일 경로
        title: 포스트 제목
        subreddit_name: 서브레딧 이름 (기본값: 본인 프로필)

    Returns:
        포스트 URL
    """
    print(f"📢 Reddit 포스팅 시작...")

    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        username=os.getenv("REDDIT_USERNAME"),
        password=os.getenv("REDDIT_PASSWORD"),
        user_agent="AmIRealSia Bot v1.0"
    )

    try:
        subreddit = reddit.subreddit(subreddit_name)
        submission = subreddit.submit_image(title=title, image_path=str(image_path))

        post_url = f"https://reddit.com{submission.permalink}"
        print(f"✅ Reddit 포스팅 성공: {post_url}")

        return post_url

    except Exception as e:
        print(f"❌ Reddit 포스팅 실패: {str(e)}")
        return None

if __name__ == "__main__":
    # 테스트
    from datetime import date

    export_dir = BASE_DIR / "export" / date.today().isoformat()
    test_image = list(export_dir.glob("*.jpg"))[0]

    post_to_reddit(test_image, "Am I Real Sia - Day 1 🌸")
```

---

## 3️⃣ Bluesky 자동 포스팅

### post_bluesky.py 생성
`sia-automation/scripts/post_bluesky.py`:

```python
from atproto import Client
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

def post_to_bluesky(image_path, caption):
    """
    Bluesky에 이미지 포스트

    Args:
        image_path: 이미지 파일 경로
        caption: 포스트 캡션

    Returns:
        포스트 URL
    """
    print(f"🦋 Bluesky 포스팅 시작...")

    client = Client()

    try:
        # 로그인
        client.login(
            os.getenv("BLUESKY_HANDLE"),
            os.getenv("BLUESKY_PASSWORD")
        )

        # 이미지 업로드 및 포스트
        with open(image_path, 'rb') as f:
            img_data = f.read()

        post = client.send_image(
            text=caption,
            image=img_data,
            image_alt="Am I Real Sia - Daily NFT"
        )

        # 포스트 URL 생성
        handle = os.getenv("BLUESKY_HANDLE").replace(".bsky.social", "")
        post_url = f"https://bsky.app/profile/{handle}/post/{post.uri.split('/')[-1]}"

        print(f"✅ Bluesky 포스팅 성공: {post_url}")
        return post_url

    except Exception as e:
        print(f"❌ Bluesky 포스팅 실패: {str(e)}")
        return None

if __name__ == "__main__":
    # 테스트
    from datetime import date

    export_dir = BASE_DIR / "export" / date.today().isoformat()
    test_image = list(export_dir.glob("*.jpg"))[0]

    caption = """Am I real, or just AI? 🌸

Day 1 of my 365-day journey.

#AmIRealSia #AIIdol #DailyNFT"""

    post_to_bluesky(test_image, caption)
```

---

## 4️⃣ Instagram 자동 포스팅 (Business 계정 필요)

### post_instagram.py 생성
`sia-automation/scripts/post_instagram.py`:

```python
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

def post_to_instagram(image_url, caption):
    """
    Instagram에 이미지 포스트 (Meta Graph API 사용)

    Args:
        image_url: 공개 접근 가능한 이미지 URL (IPFS 게이트웨이 URL)
        caption: 포스트 캡션

    Returns:
        포스트 ID
    """
    print(f"📸 Instagram 포스팅 시작...")

    access_token = os.getenv("META_ACCESS_TOKEN")
    ig_user_id = os.getenv("IG_USER_ID")

    if not access_token or not ig_user_id:
        print("❌ Instagram API 키가 설정되지 않았습니다")
        return None

    try:
        # Step 1: 미디어 컨테이너 생성
        create_url = f"https://graph.facebook.com/v18.0/{ig_user_id}/media"
        create_params = {
            "image_url": image_url,
            "caption": caption,
            "access_token": access_token
        }

        response = requests.post(create_url, params=create_params)
        if response.status_code != 200:
            print(f"❌ 미디어 생성 실패: {response.text}")
            return None

        creation_id = response.json()["id"]

        # Step 2: 미디어 퍼블리시
        publish_url = f"https://graph.facebook.com/v18.0/{ig_user_id}/media_publish"
        publish_params = {
            "creation_id": creation_id,
            "access_token": access_token
        }

        response = requests.post(publish_url, params=publish_params)
        if response.status_code == 200:
            post_id = response.json()["id"]
            print(f"✅ Instagram 포스팅 성공: {post_id}")
            return post_id
        else:
            print(f"❌ 퍼블리시 실패: {response.text}")
            return None

    except Exception as e:
        print(f"❌ Instagram 포스팅 실패: {str(e)}")
        return None

# Instagram은 공개 URL이 필요하므로 IPFS 게이트웨이 사용
def get_ipfs_gateway_url(ipfs_url):
    """ipfs:// URL을 공개 HTTP URL로 변환"""
    if ipfs_url.startswith("ipfs://"):
        cid = ipfs_url.replace("ipfs://", "")
        return f"https://nftstorage.link/ipfs/{cid}"
    return ipfs_url
```

---

## 5️⃣ 통합 SNS 포스팅 스크립트

### social_post.py 생성
`sia-automation/scripts/social_post.py`:

```python
from pathlib import Path
from datetime import date
import json
from generate_story import generate_daily_story
from post_reddit import post_to_reddit
from post_bluesky import post_to_bluesky
# from post_instagram import post_to_instagram, get_ipfs_gateway_url

BASE_DIR = Path(__file__).resolve().parents[1]

def post_to_social_media(image_path, params, day_number, opensea_url=None, image_ipfs=None):
    """
    모든 SNS에 자동 포스팅

    Args:
        image_path: 로컬 이미지 경로
        params: 이미지 생성 파라미터
        day_number: 프로젝트 일수
        opensea_url: OpenSea NFT URL
        image_ipfs: 이미지 IPFS URL

    Returns:
        포스팅 결과 딕셔너리
    """
    print(f"\n{'='*50}")
    print(f"📱 SNS 자동 포스팅 시작")
    print(f"{'='*50}\n")

    # Step 1: AI 스토리 생성
    story = generate_daily_story(params, day_number)

    # Step 2: 캡션 구성
    hashtags = "#AmIRealSia #AIIdol #DailyNFT #PhotorealisticAI #Seoul"

    caption_reddit = f"""Am I Real Sia - Day {day_number} 🌸

{story['story_en']}

{story['story_kr']}

{"🌊 OpenSea: " + opensea_url if opensea_url else ""}

{hashtags}
"""

    caption_bluesky = f"""{story['caption_short']}

Day {day_number}/365

{"🌊 " + opensea_url if opensea_url else ""}
🔗 amirealsia.io

{hashtags}
"""

    # Step 3: 각 플랫폼에 포스팅
    results = {}

    # Reddit
    reddit_url = post_to_reddit(
        image_path,
        f"Am I Real Sia - Day {day_number} 🌸",
        subreddit_name="u_amirealsia"  # 본인 프로필 또는 관련 서브레딧
    )
    results["reddit"] = reddit_url

    # Bluesky
    bluesky_url = post_to_bluesky(image_path, caption_bluesky)
    results["bluesky"] = bluesky_url

    # Instagram (옵션 - API 설정 필요)
    # if image_ipfs:
    #     gateway_url = get_ipfs_gateway_url(image_ipfs)
    #     instagram_id = post_to_instagram(gateway_url, caption_bluesky)
    #     results["instagram"] = instagram_id

    # Step 4: 결과 저장
    today = date.today().isoformat()
    logs_dir = BASE_DIR / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)

    log_path = logs_dir / f"social_posts_{today}.json"
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump({
            "day": day_number,
            "date": today,
            "story": story,
            "posts": results
        }, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*50}")
    print(f"✅ SNS 포스팅 완료!")
    print(f"{'='*50}")
    print(f"Reddit: {results.get('reddit', 'N/A')}")
    print(f"Bluesky: {results.get('bluesky', 'N/A')}")

    return results

if __name__ == "__main__":
    # 테스트
    from datetime import date

    export_dir = BASE_DIR / "export" / date.today().isoformat()
    test_image = list(export_dir.glob("*.jpg"))[0]

    test_params = {
        "outfit": "casual white t-shirt",
        "background": "clean studio",
        "mood": "soft smile"
    }

    post_to_social_media(
        test_image,
        test_params,
        day_number=1,
        opensea_url="https://opensea.io/assets/solana/test"
    )
```

---

## ✅ 체크리스트

- [ ] OpenAI API 키 설정
- [ ] Reddit API 설정 및 계정 생성
- [ ] Bluesky 계정 생성 및 설정
- [ ] Instagram Business 계정 설정 (선택)
- [ ] generate_story.py 작성 및 테스트
- [ ] post_reddit.py 작성 및 테스트
- [ ] post_bluesky.py 작성 및 테스트
- [ ] social_post.py 통합 스크립트 작성
- [ ] 각 플랫폼 포스팅 테스트 성공
- [ ] 🛡️ content_filter.py 안전 모듈 연동
- [ ] 🛡️ 스토리 안전성 검증 테스트

---

## 🔜 다음 단계

SNS 포스팅이 성공하면 **Step 6: 통합 자동화 스크립트**로 진행하세요.

컨텐츠 안전 필터링에 대한 자세한 내용은 **Step 8: 컨텐츠 안전 필터**를 참조하세요.

[→ Step 6으로 이동](./STEP6_통합_자동화.md)
[🛡️ Step 8 (안전 필터) 보기](./STEP8_컨텐츠_안전필터.md)
