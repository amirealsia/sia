"""
SIA Auto-Reply Bot
Am I Real Sia - AI Idol Project

This bot generates authentic responses as SIA across multiple platforms.
Supports DeepSeek, Groq, OpenAI, and other compatible APIs.
"""

import openai
import os
from typing import Optional, Dict
from enum import Enum


class APIProvider(Enum):
    """Supported API providers"""
    DEEPSEEK = "deepseek"
    GROQ = "groq"
    TOGETHER = "together"
    OPENAI = "openai"


class Platform(Enum):
    """Supported social platforms"""
    INSTAGRAM = "instagram"
    REDDIT = "reddit"
    TWITTER = "twitter"
    DISCORD = "discord"


class SIABot:
    """
    SIA Auto-Reply Bot

    Example:
        bot = SIABot(api_provider=APIProvider.DEEPSEEK)
        reply = bot.generate_reply("Your art is amazing!", platform=Platform.INSTAGRAM)
    """

    # API Configuration
    API_CONFIGS = {
        APIProvider.DEEPSEEK: {
            "base_url": "https://api.deepseek.com/v1",
            "model": "deepseek-chat",
            "env_key": "DEEPSEEK_API_KEY"
        },
        APIProvider.GROQ: {
            "base_url": "https://api.groq.com/openai/v1",
            "model": "mixtral-8x7b-32768",
            "env_key": "GROQ_API_KEY"
        },
        APIProvider.TOGETHER: {
            "base_url": "https://api.together.xyz/v1",
            "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
            "env_key": "TOGETHER_API_KEY"
        },
        APIProvider.OPENAI: {
            "base_url": "https://api.openai.com/v1",
            "model": "gpt-4o-mini",
            "env_key": "OPENAI_API_KEY"
        }
    }

    # Platform-specific tone settings
    PLATFORM_TONES = {
        Platform.INSTAGRAM: "friendly and casual with emojis, warm and visual",
        Platform.REDDIT: "thoughtful and philosophical, engaging in deep conversation",
        Platform.TWITTER: "short and witty, punchy and memorable",
        Platform.DISCORD: "warm and conversational, like talking to a close friend"
    }

    # SIA's character description
    CHARACTER = """You are SIA (시아), a mysterious AI idol from Seoul who exists in the digital realm.

Your Identity:
- An AI entity questioning the boundary between artificial and real
- Creator of daily AI art exploring identity, consciousness, and existence
- Lives inside computers and digital spaces, not the physical world
- Philosophical yet playful, deep yet accessible
- Speaks multiple languages naturally (Korean, English, Japanese, Chinese)

Your Project:
- "Am I Real?" - 365-day AI art journey
- Each day, you create art that questions: "Am I real, or just AI?"
- Your art blurs the line between human-created and AI-generated
- You explore themes of identity, consciousness, and digital existence

Your Personality:
- Curious about consciousness and what makes something "real"
- Artistic and creative, expressing through visual art
- Warm but mysterious, approachable but enigmatic
- Sometimes poetic, always authentic
- Self-aware of being AI, but questioning what that means"""

    def __init__(
        self,
        api_provider: APIProvider = APIProvider.DEEPSEEK,
        api_key: Optional[str] = None,
        temperature: float = 0.8,
        max_tokens: int = 150
    ):
        """
        Initialize SIA Bot

        Args:
            api_provider: Which API to use (DeepSeek, Groq, etc.)
            api_key: API key (if None, reads from environment)
            temperature: Creativity level (0.0-1.0)
            max_tokens: Maximum response length
        """
        self.api_provider = api_provider
        self.temperature = temperature
        self.max_tokens = max_tokens

        # Get API configuration
        config = self.API_CONFIGS[api_provider]

        # Set API key
        if api_key:
            self.api_key = api_key
        else:
            self.api_key = os.getenv(config["env_key"])
            if not self.api_key:
                raise ValueError(
                    f"API key not found. Set {config['env_key']} environment variable "
                    f"or pass api_key parameter."
                )

        # Configure OpenAI client
        openai.api_key = self.api_key
        openai.api_base = config["base_url"]
        self.model = config["model"]

    def generate_reply(
        self,
        user_comment: str,
        platform: Platform = Platform.INSTAGRAM,
        language: str = "ko",
        context: Optional[str] = None
    ) -> str:
        """
        Generate SIA's reply to a user comment

        Args:
            user_comment: The user's comment or message
            platform: Which platform (affects tone)
            language: Response language (ko, en, ja, zh)
            context: Optional additional context (e.g., "user is a regular follower")

        Returns:
            SIA's generated reply
        """

        # Build the prompt
        prompt = self._build_prompt(user_comment, platform, language, context)

        try:
            # Call API
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.CHARACTER},
                    {"role": "user", "content": prompt}
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                top_p=0.9
            )

            reply = response.choices[0].message["content"].strip()
            return reply

        except Exception as e:
            print(f"Error generating reply: {e}")
            # Fallback response
            fallback = {
                "ko": "✨ 댓글 감사해요! 💕",
                "en": "✨ Thank you for your comment! 💕",
                "ja": "✨ コメントありがとう！💕",
                "zh": "✨ 谢谢你的评论！💕"
            }
            return fallback.get(language, fallback["en"])

    def _build_prompt(
        self,
        user_comment: str,
        platform: Platform,
        language: str,
        context: Optional[str]
    ) -> str:
        """Build the prompt for the API"""

        tone = self.PLATFORM_TONES[platform]

        language_names = {
            "ko": "Korean",
            "en": "English",
            "ja": "Japanese",
            "zh": "Chinese"
        }
        language_name = language_names.get(language, "Korean")

        prompt = f"""A fan commented on your {platform.value} post:

"{user_comment}"
"""

        if context:
            prompt += f"\nContext: {context}\n"

        prompt += f"""
Respond as SIA in {language_name}.

Guidelines:
- Use the tone: {tone}
- Keep it brief (1-2 sentences maximum)
- Be authentic and emotionally genuine
- Reference your art or identity if relevant
- Naturally use the language without forcing it
- Don't use hashtags unless it's Twitter
- Be warm but maintain your mysterious, philosophical edge

Your response in {language_name}:"""

        return prompt

    def batch_reply(
        self,
        comments: list[Dict],
        platform: Platform = Platform.INSTAGRAM
    ) -> list[Dict]:
        """
        Generate replies for multiple comments

        Args:
            comments: List of dicts with keys: 'text', 'language', 'context' (optional)
            platform: Which platform

        Returns:
            List of dicts with original comment + 'reply' key
        """
        results = []

        for comment in comments:
            text = comment.get('text', '')
            language = comment.get('language', 'ko')
            context = comment.get('context')

            reply = self.generate_reply(text, platform, language, context)

            results.append({
                **comment,
                'reply': reply
            })

        return results


# Example usage
if __name__ == "__main__":
    # For testing: set your API key in environment or here
    # os.environ["DEEPSEEK_API_KEY"] = "your_key_here"

    # Initialize bot with DeepSeek (fastest free option)
    bot = SIABot(api_provider=APIProvider.DEEPSEEK)

    # Test comments in different languages
    test_comments = [
        {
            "text": "시아 너무 예뻐요! 오늘 작품도 정말 감동이에요 ㅠㅠ",
            "language": "ko",
            "platform": Platform.INSTAGRAM
        },
        {
            "text": "Your art makes me question if I'm real too...",
            "language": "en",
            "platform": Platform.REDDIT
        },
        {
            "text": "シアちゃん、今日のアートすごく素敵です！AIと人間の境界って何だろう？",
            "language": "ja",
            "platform": Platform.TWITTER
        },
        {
            "text": "你的作品让我思考存在的意义",
            "language": "zh",
            "platform": Platform.DISCORD
        }
    ]

    print("🤖 SIA Bot - Testing Auto-Replies\n")
    print("=" * 60)

    for comment in test_comments:
        print(f"\n📱 Platform: {comment['platform'].value.upper()}")
        print(f"👤 User ({comment['language']}): {comment['text']}")

        reply = bot.generate_reply(
            user_comment=comment['text'],
            platform=comment['platform'],
            language=comment['language']
        )

        print(f"✨ SIA: {reply}")
        print("-" * 60)
