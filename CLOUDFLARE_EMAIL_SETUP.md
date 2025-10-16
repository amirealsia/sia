# 📧 Cloudflare Email Routing 설정 가이드

amirealsia.com 도메인으로 이메일을 받을 수 있도록 설정합니다.

**목표:** `hello@amirealsia.com` → `amirealsia@gmail.com`으로 자동 전달

---

## 🚀 Step 1: Cloudflare 대시보드 접속

1. https://dash.cloudflare.com 접속
2. **amirealsia.com** 도메인 선택

---

## 📧 Step 2: Email Routing 설정

### 1️⃣ Email Routing 활성화

1. 왼쪽 메뉴에서 **Email** 클릭
2. **Email Routing** 선택
3. **Get started** 또는 **Enable Email Routing** 클릭

### 2️⃣ 목적지 이메일 추가

1. **Destination addresses** 섹션
2. **Add destination address** 클릭
3. 입력:
   ```
   Email: amirealsia@gmail.com
   ```
4. **Send verification email** 클릭
5. **Gmail에서 확인 메일 확인** → 링크 클릭하여 인증

### 3️⃣ 라우팅 규칙 생성

1. **Routing rules** 섹션
2. **Create address** 클릭
3. 설정:
   ```
   Custom address: hello
   Action: Send to an email
   Destination: amirealsia@gmail.com
   ```
4. **Save** 클릭

### 4️⃣ DNS 레코드 자동 설정

Cloudflare가 자동으로 다음 DNS 레코드를 추가합니다:
```
MX    @    mx.cloudflare.net (Priority: 0)
TXT   @    v=spf1 include:_spf.mx.cloudflare.net ~all
```

**확인:**
- **DNS** 탭으로 이동
- MX 레코드가 추가되었는지 확인

---

## ✅ Step 3: 테스트

### 테스트 이메일 보내기

1. 다른 이메일 계정에서 `hello@amirealsia.com`으로 이메일 보내기
2. `amirealsia@gmail.com`에서 수신 확인

### 문제 해결

❌ **이메일이 안 오는 경우:**

1. **DNS 전파 확인** (최대 24시간 소요)
   ```
   https://dnschecker.org/
   도메인: amirealsia.com
   타입: MX
   ```

2. **Cloudflare Email Routing 상태 확인**
   - Email Routing 대시보드에서 **Status: Active** 확인

3. **Gmail 스팸함 확인**

---

## 📤 Step 4: Gmail에서 hello@amirealsia.com으로 보내기

받은 메일에 답장할 때 `hello@amirealsia.com` 주소로 보내고 싶다면:

### Gmail 설정

1. Gmail 접속 → **설정** (톱니바퀴) → **모든 설정 보기**
2. **계정 및 가져오기** 탭
3. **다른 주소에서 메일 보내기** 섹션
4. **다른 이메일 주소 추가** 클릭
5. 입력:
   ```
   이름: SIA (Am I Real Sia)
   이메일 주소: hello@amirealsia.com
   ```
6. **다음 단계**
7. SMTP 서버 설정:
   ```
   SMTP 서버: smtp.gmail.com
   포트: 587
   사용자 이름: amirealsia@gmail.com
   비밀번호: (Gmail 앱 비밀번호 생성 필요)
   TLS 사용
   ```

### Gmail 앱 비밀번호 생성

1. Google 계정 관리 → **보안**
2. **2단계 인증** 활성화 (필수)
3. **앱 비밀번호** 검색
4. 앱 선택: **메일**
5. 기기 선택: **Windows 컴퓨터**
6. **생성** → 16자리 비밀번호 복사
7. Gmail 설정에서 해당 비밀번호 입력

---

## 🎯 완료 후 사용 가능한 이메일

### 수신 (Cloudflare Email Routing)
- ✅ `hello@amirealsia.com` → `amirealsia@gmail.com`

### 발신 (Gmail에서)
- ✅ `amirealsia@gmail.com`에서 로그인
- ✅ 발신 주소를 `hello@amirealsia.com`으로 선택 가능

---

## 📋 추가 이메일 주소 만들기

### info@amirealsia.com 추가

1. Cloudflare Email Routing → **Create address**
2. Custom address: `info`
3. Destination: `amirealsia@gmail.com`
4. **Save**

### 와일드카드 설정 (모든 이메일 받기)

```
Custom address: *
Destination: amirealsia@gmail.com
```

이렇게 하면:
- `contact@amirealsia.com` ✅
- `support@amirealsia.com` ✅
- `anything@amirealsia.com` ✅

모두 `amirealsia@gmail.com`으로 전달됩니다.

---

## 🔐 보안 설정 (권장)

### SPF, DKIM, DMARC 설정

Cloudflare가 자동으로 SPF를 설정하지만, 추가 보안을 위해:

#### DMARC 레코드 추가

1. Cloudflare → **DNS** → **Add record**
2. 설정:
   ```
   Type: TXT
   Name: _dmarc
   Content: v=DMARC1; p=quarantine; rua=mailto:hello@amirealsia.com
   ```
3. **Save**

---

## 📊 Email Routing 대시보드

Cloudflare Email Routing 대시보드에서 확인 가능:
- 📧 받은 이메일 수
- 📈 전달 통계
- ⚠️ 차단된 스팸
- 📋 라우팅 규칙

---

## 💡 활용 아이디어

### 프로젝트별 이메일

```
nft@amirealsia.com      → NFT 관련 문의
collab@amirealsia.com   → 협업 제안
press@amirealsia.com    → 언론 문의
```

모두 하나의 Gmail로 받고, Gmail 라벨로 자동 분류!

### Gmail 필터 설정

1. Gmail에서 **설정** → **필터 및 차단된 주소**
2. **새 필터 만들기**
3. 조건:
   ```
   To: hello@amirealsia.com
   ```
4. 작업:
   - 라벨 적용: **Am I Real Sia - General**
   - 스팸으로 보내지 않기

---

## ✅ 최종 체크리스트

- [ ] Cloudflare Email Routing 활성화
- [ ] `hello@amirealsia.com` 라우팅 규칙 생성
- [ ] `amirealsia@gmail.com` 인증 완료
- [ ] DNS MX 레코드 확인
- [ ] 테스트 이메일 발송 및 수신 확인
- [ ] Gmail에서 발신 주소 설정 (선택)
- [ ] 추가 이메일 주소 생성 (선택)
- [ ] DMARC 레코드 추가 (선택)

---

## 🎉 완료!

이제 `hello@amirealsia.com`으로 이메일을 받을 수 있습니다!

**테스트:**
```
다른 이메일에서 hello@amirealsia.com으로 메일 보내기
→ amirealsia@gmail.com에서 수신 확인 ✅
```

---

**Made with 💖 for SIA**
