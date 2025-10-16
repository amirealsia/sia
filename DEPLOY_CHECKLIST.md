# ✅ 배포 체크리스트

amirealsia.com 랜딩페이지 배포를 위한 단계별 체크리스트입니다.

---

## 🎯 빠른 시작 (VS Code 단축키)

| 단축키 | 기능 |
|--------|------|
| `Ctrl + Shift + C` | Cloudflare 대시보드 열기 |
| `Ctrl + Shift + P`, `P` | Cloudflare Pages 직접 열기 |
| `Ctrl + Shift + L` | 로컬 랜딩페이지 열기 |
| `Ctrl + Shift + G` | Git 상태 확인 및 배포 준비 |

---

## 📋 배포 순서

### 1️⃣ 로컬 확인 (완료 ✅)

- [x] Next.js 랜딩페이지 개발 완료
- [x] 로컬 개발 서버 실행 중 (`http://localhost:3000`)
- [x] 디자인 및 콘텐츠 확인 완료
- [x] SEO 메타데이터 설정 완료
- [x] 모든 링크 작동 확인

### 2️⃣ GitHub 동기화 (완료 ✅)

- [x] landing 폴더 Git에 추가
- [x] 커밋 완료
- [x] GitHub에 푸시 완료
- [x] DNS 가이드 문서 추가 완료

### 3️⃣ Cloudflare Pages 배포 (진행 중 ⏳)

**VS Code에서 빠르게 열기:**
```
Ctrl + Shift + P, P
```

또는 수동으로:
1. https://dash.cloudflare.com/?to=/:account/pages
2. **Create a project** 클릭
3. **Connect to Git** → GitHub 선택
4. 저장소: `amirealsia/sia` 선택
5. **Begin setup** 클릭

### 4️⃣ 빌드 설정

```
Project name: amirealsia
Production branch: main

Framework preset: Next.js
Build command: cd landing && npm run build
Build output directory: landing/.next
Root directory: /

Environment variables:
  NODE_VERSION = 22
```

### 5️⃣ 첫 배포 (약 2-3분)

- [ ] **Save and Deploy** 클릭
- [ ] 배포 진행 상황 확인
- [ ] 배포 완료 대기
- [ ] `xxx.pages.dev` URL 생성 확인

### 6️⃣ 커스텀 도메인 연결

- [ ] **Custom domains** 탭 클릭
- [ ] **Set up a custom domain** 클릭
- [ ] 도메인 입력: `amirealsia.com`
- [ ] **Continue** 클릭
- [ ] DNS 자동 설정 확인 (CNAME 레코드)

### 7️⃣ www 서브도메인 추가

- [ ] **Set up a custom domain** 다시 클릭
- [ ] 도메인: `www.amirealsia.com`
- [ ] **Continue** 클릭
- [ ] DNS 자동 설정 확인

### 8️⃣ 최종 확인 (15분 후)

- [ ] https://amirealsia.com 접속 확인
- [ ] https://www.amirealsia.com 접속 확인
- [ ] HTTPS 작동 확인 (자동 SSL)
- [ ] 모바일 반응형 확인
- [ ] SNS 링크 작동 확인:
  - [ ] OpenSea 링크
  - [ ] Instagram 링크
  - [ ] X (Twitter) 링크
  - [ ] Bluesky 링크
- [ ] 이메일 링크 확인: `hello@amirealsia.com`

---

## 🔍 DNS 상태 확인

### 현재 DNS (Cloudflare)

✅ **이미 설정됨:**
- MX 레코드 3개 (이메일 라우팅)
- SPF 레코드 (이메일 인증)
- DKIM 레코드 (이메일 보안)
- 네임서버: `monroe.ns.cloudflare.com`, `simon.ns.cloudflare.com`

⏳ **Pages 배포 시 자동 추가됨:**
- CNAME `@` → `amirealsia.pages.dev`
- CNAME `www` → `amirealsia.pages.dev`

### DNS 전파 확인

```
https://dnschecker.org/
도메인: amirealsia.com
타입: CNAME
```

---

## ⚠️ 주의사항

### 이메일 레코드 보호

**절대 삭제하지 마세요:**
- ❌ MX 레코드 3개 (이메일 수신용)
- ❌ SPF TXT 레코드 (이메일 인증)
- ❌ DKIM TXT 레코드 (이메일 보안)

이 레코드들은 `hello@amirealsia.com` 이메일이 작동하는 데 필요합니다!

### Proxy Status

**웹사이트 레코드 (CNAME):**
- ✅ Proxied (주황색 구름) - CDN, DDoS 보호, SSL 포함

**이메일 레코드 (MX, TXT):**
- ✅ DNS only (회색 구름) - 이미 올바르게 설정됨

---

## 🚀 이후 자동 배포

이제부터는 코드를 수정하고 GitHub에 푸시하면:

```bash
git add .
git commit -m "Update landing page"
git push
```

→ **Cloudflare Pages가 자동으로 재배포!**

### VS Code에서 빠른 푸시

```
Ctrl + Shift + G
```

---

## 📊 타임라인

| 시간 | 단계 | 상태 |
|------|------|------|
| 0분 | GitHub 푸시 완료 | ✅ |
| 0분 | Cloudflare Pages 프로젝트 생성 | ⏳ |
| 2-3분 | 첫 배포 완료 | ⏳ |
| 5분 | `xxx.pages.dev` 접속 가능 | ⏳ |
| 10분 | 커스텀 도메인 연결 | ⏳ |
| 15분 | SSL 인증서 발급 완료 | ⏳ |
| 15분+ | **https://amirealsia.com 작동!** | ⏳ |

---

## 🎉 배포 완료 후

### 확인할 것

1. ✅ https://amirealsia.com
2. ✅ https://www.amirealsia.com
3. ✅ 이메일 수신: `hello@amirealsia.com`
4. ✅ 자동 배포 작동 (Git push 테스트)

### 다음 단계

1. **SEO 최적화**
   - Google Search Console 등록
   - Sitemap 제출
   - robots.txt 확인

2. **분석 도구**
   - Google Analytics 연결
   - Cloudflare Web Analytics 활성화

3. **SNS 업데이트**
   - Instagram 프로필에 웹사이트 링크
   - X (Twitter) 프로필 업데이트
   - Bluesky 프로필 업데이트

4. **콘텐츠 업데이트**
   - NFT 이미지 추가 (첫 작품 완성 후)
   - 블로그 섹션 추가
   - FAQ 섹션 추가

---

## 🆘 문제 해결

### 빌드 실패

**증상:** "Build failed" 오류

**해결:**
1. Cloudflare Pages → Settings → Environment variables
2. 추가: `NODE_VERSION = 22`
3. **Retry deployment**

### DNS가 작동하지 않음

**증상:** 도메인 접속 시 "DNS not found" 또는 "This site can't be reached"

**해결:**
1. DNS 전파 대기 (최대 24시간)
2. https://dnschecker.org/ 에서 확인
3. Cloudflare DNS 탭에서 CNAME 레코드 확인

### 페이지가 404 오류

**증상:** 도메인 접속 시 404 페이지

**해결:**
1. Build output directory 확인: `landing/.next`
2. Build command 확인: `cd landing && npm run build`
3. 재배포 시도

### SSL 인증서 오류

**증상:** "Your connection is not private" 또는 "NET::ERR_CERT_COMMON_NAME_INVALID"

**해결:**
1. 15분 대기 (자동 발급 시간)
2. Cloudflare SSL/TLS 탭 → Full 모드 확인
3. 브라우저 캐시 삭제 후 재접속

---

## 📞 지원

### 문서 참고

- [DNS_SETUP_QUICK.md](DNS_SETUP_QUICK.md) - DNS 상세 가이드
- [CLOUDFLARE_PAGES_SETUP.md](CLOUDFLARE_PAGES_SETUP.md) - Pages 배포 상세 가이드
- [CLOUDFLARE_EMAIL_SETUP.md](CLOUDFLARE_EMAIL_SETUP.md) - 이메일 설정 가이드
- [VSCODE_AUTOMATION.md](VSCODE_AUTOMATION.md) - VS Code 자동화 가이드

### 커뮤니티

- Cloudflare Community: https://community.cloudflare.com/
- GitHub Issues: https://github.com/amirealsia/sia/issues

---

**지금 시작하세요!**

```
Ctrl + Shift + P, P
```

→ Cloudflare Pages 바로 열기! 🚀
