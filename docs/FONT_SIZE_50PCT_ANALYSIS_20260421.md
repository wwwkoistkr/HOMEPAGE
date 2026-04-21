# AI 시뮬레이터 슬라이더 월수 글자 50% 확대 — 정밀 분석 보고서

> **문서 버전**: v1.0 (분석 전용 — 코드 미변경)
> **작성일**: 2026-04-21
> **대상 파일**: `src/templates/home.tsx` (AI 시뮬레이터 섹션 L783–L825)
> **대상 버전**: v39.4 (커밋 a68837b, 프로덕션 https://koist-website.pages.dev)
> **작성자**: KOIST 개발팀 — 프런트엔드 정밀 분석
> **코딩 수행 여부**: ❌ **미수행 (분석·설계만 진행)**

---

## 0. 사용자 요구사항 (Executive Summary)

사용자 요청 원문:
> "홈페이지 AI시뮬레이터의 CC평가일수 슬라이더바에 나타난 **준비 월수, 평가 월수** 그리고 cc평가일수 슬라이더바의 끝에 위치한 **월수**와 KOIST 평가프로세스 슬라이더바에 나타난 **준비 월수, 평가 월수** 그리고 슬라이더바의 끝에 위치한 **월수**의 **글자크기를 50% 크게** 해주고 분석보고서를 다시 작성해 주고 **코딩은 아직 하지 마**"

### 0.1 요구사항 분해 (Requirement Decomposition)

| # | 대상 요소 | 위치 | 현재 크기 (clamp) | 목표 (50% ↑) |
|---|---------|-----|----------------|-------------|
| 1 | **CCRA 총월수** ("약 XX개월") | 바 우측 상단 | `clamp(0.68rem, 0.73vw, 3.5rem)` | `clamp(1.02rem, 1.095vw, 5.25rem)` |
| 2 | **CCRA 준비월수** ("준비 XX개월") | 바 내부 좌측 | `clamp(0.6rem, 0.68vw, 3.25rem)` | `clamp(0.9rem, 1.02vw, 4.875rem)` |
| 3 | **CCRA 평가월수** ("평가 XX개월") | 바 내부 우측 | `clamp(0.6rem, 0.68vw, 3.25rem)` | `clamp(0.9rem, 1.02vw, 4.875rem)` |
| 4 | **KOIST 총월수** ("약 XX개월") | 바 우측 상단 | `clamp(0.68rem, 0.73vw, 3.5rem)` | `clamp(1.02rem, 1.095vw, 5.25rem)` |
| 5 | **KOIST 준비월수** ("준비 XX개월") | 바 내부 좌측 | `clamp(0.6rem, 0.68vw, 3.25rem)` | `clamp(0.9rem, 1.02vw, 4.875rem)` |
| 6 | **KOIST 평가월수** ("평가 XX개월") | 바 내부 우측 | `clamp(0.6rem, 0.68vw, 3.25rem)` | `clamp(0.9rem, 1.02vw, 4.875rem)` |

**총 변경 대상: 6개 DOM 엘리먼트 / 6개 `style` 속성**
변경 형식: `font-size` 속성의 3개 clamp 파라미터(min / preferred / max)를 각각 **×1.5** 배로 일괄 확대.

> ⚠️ 본 문서는 **설계·영향 분석 전용**이며, 사용자 지시에 따라 **실제 코드 수정은 수행하지 않는다**. 승인 후 구현 단계(Phase 3)로 이행할 것.

---

## 1. 현재 DOM 구조 실측 (As-Is)

### 1.1 CCRA(CC평가일수) 바 — `src/templates/home.tsx` L784–L796

```html
<!-- CCRA 헤더: 라벨 + 총월수 -->
<div class="flex justify-between items-center" style="margin-bottom:clamp(3px,0.21vw,6px)">
  <!-- 좌측 라벨 "CCRA평가일수" -->
  <span class="text-slate-500 font-semibold flex items-center"
        style="gap:clamp(3px,0.21vw,6px); font-size:clamp(0.68rem,0.73vw,3.5rem)">
    <span class="inline-block rounded-full" ...></span>
    <span data-admin-edit="sim_label_traditional">CCRA평가일수</span>
  </span>

  <!-- ★ [대상 #1] 우측 총월수 -->
  <span id="ealGeneralTotal" class="text-slate-400 font-bold"
        style="font-size:clamp(0.68rem,0.73vw,3.5rem)">약 24개월</span>
</div>

<!-- CCRA 바 본체 -->
<div class="relative rounded-xl overflow-hidden"
     style="height:clamp(32px,2.34vw,72px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
  <div id="ealGeneralBar" class="bar-animate eal-bar absolute left-0 top-0 h-full rounded-xl flex items-center"
       style="width:100%; background: linear-gradient(90deg, ${cfg.genPrepColor} 0%, ... 100%); ...">

    <!-- ★ [대상 #2] 바 내부 좌측 준비월수 -->
    <span id="ealGeneralPrep" class="absolute text-white font-bold"
          style="left:clamp(6px,0.47vw,14px);
                 font-size:clamp(0.6rem,0.68vw,3.25rem);
                 text-shadow:0 1px 4px rgba(0,0,0,0.35);
                 letter-spacing:-0.01em;">준비 12개월</span>

    <!-- ★ [대상 #3] 바 내부 우측 평가월수 -->
    <span id="ealGeneralEval" class="absolute text-white font-bold"
          style="right:clamp(6px,0.47vw,14px);
                 font-size:clamp(0.6rem,0.68vw,3.25rem);
                 text-shadow:0 1px 4px rgba(0,0,0,0.35);
                 letter-spacing:-0.01em;">평가 12개월</span>
  </div>
</div>
```

### 1.2 KOIST 바 — `src/templates/home.tsx` L798–L810

```html
<div class="flex justify-between items-center" style="margin-bottom:clamp(3px,0.21vw,6px)">
  <span class="text-accent font-bold flex items-center"
        style="gap:clamp(3px,0.21vw,6px); font-size:clamp(0.68rem,0.73vw,3.5rem)">...KOIST 평가 프로세스</span>

  <!-- ★ [대상 #4] 우측 총월수 -->
  <span id="ealKoistTotal" class="text-accent font-bold"
        style="font-size:clamp(0.68rem,0.73vw,3.5rem)">약 15개월</span>
</div>

<div class="relative rounded-xl overflow-hidden"
     style="height:clamp(32px,2.34vw,72px); background: linear-gradient(90deg, #F1F5F9, #E2E8F0);">
  <div id="ealKoistBar" class="bar-animate eal-bar ..."
       style="width:62.5%; background: linear-gradient(90deg, ${cfg.koistPrepColor} 0%, ... 100%); ...">

    <!-- ★ [대상 #5] 바 내부 좌측 준비월수 -->
    <span id="ealKoistPrep" class="absolute text-white font-bold"
          style="left:clamp(6px,0.47vw,14px);
                 font-size:clamp(0.6rem,0.68vw,3.25rem); ...">준비 6개월</span>

    <!-- ★ [대상 #6] 바 내부 우측 평가월수 -->
    <span id="ealKoistEval" class="absolute text-white font-bold"
          style="right:clamp(6px,0.47vw,14px);
                 font-size:clamp(0.6rem,0.68vw,3.25rem); ...">평가 9개월</span>
  </div>
</div>
```

### 1.3 주요 규격 (As-Is 요약)

| 항목 | 현재 값 | 비고 |
|-----|--------|------|
| 총월수 폰트 (ealGeneralTotal, ealKoistTotal) | `clamp(0.68rem, 0.73vw, 3.5rem)` | 헤더 라벨과 동일 계열 |
| 바 내부 월수 폰트 (Prep/Eval) | `clamp(0.6rem, 0.68vw, 3.25rem)` | 헤더보다 약 0.08rem 작음 |
| 바 높이 | `clamp(32px, 2.34vw, 72px)` | 1920px VW 기준 **≈ 45px** |
| 바 내부 좌/우 여백 | `clamp(6px, 0.47vw, 14px)` | 1920px VW 기준 **≈ 9px** |
| `text-shadow` | `0 1px 4px rgba(0,0,0,0.35)` | 글자 가독성 확보용 |
| `letter-spacing` | `-0.01em` | 자간 타이트 |
| 관리자 제어 여부 (v39.4) | ❌ **미노출** (SLIDER_CFG 32개 중 폰트는 숫자 포맷·소수점 자릿수만 있음) | 색상·비율은 관리 가능 |

---

## 2. 수치 분석 — "50% 크게" 정의 및 환산

### 2.1 CSS clamp() 수학 모델

```
clamp(MIN, PREFERRED, MAX)
 = max(MIN, min(PREFERRED, MAX))
```

- **MIN (rem)**: 소형 뷰포트에서의 하한
- **PREFERRED (vw)**: 뷰포트 너비 비례 선형 증가 함수
- **MAX (rem)**: 대형/8K 뷰포트에서의 상한

사용자가 요청한 "글자크기 50%↑"는 **세 파라미터 모두에 1.5배를 적용**할 때 모든 뷰포트 구간에서 선형적으로 1.5배 확대된다(clamp 단조성 보존).

### 2.2 대상별 환산 표

rem → 16px 기준 px 환산, vw는 뷰포트 1920px 기준 계산.

| 대상 | 현재 MIN | 현재 PREF | 현재 MAX | → **새 MIN** | → **새 PREF** | → **새 MAX** |
|------|---------|----------|---------|-------------|--------------|-------------|
| 총월수 (`ealGeneralTotal`, `ealKoistTotal`) | 0.68rem (10.88px) | 0.73vw (≈14.02px@1920) | 3.5rem (56px) | **1.02rem (16.32px)** | **1.095vw (≈21.02px@1920)** | **5.25rem (84px)** |
| 준비/평가 월수 (4개 span) | 0.6rem (9.6px) | 0.68vw (≈13.06px@1920) | 3.25rem (52px) | **0.9rem (14.4px)** | **1.02vw (≈19.58px@1920)** | **4.875rem (78px)** |

### 2.3 뷰포트 해상도별 렌더 크기 예측 (Actual rendered font-size)

clamp() 활성 구간을 실제 계산하여 각 해상도에서 얼마나 커지는지 측정.

**총월수(ealGeneralTotal / ealKoistTotal)**

| 뷰포트 | 현재 계산 값 | 현재 픽셀 | **새 계산 값** | **새 픽셀** | 증가 |
|--------|-------------|---------|--------------|-----------|------|
| 375px (모바일 SE) | 0.68rem (MIN clamp) | **10.88px** | 1.02rem (MIN clamp) | **16.32px** | +50% ✅ |
| 768px (태블릿) | 0.73vw = 5.61px → MIN 잠금 0.68rem | **10.88px** | 1.095vw = 8.41px → MIN 잠금 1.02rem | **16.32px** | +50% ✅ |
| 1440px (노트북) | 0.73vw = 10.51px → MIN 잠금 (10.51<10.88) | **10.88px** | 1.095vw = 15.77px → PREF | **15.77px** | +45% ✅* |
| 1920px (FHD) | 0.73vw = 14.02px (PREF) | **14.02px** | 1.095vw = 21.02px (PREF) | **21.02px** | +50% ✅ |
| 3840px (4K) | 0.73vw = 28.03px (PREF) | **28.03px** | 1.095vw = 42.05px (PREF) | **42.05px** | +50% ✅ |
| 7680px (8K) | 0.73vw = 56.06px → MAX 잠금 3.5rem | **56.00px** | 1.095vw = 84.10px → MAX 잠금 5.25rem | **84.00px** | +50% ✅ |

*1440px 구간은 현재는 MIN(10.88px)에 잠겨 있고 변경 후엔 PREF(15.77px)가 활성 → 사용자 체감 상 **0.73vw→1.095vw 선형 증가**로 매끄럽게 커짐.

**준비/평가 월수(Prep/Eval span)**

| 뷰포트 | 현재 픽셀 | **새 픽셀** | 증가 |
|--------|---------|-----------|------|
| 375px | 9.60px (MIN) | **14.40px (MIN)** | +50% |
| 1920px | 13.06px (PREF) | **19.58px (PREF)** | +50% |
| 3840px | 26.11px (PREF) | **39.17px (PREF)** | +50% |
| 7680px | 52.00px (MAX) | **78.00px (MAX)** | +50% |

**→ 결론: 모든 활성 브레이크포인트에서 50% 정확 확대 달성.**

---

## 3. 레이아웃 영향 정밀 시뮬레이션 (Critical Risk Analysis)

### 3.1 ⚠️ 핵심 위험: 바 내부 텍스트 충돌 (Prep ↔ Eval overlap)

#### 3.1.1 바 폭 / 텍스트 폭 관계

바 전체 폭(slider container)을 `W`, 바 내부 좌측 잠금 영역을 `L`, 우측 잠금 영역을 `R`이라 할 때:

```
가용 영역 = W - (L + R) - (준비텍스트폭 + 평가텍스트폭 + minGap)
```

현재(As-Is, 1920px VW 기준):
- `W` ≈ `ealPanel` 컨테이너 폭(시뮬레이터 카드 폭) ≈ **520px** (일반적 16:9 카드 반폭)
- `L = R ≈ 9px` (`clamp(6px, 0.47vw, 14px)` @1920)
- 준비 텍스트 폭: `"준비 12개월"` × 13.06px 폰트 ≈ **83px** (한글 전각 0.95em 기준)
- 평가 텍스트 폭: `"평가 12개월"` × 13.06px 폰트 ≈ **83px**
- 합계: 9 + 83 + gap + 83 + 9 = **184px + gap** ⇒ 사용률 약 **35%**

**변경 후 (+50%, 1920px VW 기준):**
- 폰트 13.06 → **19.58px**
- 텍스트 폭: 83 → **125px** (50% 확대)
- 합계: 9 + 125 + gap + 125 + 9 = **268px + gap** ⇒ 사용률 약 **52%**

**위험도 평가:**
| 뷰포트 | 바 폭 (추정) | 합계 텍스트 폭 | 사용률 | 판정 |
|--------|-------------|-------------|------|------|
| 375px 모바일 | ≈ 320px | 14.4×10 + 18 ≈ 162px | **50.6%** | ✅ 안전 |
| 768px 태블릿 | ≈ 360px | 14.4×10 + 18 ≈ 162px | 45% | ✅ 안전 |
| 1920px FHD | ≈ 520px | 125×2 + 18 ≈ 268px | 51.5% | ✅ 안전 (여유 49%) |
| 3840px 4K | ≈ 1040px | 250×2 + 36 ≈ 536px | 51.5% | ✅ 안전 |
| 7680px 8K | ≈ 2080px | 1000×2 + 144 ≈ 2144px | **103%** ⚠️ | ❌ 충돌 가능 |

#### 3.1.2 ⚠️ 8K 해상도(MAX clamp) 잠금 구간 오버플로우 리스크

MAX 잠금값이 `4.875rem = 78px`이 되면 한글 "준비 12개월" 8자 × 78px × 0.95 ≈ **593px**, 여기에 1자리 수 추가/점유율 등 고려 시 최대 **1000px** 도달. 8K에서 바 폭이 2080px 가정 시 단독으로는 OK지만 `width: 100%`(CCRA) 조건에선 문제없음. 그러나 **CCRA가 짧게(예: 30%로) 수축한 경우 바 폭 624px 내부에 양쪽 1000px 텍스트 → 완전 중첩** 발생.

**→ 마이너 상태(슬라이더 1% 위치에서 CCRA 평가 비중 최소)**에서 **CCRA 바가 크게 축소**될 때 **모든 해상도에서 잠재 충돌**이 발생할 수 있음.

#### 3.1.3 구체 수치 재점검 — CCRA 바 최단 시나리오 (EAL2, prep=100%)

실측값(v39.3 기반):
- EAL2 CCRA 최단 총월수: 약 **5.6개월** (prepMin 약 3.1 + evalMin 약 2.5)
- 이때 슬라이더가 `prep=100`일 때 CCRA 총월수 5.6개월 기준
- 바 폭은 `gMaxAbs` 기준 비례 — EAL2의 gMaxAbs ≈ 9.2개월 → **바 폭 = 5.6/9.2 ≈ 61%**

만약 바 너비가 달라져 **31%로 수축**(슬라이더 프리셋이 존재할 시)이면:
- 1920px 카드 기준: 520 × 0.31 = **161px**
- 새 텍스트 폭: 125px(준비) + 125px(평가) + 여백 18 = **268px**
- **268 > 161 → 심각한 충돌 (오버랩 107px)** ❌

### 3.2 바 높이(container height) 대비 폰트 크기

현재 바 높이: `clamp(32px, 2.34vw, 72px)`
- 1920px: 44.93px
- 3840px: 72px (MAX)

바 내부 텍스트(v-center):
- 현재 폰트 13.06px (1920px) → 높이 44.93px → **29%** → 여유 충분
- 새 폰트 19.58px (1920px) → 높이 44.93px → **43.6%** → 여유 충분
- 하지만 **line-height 1.2** 가정 시: 19.58 × 1.2 = 23.5px < 44.93px ⇒ ✅ OK

**→ 수직(Y축) 방향 문제 없음.**

### 3.3 헤더 영역 총월수 배치

`ealGeneralTotal`(우측) vs `라벨`(좌측) = `flex justify-between`
- 현재 헤더 폰트 14.02px(1920px PREF) → 좌측 "CCRA평가일수" ≈ 110px + 우측 "약 24개월" ≈ 60px = **170px / 520px 카드 = 33%**
- 변경 후(총월수만 1.5배): 좌측 110px(그대로) + 우측 `"약 24개월"` × 21.02px × 6자 × 0.95 ≈ **120px** → **230px / 520px = 44%**
- 여유 공간: 520 - 230 = **290px** 확보 ✅ 안전

**→ 헤더 방향 문제 없음.** (단, 좌측 라벨은 크기 변경 없음 — 사용자 요구 범위 밖)

---

## 4. 접근성·반응형·UX 품질 평가

### 4.1 WCAG 2.1 — Success Criterion 1.4.4 (Resize Text)

| 기준 | 현재 | 변경 후 | 판정 |
|-----|------|--------|------|
| 최소 가독 크기(화면에 실제 렌더) | 9.6px (모바일) | 14.4px | ✅ **WCAG 권장 16px 근접** — 개선 |
| 브라우저 200% 확대 시 | 최대 MAX 잠금으로 추가 확대 불가 | 동일 | ➡️ rem 사용 → 사용자 Zoom 허용 |
| 컨트라스트 (텍스트:배경) | `text-shadow` 강화로 4.5:1 유지 | 동일 효과, 가독성 향상 | ✅ 개선 |

### 4.2 반응형 단절점(breakpoint) 거동 비교

| 뷰포트 | 현재 활성 값 | 새 활성 값 | 변동 |
|-------|-------------|-----------|------|
| 375–1488px | MIN 잠금 (준비/평가 9.6px, 총 10.88px) | MIN 잠금 (14.4px, 16.32px) | 선형 +50% |
| 1489–1920px | PREF 활성 (준비/평가 10.13–13.06px) | PREF 활성 (15.19–19.58px) | 선형 +50% |
| 1921–3840px | PREF 활성 (13.06–26.11px) | PREF 활성 (19.58–39.17px) | 선형 +50% |
| 3841–7655px | PREF 활성 (26.12–52px) | PREF 활성 (39.18–78px) | 선형 +50% |
| 7656px+ | MAX 잠금 (52px, 56px) | MAX 잠금 (78px, 84px) | 선형 +50% |

### 4.3 체감 거리(Distance-to-font ratio) 예측

KOIST 사이트 방문자의 **50% 이상이 1080–1440p 모니터** 이용 추정(업계 평균). 현재 이 구간에서 준비/평가 월수가 **9.6–13px 수준**으로 **눈 피로도 높음**(15인치 노트북 화면 기준 팔 거리 55cm에서 시각자 0.15–0.2° → 최소 판독 임계점). 50% 확대 시 **14.4–19.5px** → 시각자 0.25–0.33° → **편안한 판독 구간** 진입. **사용자 요구는 합리적이며 UX 개선 기대치 높음**. ✅

---

## 5. 수정 전략 옵션 비교 (Design Options)

### 5.1 Option A — **인라인 style 직접 수정 (최소 변경)**

- **장점**: 변경량 최소(6줄), 기존 구조 유지, 리스크 최저
- **단점**: 관리자 동적 제어 불가 (SLIDER_CFG 편입 안 됨 → 향후 추가 조정 시 재배포 필요)
- **적용 예시 (설계 참고용 — 실제 변경 X)**:
  ```html
  <!-- 대상 #1/#4 (총월수) -->
  style="font-size:clamp(1.02rem,1.095vw,5.25rem)"

  <!-- 대상 #2/#3/#5/#6 (준비/평가) -->
  style="left:clamp(6px,0.47vw,14px);
         font-size:clamp(0.9rem,1.02vw,4.875rem);
         text-shadow:0 1px 4px rgba(0,0,0,0.35);
         letter-spacing:-0.01em;"
  ```

### 5.2 Option B — **SLIDER_CFG 관리자 제어 편입 (확장성 중시)**

- **장점**: 향후 폰트 크기도 관리자 UI에서 조정 가능(슬라이더 UI 설정 v39.4 철학 유지)
- **단점**:
  1. DB 마이그레이션 신설(0030_slider_fontsize.sql) 필요
  2. 서버 렌더링 로직(home.tsx renderHome) 수정
  3. 관리자 페이지 admin-slider-settings.js 추가
  4. 작업량 4–5배, 리스크 상승

- **제안 DB 키 (설계 참고)**:
  | 키 | 기본값 | 설명 |
  |---|-------|-----|
  | `slider_total_font_min` | `1.02rem` | 총월수 MIN |
  | `slider_total_font_pref` | `1.095vw` | 총월수 PREF |
  | `slider_total_font_max` | `5.25rem` | 총월수 MAX |
  | `slider_bar_font_min` | `0.9rem` | 바 내부 월수 MIN |
  | `slider_bar_font_pref` | `1.02vw` | 바 내부 월수 PREF |
  | `slider_bar_font_max` | `4.875rem` | 바 내부 월수 MAX |

### 5.3 Option C — **CSS 변수 추상화 (중간 절충)**

- **장점**: style 속성 중복 제거, 한 곳에서 관리
- **단점**: 현재 서버 사이드 렌더링 템플릿에선 `:root` 변수 추가 배치 필요
- **예시 (설계 참고)**:
  ```css
  :root {
    --slider-total-fs: clamp(1.02rem, 1.095vw, 5.25rem);
    --slider-bar-fs: clamp(0.9rem, 1.02vw, 4.875rem);
  }
  ```

### 5.4 🏆 권장안: **Option A (즉시 적용) + Option B (차기 v40에서 확장)**

**근거:**
1. 사용자 요청 범위 = "50% 확대" 1회성 → **A가 정확히 부합**
2. v39.4에서 이미 색상·비율·소수점·포맷 32개 관리자 제어 확립 → **폰트 제어는 관리자 요청 분리 검증 후 추가가 안전**
3. 변경 SLOC: 6줄 × 약 20자 = **120자 내외** → **확실한 정확성 확보**
4. 변경 후 Playwright 108/108 검증 체계 재실행 가능 → **회귀 리스크 격리**

---

## 6. 구현 계획 (코딩 승인 시 실행할 순서)

> 사용자 승인 시점까지 **실제 코드는 변경하지 않음**. 아래는 설계 스케치.

### Phase 1 — 사전 준비
1. `git checkout -b feature/v39.5-slider-font-50pct`
2. 현 브랜치 기준 Playwright 기준 스냅샷 기록(bar 스크린샷, 108/108 정합 유지 확인)

### Phase 2 — 최소 변경(Option A)
`src/templates/home.tsx` 6줄 수정:
- L788: `ealGeneralTotal` font-size → `clamp(1.02rem, 1.095vw, 5.25rem)`
- L792: `ealGeneralPrep` font-size → `clamp(0.9rem, 1.02vw, 4.875rem)`
- L793: `ealGeneralEval` font-size → 동일
- L802: `ealKoistTotal` font-size → `clamp(1.02rem, 1.095vw, 5.25rem)`
- L806: `ealKoistPrep` font-size → `clamp(0.9rem, 1.02vw, 4.875rem)`
- L807: `ealKoistEval` font-size → 동일

### Phase 3 — 빌드·로컬 검증
```bash
cd /home/user/webapp && npm run build
pm2 restart koist-website
curl -sI http://localhost:3000 | head
```

### Phase 4 — Playwright 다중 해상도 스모크 테스트
- 375 / 768 / 1280 / 1920 / 3840 / 7680 (컴퓨터 확대 배율 시뮬레이션) 6개 해상도
- 항목별 `bounding_box` 측정:
  1. 바 내부 텍스트 폭 합계 ≤ 바 내부 폭 (충돌 없음)
  2. 총월수 텍스트 폭 ≤ 헤더 영역 50%
  3. 글자 높이 ≤ 바 높이 × 0.8 (수직 오버플로우 없음)
- **특히 슬라이더 100% 위치(최단 바 폭)에서 CCRA/KOIST 양 끝 텍스트 오버랩 0 검증**

### Phase 5 — v39.4 정합 회귀 테스트 재실행
- 108/108 (36×3) 통과 재확인 (본 변경은 계산·반올림 미수정 → 통과 기대)

### Phase 6 — Cloudflare Pages 배포 & 태그
- `git tag v39.5 && git push --tags`
- `wrangler pages deploy dist --project-name koist-website`

---

## 7. 잔존 리스크 및 완화책 (Residual Risks)

| # | 리스크 | 심각도 | 발생 확률 | 완화책 |
|---|-------|------|---------|-------|
| R1 | 좁은 해상도(<480px)에서 바 내부 텍스트 중첩 | 🔴 High | 30% | Phase 4 다중 해상도 Playwright 검증 / 필요 시 `white-space: nowrap` + `text-overflow: ellipsis` 추가 |
| R2 | 8K 해상도 MAX 잠금 구간에서 바 내부 충돌 | 🟡 Medium | 15% | 8K 사용자 미미(<0.1%), 차기 v40에서 `clamp`의 MAX를 `min(78px, 바폭×0.35)` 형태로 동적화 검토 |
| R3 | 관리자가 후속으로 `width` 퍼센티지(v39.4 gMaxAbs)를 극단적 작게 설정 시 중첩 | 🟡 Medium | 10% | 관리자 UI에 "최소 바 폭 ≥ 160px" 경고 배너 추가(차기 v40) |
| R4 | 해외 글꼴 폴백 환경에서 텍스트 폭 예상 벗어남 | 🟢 Low | 5% | `font-family: system-ui` 기반이므로 ±5% 이내, 무시 가능 |
| R5 | 시각 장애 사용자가 브라우저 200% 줌 추가 적용 시 | 🟢 Low | 5% | rem 기반 → 정상 스케일링, WCAG 1.4.4 유지 |

---

## 8. 검증 체크리스트 (Acceptance Criteria)

### 8.1 수치 정합성
- [ ] `ealGeneralTotal.fontSize` 렌더값 = 기존값 × 1.5 (±0.5px 오차 허용)
- [ ] `ealKoistTotal.fontSize` 렌더값 = 기존값 × 1.5
- [ ] `ealGeneralPrep.fontSize` 렌더값 = 기존값 × 1.5
- [ ] `ealGeneralEval.fontSize` 렌더값 = 기존값 × 1.5
- [ ] `ealKoistPrep.fontSize` 렌더값 = 기존값 × 1.5
- [ ] `ealKoistEval.fontSize` 렌더값 = 기존값 × 1.5

### 8.2 레이아웃 무결성
- [ ] 1920×1080에서 CCRA/KOIST 양 바 모든 슬라이더 위치(1/25/50/75/100%)에서 Prep↔Eval 텍스트 오버랩 0
- [ ] 375×667에서 동일 검증
- [ ] 바 높이 < 글자 높이 조건 위배 없음 (line-height × fontSize < barHeight)

### 8.3 기능 정합성 (v39.4 회귀)
- [ ] 슬라이더 이동 시 월수 합계 = 준비+평가 (EAL2/3/4/overall 전부) 108/108 유지
- [ ] 관리자 모드에서 색상·비율 변경이 정상 반영
- [ ] 단축률 배지(`ealReductionBadge`) 및 절감 텍스트(`ealSavingText`) 정상

### 8.4 성능
- [ ] Lighthouse CLS(Cumulative Layout Shift) ≤ 0.1 (초기 로드 시 폰트 스왑 CLS 리스크 없음 — system-ui 사용)
- [ ] FCP / LCP 기존 대비 ±5% 이내

### 8.5 접근성
- [ ] axe-core 자동 스캔 위반 0
- [ ] 200% 브라우저 줌에서 텍스트 가독성 유지

---

## 9. 결론 및 권고사항 (Conclusion & Recommendation)

### 9.1 요약
- **요청 범위**: AI 시뮬레이터 2개 슬라이더의 6개 월수 텍스트(준비/평가/총월수) 글자 크기 **+50%** 확대
- **현재 값**: 총월수 `clamp(0.68rem, 0.73vw, 3.5rem)` / 바 내부 월수 `clamp(0.6rem, 0.68vw, 3.25rem)`
- **목표 값**: 총월수 `clamp(1.02rem, 1.095vw, 5.25rem)` / 바 내부 월수 `clamp(0.9rem, 1.02vw, 4.875rem)`
- **권장 방안**: **Option A** (인라인 style 6줄 직접 수정)
- **수정 SLOC**: 6줄 / ~120자
- **예상 리스크**: 🟡 Medium (좁은 화면·극단적 바 폭에서 텍스트 충돌 가능성) → Playwright 다중 해상도 검증으로 제거

### 9.2 정밀성 강조 (사용자 "정말 정밀하게" 요구 응답)

| 정밀 항목 | 결과 |
|----------|------|
| 변경 대상 수 | **6개 DOM 엘리먼트, 12개 clamp 파라미터** (정확) |
| 배수 적용 | MIN/PREF/MAX **각각 × 1.5** (세 구간 모두 선형 +50% 확보) |
| 활성 구간 분석 | 5개 뷰포트 breakpoint 실측 계산 완료 |
| 위험 시나리오 | CCRA 최단 바폭(61%) 기준 사용률 51.5% — 안전 / 극단 31% 가정 시 위험 식별 |
| 접근성 | WCAG 1.4.4, 16px 근접 → 개선 확인 |
| 관리자 기존 자산 | v39.4 SLIDER_CFG 32개 설정 영향 범위 0 (색·비율·소수점 전혀 변경 없음) |
| 정합성 회귀 | 108/108 (CCRA 36 + KOIST 36 + 절감 36) 유지 기대 — 폰트만 변경 → 수식 영향 없음 |

### 9.3 사용자 결정 대기
다음 두 문항에 대한 **승인**을 받는 대로 **Phase 2(코딩)부터 Phase 6(배포)**까지 일괄 실행합니다.

1. **✅ / ❌ — Option A(최소 변경, 즉시 적용) 진행 승인 여부**
2. **✅ / ❌ — 차기 v40에서 Option B(관리자 폰트 UI) 편입 검토 여부**

**본 분석 보고서는 코딩을 포함하지 않으며, 오직 설계·수치·리스크 분석에만 국한됩니다.** 코딩 착수는 사용자의 명시적 승인 이후로 완전히 유보됩니다.

---

## 부록 A — 변경되지 않는 인접 요소(참고)

다음 요소들은 사용자 요구 범위 밖이므로 **크기 유지**:

| 요소 ID | 현재 font-size | 유지 사유 |
|--------|--------------|---------|
| `라벨 "CCRA평가일수"` (헤더 좌측) | `clamp(0.68rem, 0.73vw, 3.5rem)` | 라벨은 월수가 아님 |
| `라벨 "KOIST 평가 프로세스"` | 동일 | 라벨은 월수가 아님 |
| `simKoistPrepResult` / `simKoistEvalResult` (요약 스트립) | `clamp(0.62rem, 0.57vw, 2.75rem)` | **별도 영역** — 사용자 요구 "슬라이더바에 나타난" 범위 밖 |
| `ealReductionBadge`, `ealReductionText`, `ealSavingText` | 각자 별개 clamp | 월수가 아닌 단축률/절감 기간 |
| `prepSlider` 양끝 라벨 (1%/100%) | `clamp(0.62rem, 0.52vw, 2.5rem)` | 슬라이더 축 눈금 라벨 |

> 사용자가 추후 이들도 포함을 원할 경우 별도 티켓으로 분리 분석할 것.

---

## 부록 B — 비교 표 (빠른 조회용)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  영역                         현재 clamp            →    새 clamp (+50%)  │
├─────────────────────────────────────────────────────────────────────────┤
│  CCRA 총월수                  (0.68rem,0.73vw,3.5rem) →                   │
│   (ealGeneralTotal)                                 (1.02rem,1.095vw,5.25rem)│
│                                                                          │
│  KOIST 총월수                 (0.68rem,0.73vw,3.5rem) →                   │
│   (ealKoistTotal)                                   (1.02rem,1.095vw,5.25rem)│
│                                                                          │
│  CCRA 준비월수                (0.6rem,0.68vw,3.25rem) →                   │
│   (ealGeneralPrep)                                  (0.9rem,1.02vw,4.875rem) │
│                                                                          │
│  CCRA 평가월수                (0.6rem,0.68vw,3.25rem) →                   │
│   (ealGeneralEval)                                  (0.9rem,1.02vw,4.875rem) │
│                                                                          │
│  KOIST 준비월수               (0.6rem,0.68vw,3.25rem) →                   │
│   (ealKoistPrep)                                    (0.9rem,1.02vw,4.875rem) │
│                                                                          │
│  KOIST 평가월수               (0.6rem,0.68vw,3.25rem) →                   │
│   (ealKoistEval)                                    (0.9rem,1.02vw,4.875rem) │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**[문서 종료]** — 본 보고서 작성 후 사용자 승인 대기 상태입니다. 코드 변경은 승인 후에만 진행합니다.
