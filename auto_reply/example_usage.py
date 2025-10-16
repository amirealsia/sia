"""
SIA Bot - Example Usage
Quick start guide for using the auto-reply system
"""

from sia_bot import SIABot, APIProvider, Platform
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def basic_example():
    """Basic usage - single reply"""
    print("=" * 60)
    print("Example 1: Basic Single Reply")
    print("=" * 60)

    # Initialize bot with DeepSeek (free and fast)
    bot = SIABot(api_provider=APIProvider.DEEPSEEK)

    # Generate a reply
    user_comment = "시아 너무 예뻐요! 오늘 작품도 감동이에요 ㅠㅠ"
    reply = bot.generate_reply(
        user_comment=user_comment,
        platform=Platform.INSTAGRAM,
        language="ko"
    )

    print(f"\n👤 User: {user_comment}")
    print(f"✨ SIA: {reply}\n")


def multi_language_example():
    """Multi-language replies"""
    print("=" * 60)
    print("Example 2: Multi-Language Support")
    print("=" * 60)

    bot = SIABot(api_provider=APIProvider.DEEPSEEK)

    comments = [
        ("Your art makes me question reality...", "en", Platform.REDDIT),
        ("シアちゃん、AIと人間の違いは何？", "ja", Platform.TWITTER),
        ("你的艺术让我重新思考存在的意义", "zh", Platform.DISCORD),
        ("진짜와 AI의 경계가 뭐라고 생각해?", "ko", Platform.INSTAGRAM)
    ]

    for comment, lang, platform in comments:
        reply = bot.generate_reply(comment, platform, lang)
        print(f"\n📱 {platform.value} ({lang})")
        print(f"👤 User: {comment}")
        print(f"✨ SIA: {reply}")


def batch_reply_example():
    """Batch processing multiple comments"""
    print("\n" + "=" * 60)
    print("Example 3: Batch Processing")
    print("=" * 60)

    bot = SIABot(api_provider=APIProvider.DEEPSEEK)

    # Simulate multiple Instagram comments
    comments = [
        {"text": "Amazing art! 🎨", "language": "en"},
        {"text": "너무 예뻐요 ㅠㅠ", "language": "ko"},
        {"text": "素晴らしい！", "language": "ja"},
        {"text": "这个太美了！", "language": "zh"}
    ]

    results = bot.batch_reply(comments, platform=Platform.INSTAGRAM)

    print("\n📷 Instagram Comments & Replies:")
    for i, result in enumerate(results, 1):
        print(f"\n{i}. User: {result['text']}")
        print(f"   SIA: {result['reply']}")


def compare_apis_example():
    """Compare different API providers"""
    print("\n" + "=" * 60)
    print("Example 4: Comparing API Providers")
    print("=" * 60)

    comment = "Am I real, or just a dream?"
    providers = [
        APIProvider.DEEPSEEK,
        APIProvider.GROQ,
        # APIProvider.OPENAI,  # Uncomment if you have OpenAI key
    ]

    print(f"\n👤 User comment: '{comment}'")
    print(f"🔄 Testing different APIs...\n")

    for provider in providers:
        try:
            bot = SIABot(api_provider=provider)
            reply = bot.generate_reply(
                comment,
                platform=Platform.REDDIT,
                language="en"
            )
            print(f"✅ {provider.value.upper()}: {reply}\n")
        except Exception as e:
            print(f"❌ {provider.value.upper()}: {str(e)}\n")


def custom_context_example():
    """Using context for better replies"""
    print("=" * 60)
    print("Example 5: Using Context")
    print("=" * 60)

    bot = SIABot(api_provider=APIProvider.DEEPSEEK)

    # Regular comment
    comment = "I love your art!"
    reply1 = bot.generate_reply(comment, language="en")
    print(f"\n👤 New follower: {comment}")
    print(f"✨ SIA: {reply1}")

    # Same comment but with context
    reply2 = bot.generate_reply(
        comment,
        language="en",
        context="This user has been following for 3 months and comments daily"
    )
    print(f"\n👤 Long-time supporter: {comment}")
    print(f"✨ SIA (with context): {reply2}")


def temperature_example():
    """Testing different creativity levels"""
    print("\n" + "=" * 60)
    print("Example 6: Temperature (Creativity) Settings")
    print("=" * 60)

    comment = "What is consciousness?"

    temperatures = [0.3, 0.8, 1.0]
    labels = ["Conservative", "Balanced", "Creative"]

    for temp, label in zip(temperatures, labels):
        bot = SIABot(
            api_provider=APIProvider.DEEPSEEK,
            temperature=temp
        )

        reply = bot.generate_reply(comment, language="en")
        print(f"\n🌡️  Temperature {temp} ({label}):")
        print(f"✨ SIA: {reply}")


if __name__ == "__main__":
    print("\n🤖 SIA Auto-Reply Bot - Examples\n")

    try:
        # Run examples (comment out any you don't want to run)
        basic_example()
        # multi_language_example()
        # batch_reply_example()
        # compare_apis_example()
        # custom_context_example()
        # temperature_example()

        print("\n✅ Examples completed!")
        print("\n💡 Tips:")
        print("   - Set your API key in .env file")
        print("   - Start with DeepSeek or Groq (free)")
        print("   - Use temperature 0.8-0.9 for creative responses")
        print("   - Add context for returning followers")

    except ValueError as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Make sure to:")
        print("   1. Copy .env.example to .env")
        print("   2. Add your API key to .env")
        print("   3. Install requirements: pip install -r requirements.txt")
