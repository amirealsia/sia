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
