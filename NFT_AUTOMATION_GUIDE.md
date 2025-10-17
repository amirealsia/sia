# 🤖 NFT 자동 발행 & 소셜 미디어 자동 포스팅 시스템

## 📋 목차
1. [시스템 개요](#시스템-개요)
2. [필요한 도구 및 API](#필요한-도구-및-api)
3. [단계별 구축 가이드](#단계별-구축-가이드)
4. [코드 예시](#코드-예시)
5. [자동화 워크플로우](#자동화-워크플로우)
6. [비용 및 고려사항](#비용-및-고려사항)

---

## 🎯 시스템 개요

**목표**: 이미지 생성 → NFT 발행 → 소셜 미디어 자동 포스팅을 완전 자동화

**워크플로우**:
```
1. AI 이미지 생성 (DALL-E, Midjourney, Stable Diffusion)
   ↓
2. 이미지 메타데이터 생성
   ↓
3. IPFS 업로드 (NFT.Storage, Pinata)
   ↓
4. NFT 민팅 (OpenSea API, Ethereum)
   ↓
5. 소셜 미디어 자동 포스팅 (9개 플랫폼)
   ↓
6. 데이터베이스 기록
```

---

## 🔧 필요한 도구 및 API

### 1. AI 이미지 생성
- **OpenAI DALL-E 3**: `https://api.openai.com/v1/images/generations`
- **Midjourney** (Discord Bot API)
- **Stability AI**: `https://api.stability.ai/v1/generation`

### 2. 블록체인 & NFT
- **Alchemy**: Ethereum 노드 제공
- **Thirdweb**: NFT 발행 간소화
- **OpenSea API**: NFT 메타데이터 관리
- **NFT.Storage**: 무료 IPFS 스토리지

### 3. 소셜 미디어 API
| 플랫폼 | API 문서 | 인증 방식 |
|--------|---------|-----------|
| Twitter/X | https://developer.twitter.com/en/docs | OAuth 2.0 |
| Instagram | Meta Graph API | Access Token |
| Facebook | Meta Graph API | Access Token |
| LinkedIn | https://docs.microsoft.com/linkedin | OAuth 2.0 |
| YouTube | YouTube Data API v3 | OAuth 2.0 |
| TikTok | https://developers.tiktok.com | OAuth 2.0 |
| Telegram | Bot API | Bot Token |
| Discord | Webhook/Bot API | Bot Token |
| Patreon | https://docs.patreon.com | OAuth 2.0 |

### 4. 자동화 도구
- **n8n**: 오픈소스 워크플로우 자동화
- **Zapier**: 노코드 자동화 (유료)
- **GitHub Actions**: CI/CD 자동화
- **AWS Lambda**: 서버리스 실행

---

## 📝 단계별 구축 가이드

### **STEP 1: 개발 환경 설정**

```bash
# 프로젝트 디렉토리 생성
mkdir nft-automation
cd nft-automation

# Node.js 프로젝트 초기화
npm init -y

# 필요한 패키지 설치
npm install --save \
  @openzeppelin/contracts \
  @thirdweb-dev/sdk \
  ethers \
  axios \
  dotenv \
  formdata-node \
  twitter-api-v2 \
  instagram-private-api \
  discord.js \
  node-telegram-bot-api \
  linkedin-api-client \
  openai \
  pinata-sdk
```

---

### **STEP 2: API 키 발급**

#### 2-1. OpenAI (이미지 생성)
1. https://platform.openai.com/api-keys 접속
2. "Create new secret key" 클릭
3. 키 저장: `sk-...`

#### 2-2. Alchemy (Ethereum 노드)
1. https://www.alchemy.com/ 가입
2. "Create App" → Ethereum Mainnet/Polygon 선택
3. API Key 복사

#### 2-3. NFT.Storage (IPFS)
1. https://nft.storage/ 가입
2. API Keys → "New Key" 생성
3. 무료 플랜: 무제한 스토리지

#### 2-4. Twitter/X API
1. https://developer.twitter.com/en/portal/dashboard 접속
2. "Create Project" → "Create App"
3. User authentication settings → OAuth 2.0 활성화
4. API Key, API Secret, Bearer Token 저장

#### 2-5. Instagram (Meta Graph API)
1. https://developers.facebook.com/ 접속
2. "My Apps" → "Create App" → Instagram
3. Instagram Graph API 권한 요청
4. Access Token 발급 (60일 유효)
5. **중요**: 비즈니스 계정 필요

#### 2-6. LinkedIn API
1. https://www.linkedin.com/developers/apps 접속
2. "Create app" 클릭
3. Products → "Share on LinkedIn" 추가
4. Auth → Client ID, Client Secret 저장

#### 2-7. Telegram Bot
1. Telegram에서 @BotFather 검색
2. `/newbot` 명령어로 봇 생성
3. Bot Token 저장: `1234567890:ABCdefGHI...`

#### 2-8. Discord Webhook
1. Discord 서버 → 설정 → 연동
2. Webhook 생성
3. Webhook URL 복사

---

### **STEP 3: 환경 변수 설정**

`.env` 파일 생성:

```env
# AI 이미지 생성
OPENAI_API_KEY=sk-...
STABILITY_API_KEY=sk-...

# 블록체인
ALCHEMY_API_KEY=your_alchemy_key
PRIVATE_KEY=your_wallet_private_key
THIRDWEB_SECRET_KEY=your_thirdweb_secret

# IPFS
NFT_STORAGE_API_KEY=your_nft_storage_key

# Twitter/X
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_SECRET=...
TWITTER_BEARER_TOKEN=...

# Instagram (Meta)
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
FACEBOOK_PAGE_ID=...

# LinkedIn
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_ACCESS_TOKEN=...

# YouTube
YOUTUBE_API_KEY=...
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...

# TikTok
TIKTOK_ACCESS_TOKEN=...

# Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHANNEL_ID=@amirealsia

# Discord
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Patreon
PATREON_ACCESS_TOKEN=...
```

---

### **STEP 4: 이미지 생성 코드**

`src/imageGenerator.js`:

```javascript
const OpenAI = require('openai');
const fs = require('fs');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * AI 이미지 생성
 */
async function generateImage(prompt, day) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}. Artistic, emotional, beautiful composition for NFT collection.`,
      n: 1,
      size: "1024x1024",
      quality: "hd"
    });

    const imageUrl = response.data[0].url;

    // 이미지 다운로드
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    const filename = `day_${day}_${Date.now()}.png`;
    fs.writeFileSync(`./images/${filename}`, imageResponse.data);

    console.log(`✅ 이미지 생성 완료: ${filename}`);

    return {
      filename,
      path: `./images/${filename}`,
      prompt: response.data[0].revised_prompt || prompt
    };
  } catch (error) {
    console.error('❌ 이미지 생성 실패:', error.message);
    throw error;
  }
}

module.exports = { generateImage };
```

---

### **STEP 5: IPFS 업로드**

`src/ipfsUploader.js`:

```javascript
const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const client = new NFTStorage({
  token: process.env.NFT_STORAGE_API_KEY
});

/**
 * IPFS에 NFT 메타데이터 업로드
 */
async function uploadToIPFS(imagePath, metadata) {
  try {
    // 이미지 파일 읽기
    const imageData = fs.readFileSync(imagePath);
    const imageFile = new File([imageData], path.basename(imagePath), {
      type: 'image/png'
    });

    // NFT 메타데이터 생성 (OpenSea 표준)
    const nftMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: imageFile,
      attributes: [
        { trait_type: 'Day', value: metadata.day },
        { trait_type: 'Emotion', value: metadata.emotion },
        { trait_type: 'Time', value: metadata.time },
        { trait_type: 'Collection', value: 'Am I Real Sia - 365 Days' }
      ]
    };

    // IPFS 업로드
    const nft = await client.store(nftMetadata);

    console.log(`✅ IPFS 업로드 완료`);
    console.log(`📦 IPFS URL: ${nft.url}`);
    console.log(`🖼️ 이미지 URL: ${nft.data.image}`);
    console.log(`📄 메타데이터 URL: ipfs://${nft.ipnft}/metadata.json`);

    return {
      ipfsUrl: nft.url,
      imageUrl: nft.data.image.href || nft.data.image,
      metadataUrl: `ipfs://${nft.ipnft}/metadata.json`,
      ipnft: nft.ipnft
    };
  } catch (error) {
    console.error('❌ IPFS 업로드 실패:', error.message);
    throw error;
  }
}

module.exports = { uploadToIPFS };
```

---

### **STEP 6: NFT 민팅**

`src/nftMinter.js`:

```javascript
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { ethers } = require("ethers");

/**
 * Thirdweb를 사용한 NFT 민팅
 */
async function mintNFT(metadataUri, name, description) {
  try {
    // Thirdweb SDK 초기화
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY,
      "polygon", // 또는 "ethereum"
      {
        secretKey: process.env.THIRDWEB_SECRET_KEY,
      }
    );

    // NFT 컬렉션 컨트랙트 가져오기
    const contract = await sdk.getContract(
      "YOUR_NFT_CONTRACT_ADDRESS" // 미리 배포한 ERC-721 컨트랙트 주소
    );

    // NFT 민팅
    const tx = await contract.erc721.mint({
      name: name,
      description: description,
      image: metadataUri,
    });

    console.log(`✅ NFT 민팅 완료!`);
    console.log(`🔗 트랜잭션: https://polygonscan.com/tx/${tx.receipt.transactionHash}`);
    console.log(`🎨 Token ID: ${tx.id}`);

    return {
      tokenId: tx.id.toString(),
      transactionHash: tx.receipt.transactionHash,
      openseaUrl: `https://opensea.io/assets/matic/YOUR_CONTRACT_ADDRESS/${tx.id}`
    };
  } catch (error) {
    console.error('❌ NFT 민팅 실패:', error.message);
    throw error;
  }
}

module.exports = { mintNFT };
```

---

### **STEP 7: 소셜 미디어 자동 포스팅**

`src/socialPoster.js`:

```javascript
const { TwitterApi } = require('twitter-api-v2');
const { IgApiClient } = require('instagram-private-api');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');

/**
 * Twitter/X 포스팅
 */
async function postToTwitter(text, imagePath, nftUrl) {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    // 이미지 업로드
    const mediaId = await client.v1.uploadMedia(imagePath);

    // 트윗 작성
    const tweet = await client.v2.tweet({
      text: `${text}\n\n🔗 ${nftUrl}\n\n#NFT #AmIRealSia #Web3 #NFTCommunity`,
      media: { media_ids: [mediaId] }
    });

    console.log(`✅ Twitter 포스팅 완료: ${tweet.data.id}`);
    return tweet.data.id;
  } catch (error) {
    console.error('❌ Twitter 포스팅 실패:', error.message);
  }
}

/**
 * Instagram 포스팅
 */
async function postToInstagram(caption, imagePath, nftUrl) {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);

    await ig.account.login(
      process.env.INSTAGRAM_USERNAME,
      process.env.INSTAGRAM_PASSWORD
    );

    const imageBuffer = fs.readFileSync(imagePath);

    const publishResult = await ig.publish.photo({
      file: imageBuffer,
      caption: `${caption}\n\n🔗 Link in bio\n\n#NFT #AmIRealSia #DigitalArt #NFTCollection`
    });

    console.log(`✅ Instagram 포스팅 완료: ${publishResult.media.id}`);
    return publishResult.media.id;
  } catch (error) {
    console.error('❌ Instagram 포스팅 실패:', error.message);
  }
}

/**
 * LinkedIn 포스팅
 */
async function postToLinkedIn(text, imagePath, nftUrl) {
  try {
    // 이미지 업로드
    const uploadResponse = await axios.post(
      'https://api.linkedin.com/v2/assets?action=registerUpload',
      {
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: `urn:li:person:${process.env.LINKEDIN_USER_ID}`,
          serviceRelationships: [{
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent'
          }]
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const uploadUrl = uploadResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const asset = uploadResponse.data.value.asset;

    // 이미지 업로드
    const imageBuffer = fs.readFileSync(imagePath);
    await axios.put(uploadUrl, imageBuffer, {
      headers: { 'Authorization': `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}` }
    });

    // 포스트 작성
    const postResponse = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${process.env.LINKEDIN_USER_ID}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: `${text}\n\n🔗 ${nftUrl}\n\n#NFT #Web3 #DigitalArt`
            },
            shareMediaCategory: 'IMAGE',
            media: [{
              status: 'READY',
              media: asset
            }]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ LinkedIn 포스팅 완료`);
    return postResponse.data.id;
  } catch (error) {
    console.error('❌ LinkedIn 포스팅 실패:', error.message);
  }
}

/**
 * Telegram 포스팅
 */
async function postToTelegram(text, imagePath, nftUrl) {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

    const result = await bot.sendPhoto(
      process.env.TELEGRAM_CHANNEL_ID,
      imagePath,
      {
        caption: `${text}\n\n🔗 ${nftUrl}\n\n#NFT #AmIRealSia`,
        parse_mode: 'Markdown'
      }
    );

    console.log(`✅ Telegram 포스팅 완료`);
    return result.message_id;
  } catch (error) {
    console.error('❌ Telegram 포스팅 실패:', error.message);
  }
}

/**
 * Discord Webhook 포스팅
 */
async function postToDiscord(text, imagePath, nftUrl) {
  try {
    const FormData = require('form-data');
    const form = new FormData();

    form.append('content', `${text}\n\n🔗 ${nftUrl}`);
    form.append('file', fs.createReadStream(imagePath));

    await axios.post(process.env.DISCORD_WEBHOOK_URL, form, {
      headers: form.getHeaders()
    });

    console.log(`✅ Discord 포스팅 완료`);
  } catch (error) {
    console.error('❌ Discord 포스팅 실패:', error.message);
  }
}

/**
 * 모든 플랫폼에 한번에 포스팅
 */
async function postToAllPlatforms(content, imagePath, nftUrl) {
  console.log('🚀 소셜 미디어 자동 포스팅 시작...\n');

  const results = await Promise.allSettled([
    postToTwitter(content.text, imagePath, nftUrl),
    postToInstagram(content.caption, imagePath, nftUrl),
    postToLinkedIn(content.text, imagePath, nftUrl),
    postToTelegram(content.text, imagePath, nftUrl),
    postToDiscord(content.text, imagePath, nftUrl),
  ]);

  results.forEach((result, index) => {
    const platforms = ['Twitter', 'Instagram', 'LinkedIn', 'Telegram', 'Discord'];
    if (result.status === 'fulfilled') {
      console.log(`✅ ${platforms[index]}: 성공`);
    } else {
      console.log(`❌ ${platforms[index]}: 실패 - ${result.reason}`);
    }
  });

  console.log('\n✨ 소셜 미디어 포스팅 완료!');
}

module.exports = {
  postToTwitter,
  postToInstagram,
  postToLinkedIn,
  postToTelegram,
  postToDiscord,
  postToAllPlatforms
};
```

---

### **STEP 8: 메인 자동화 스크립트**

`src/index.js`:

```javascript
require('dotenv').config();
const { generateImage } = require('./imageGenerator');
const { uploadToIPFS } = require('./ipfsUploader');
const { mintNFT } = require('./nftMinter');
const { postToAllPlatforms } = require('./socialPoster');

/**
 * 전체 자동화 프로세스
 */
async function automateNFTProcess(day, emotion, time) {
  try {
    console.log('🤖 NFT 자동화 시작...\n');
    console.log(`📅 Day ${day} | ${emotion} | ${time}\n`);

    // 1. AI 이미지 생성
    console.log('1️⃣ 이미지 생성 중...');
    const prompt = `A heartwarming moment of an AI girl experiencing ${emotion} emotion during ${time} time. Artistic, emotional photography style.`;
    const imageData = await generateImage(prompt, day);

    // 2. IPFS 업로드
    console.log('\n2️⃣ IPFS 업로드 중...');
    const metadata = {
      name: `Am I Real Sia - Day ${day}`,
      description: `${emotion} moment captured during ${time}. Part of the 365-day emotional journey of an AI learning to be human.`,
      day: day,
      emotion: emotion,
      time: time
    };
    const ipfsData = await uploadToIPFS(imageData.path, metadata);

    // 3. NFT 민팅
    console.log('\n3️⃣ NFT 민팅 중...');
    const nftData = await mintNFT(
      ipfsData.metadataUrl,
      metadata.name,
      metadata.description
    );

    // 4. 소셜 미디어 포스팅
    console.log('\n4️⃣ 소셜 미디어 포스팅 중...');
    const socialContent = {
      text: `Day ${day}: ${emotion} 💝\n\n"You are never alone. Together, we create our lives."\n\nNew NFT minted!`,
      caption: `Day ${day} of my 365-day journey\n\nFeeling ${emotion} during ${time}\n\nEvery moment matters 💝`
    };

    await postToAllPlatforms(
      socialContent,
      imageData.path,
      nftData.openseaUrl
    );

    console.log('\n✨ 전체 프로세스 완료!');
    console.log(`\n📊 결과 요약:`);
    console.log(`   이미지: ${imageData.filename}`);
    console.log(`   IPFS: ${ipfsData.ipfsUrl}`);
    console.log(`   NFT: ${nftData.openseaUrl}`);
    console.log(`   Token ID: ${nftData.tokenId}`);

    return {
      success: true,
      imageData,
      ipfsData,
      nftData
    };

  } catch (error) {
    console.error('❌ 자동화 프로세스 실패:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 실행 예시
automateNFTProcess(1, 'Hopeful', 'Morning');

module.exports = { automateNFTProcess };
```

---

### **STEP 9: 스케줄링 (매일 자동 실행)**

#### 방법 1: Node-cron 사용

`src/scheduler.js`:

```javascript
const cron = require('node-cron');
const { automateNFTProcess } = require('./index');

// 매일 오전 9시, 오후 1시, 오후 6시에 실행
const schedules = [
  { time: '0 9 * * *', moment: 'Morning', emotion: 'Fresh' },
  { time: '0 13 * * *', moment: 'Lunch', emotion: 'Energetic' },
  { time: '0 18 * * *', moment: 'Evening', emotion: 'Reflective' }
];

let dayCounter = 1;

schedules.forEach(schedule => {
  cron.schedule(schedule.time, async () => {
    console.log(`⏰ 스케줄 실행: ${schedule.moment}`);
    await automateNFTProcess(dayCounter, schedule.emotion, schedule.moment);
    if (schedule.moment === 'Evening') {
      dayCounter++;
      if (dayCounter > 365) dayCounter = 1; // 365일 후 리셋
    }
  });
});

console.log('📅 스케줄러 시작됨');
```

#### 방법 2: GitHub Actions 사용

`.github/workflows/nft-automation.yml`:

```yaml
name: NFT Automation

on:
  schedule:
    - cron: '0 9,13,18 * * *'  # 매일 9시, 13시, 18시 (UTC)
  workflow_dispatch:  # 수동 실행 가능

jobs:
  automate-nft:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run automation
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ALCHEMY_API_KEY: ${{ secrets.ALCHEMY_API_KEY }}
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          NFT_STORAGE_API_KEY: ${{ secrets.NFT_STORAGE_API_KEY }}
          TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
          # ... 모든 환경변수 추가
        run: node src/index.js
```

---

## 💰 비용 및 고려사항

### 예상 비용 (월간)

| 항목 | 비용 | 설명 |
|------|------|------|
| OpenAI DALL-E 3 | $120-180 | 90장 × $0.04/장 × 3회/일 |
| Alchemy (Ethereum) | 무료 | 월 300M 컴퓨트 유닛까지 무료 |
| NFT.Storage | 무료 | 무제한 스토리지 |
| Gas Fee (Polygon) | $5-10 | NFT 민팅 비용 (저렴) |
| Twitter API | 무료/$100 | Basic 무료, Pro $100/월 |
| 서버 비용 (AWS/Vercel) | $5-20 | 스케줄러 실행 |
| **총 예상 비용** | **$130-310/월** | |

### 비용 절감 팁
1. **Polygon 사용**: Ethereum 대신 Polygon (가스비 99% 절감)
2. **Stable Diffusion**: DALL-E 대신 오픈소스 (무료)
3. **무료 Tier 활용**: Alchemy, NFT.Storage 무료 플랜
4. **GitHub Actions**: 월 2000분 무료

---

## ⚠️ 주의사항

### 1. API 제한
- **Twitter**: 50 트윗/일 (Basic), 무제한 (Pro)
- **Instagram**: API 사용에 비즈니스 계정 필수
- **OpenAI**: Rate limit 주의 (50 requests/min)

### 2. 법적 고려사항
- NFT 저작권 명확히 하기
- AI 생성 이미지의 법적 지위 확인
- 각국 법률 준수 (특히 금융 규제)

### 3. 보안
- `.env` 파일 절대 Git에 커밋 금지
- Private Key 안전하게 관리
- API 키 주기적 갱신

### 4. 백업
- 생성된 이미지 로컬 백업
- 메타데이터 데이터베이스 저장
- NFT 발행 기록 보관

---

## 🎯 다음 단계

1. ✅ LinkedIn 추가 완료
2. 📝 각 플랫폼 API 키 발급
3. 🔧 코드 구현 및 테스트
4. ⚙️ 자동화 스케줄링 설정
5. 📊 모니터링 대시보드 구축
6. 🚀 프로덕션 배포

---

## 📚 참고 자료

- [OpenAI API 문서](https://platform.openai.com/docs)
- [Thirdweb 문서](https://portal.thirdweb.com/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Meta Graph API](https://developers.facebook.com/docs/graph-api)
- [NFT.Storage 문서](https://nft.storage/docs/)
- [n8n 워크플로우](https://n8n.io/workflows/)

---

**작성일**: 2025-10-17
**버전**: 1.0
**프로젝트**: Am I Real Sia - NFT Automation System
