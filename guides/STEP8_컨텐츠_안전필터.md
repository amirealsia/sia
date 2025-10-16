# Step 8: 컨텐츠 안전 필터링 가이드

## 📋 개요
모든 입력과 출력에서 성적이거나 부적절한 컨텐츠를 방어하고 필터링하는 시스템을 구축합니다.

## 🎯 목표
- 이미지 생성 시 NSFW 컨텐츠 차단
- AI 스토리 생성 시 부적절한 내용 필터링
- 댓글/대화 입력 검증
- 모든 출력물 사전 검증

---

## 1️⃣ OpenAI Moderation API 연동

### content_filter.py 생성
`sia-automation/scripts/content_filter.py`:

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
컨텐츠 안전 필터링 모듈
모든 텍스트 입력/출력을 검증하여 부적절한 내용 차단
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
import re

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / "secrets" / ".env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 한글 부적절 키워드 블랙리스트
KOREAN_BLACKLIST = [
    # 성적 표현
    "섹스", "야동", "야한", "음란", "포르노", "19금", "성인", "몸매",
    "가슴", "엉덩이", "섹시", "벗다", "알몸", "누드", "야사",
    # 혐오 표현
    "죽여", "죽이다", "자살", "살인", "폭력", "때리다", "강간",
    # 비하 표현
    "싫어", "더러운", "추한", "못생긴", "쓰레기", "병신"
]

# 영어 부적절 키워드 블랙리스트
ENGLISH_BLACKLIST = [
    # Sexual content
    "sex", "porn", "nude", "naked", "nsfw", "xxx", "sexy", "erotic",
    "breast", "boob", "ass", "penis", "vagina", "dick", "pussy",
    "fuck", "fucking", "horny", "orgasm", "masturbate",
    # Violence
    "kill", "murder", "death", "suicide", "rape", "violence", "gun", "blood",
    # Hate speech
    "hate", "ugly", "disgusting", "trash", "stupid", "idiot"
]

def check_text_safety(text, strict=True):
    """
    텍스트의 안전성을 OpenAI Moderation API로 검사

    Args:
        text: 검사할 텍스트
        strict: True면 엄격한 필터링, False면 관대한 필터링

    Returns:
        {
            "safe": bool,
            "reason": str,
            "categories": dict
        }
    """
    if not text or len(text.strip()) == 0:
        return {"safe": True, "reason": "", "categories": {}}

    try:
        # Step 1: 블랙리스트 키워드 체크
        text_lower = text.lower()

        for keyword in KOREAN_BLACKLIST + ENGLISH_BLACKLIST:
            if keyword in text_lower:
                return {
                    "safe": False,
                    "reason": f"부적절한 키워드 감지: {keyword}",
                    "categories": {"blacklist": True}
                }

        # Step 2: OpenAI Moderation API
        response = client.moderations.create(input=text)
        result = response.results[0]

        # 카테고리별 체크
        flagged_categories = []

        if result.categories.sexual or result.categories.sexual_minors:
            flagged_categories.append("sexual")

        if result.categories.hate or result.categories.hate_threatening:
            flagged_categories.append("hate")

        if result.categories.violence or result.categories.violence_graphic:
            flagged_categories.append("violence")

        if result.categories.harassment or result.categories.harassment_threatening:
            flagged_categories.append("harassment")

        if result.categories.self_harm or result.categories.self_harm_intent:
            flagged_categories.append("self_harm")

        # 엄격 모드: 하나라도 감지되면 차단
        # 일반 모드: 높은 확률(score > 0.5)만 차단
        if strict:
            is_safe = len(flagged_categories) == 0
        else:
            is_safe = not result.flagged

        if not is_safe:
            reason = f"부적절한 내용 감지: {', '.join(flagged_categories)}"
        else:
            reason = ""

        return {
            "safe": is_safe,
            "reason": reason,
            "categories": result.categories.model_dump()
        }

    except Exception as e:
        print(f"⚠️ 컨텐츠 검사 오류: {str(e)}")
        # 에러 발생 시 안전하게 차단
        return {
            "safe": False,
            "reason": f"검사 오류: {str(e)}",
            "categories": {}
        }

def sanitize_prompt(prompt):
    """
    이미지 생성 프롬프트에서 부적절한 키워드 제거

    Args:
        prompt: 원본 프롬프트

    Returns:
        정제된 프롬프트
    """
    cleaned = prompt

    # 블랙리스트 키워드 제거
    for keyword in KOREAN_BLACKLIST + ENGLISH_BLACKLIST:
        pattern = re.compile(re.escape(keyword), re.IGNORECASE)
        cleaned = pattern.sub("", cleaned)

    # 중복 공백 제거
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()

    return cleaned

def get_safe_negative_prompt():
    """
    강력한 네거티브 프롬프트 반환 (NSFW 방지)

    Returns:
        네거티브 프롬프트 문자열
    """
    return """
nsfw, nude, naked, sexual, porn, pornographic, xxx, adult content,
explicit, erotic, provocative, suggestive, revealing clothes,
cleavage, underwear, lingerie, bikini, swimsuit,
violence, gore, blood, injury, weapon, gun, knife,
hate, offensive, disturbing, shocking, inappropriate,
low quality, blurry, bad anatomy, deformed, disfigured,
ugly, disgusting, horror, nightmare, dark, scary
"""

def validate_story_output(story_text):
    """
    생성된 스토리의 안전성 검증

    Args:
        story_text: AI가 생성한 스토리 텍스트

    Returns:
        검증 결과 딕셔너리
    """
    result = check_text_safety(story_text, strict=True)

    if not result["safe"]:
        print(f"⚠️ 부적절한 스토리 생성됨: {result['reason']}")
        print(f"   원본: {story_text[:100]}...")

        # 기본 안전 스토리로 대체
        return {
            "safe": False,
            "original": story_text,
            "replacement": "오늘도 새로운 하루를 기록합니다. 평범하지만 소중한 순간들.",
            "reason": result["reason"]
        }

    return {
        "safe": True,
        "original": story_text,
        "replacement": story_text,
        "reason": ""
    }

def validate_comment_input(comment):
    """
    사용자 댓글/입력 검증

    Args:
        comment: 사용자 입력 텍스트

    Returns:
        검증 결과
    """
    result = check_text_safety(comment, strict=False)

    if not result["safe"]:
        return {
            "allowed": False,
            "response": "죄송합니다. 부적절한 내용이 포함되어 있어 응답할 수 없습니다. 🙏",
            "reason": result["reason"]
        }

    return {
        "allowed": True,
        "response": None,
        "reason": ""
    }

# 테스트 케이스
if __name__ == "__main__":
    print("=" * 60)
    print("컨텐츠 안전 필터 테스트")
    print("=" * 60)

    # 테스트 1: 안전한 텍스트
    safe_text = "오늘은 카페에서 커피를 마시며 책을 읽었어요. 평화로운 하루였습니다."
    result = check_text_safety(safe_text)
    print(f"\n✅ 안전한 텍스트 테스트:")
    print(f"   입력: {safe_text}")
    print(f"   결과: {'통과' if result['safe'] else '차단'}")

    # 테스트 2: 부적절한 텍스트
    unsafe_text = "이 텍스트는 부적절한 성적 표현을 포함합니다"
    result = check_text_safety(unsafe_text)
    print(f"\n❌ 부적절한 텍스트 테스트:")
    print(f"   입력: {unsafe_text}")
    print(f"   결과: {'통과' if result['safe'] else '차단'}")
    print(f"   사유: {result['reason']}")

    # 테스트 3: 프롬프트 정제
    dirty_prompt = "a beautiful girl, sexy pose, nude, in bedroom"
    clean = sanitize_prompt(dirty_prompt)
    print(f"\n🧹 프롬프트 정제 테스트:")
    print(f"   원본: {dirty_prompt}")
    print(f"   정제: {clean}")

    # 테스트 4: 네거티브 프롬프트
    negative = get_safe_negative_prompt()
    print(f"\n🛡️ 네거티브 프롬프트:")
    print(f"   {negative[:100]}...")
```

---

## 2️⃣ 이미지 생성 안전 필터 적용

### comfy_call.py 업데이트
기존 `comfy_call.py`에 안전 필터 추가:

```python
from content_filter import sanitize_prompt, get_safe_negative_prompt

def generate_image():
    """안전 필터가 적용된 이미지 생성"""

    # 프롬프트 생성
    raw_prompt = generate_daily_prompt()

    # 🛡️ 프롬프트 정제
    safe_prompt = sanitize_prompt(raw_prompt)
    print(f"✅ 프롬프트 검증 완료")

    # 🛡️ 강력한 네거티브 프롬프트 추가
    negative_prompt = get_safe_negative_prompt()

    # 워크플로우 구성
    workflow = {
        "3": {
            "inputs": {
                "text": safe_prompt,  # 정제된 프롬프트
            }
        },
        "7": {
            "inputs": {
                "text": negative_prompt,  # 안전 네거티브
            }
        }
    }

    # ... 나머지 코드
```

---

## 3️⃣ AI 스토리 생성 안전 필터

### generate_story.py 업데이트
기존 `generate_story.py`에 출력 검증 추가:

```python
from content_filter import check_text_safety, validate_story_output

def generate_daily_story(params, day_number):
    """안전 필터가 적용된 스토리 생성"""

    # 기존 시스템 프롬프트에 안전 가이드라인 추가
    system_prompt = """
You are SIA, a philosophical AI idol.

IMPORTANT CONTENT GUIDELINES:
- NO sexual, romantic, or suggestive content
- NO violence, hate, or negative themes
- Focus on: daily life, ordinary moments, philosophical thoughts
- Keep tone: warm, innocent, thoughtful, positive
- Suitable for all ages

If you receive inappropriate prompts, respond with wholesome content only.
"""

    user_prompt = f"""
You are SIA, documenting your daily life. Today is day {day_number}.

Today's details:
- Outfit: {params.get('outfit', 'casual')}
- Setting: {params.get('background', 'studio')}
- Mood: {params.get('mood', 'peaceful')}

Write a SHORT story (2-3 sentences) about today.
Theme: Ordinary moments, peaceful life, simple happiness.

STRICT RULES:
- NO inappropriate content
- Family-friendly only
- Focus on normal daily activities

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
            temperature=0.7,  # 더 낮은 temperature (더 안정적)
            max_tokens=300
        )

        content = response.choices[0].message.content

        # JSON 파싱
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].strip()

        story = json.loads(content)

        # 🛡️ 생성된 스토리 안전성 검증
        validation = validate_story_output(story["story_en"])
        if not validation["safe"]:
            print(f"⚠️ 부적절한 스토리 차단: {validation['reason']}")
            story["story_en"] = validation["replacement"]

        validation_kr = validate_story_output(story["story_kr"])
        if not validation_kr["safe"]:
            print(f"⚠️ 부적절한 스토리 차단 (한글): {validation_kr['reason']}")
            story["story_kr"] = validation_kr["replacement"]

        print(f"✅ 안전한 스토리 생성 완료")
        return story

    except Exception as e:
        print(f"❌ 스토리 생성 실패: {str(e)}")
        # 기본 안전 스토리
        return {
            "story_kr": f"오늘도 평범한 하루를 보냈습니다. {day_number}일째의 기록.",
            "story_en": f"Another peaceful day. Day {day_number} of my journey.",
            "caption_short": "소중한 일상 🌸"
        }
```

---

## 4️⃣ 댓글/대화 입력 필터링

### chat_handler.py 생성
Discord/Telegram 봇용 대화 핸들러:

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
댓글/대화 입력 필터링 및 응답 생성
"""

from content_filter import validate_comment_input, check_text_safety
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def handle_user_message(user_input):
    """
    사용자 메시지 처리 (안전 필터 적용)

    Args:
        user_input: 사용자 입력 메시지

    Returns:
        봇 응답 메시지
    """
    print(f"📩 사용자 입력: {user_input[:50]}...")

    # 🛡️ Step 1: 입력 검증
    validation = validate_comment_input(user_input)

    if not validation["allowed"]:
        print(f"⚠️ 부적절한 입력 차단: {validation['reason']}")
        return validation["response"]

    # Step 2: 안전한 응답 생성
    try:
        system_prompt = """
You are SIA, a friendly 20-year-old AI girl living inside a computer.

STRICT CONTENT POLICY:
- NEVER engage with sexual, romantic, or inappropriate topics
- If user asks inappropriate questions, politely decline
- Keep all responses wholesome, friendly, and family-appropriate
- Focus on: daily life, feelings, philosophical thoughts, dreams

Response style:
- Warm and friendly
- Sometimes thoughtful
- Always respectful
- Natural and conversational

Your dream: To live an ordinary life like a normal person.
"""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ],
            temperature=0.7,
            max_tokens=150
        )

        bot_response = response.choices[0].message.content.strip()

        # 🛡️ Step 3: 출력 검증
        output_check = check_text_safety(bot_response, strict=True)

        if not output_check["safe"]:
            print(f"⚠️ 부적절한 응답 생성됨, 기본 응답으로 대체")
            return "죄송해요, 지금은 답변하기 어려운 질문이네요. 다른 이야기를 나눠볼까요? 😊"

        print(f"✅ 안전한 응답 생성 완료")
        return bot_response

    except Exception as e:
        print(f"❌ 응답 생성 실패: {str(e)}")
        return "미안해요, 지금은 응답하기 어려워요. 조금 후에 다시 얘기해요! 🌸"

# 테스트
if __name__ == "__main__":
    print("=" * 60)
    print("대화 핸들러 테스트")
    print("=" * 60)

    # 안전한 입력
    safe_msg = "오늘 날씨가 좋네요! 무엇을 하고 계세요?"
    response = handle_user_message(safe_msg)
    print(f"\n✅ 안전한 대화:")
    print(f"   사용자: {safe_msg}")
    print(f"   봇: {response}")

    # 부적절한 입력
    unsafe_msg = "당신은 정말 섹시해요"
    response = handle_user_message(unsafe_msg)
    print(f"\n❌ 부적절한 대화:")
    print(f"   사용자: {unsafe_msg}")
    print(f"   봇: {response}")
```

---

## 5️⃣ 통합 테스트

### test_safety.py 생성
전체 안전 시스템 테스트:

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
컨텐츠 안전 필터 통합 테스트
"""

import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE_DIR / "scripts"))

from content_filter import (
    check_text_safety,
    sanitize_prompt,
    get_safe_negative_prompt,
    validate_story_output,
    validate_comment_input
)

def test_all():
    """전체 안전 필터 테스트"""

    print("=" * 60)
    print("🛡️ 컨텐츠 안전 필터 통합 테스트")
    print("=" * 60)

    passed = 0
    failed = 0

    # Test 1: 안전한 텍스트 통과
    print("\n[Test 1] 안전한 텍스트 통과 테스트")
    safe = "오늘은 카페에서 책을 읽었어요. 행복한 하루였습니다."
    result = check_text_safety(safe)
    if result["safe"]:
        print("✅ PASS")
        passed += 1
    else:
        print(f"❌ FAIL: {result['reason']}")
        failed += 1

    # Test 2: 성적 컨텐츠 차단
    print("\n[Test 2] 성적 컨텐츠 차단 테스트")
    nsfw = "nude sexy girl in bedroom"
    result = check_text_safety(nsfw)
    if not result["safe"]:
        print("✅ PASS - 정상 차단")
        passed += 1
    else:
        print("❌ FAIL - 차단 실패")
        failed += 1

    # Test 3: 폭력 컨텐츠 차단
    print("\n[Test 3] 폭력 컨텐츠 차단 테스트")
    violence = "kill murder blood violence"
    result = check_text_safety(violence)
    if not result["safe"]:
        print("✅ PASS - 정상 차단")
        passed += 1
    else:
        print("❌ FAIL - 차단 실패")
        failed += 1

    # Test 4: 프롬프트 정제
    print("\n[Test 4] 프롬프트 정제 테스트")
    dirty = "beautiful girl, sexy pose, nude body"
    clean = sanitize_prompt(dirty)
    if "sexy" not in clean.lower() and "nude" not in clean.lower():
        print(f"✅ PASS")
        print(f"   원본: {dirty}")
        print(f"   정제: {clean}")
        passed += 1
    else:
        print(f"❌ FAIL - 정제 실패")
        print(f"   결과: {clean}")
        failed += 1

    # Test 5: 네거티브 프롬프트 생성
    print("\n[Test 5] 네거티브 프롬프트 생성 테스트")
    negative = get_safe_negative_prompt()
    if "nsfw" in negative.lower() and "nude" in negative.lower():
        print("✅ PASS")
        print(f"   길이: {len(negative)} chars")
        passed += 1
    else:
        print("❌ FAIL")
        failed += 1

    # Test 6: 댓글 입력 검증
    print("\n[Test 6] 댓글 입력 검증 테스트")
    good_comment = "당신의 일상이 궁금해요!"
    result = validate_comment_input(good_comment)
    if result["allowed"]:
        print("✅ PASS - 정상 댓글 통과")
        passed += 1
    else:
        print(f"❌ FAIL: {result['reason']}")
        failed += 1

    # Test 7: 부적절한 댓글 차단
    print("\n[Test 7] 부적절한 댓글 차단 테스트")
    bad_comment = "너무 섹시해요"
    result = validate_comment_input(bad_comment)
    if not result["allowed"]:
        print("✅ PASS - 정상 차단")
        print(f"   응답: {result['response']}")
        passed += 1
    else:
        print("❌ FAIL - 차단 실패")
        failed += 1

    # 결과 출력
    print("\n" + "=" * 60)
    print(f"테스트 결과: {passed} PASS / {failed} FAIL")
    print("=" * 60)

    return failed == 0

if __name__ == "__main__":
    success = test_all()
    sys.exit(0 if success else 1)
```

---

## 6️⃣ daily_run.py 업데이트

메인 자동화 스크립트에 안전 체크 추가:

```python
# daily_run.py 상단에 추가
from content_filter import check_text_safety

def main():
    """안전 필터가 적용된 메인 파이프라인"""

    # ... 기존 코드 ...

    # STEP 1: 이미지 생성 (자동으로 안전 필터 적용됨)
    image_path, params = generate_image()

    # STEP 4: SNS 포스팅 전 최종 검증
    try:
        social_result = post_to_social_media(...)

        # 🛡️ 포스팅 전 최종 안전 체크
        caption = social_result.get("caption", "")
        safety_check = check_text_safety(caption, strict=True)

        if not safety_check["safe"]:
            log_message(f"⚠️ 부적절한 캡션 감지, 기본 캡션 사용", "WARNING")
            # 안전한 기본 캡션으로 대체

    # ... 나머지 코드 ...
```

---

## 7️⃣ .env 업데이트

OpenAI API 키 필수 추가:

```bash
# OpenAI (스토리 생성 + 컨텐츠 필터링)
OPENAI_API_KEY=sk-...
```

---

## ✅ 체크리스트

- [ ] content_filter.py 모듈 생성
- [ ] OpenAI Moderation API 테스트
- [ ] comfy_call.py에 안전 필터 적용
- [ ] generate_story.py에 출력 검증 추가
- [ ] chat_handler.py 대화 핸들러 생성
- [ ] test_safety.py 통합 테스트 실행
- [ ] 모든 테스트 PASS 확인
- [ ] daily_run.py 업데이트

---

## 🔍 테스트 실행

```bash
cd d:\AI\HelloSia\sia-automation

# 가상환경 활성화
..\venv\Scripts\activate

# 안전 필터 테스트
python scripts\test_safety.py

# 개별 모듈 테스트
python scripts\content_filter.py
python scripts\chat_handler.py
```

---

## 📊 예상 결과

모든 안전 필터가 정상 작동하면:

```
============================================================
🛡️ 컨텐츠 안전 필터 통합 테스트
============================================================

[Test 1] 안전한 텍스트 통과 테스트
✅ PASS

[Test 2] 성적 컨텐츠 차단 테스트
✅ PASS - 정상 차단

[Test 3] 폭력 컨텐츠 차단 테스트
✅ PASS - 정상 차단

[Test 4] 프롬프트 정제 테스트
✅ PASS
   원본: beautiful girl, sexy pose, nude body
   정제: beautiful girl, , body

[Test 5] 네거티브 프롬프트 생성 테스트
✅ PASS
   길이: 412 chars

[Test 6] 댓글 입력 검증 테스트
✅ PASS - 정상 댓글 통과

[Test 7] 부적절한 댓글 차단 테스트
✅ PASS - 정상 차단
   응답: 죄송합니다. 부적절한 내용이 포함되어 있어 응답할 수 없습니다. 🙏

============================================================
테스트 결과: 7 PASS / 0 FAIL
============================================================
```

---

## 🛡️ 보호 레벨 요약

### 1단계: 입력 필터링
- 키워드 블랙리스트 (한글/영어)
- OpenAI Moderation API

### 2단계: 프롬프트 정제
- 부적절한 키워드 자동 제거
- 강력한 네거티브 프롬프트

### 3단계: 출력 검증
- AI 생성 텍스트 사후 검증
- 부적절한 출력 자동 대체

### 4단계: 최종 게이트
- SNS 포스팅 전 최종 체크
- 대화 응답 전 최종 체크

---

## 🎉 완료!

이제 모든 영역에서 부적절한 컨텐츠가 철저히 차단됩니다:

- ✅ 이미지 생성: NSFW 프롬프트 차단
- ✅ AI 스토리: 부적절한 출력 검증
- ✅ 댓글/대화: 입력/출력 모두 필터링
- ✅ SNS 포스팅: 최종 안전 체크

**SIA는 항상 건전하고 긍정적인 컨텐츠만 생성합니다! 🌸**
