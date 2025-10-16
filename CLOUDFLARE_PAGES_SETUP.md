# 🚀 Cloudflare Pages 배포 가이드

Next.js 랜딩페이지를 Cloudflare Pages에 배포하고 amirealsia.com 도메인에 연결합니다.

---

## ✅ 현재 상태

- ✅ Next.js 프로젝트 생성 완료 (`landing/`)
- ✅ 랜딩페이지 디자인 완성
- ✅ 로컬 개발 서버 실행 중 (`http://localhost:3000`)
- ⏳ Cloudflare Pages 배포 필요
- ⏳ 도메인 연결 필요

---

## 🌐 Step 1: GitHub에 랜딩페이지 푸시

### 1️⃣ landing 폴더를 Git에 추가

```bash
cd d:\AI\amirealsia

# landing 폴더 추가
git add landing/

# 커밋
git commit -m "🎨 Add landing page for amirealsia.com"

# GitHub에 푸시
git push
```

---

## ☁️ Step 2: Cloudflare Pages 프로젝트 생성

### 1️⃣ Cloudflare 대시보드 접속

1. https://dash.cloudflare.com 접속
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Create a project** 클릭

### 2️⃣ GitHub 저장소 연결

1. **Connect to Git** 선택
2. **Connect GitHub** 클릭
3. GitHub 인증 (처음이면)
4. **Select a repository**:
   - `amirealsia/sia` 선택
5. **Begin setup** 클릭

### 3️⃣ 빌드 설정

```
Project name: amirealsia
Production branch: main

Build settings:
  Framework preset: Next.js
  Build command: cd landing && npm run build
  Build output directory: landing/.next
  Root directory: /

Environment variables (Node.js version):
  NODE_VERSION = 22
```

**중요!** Root directory는 `/`로 두고, Build command에서 `cd landing &&`를 추가합니다.

### 4️⃣ 배포 시작

1. **Save and Deploy** 클릭
2. 첫 배포 시작 (약 2-3분 소요)
3. 배포 완료 시 자동 URL 생성:
   ```
   https://amirealsia.pages.dev
   ```

---

## 🔗 Step 3: 커스텀 도메인 연결

### 1️⃣ Cloudflare Pages에서 도메인 추가

1. 배포된 프로젝트 페이지에서 **Custom domains** 탭 클릭
2. **Set up a custom domain** 클릭
3. 도메인 입력:
   ```
   amirealsia.com
   ```
4. **Continue** 클릭

### 2️⃣ DNS 자동 설정 확인

Cloudflare가 자동으로 DNS 레코드를 추가합니다:

```
CNAME  @  amirealsia.pages.dev
```

또는:

```
A      @  [Cloudflare Pages IP]
AAAA   @  [Cloudflare Pages IPv6]
```

**확인 방법:**
1. Cloudflare 대시보드 → **DNS** 탭
2. `@` (루트) 레코드 확인

### 3️⃣ www 서브도메인 추가 (선택사항)

```
www.amirealsia.com
```

도 추가하려면:

1. **Custom domains** → **Set up a custom domain**
2. 도메인: `www.amirealsia.com`
3. **Continue**

---

## ✅ Step 4: 배포 확인

### 테스트

브라우저에서 접속:
```
https://amirealsia.com
```

✅ 랜딩페이지가 표시되면 성공!

### SSL/TLS 확인

Cloudflare가 자동으로 HTTPS 인증서를 발급합니다 (무료).

**주의:** DNS 전파 시간이 필요할 수 있습니다 (최대 24시간).

---

## 🔄 Step 5: 자동 배포 설정

### GitHub에 푸시하면 자동 배포

이제부터는:

```bash
# 로컬에서 수정
cd d:\AI\amirealsia\landing
# 파일 수정...

# 커밋 및 푸시
git add .
git commit -m "🎨 Update landing page"
git push
```

→ **자동으로 Cloudflare Pages에 배포됩니다!**

### 배포 상태 확인

1. Cloudflare Pages 대시보드
2. **Deployments** 탭에서 실시간 배포 진행 상황 확인

---

## ⚙️ 고급 설정 (선택)

### 환경 변수 추가

API 키나 설정이 필요한 경우:

1. Cloudflare Pages 프로젝트 → **Settings** → **Environment variables**
2. **Add variable** 클릭:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://api.amirealsia.com
   ```
3. **Save**

### 빌드 최적화

`package.json`에 추가:

```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && next export"
  }
}
```

### 리다이렉트 설정

`public/_redirects` 파일 생성:

```
/opensea  https://opensea.io/collection/amirealsia  301
/twitter  https://x.com/amirealsia  301
/instagram  https://instagram.com/amirealsia  301
```

---

## 🐛 문제 해결

### "Build failed" 오류

**원인:** Node.js 버전 불일치

**해결:**
1. Cloudflare Pages → **Settings** → **Environment variables**
2. 추가:
   ```
   NODE_VERSION = 22
   ```

### "Module not found" 오류

**원인:** 빌드 디렉토리 문제

**해결:**
Build command 수정:
```bash
cd landing && npm install && npm run build
```

### DNS가 적용되지 않음

**확인:**
```bash
# CMD에서 실행
nslookup amirealsia.com
```

**전파 확인:**
https://dnschecker.org/

### 페이지가 안 열림 (404)

**원인:** Output directory 잘못 설정

**해결:**
Build settings:
```
Build output directory: landing/.next
```

또는:
```
Build output directory: .next
Root directory: landing
```

---

## 📊 Cloudflare Pages 장점

✅ **무료:**
- 무제한 대역폭
- 무제한 요청
- 월 500회 빌드

✅ **빠름:**
- 전 세계 CDN
- 자동 캐싱
- Edge 네트워크

✅ **간편:**
- GitHub 자동 배포
- 자동 HTTPS
- 자동 프리뷰 배포

---

## 🎯 배포 후 체크리스트

- [ ] https://amirealsia.com 접속 확인
- [ ] HTTPS 작동 확인
- [ ] 모바일 반응형 확인
- [ ] SNS 링크 작동 확인
- [ ] 이메일 링크 확인 (`hello@amirealsia.com`)
- [ ] 메타 태그 확인 (Twitter/OG)
- [ ] 성능 테스트 (https://pagespeed.web.dev/)

---

## 🚀 다음 단계

1. **SEO 최적화**
   - Google Search Console 등록
   - Sitemap.xml 생성
   - robots.txt 설정

2. **분석 도구 추가**
   - Google Analytics
   - Cloudflare Web Analytics

3. **콘텐츠 업데이트**
   - NFT 갤러리 자동 연동
   - 블로그 섹션 추가
   - FAQ 섹션 추가

---

## 💡 추가 기능 아이디어

### 1️⃣ OpenSea API 연동

```typescript
// app/api/nfts/route.ts
export async function GET() {
  const res = await fetch('https://api.opensea.io/api/v2/collection/amirealsia/nfts');
  const data = await res.json();
  return Response.json(data);
}
```

### 2️⃣ 이미지 자동 갤러리

IPFS 또는 Cloudflare Images와 연동하여 자동 갤러리 표시

### 3️⃣ Contact Form

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Send email via Resend or SendGrid
}
```

---

## 📧 문의

배포 중 문제가 발생하면:
- Cloudflare Community: https://community.cloudflare.com/
- hello@amirealsia.com

---

**Made with 💖 for SIA - Now live on the web! 🌐**
