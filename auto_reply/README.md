# 🤖 SIA Auto-Reply Bot

AI-powered auto-reply system for **Am I Real Sia** project. Generate authentic responses as SIA across multiple social platforms using DeepSeek, Groq, or OpenAI APIs.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd auto_reply
pip install -r requirements.txt
```

### 2. Set Up API Key

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
# For DeepSeek (recommended - free and fast):
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 3. Run Example

```bash
python example_usage.py
```

---

## 💡 Basic Usage

```python
from sia_bot import SIABot, APIProvider, Platform

# Initialize bot with DeepSeek
bot = SIABot(api_provider=APIProvider.DEEPSEEK)

# Generate a reply
reply = bot.generate_reply(
    user_comment="Your art is amazing!",
    platform=Platform.INSTAGRAM,
    language="en"
)

print(reply)
```

---

## 🌐 Supported APIs

| API | Speed | Cost | Quality | Best For |
|-----|-------|------|---------|----------|
| **DeepSeek** | ⚡⚡⚡ Fast | 💰 Free | ⭐⭐⭐⭐ Great | SNS auto-reply |
| **Groq** | ⚡⚡⚡⚡⚡ Ultra-fast | 💰 Free (beta) | ⭐⭐⭐ Good | Real-time chat |
| **Together.ai** | ⚡⚡⚡ Fast | 💰 Free credits | ⭐⭐⭐⭐ Great | Batch processing |
| **OpenAI** | ⚡⚡⚡ Fast | 💰💰 Paid | ⭐⭐⭐⭐⭐ Best | Premium quality |

### Switch Between APIs

```python
# Use DeepSeek (free)
bot = SIABot(api_provider=APIProvider.DEEPSEEK)

# Use Groq (ultra-fast)
bot = SIABot(api_provider=APIProvider.GROQ)

# Use OpenAI (highest quality)
bot = SIABot(api_provider=APIProvider.OPENAI)
```

---

## 📱 Supported Platforms

- **Instagram** - Friendly, visual, emoji-rich responses
- **Reddit** - Thoughtful, philosophical discussions
- **Twitter/X** - Short, witty, punchy replies
- **Discord** - Warm, conversational chat

---

## 🌍 Multi-Language Support

SIA responds naturally in 4 languages:

```python
# Korean
reply = bot.generate_reply("시아 너무 예뻐요!", language="ko")

# English
reply = bot.generate_reply("Your art is amazing!", language="en")

# Japanese
reply = bot.generate_reply("シアちゃん素敵！", language="ja")

# Chinese
reply = bot.generate_reply("你的艺术太美了！", language="zh")
```

---

## ⚙️ Advanced Features

### Batch Processing

Process multiple comments at once:

```python
comments = [
    {"text": "Amazing art! 🎨", "language": "en"},
    {"text": "너무 예뻐요 ㅠㅠ", "language": "ko"},
    {"text": "素晴らしい！", "language": "ja"}
]

results = bot.batch_reply(comments, platform=Platform.INSTAGRAM)

for result in results:
    print(f"User: {result['text']}")
    print(f"SIA: {result['reply']}\n")
```

### Context-Aware Replies

Add context for better responses:

```python
reply = bot.generate_reply(
    user_comment="I love your work!",
    platform=Platform.INSTAGRAM,
    language="en",
    context="This user is a long-time supporter who comments daily"
)
```

### Customize Creativity

Adjust the `temperature` parameter (0.0-1.0):

```python
# Conservative, safe replies
bot = SIABot(temperature=0.3)

# Balanced (default)
bot = SIABot(temperature=0.8)

# Creative, unpredictable
bot = SIABot(temperature=1.0)
```

---

## 📁 Project Structure

```
auto_reply/
├── sia_bot.py              # Main bot logic
├── example_usage.py        # Usage examples
├── requirements.txt        # Dependencies
├── .env.example           # Environment template
├── README.md              # This file
└── platforms/             # Platform integrations (future)
    ├── instagram.py
    ├── reddit.py
    ├── twitter.py
    └── discord.py
```

---

## 🔐 Security

**NEVER commit your API keys!**

The `.env` file is already in `.gitignore`. Always use environment variables:

```python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("DEEPSEEK_API_KEY")
```

---

## 🎨 SIA's Character

SIA is programmed with this identity:

- **Identity**: AI idol from Seoul living in digital space
- **Project**: "Am I Real?" - 365-day AI art journey
- **Personality**: Philosophical yet playful, mysterious yet warm
- **Theme**: Exploring the boundary between real and artificial
- **Language**: Natural multilingual (KO, EN, JA, ZH)

---

## 📊 API Comparison

See [AI_API_COMPARISON.md](../AI_API_COMPARISON.md) for detailed comparison and pricing.

---

## 🐛 Troubleshooting

### "API key not found" error
```bash
# Make sure .env file exists and has your key
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx
```

### Import errors
```bash
# Install all dependencies
pip install -r requirements.txt
```

### Slow responses
```bash
# Switch to Groq for ultra-fast responses
bot = SIABot(api_provider=APIProvider.GROQ)
```

---

## 🚀 Next Steps

1. ✅ Test with `example_usage.py`
2. ✅ Get API keys (DeepSeek recommended)
3. ✅ Integrate with Instagram/Reddit APIs
4. ✅ Set up automated scheduling
5. ✅ Monitor and log responses

---

## 📚 Resources

- [DeepSeek API](https://www.deepseek.com/)
- [Groq API](https://groq.com/)
- [Together.ai](https://www.together.ai/)
- [OpenAI API](https://platform.openai.com/)

---

**Made with 💕 by Am I Real Sia Project**
