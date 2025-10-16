# Step 2: ComfyUI 이미지 생성 가이드

## 📋 개요
매일 일관된 얼굴의 실사풍 한국 아이돌 이미지를 생성하는 ComfyUI 워크플로우를 구축합니다.

## 🎯 목표
- 얼굴 일관성을 유지하는 레퍼런스 이미지 준비
- IPAdapter + ControlNet 워크플로우 구성
- 매일 다른 스타일/의상/배경 자동 적용
- Python 스크립트로 워크플로우 자동 실행

---

## 1️⃣ 레퍼런스 이미지 준비

### 기준 얼굴 이미지 생성 (3-5장)
ComfyUI에서 먼저 "SIA"의 기준 얼굴을 생성합니다.

#### 프롬프트 예시
```
a beautiful korean girl in her early 20s, K-pop idol style,
natural makeup, soft smile, looking at camera,
clean face portrait, photorealistic, 85mm lens,
soft studio lighting, flux style, high detail
```

#### 네거티브 프롬프트 (🛡️ 안전 필터 적용)
```
nsfw, nude, naked, sexual, porn, explicit, erotic, revealing clothes,
cleavage, underwear, lingerie, provocative, suggestive,
lowres, bad anatomy, bad hands, text, error, missing fingers,
extra digit, fewer digits, cropped, worst quality, low quality,
normal quality, jpeg artifacts, signature, watermark, username, blur,
violence, gore, blood, weapon, disturbing, horror
```

> **중요**: 모든 부적절한 컨텐츠(성적, 폭력적, 혐오적)를 차단하기 위해 강화된 네거티브 프롬프트를 사용합니다.

#### 생성 설정
- **해상도**: 1024×1024 (정사각형 얼굴 중심)
- **Sampler**: DPM++ 2M SDE Karras
- **Steps**: 28-30
- **CFG Scale**: 5.5-6.5
- **시드**: 고정 (예: 1234567890)

### 저장 위치
생성된 이미지 3-5장을 선택하여 저장:
```
sia-automation/refs/
├─ sia_ref_01.png
├─ sia_ref_02.png
├─ sia_ref_03.png
├─ sia_ref_04.png
└─ sia_ref_05.png
```

---

## 2️⃣ 포즈 레퍼런스 준비

### OpenPose 이미지 수집
다양한 포즈 이미지를 준비합니다 (셀카, 반신, 전신 등):

```
sia-automation/poses/
├─ pose_selfie_01.png       # 셀카 포즈
├─ pose_selfie_02.png       # 다른 각도 셀카
├─ pose_halfbody_01.png     # 상반신
├─ pose_sitting_01.png      # 앉은 포즈
└─ pose_standing_01.png     # 서 있는 포즈
```

### 포즈 이미지 생성 방법
1. 인터넷에서 포즈 참고 이미지 수집
2. ComfyUI의 **ControlNet Preprocessor**로 OpenPose 추출
3. 또는 https://openposeai.com/ 같은 사이트 이용

---

## 3️⃣ 테마/의상 프리셋 생성

### prompts.json 파일 생성
`sia-automation/prompts/prompts.json` 파일 생성:

```json
{
  "outfits": [
    "casual white t-shirt and jeans",
    "black turtleneck sweater",
    "pastel pink hoodie",
    "modern hanbok style dress",
    "light blue denim jacket",
    "oversized gray cardigan",
    "simple white blouse",
    "cozy beige knit sweater"
  ],
  "backgrounds": [
    "clean studio backdrop with soft lighting",
    "cozy cafe interior with window light",
    "modern bedroom with natural daylight",
    "seoul street evening bokeh lights",
    "minimalist white room",
    "warm library setting",
    "dance practice room with mirrors",
    "outdoor park with sunset glow"
  ],
  "moods": [
    "soft smile, gentle eyes",
    "calm and peaceful expression",
    "slightly tired but content",
    "bright and energetic",
    "thoughtful and introspective",
    "warm and friendly",
    "confident and relaxed"
  ]
}
```

---

## 4️⃣ ComfyUI 워크플로우 구성

### 필요한 노드 구성

#### 기본 구조
```
[Load Checkpoint] → [CLIP Text Encode (Positive)]
                  → [CLIP Text Encode (Negative)]
                  → [IPAdapter] → [KSampler] → [VAE Decode]
                  → [ControlNet]              → [Save Image]
```

### IPAdapter 노드 설정
- **Model**: ip-adapter_sd15.bin 또는 SDXL용
- **Weight**: 0.75-0.85 (얼굴 일관성 유지)
- **Ref Images**: refs/ 폴더의 이미지들

### ControlNet 노드 설정
- **Model**: control_v11p_sd15_openpose
- **Weight**: 0.7-0.8
- **Pose Image**: poses/ 폴더에서 랜덤 선택

### KSampler 설정
- **Steps**: 28
- **CFG**: 5.5
- **Sampler**: dpmpp_2m_sde_karras
- **Scheduler**: karras
- **Denoise**: 1.0

---

## 5️⃣ Python 자동화 스크립트 작성

### comfy_call.py 생성
`sia-automation/scripts/comfy_call.py`:

```python
import json
import requests
import random
import time
from pathlib import Path

COMFY_URL = "http://127.0.0.1:8188"
BASE_DIR = Path(__file__).resolve().parents[1]

def load_workflow(workflow_path):
    """워크플로우 JSON 파일 로드"""
    with open(workflow_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_prompts():
    """프롬프트 프리셋 로드"""
    prompts_path = BASE_DIR / "prompts" / "prompts.json"
    with open(prompts_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_random_refs():
    """랜덤 레퍼런스 이미지 선택"""
    refs_dir = BASE_DIR / "refs"
    refs = list(refs_dir.glob("*.png"))
    return random.sample(refs, min(3, len(refs)))

def get_random_pose():
    """랜덤 포즈 이미지 선택"""
    poses_dir = BASE_DIR / "poses"
    poses = list(poses_dir.glob("*.png"))
    return random.choice(poses) if poses else None

def generate_daily_prompt():
    """매일 다른 프롬프트 생성 (🛡️ 안전 필터 적용)"""
    prompts = load_prompts()

    outfit = random.choice(prompts["outfits"])
    background = random.choice(prompts["backgrounds"])
    mood = random.choice(prompts["moods"])

    prompt = f"""
    a beautiful korean girl in her early 20s, K-pop idol style,
    {outfit}, {mood}, {background},
    taking a selfie with iPhone 15 pro,
    photorealistic, 85mm portrait, cinematic lighting,
    realistic skin texture, soft focus, flux style, high quality
    """

    # 🛡️ 강화된 안전 네거티브 프롬프트
    negative = """
    nsfw, nude, naked, sexual, porn, pornographic, xxx, adult content,
    explicit, erotic, provocative, suggestive, revealing clothes,
    cleavage, underwear, lingerie, bikini, swimsuit,
    violence, gore, blood, injury, weapon, gun, knife,
    hate, offensive, disturbing, shocking, inappropriate,
    lowres, bad anatomy, bad hands, text, error, missing fingers,
    cropped, worst quality, low quality, jpeg artifacts,
    signature, watermark, blur, doll-like, plastic skin, uncanny
    """

    return {
        "prompt": prompt.strip(),
        "negative": negative.strip(),
        "outfit": outfit,
        "background": background,
        "mood": mood
    }

def submit_workflow(workflow, params):
    """ComfyUI에 워크플로우 제출"""
    # 워크플로우의 특정 노드에 파라미터 주입
    # (실제 노드 ID는 워크플로우 JSON 구조에 맞게 수정 필요)

    workflow["6"]["inputs"]["text"] = params["prompt"]  # Positive CLIP
    workflow["7"]["inputs"]["text"] = params["negative"]  # Negative CLIP

    # ComfyUI API 호출
    response = requests.post(
        f"{COMFY_URL}/prompt",
        json={"prompt": workflow}
    )

    if response.status_code == 200:
        prompt_id = response.json()["prompt_id"]
        print(f"✅ 워크플로우 제출 성공: {prompt_id}")
        return prompt_id
    else:
        print(f"❌ 워크플로우 제출 실패: {response.text}")
        return None

def wait_for_completion(prompt_id, timeout=600):
    """워크플로우 완료 대기"""
    start_time = time.time()

    while time.time() - start_time < timeout:
        response = requests.get(f"{COMFY_URL}/history/{prompt_id}")

        if response.status_code == 200:
            history = response.json()
            if prompt_id in history:
                print("✅ 이미지 생성 완료!")
                return True

        time.sleep(5)

    print("⏰ 타임아웃: 이미지 생성 시간 초과")
    return False

def generate_image():
    """메인 이미지 생성 함수"""
    print("🎨 이미지 생성 시작...")

    # 워크플로우 로드
    workflow_path = BASE_DIR / "comfyui_workflows" / "sia_workflow.json"
    workflow = load_workflow(workflow_path)

    # 프롬프트 생성
    params = generate_daily_prompt()
    print(f"📝 오늘의 테마:")
    print(f"   의상: {params['outfit']}")
    print(f"   배경: {params['background']}")
    print(f"   분위기: {params['mood']}")

    # 워크플로우 제출
    prompt_id = submit_workflow(workflow, params)

    if prompt_id:
        # 완료 대기
        if wait_for_completion(prompt_id):
            # 생성된 이미지 경로 반환
            output_dir = BASE_DIR / "out"
            latest_image = max(output_dir.glob("*.png"), key=lambda p: p.stat().st_mtime)
            return latest_image, params

    return None, None

if __name__ == "__main__":
    image_path, params = generate_image()
    if image_path:
        print(f"✅ 이미지 저장됨: {image_path}")
```

---

## 6️⃣ 테스트 실행

### ComfyUI 서버 실행
```bash
# ComfyUI 디렉토리에서
python main.py --listen 0.0.0.0 --port 8188
```

### 스크립트 테스트
```bash
# sia-automation 디렉토리에서
cd d:\AI\HelloSia\sia-automation
python scripts\comfy_call.py
```

### 확인 사항
- [ ] 이미지가 `out/` 폴더에 생성되는가?
- [ ] 얼굴이 일관되게 유지되는가?
- [ ] 의상/배경이 프롬프트대로 적용되는가?
- [ ] 🛡️ 부적절한 컨텐츠가 생성되지 않는가?
- [ ] 네거티브 프롬프트가 정상 작동하는가?

---

## ✅ 체크리스트

- [ ] 레퍼런스 이미지 3-5장 준비
- [ ] 포즈 이미지 5개 이상 준비
- [ ] prompts.json 파일 생성
- [ ] ComfyUI 워크플로우 구성
- [ ] comfy_call.py 스크립트 작성
- [ ] 테스트 실행 성공

---

## 🔜 다음 단계

이미지 생성이 성공하면 **Step 3: IPFS 업로드 및 메타데이터 생성**으로 진행하세요.

컨텐츠 안전 필터링에 대한 자세한 내용은 **Step 8: 컨텐츠 안전 필터**를 참조하세요.

[→ Step 3으로 이동](./STEP3_IPFS_업로드.md)
[🛡️ Step 8 (안전 필터) 보기](./STEP8_컨텐츠_안전필터.md)
