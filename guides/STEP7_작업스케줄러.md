# Step 7: Windows 작업 스케줄러 설정 가이드

## 📋 개요
Windows 작업 스케줄러를 사용하여 매일 정해진 시간에 자동화 스크립트를 실행합니다.

## 🎯 목표
- 매일 오전 9시 자동 실행 설정
- ComfyUI 서버 자동 시작
- 실행 실패 시 재시도
- 시스템 재시작 시에도 작동

---

## 1️⃣ ComfyUI 서버 자동 시작 배치 파일

### start_comfyui.bat 생성
`sia-automation/start_comfyui.bat`:

```batch
@echo off
REM ComfyUI 서버 자동 시작 스크립트

cd /d "D:\AI\ComfyUI"

REM 가상환경 활성화 (있는 경우)
REM call venv\Scripts\activate

REM ComfyUI 서버 시작
echo Starting ComfyUI Server...
python main.py --listen 0.0.0.0 --port 8188

pause
```

### 실행 권한 설정
- 파일을 우클릭 → **속성**
- **보안** 탭 → **편집** → 실행 권한 확인

---

## 2️⃣ 메인 자동화 배치 파일

### run_daily_automation.bat 생성
`sia-automation/run_daily_automation.bat`:

```batch
@echo off
REM Am I Real Sia - 일일 자동화 실행 스크립트

echo ========================================
echo Am I Real Sia - Daily Automation
echo ========================================
echo.

REM 작업 디렉토리 이동
cd /d "D:\AI\HelloSia\sia-automation"

REM 가상환경 활성화
echo Activating virtual environment...
call ..\venv\Scripts\activate

REM 실행 시작 시간 기록
echo Start Time: %date% %time%
echo.

REM Python 스크립트 실행
echo Running daily automation...
python scripts\daily_run.py

REM 종료 코드 확인
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS: Automation completed!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ERROR: Automation failed with code %ERRORLEVEL%
    echo ========================================
)

echo.
echo End Time: %date% %time%

REM 로그 파일에 실행 기록 추가
echo [%date% %time%] Automation completed with exit code %ERRORLEVEL% >> logs\scheduler.log

REM 10초 대기 후 창 닫기 (에러 확인용)
timeout /t 10

exit /b %ERRORLEVEL%
```

---

## 3️⃣ Windows 작업 스케줄러 설정

### 작업 생성 단계

#### Step 1: 작업 스케줄러 열기
1. Windows 검색창에 **"작업 스케줄러"** 입력
2. 또는 `Win + R` → `taskschd.msc` 입력 → 확인

#### Step 2: 기본 작업 만들기
1. 오른쪽 패널에서 **"기본 작업 만들기"** 클릭

#### Step 3: 작업 정보 입력
- **이름**: `AmIRealSia_DailyAutomation`
- **설명**: `매일 AI 아이돌 이미지 생성 및 NFT 자동 업로드`
- **다음** 클릭

#### Step 4: 트리거 설정
- **매일** 선택 → 다음
- **시작 날짜**: 오늘 날짜
- **시작 시간**: `09:00:00` (오전 9시)
- **다음** 클릭

#### Step 5: 동작 설정
- **프로그램 시작** 선택 → 다음
- **프로그램/스크립트**:
  ```
  D:\AI\HelloSia\sia-automation\run_daily_automation.bat
  ```
- **시작 위치 (선택사항)**:
  ```
  D:\AI\HelloSia\sia-automation
  ```
- **다음** 클릭

#### Step 6: 완료
- **마침** 클릭

---

## 4️⃣ 고급 설정 (권장)

### 작업 속성 수정
생성된 작업을 우클릭 → **속성** 클릭

#### 일반 탭
- ✅ **가장 높은 권한으로 실행** 체크
- ✅ **사용자가 로그온할 때만 실행** 선택 (또는 "로그온 여부에 관계없이 실행")

#### 트리거 탭
- 트리거 더블클릭 → **고급 설정**
- ✅ **작업 반복 간격**: (체크 해제)
- ✅ **활성화됨** 체크

#### 조건 탭
- ❌ **컴퓨터의 AC 전원이 켜져 있을 때만 시작** 체크 해제
- ✅ **작업을 실행하기 위해 절전 모드 종료** 체크
- ❌ **네트워크 연결 시에만** 체크 해제 (또는 필요한 네트워크 선택)

#### 설정 탭
- ✅ **요청 시 작업 실행 허용** 체크
- ✅ **예약된 시작 시간을 놓친 경우 가능한 빨리 작업 시작** 체크
- ✅ **작업 실패 시**: **1시간마다 다시 시작** (최대 3회)
- **작업이 실행 중인 경우**: **새 인스턴스를 시작하지 않음** 선택

---

## 5️⃣ ComfyUI 자동 시작 작업 추가

### 별도 작업 생성
ComfyUI 서버를 자동화 스크립트보다 먼저 시작

#### 작업 정보
- **이름**: `AmIRealSia_StartComfyUI`
- **설명**: `ComfyUI 서버 자동 시작`

#### 트리거
- **매일** `08:55:00` (메인 작업보다 5분 먼저)

#### 동작
- **프로그램/스크립트**:
  ```
  D:\AI\HelloSia\sia-automation\start_comfyui.bat
  ```

#### 설정
- 창을 최소화하여 백그라운드 실행

---

## 6️⃣ 테스트 실행

### 수동 실행 테스트
1. 작업 스케줄러에서 작업 선택
2. 오른쪽 패널에서 **"실행"** 클릭
3. 배치 파일 창이 열리며 실행됨
4. 로그 확인:
```bash
type D:\AI\HelloSia\sia-automation\logs\scheduler.log
```

### 예약 실행 확인
1. 작업 스케줄러 → **작업 스케줄러 라이브러리**
2. 목록에서 작업 확인
3. **다음 실행 시간** 열 확인

---

## 7️⃣ 문제 해결

### 작업이 실행되지 않는 경우

#### 체크리스트
- [ ] 배치 파일 경로가 정확한가?
- [ ] Python 가상환경이 활성화되는가?
- [ ] ComfyUI 서버가 실행 중인가?
- [ ] API 키들이 .env에 설정되어 있는가?
- [ ] Windows 계정 비밀번호가 설정되어 있는가?

#### 로그 확인
```bash
# 스케줄러 로그
type D:\AI\HelloSia\sia-automation\logs\scheduler.log

# 일일 실행 로그
type D:\AI\HelloSia\sia-automation\logs\daily_run_2025-01-15.log
```

#### 이벤트 뷰어 확인
1. `Win + R` → `eventvwr.msc`
2. **Windows 로그** → **응용 프로그램**
3. 작업 스케줄러 관련 오류 검색

---

## 8️⃣ 백업 및 모니터링

### 자동 백업 스크립트

#### backup_results.bat 생성
```batch
@echo off
REM 실행 결과 백업 스크립트

set SOURCE=D:\AI\HelloSia\sia-automation\export
set BACKUP=D:\Backup\AmIRealSia\%date:~0,4%%date:~5,2%%date:~8,2%

echo Backing up to %BACKUP%...

xcopy "%SOURCE%" "%BACKUP%" /E /I /Y

echo Backup completed!
```

### 주간 백업 작업 생성
- 작업 이름: `AmIRealSia_WeeklyBackup`
- 트리거: 매주 일요일 23:00
- 동작: backup_results.bat 실행

---

## 9️⃣ 시스템 재시작 시 자동 실행

### 시작 프로그램에 추가 (선택)

#### ComfyUI 자동 시작
1. `Win + R` → `shell:startup`
2. `start_comfyui.bat`의 바로가기 생성
3. 바로가기를 startup 폴더에 복사

---

## 🔟 최종 작업 목록

### 작업 스케줄러에 생성된 작업들

| 작업 이름 | 실행 시간 | 설명 |
|----------|----------|------|
| AmIRealSia_StartComfyUI | 매일 08:55 | ComfyUI 서버 시작 |
| AmIRealSia_DailyAutomation | 매일 09:00 | 메인 자동화 실행 |
| AmIRealSia_WeeklyBackup | 매주 일요일 23:00 | 결과 백업 |

---

## ✅ 최종 체크리스트

- [ ] start_comfyui.bat 생성
- [ ] run_daily_automation.bat 생성
- [ ] ComfyUI 서버 자동 시작 작업 생성
- [ ] 메인 자동화 작업 생성
- [ ] 고급 설정 완료
- [ ] 수동 실행 테스트 성공
- [ ] 로그 확인
- [ ] 첫 자동 실행 대기 및 확인

---

## 🎉 완료!

모든 설정이 완료되었습니다!

이제 매일 오전 9시에 자동으로:
1. ✅ 이미지가 생성되고
2. ✅ NFT가 민팅되고
3. ✅ SNS에 포스팅됩니다

### 일일 점검 사항
- 아침에 로그 확인
- OpenSea 컬렉션 확인
- SNS 포스트 확인

### 주간 점검 사항
- 로그 파일 정리
- API 키 사용량 확인
- Crossmint 무료 한도 확인 (월 100회)

---

## 📞 문제 발생 시

1. **로그 확인**: `logs/daily_run_날짜.log`
2. **결과 확인**: `logs/results/result_날짜.json`
3. **Discord 알림 확인** (설정한 경우)

[← 이전으로 돌아가기](./STEP6_통합_자동화.md)
