# 🌐 DNS 설정 빠른 가이드

현재 Cloudflare DNS 상태를 보고 랜딩페이지를 연결하는 방법입니다.

---

## ✅ 현재 상태

### 이미 설정됨
- ✅ **이메일 라우팅**: MX 레코드 3개 (자동 설정됨)
- ✅ **SPF 레코드**: 이메일 인증
- ✅ **DKIM 레코드**: 이메일 보안
- ✅ **네임서버**:
  - `monroe.ns.cloudflare.com`
  - `simon.ns.cloudflare.com`

### 추가 필요
- ⏳ **A/AAAA 레코드**: 루트 도메인 (amirealsia.com)
- ⏳ **CNAME 레코드**: www 서브도메인 (www.amirealsia.com)

---

## 🚀 방법 1: Cloudflare Pages 배포 (추천)

Cloudflare Pages를 사용하면 DNS가 **자동으로** 설정됩니다!

### Step 1: Cloudflare Pages 프로젝트 생성

1. Cloudflare 대시보드 → **Pages** 클릭
2. **Create a project** → **Connect to Git**
3. GitHub 저장소 선택: `amirealsia/sia`
4. 빌드 설정:
   ```
   Project name: amirealsia
   Production branch: main

   Build command: cd landing && npm run build
   Build output directory: landing/.next
   Root directory: /

   Environment variables:
   NODE_VERSION = 22
   ```
5. **Save and Deploy** 클릭

### Step 2: 커스텀 도메인 추가

1. 배포 완료 후 → **Custom domains** 탭
2. **Set up a custom domain** 클릭
3. 도메인 입력: `amirealsia.com`
4. **Continue** 클릭
5. Cloudflare가 **자동으로 DNS 레코드 추가**:
   ```
   Type: CNAME
   Name: @
   Content: amirealsia.pages.dev
   Proxy: ✅ Proxied
   ```

6. `www.amirealsia.com`도 추가:
   - **Set up a custom domain** 다시 클릭
   - 도메인: `www.amirealsia.com`
   - 자동 DNS 추가됨

---

## 🎯 방법 2: 수동 DNS 설정 (Pages 없이)

Pages를 사용하지 않고 다른 호스팅을 사용한다면:

### 1️⃣ A 레코드 추가 (루트 도메인)

Cloudflare DNS 페이지에서:

**레코드 추가** 클릭:
```
Type: A
Name: @
IPv4 address: [호스팅 서버 IP]
Proxy status: ✅ Proxied (추천)
TTL: Auto
```

**또는** CNAME으로:
```
Type: CNAME
Name: @
Target: your-hosting.example.com
Proxy status: ✅ Proxied
TTL: Auto
```

### 2️⃣ CNAME 레코드 추가 (www)

```
Type: CNAME
Name: www
Target: @
Proxy status: ✅ Proxied
TTL: Auto
```

또는:
```
Type: CNAME
Name: www
Target: amirealsia.com
```

---

## 💡 추천 설정

### DNS 레코드 최종 상태 (Pages 사용 시)

```
Type    Name    Content                      Proxy    TTL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CNAME   @       amirealsia.pages.dev         ✅       Auto
CNAME   www     amirealsia.pages.dev         ✅       Auto
MX      @       route1.mx.cloudflare.net     DNS only Auto
MX      @       route2.mx.cloudflare.net     DNS only Auto
MX      @       route3.mx.cloudflare.net     DNS only Auto
TXT     @       v=spf1 include:_spf...       DNS only Auto
TXT     cf2024-1._domainkey  v=DKIM1...      DNS only Auto
```

---

## ⚡ 빠른 실행 (Pages 추천)

### 지금 바로:

1. **Cloudflare Pages 탭 열기**
   ```
   https://dash.cloudflare.com/?to=/:account/pages
   ```

2. **Create a project** 클릭

3. **Connect to Git** → GitHub 선택

4. **저장소 선택**: `amirealsia/sia`

5. **빌드 설정**:
   ```bash
   cd landing && npm run build
   ```

6. **Deploy** 클릭 → 자동 배포 시작!

7. **Custom domains** → `amirealsia.com` 추가

8. **완료!** DNS 자동 설정됨

---

## 🔍 확인 방법

### DNS 전파 확인

```
https://dnschecker.org/

도메인: amirealsia.com
타입: A 또는 CNAME
```

### 사이트 접속 확인

```
https://amirealsia.com
https://www.amirealsia.com
```

### SSL 인증서 확인

Cloudflare가 자동으로 HTTPS 인증서 발급 (무료)
- 최대 15분 소요
- 자동 갱신

---

## ⚠️ 주의사항

### Proxy Status

**추천: Proxied (주황색 구름)**
- ✅ CDN 가속
- ✅ DDoS 보호
- ✅ SSL/TLS
- ✅ 캐싱

**DNS only (회색 구름)**
- 이메일(MX) 레코드는 DNS only 유지
- 웹사이트는 Proxied 사용

### 이메일 설정 유지

**절대 삭제하지 마세요:**
- ❌ MX 레코드 3개
- ❌ SPF TXT 레코드
- ❌ DKIM TXT 레코드

---

## 🎯 타임라인

### 즉시 (0분)
- Cloudflare Pages 프로젝트 생성
- GitHub 연결
- 첫 배포 시작 (2-3분)

### 5분 후
- 배포 완료
- `xxx.pages.dev` URL 생성
- 사이트 접속 가능

### 10분 후
- 커스텀 도메인 추가
- DNS 자동 설정
- `amirealsia.com` 접속 가능

### 15분 후
- SSL 인증서 발급 완료
- HTTPS 작동
- 완전히 작동!

---

## 📊 이후 자동 배포

GitHub에 푸시하면:
```bash
git push
```

→ **자동으로 Cloudflare Pages 재배포!**

배포 상태 확인:
```
Cloudflare Pages → Deployments 탭
```

---

## 🛠️ VS Code에서 빠른 접근

이미 설정된 단축키:

```
Ctrl + Shift + C
```
→ Cloudflare 대시보드 자동 열림!

---

## ✅ 체크리스트

- [ ] Cloudflare Pages 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] 빌드 설정 완료
- [ ] 첫 배포 완료
- [ ] `amirealsia.com` 커스텀 도메인 추가
- [ ] `www.amirealsia.com` 추가
- [ ] DNS 레코드 자동 생성 확인
- [ ] 사이트 접속 확인
- [ ] HTTPS 작동 확인
- [ ] 이메일 작동 확인 (`hello@amirealsia.com`)

---

## 🎉 완료 후

### 확인할 것:
1. https://amirealsia.com ✅
2. https://www.amirealsia.com ✅
3. 이메일 수신: `hello@amirealsia.com` ✅

### 다음 단계:
1. SNS 프로필 업데이트
2. OpenSea 컬렉션 링크 추가
3. Google Analytics 연결
4. SEO 최적화

---

**이제 시작하세요! Ctrl + Shift + C로 Cloudflare 열기! 🚀**
