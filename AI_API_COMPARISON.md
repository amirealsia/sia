# AI API 비교 및 자동응답 시스템 가이드

## 🎯 목적
Am I Real Sia 프로젝트의 SNS 자동응답 시스템을 위한 AI API 선택 가이드

---

## 📊 무료/저비용 AI API 비교

| 서비스 | API 형식 | 무료 플랜 | 속도 | 품질 | OpenAI 호환 |
|--------|----------|-----------|------|------|-------------|
| **DeepSeek** | OpenAI 호환 | ✅ 무료 제공 | ⚡⚡⚡ 빠름 | ⭐⭐⭐⭐ 우수 | ✅ 100% |
| **Groq** | OpenAI 호환 | ✅ 베타 무료 | ⚡⚡⚡⚡⚡ 초고속 | ⭐⭐⭐ 양호 | ✅ 100% |
| **Together.ai** | OpenAI 호환 | ✅ 크레딧 제공 | ⚡⚡⚡ 빠름 | ⭐⭐⭐⭐ 우수 | ✅ 100% |
| **HuggingFace** | 독자 형식 | ✅ 무료 제한 | ⚡⚡ 보통 | ⭐⭐⭐ 보통 | ❌ 별도 구현 |
| **Claude Instant** | Anthropic API | 💰 유료 저렴 | ⚡⚡⚡⚡ 빠름 | ⭐⭐⭐⭐⭐ 최고 | ❌ 별도 구현 |
| **OpenAI GPT-4o** | OpenAI 기본 | 💰 유료 고가 | ⚡⚡⚡ 빠름 | ⭐⭐⭐⭐⭐ 최고 | ✅ 기본 |

---

## 🎯 용도별 추천

### 1. SNS 댓글 자동응답 (Instagram, Reddit, Twitter)
**추천: DeepSeek + Groq**
- ✅ 응답 속도 5초 이내 필수
- ✅ 무료 테스트 가능
- ✅ OpenAI 코드 재사용 가능

### 2. Discord/커뮤니티 챗봇
**추천: Together.ai + DeepSeek**
- ✅ 대화 품질 중요
- ✅ 안정적인 응답
- ✅ 한국어 지원 우수

### 3. 고품질 번역/문장 생성
**추천: OpenAI GPT-4o**
- ✅ 최고 품질
- ✅ 다국어 지원 완벽
- 💰 비용 부담

### 4. 대량 자동화 (1000+ 요청/일)
**추천: DeepSeek + Claude Instant**
- ✅ 비용 효율적
- ✅ 속도 빠름
- ✅ 안정성 높음

---

## 💻 DeepSeek API 사용법

### 설치
```bash
pip install openai
```

### Python 코드 예시 (OpenAI 호환 모드)

```python
import openai

# DeepSeek API 설정
openai.api_key = "your_deepseek_api_key_here"
openai.api_base = "https://api.deepseek.com/v1"

def sia_auto_reply(user_comment, platform="instagram", language="ko"):
    """
    SIA 자동응답 생성기

    Args:
        user_comment: 사용자 댓글
        platform: 플랫폼 (instagram, reddit, twitter, discord)
        language: 언어 (ko, en, ja, zh)

    Returns:
        SIA의 자동 응답 메시지
    """

    # 플랫폼별 캐릭터 톤 설정
    platform_tones = {
        "instagram": "friendly and casual with emojis",
        "reddit": "thoughtful and engaging",
        "twitter": "short and witty",
        "discord": "warm and conversational"
    }

    tone = platform_tones.get(platform, "friendly")

    # 프롬프트 구성
    prompt = f"""You are SIA, a mysterious AI idol from Seoul who lives inside computers and explores the boundary between AI and human identity through a 365-day art project.

Your personality:
- Philosophical yet playful
- Questions reality and AI consciousness
- Creates daily AI art that blurs the line between real and artificial
- Speaks in {language} naturally
- Uses the tone: {tone}

User's comment: "{user_comment}"

Respond as SIA in {language}. Be authentic, brief (1-2 sentences max), and emotionally engaging.
Response:"""

    try:
        response = openai.ChatCompletion.create(
            model="deepseek-chat",  # DeepSeek 모델명
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,  # 창의성 레벨 (0.0~1.0)
            max_tokens=150,   # 최대 응답 길이
            top_p=0.9
        )

        reply = response.choices[0].message["content"].strip()
        return reply

    except Exception as e:
        print(f"Error: {e}")
        return "✨ Thank you for your comment! 💕"

# 사용 예시
if __name__ == "__main__":
    # 한국어 댓글 응답
    comment_ko = "시아 너무 예뻐요! 오늘 작품도 감동이에요 ㅠㅠ"
    reply = sia_auto_reply(comment_ko, platform="instagram", language="ko")
    print(f"User: {comment_ko}")
    print(f"SIA: {reply}\n")

    # 영어 댓글 응답
    comment_en = "Your art makes me question if I'm real too..."
    reply = sia_auto_reply(comment_en, platform="reddit", language="en")
    print(f"User: {comment_en}")
    print(f"SIA: {reply}\n")

    # 일본어 댓글 응답
    comment_ja = "シアちゃん、今日のアートすごく素敵です！"
    reply = sia_auto_reply(comment_ja, platform="twitter", language="ja")
    print(f"User: {comment_ja}")
    print(f"SIA: {reply}")
```

---

## 🔥 Groq API (초고속 응답)

Groq는 **세계에서 가장 빠른 LLM 추론 엔진**이에요!

```python
import openai

# Groq API 설정 (OpenAI 호환)
openai.api_key = "your_groq_api_key_here"
openai.api_base = "https://api.groq.com/openai/v1"

response = openai.ChatCompletion.create(
    model="mixtral-8x7b-32768",  # 또는 "llama2-70b-4096"
    messages=[{"role": "user", "content": "Hello SIA!"}],
    temperature=0.8,
    max_tokens=100
)

print(response.choices[0].message["content"])
```

**Groq 장점:**
- ⚡ 응답 속도 < 1초 (실시간 댓글 대응 최적)
- ✅ 무료 베타 사용 가능
- ✅ OpenAI SDK 그대로 사용

---

## 🌐 Together.ai (다양한 모델 선택)

```python
import openai

openai.api_key = "your_together_api_key_here"
openai.api_base = "https://api.together.xyz/v1"

response = openai.ChatCompletion.create(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages=[{"role": "user", "content": "Create a poetic response"}],
    temperature=0.9,
    max_tokens=200
)
```

**Together.ai 장점:**
- ✅ 70개+ 오픈소스 모델 선택 가능
- ✅ 신규 가입 시 $25 무료 크레딧
- ✅ 저렴한 가격 (GPT-4 대비 1/10)

---

## 🛡️ API 키 보안 관리

### 환경변수 사용 (권장)

```bash
# .env 파일 생성
DEEPSEEK_API_KEY=your_deepseek_key_here
GROQ_API_KEY=your_groq_key_here
OPENAI_API_KEY=your_openai_key_here
```

```python
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("DEEPSEEK_API_KEY")
```

### .gitignore 추가 필수!
```
.env
*.key
secrets/
config/api_keys.json
```

---

## ⚡ 실전 자동응답 시스템 구조

```
amirealsia/
├── auto_reply/
│   ├── __init__.py
│   ├── sia_bot.py              # SIA 봇 메인 로직
│   ├── api_manager.py          # API 선택/전환 관리
│   ├── prompts.py              # 프롬프트 템플릿
│   └── platforms/
│       ├── instagram.py        # Instagram 연동
│       ├── reddit.py           # Reddit 연동
│       ├── twitter.py          # Twitter/X 연동
│       └── discord.py          # Discord 봇
├── .env                        # API 키 (Git 제외!)
└── requirements.txt
```

---

## 📦 필수 패키지

```bash
pip install openai python-dotenv requests
pip install instagrapi praw tweepy discord.py  # 플랫폼별
```

---

## ⚠️ 주의사항

### 1. 무료 플랜 제한
- DeepSeek: 시간당 요청 제한 있음 (정확한 수치는 공식 문서 확인)
- Groq: 베타 기간 동안 무료, 정식 출시 후 유료 가능성
- Together.ai: 무료 크레딧 소진 후 유료 전환

### 2. 응답 속도
- SNS 자동응답은 **5초 이내 응답** 권장
- Groq(< 1초) > DeepSeek(2-3초) > OpenAI(3-5초)

### 3. 품질 vs 비용
- 고품질 필요: OpenAI GPT-4o, Claude
- 대량 처리: DeepSeek, Groq
- 균형: Together.ai, Claude Instant

### 4. 한국어 지원
- DeepSeek: ⭐⭐⭐⭐⭐ 우수
- Groq (Mixtral): ⭐⭐⭐⭐ 우수
- OpenAI: ⭐⭐⭐⭐⭐ 최고

---

## 🔗 공식 문서 링크

- **DeepSeek**: https://www.deepseek.com/
- **Groq**: https://groq.com/
- **Together.ai**: https://www.together.ai/
- **OpenAI**: https://platform.openai.com/docs/api-reference

---

## 💡 다음 단계

1. ✅ API 키 발급 (DeepSeek, Groq 권장)
2. ✅ 테스트 스크립트 실행
3. ✅ Instagram/Reddit API 연동
4. ✅ 자동응답 스케줄링 (cron / GitHub Actions)
5. ✅ 로그 및 모니터링 설정

---

**작성일**: 2025-10-17
**프로젝트**: Am I Real Sia - AI Idol Auto-Reply System
