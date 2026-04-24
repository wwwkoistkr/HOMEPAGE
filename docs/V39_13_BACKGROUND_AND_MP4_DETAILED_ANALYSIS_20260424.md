# KOIST 홈페이지 1층/2층/3층 배경 관리 + MP4 연동 상세 분석보고서

**버전**: v39.13
**작성일**: 2026-04-24
**배포 환경**: https://koist-website.pages.dev/
**원본 참조**: http://www.koist.kr/
**범위**: (A) 팝업 + 홈피 1·2·3층 배경의 관리자 모드 관리 가능성 / (B) koist.kr 원본 MP4의 관리자 모드 연동 + 3층 적용 가능성

---

## 📋 목차
1. [Executive Summary](#1-executive-summary)
2. [요청 1 실행 결과: 팝업 카드 높이 재설정](#2-요청-1-실행-결과-팝업-카드-높이-재설정)
3. [요청 2 분석: 홈피 1/2/3층 배경 관리자 관리 가능성](#3-요청-2-분석-홈피-123층-배경-관리자-관리-가능성)
4. [요청 3 분석: koist.kr MP4 + 관리자 연동 + 3층 적용](#4-요청-3-분석-koistkr-mp4--관리자-연동--3층-적용)
5. [Phase 2 제안 (구현 계획)](#5-phase-2-제안-구현-계획)
6. [최종 결론](#6-최종-결론)

---

## 1. Executive Summary

### 결론 요약 (3줄)

1. **팝업 카드 높이 변경 (요청 1)**: ✅ **완료 배포됨** — 팝업2=12cm, 팝업3=6cm.
2. **1·2·3층 배경 관리자 관리 (요청 2)**: ⚠️ **1층만 가능, 2·3층은 하드코딩 → 개조 필요**. 개조 가능성: **100% 확정** (약 2시간 예상).
3. **MP4 관리 + 3층 적용 (요청 3)**: ✅ **MP4 업로드/R2 저장/1층 재생 인프라는 100% 구현됨. 3층에 MP4 삽입은 코드 미지원 → Phase 2에서 추가 개발 필요** (난이도 중, 약 3시간).

### 즉시 답변 매트릭스

| 질문 | 답 | 근거 |
|------|-----|------|
| 팝업 배경(`bg_color`)이 관리자에서 관리됩니까? | ✅ YES | `/admin/popups` POST/PUT `bg_color` 필드 |
| 1층(Hero) 배경이 관리자에서 관리됩니까? | ✅ YES | `hero_bg_url` / `hero_video_url` / 그라디언트 5색 |
| 2층(Services 사업분야) 배경이 관리자에서 관리됩니까? | ❌ NO | `home.tsx:1212` 하드코딩 `#FFFFFF` |
| 3층(Accordion 사업분야 상세) 배경이 관리자에서 관리됩니까? | ❌ NO | `home.tsx:1282` 하드코딩 `#FFFFFF` |
| 관리자가 MP4를 업로드할 수 있습니까? | ✅ YES | `/admin/images` R2 업로드, 20MB, `video/mp4` 허용 |
| 관리자가 업로드한 MP4를 Hero에 적용할 수 있습니까? | ✅ YES | `hero_video_url` + `<video>` 태그 자동 렌더링 |
| 원본 koist.kr의 MP4가 현재 신규 홈피에 적용돼 있습니까? | ❌ NO | `hero_video_url` DB값이 빈 문자열 |
| 3층(Accordion)에 MP4를 넣을 수 있습니까? | ⚠️ **현재 코드 불가** | 3층 배경에 `<video>` 렌더링 로직 없음 → 개발 필요 |

---

## 2. 요청 1 실행 결과: 팝업 카드 높이 재설정

### 2.1 적용 값 (마이그레이션 `0041_popup_card_height_12_6.sql`)

| 팝업 | DB ID | `bg_color` | `card_height_cm` (변경 전 → 후) |
|------|-------|-----------|-------|
| 팝업1 (HTML, 국가 공인 CCTV/IPTV 시험기관) | 3 | `#0a1628` | NULL → NULL (변경 없음) |
| 팝업2 (이미지, KCMVP 민간시험 기관 지정) | 2 | `#ffffff` | NULL → **12** |
| 팝업3 (이미지, CC평가 대기기간 안내) | 1 | `#ffffff` | NULL → **6** |

### 2.2 검증 결과

- 로컬 D1: ✅ 적용
- 원격 D1 (Cloudflare): ✅ 적용
- Cloudflare Pages 배포: ✅ `https://e8fb5161.koist-website.pages.dev`
- 프로덕션 HTTP 상태: ✅ `200 OK`

### 2.3 렌더링 효과

현재 `home.tsx:480~500`에서 `card_width_cm`/`card_height_cm`를 읽어 `.popup-card` 인라인 스타일에 적용합니다. 따라서 팝업2는 세로 12cm 고정, 팝업3은 세로 6cm 고정으로 표시됩니다. 이미지가 해당 높이보다 짧으면 닫기 버튼 아래 약간의 여백이 생길 수 있으나, 이는 DB값을 사용자 요청대로 설정한 결과입니다.

---

## 3. 요청 2 분석: 홈피 1/2/3층 배경 관리자 관리 가능성

### 3.1 현재 섹션 레이어 구조 (`src/templates/home.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│ GNB (상단 네비게이션)      → layout.tsx (gnb_bg_url)    ✅  │
├─────────────────────────────────────────────────────────────┤
│ 1층 Hero (.unified-hero-section)   L627                 ✅  │
│  • hero_video_url (MP4)                                     │
│  • hero_bg_url (이미지)                                     │
│  • hero_gradient_color1~5 + hero_overlay_opacity            │
│  • hero_video_poster / _fhd / _4k / _mobile                 │
├─────────────────────────────────────────────────────────────┤
│ 2층 Services (사업분야) #services  L1212                ❌  │
│  • style="background: #FFFFFF;"  ← 하드코딩               │
├─────────────────────────────────────────────────────────────┤
│ 3층 Accordion (#homeAccordionSection) L1282             ❌  │
│  • style="background:#FFFFFF;"   ← 하드코딩               │
├─────────────────────────────────────────────────────────────┤
│ 4층 Notices + Progress              L1603                ❌  │
│  • style="background: var(--grad-surface);"  ← 하드코딩   │
├─────────────────────────────────────────────────────────────┤
│ 5층 CTA (행동유도)                  L1826                ✅  │
│  • style="${bgStyle(s.cta_bg_url, ...)}"                    │
├─────────────────────────────────────────────────────────────┤
│ Footer                              → layout.tsx        ✅  │
│  • footer_bg_url                                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 `site_settings` 테이블에 이미 "예약만 되어 있고 미사용"인 키들

DB에는 다음 키들이 이미 존재하지만, `home.tsx`에서 참조되지 않습니다:

| 예약된 키 | 현재 DB 값 | 용도 | 참조 여부 |
|-----------|-----------|------|-----------|
| `services_bg_url` | `""` (빈 값) | 2층 Services 배경 | ❌ 미사용 |
| `main_bg_url` | `""` | 홈피 전체 배경 | ❌ 미사용 |
| `notice_progress_bg_url` | `""` | 4층 Notices 배경 | ❌ 미사용 |

→ **좋은 신호**: DB 스키마가 이미 준비돼 있어서 home.tsx 수정만 하면 됩니다.

### 3.3 관리자 패널 현황 (`src/templates/admin/background-media.tsx`)

관리자 대시보드 → **배경·미디어 관리** 메뉴에 이미 존재하는 입력 필드:

| 필드 (data-key) | 기본값 | 관리자 편집 UI |
|-----------------|--------|---------------|
| `hero_gradient_color1~5` | 5색 | ✅ 컬러 입력 |
| `hero_bg_url` | "" | ✅ URL 입력 |
| `hero_overlay_opacity` | 0.85 | ✅ 슬라이더 |
| `hero_video_url` | "" | ✅ URL 입력 |
| `hero_video_opacity` | 0.65 | ✅ 슬라이더 |
| `hero_video_poster_*` (4종) | "" | ✅ URL 입력 |
| `cta_bg_url` | "" | ✅ URL 입력 |
| `footer_bg_url` | "" | ✅ URL 입력 |
| `gnb_bg_url` | "" | ✅ URL 입력 |
| `page_header_bg_url` | "" | ✅ URL 입력 |
| `topbar_bg_color` | "" | ✅ 컬러 입력 |
| `gnb_bar_bg_color` | "" | ✅ 컬러 입력 |
| **`services_bg_url`** | - | ❌ **UI에도 없음** |
| **`main_bg_url`** | - | ❌ **UI에도 없음** |
| **`notice_progress_bg_url`** | - | ❌ **UI에도 없음** |

### 3.4 1층/2층/3층 관리 가능성 판정

| 층 | 현재 편집 가능? | 만들 수 있는가? | 예상 공수 |
|----|----------------|-----------------|-----------|
| **1층 Hero** | ✅ 완벽 (12개 설정 키) | — | — |
| **2층 Services** | ❌ 불가 | ✅ 가능 | **30분** |
| **3층 Accordion** | ❌ 불가 | ✅ 가능 | **30분** |

### 3.5 2층/3층 관리자화 구현 방법 (구체적 수정 범위)

**A. `src/templates/home.tsx` 수정 2곳**

```typescript
// 현재 L1212 (2층)
<section id="services" ... style="background: #FFFFFF; padding: ...">

// 수정 후 (제안)
<section id="services" ... style="${bgStyle(s.services_bg_url,
  'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)', '1')};
  padding: clamp(1.5rem,2.5vw,2.5rem) 0;">
```

```typescript
// 현재 L1282 (3층)
<section id="homeAccordionSection" ... style="background:#FFFFFF; ...">

// 수정 후
<section id="homeAccordionSection" ... style="${bgStyle(s.accordion_bg_url,
  '#FFFFFF', '1')}; border-top:...;">
```

**B. `src/templates/admin/background-media.tsx`에 입력 필드 2개 추가**

```html
<div class="form-group">
  <label>2층 (사업분야) 배경 이미지 URL</label>
  <input type="text" data-key="services_bg_url" ...>
</div>
<div class="form-group">
  <label>3층 (사업분야 상세) 배경 이미지 URL</label>
  <input type="text" data-key="accordion_bg_url" ...>
</div>
```

**C. 마이그레이션 1개 — `site_settings`에 `accordion_bg_url` 키 INSERT**

```sql
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES
  ('accordion_bg_url', '', 'background', '3층 Accordion 섹션 배경 이미지 URL');
-- services_bg_url, main_bg_url, notice_progress_bg_url은 이미 존재함
```

**총 예상 공수**: 1시간 (코딩 30분 + 테스트/배포 30분)

---

## 4. 요청 3 분석: koist.kr MP4 + 관리자 연동 + 3층 적용

### 4.1 원본 koist.kr MP4 실측 데이터

```
http://www.koist.kr/sh_img/index/main_banner/main_mov1.mp4
  Content-Length: 2,715,858 bytes (약 2.7 MB)
  Content-Type:   video/mp4
  Last-Modified:  2023-03-02
  공개 접근:       ✅ (인증 불필요)

http://www.koist.kr/sh_img/index/main_banner/main_mov2.mp4
  Content-Length: 1,398,676 bytes (약 1.4 MB)
  Content-Type:   video/mp4
  Last-Modified:  2023-02-28
  공개 접근:       ✅
```

**원본 HTML 구조**: `<div class="bg bg01"><video autoplay muted playsinline><source src="main_mov1.mp4"></video></div>` + 두 번째 슬라이드로 `main_mov2.mp4` (번갈아 재생).

**합계**: 약 **4.1 MB** — Cloudflare R2 무료 할당량(10GB) 대비 미미.

### 4.2 현재 신규 홈피의 MP4 관리 인프라 현황

#### 🟢 이미 구현된 기능 (코딩 불필요)

| 기능 | 구현 위치 | 상세 |
|------|----------|------|
| **관리자 MP4 업로드** | `src/routes/admin.ts:529` | `POST /api/admin/images`, `allowedVideoTypes=['video/mp4','video/webm']` |
| **R2 저장** | 동일 파일 L570 | `videos/` prefix 자동 할당 |
| **최대 크기** | L555 | 20 MB (원본 4.1 MB 대비 5배 여유) |
| **DB 레코드 생성** | `images` 테이블 | `r2_key`, `mime_type`, `file_size` 저장 |
| **URL 생성** | R2 public URL | 업로드 후 공개 URL 자동 반환 |
| **Hero 비디오 URL 설정** | `hero_video_url` | 관리자 패널 `/admin → 배경·미디어` |
| **투명도 조절** | `hero_video_opacity` | 0~1 슬라이더 |
| **포스터 이미지 (반응형)** | `hero_video_poster_*` | 모바일/FHD/4K/기본 4종 |
| **Hero 비디오 렌더링** | `home.tsx:633~658` | `<video autoplay muted loop playsinline>` + overlay |
| **XSS 보안** | `home.tsx:622` | URL 정규식 검증 (v39.0 보안 패치) |

#### 🔴 구현되지 않은 기능 (코딩 필요)

| 기능 | 현재 상태 | 필요 공수 |
|------|----------|-----------|
| **2층/3층 MP4 배경 재생** | 미구현 | 🔨 추가 개발 필요 |
| **2개 MP4 슬라이드 번갈아 재생** | 미구현 (현재 1개 URL만) | 🔨 복잡, 4시간 |
| **MP4 업로드 관리자 UI 버튼** | 이미지 업로드는 있으나 MP4 직접 업로드 버튼 분리 필요 | 선택사항 |

### 4.3 현재 MP4 렌더링 파이프라인 (1층 Hero)

```
[관리자 작업]
  1. /admin 로그인
  2. 좌측 메뉴 → 이미지 관리 (현재 이미지/비디오 통합)
  3. main_mov1.mp4 파일 선택 → 업로드 버튼
         │
         ▼
  POST /api/admin/images
  - FormData 검증 (video/mp4 허용)
  - 크기 검증 (≤20MB)
  - R2에 videos/xxx.mp4 저장
  - images 테이블에 레코드 INSERT
  - public URL 반환
         │
         ▼
  4. URL 복사
  5. 좌측 메뉴 → 배경·미디어 관리
  6. "히어로 비디오 URL" 입력란에 R2 URL 붙여넣기 → 저장
         │
         ▼
  PUT /api/admin/settings/hero_video_url
  - site_settings 업데이트
         │
         ▼
[사용자 방문]
  GET /
  - home.tsx:620~660 렌더링
  - s.hero_video_url 값 읽음
  - URL sanitization (XSS 방지)
  - <video autoplay muted loop playsinline poster="...">
      <source src="hero_video_url" type="video/mp4">
    </video>
  - <div style="background:rgba(10,15,30,${opacity})"></div> overlay
```

→ **즉시 사용 가능**. 관리자가 코딩 없이 본인이 할 수 있는 작업입니다.

### 4.4 3층(Accordion) 배경에 MP4 삽입 가능성

#### 🔍 기술적 분석

**현재 3층 렌더링 (`home.tsx:1282`)**:
```html
<section id="homeAccordionSection" class="relative"
         style="background:#FFFFFF; border-top:1px solid rgba(226,232,240,0.40);">
  <!-- 사업분야 상세 accordion 콘텐츠 -->
</section>
```

→ 단순 배경색만 있고 `<video>` 태그나 DOM 구조가 없음.

#### 🛠️ 3층에 MP4 삽입 구현 방안 (3가지 옵션)

##### **Option A: 3층 배경 전체를 MP4로 덮기** (권장 ⭐)

1층 Hero와 동일 패턴 적용:
```html
<section id="homeAccordionSection" class="relative" style="background: #FFFFFF;">
  <!-- MP4 배경 컨테이너 -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <video autoplay muted loop playsinline
           style="position:absolute; top:50%; left:50%;
                  min-width:100%; min-height:100%;
                  transform:translate(-50%,-50%); object-fit:cover;">
      <source src="${s.accordion_video_url}" type="video/mp4">
    </video>
    <div class="absolute inset-0"
         style="background:rgba(255,255,255,${s.accordion_video_opacity});"></div>
  </div>
  <!-- 기존 accordion 콘텐츠를 relative z-10으로 덮어쓰기 -->
  <div class="relative z-10">
    ... 기존 내용 ...
  </div>
</section>
```

**필요 변경**:
- `site_settings`에 키 2개 추가: `accordion_video_url`, `accordion_video_opacity`
- `home.tsx:1282~` 구조 변경 (약 30줄)
- `admin/background-media.tsx`에 입력 필드 2개 추가
- **예상 공수**: 2시간 (코딩 1시간 + 반응형/성능 테스트 1시간)

##### **Option B: 3층 일부 카드에만 MP4 배경**

Accordion 각 아이템마다 다른 배경 영상. 데이터 구조 변경이 필요해 난이도 높음. **권장 ✗** (6시간 이상, ROI 낮음).

##### **Option C: 3층을 완전히 MP4 전용 배너로 재설계**

Accordion 콘텐츠를 제거하고 MP4 배너만 배치. 기능 삭제가 수반돼 **비추천**.

#### ⚠️ 3층 MP4 도입 시 우려사항

| 우려 | 영향도 | 완화 방안 |
|------|--------|-----------|
| **모바일 데이터 사용량 급증** | 🔴 높음 | `@media (max-width:768px)` 에서 `<video>` 숨기고 `poster` 이미지만 표시 |
| **동시에 2개 비디오 재생 시 성능 부하** | 🟠 중간 | 1층 영상과 3층 영상 중 하나만 자동재생, 다른 하나는 `preload="none"` |
| **자동재생 배터리 소모** | 🟠 중간 | `Intersection Observer`로 viewport 밖일 때 `pause()` |
| **SEO/접근성** | 🟡 낮음 | `aria-hidden="true"` + `role="presentation"` 추가 |
| **원본 koist.kr이 사용한 패턴은 "1층에만" MP4** | 🟢 참고 | 원본 충실 복제 관점에서는 **1층 적용이 더 적합** |

### 4.5 중요한 발견: **"상단의 3층"** 해석 재확인

사용자가 "홈피 상단의 3층"이라고 지칭한 부분을 3가지로 해석할 수 있습니다.

| 해석 | 의미 | 예상 가능성 | 권장 조치 |
|------|------|-------------|-----------|
| **A. 최상단 1층 = Hero** | 원본 koist.kr처럼 Hero 배너 | ⭐⭐⭐ **높음** | ✅ **코딩 불필요** — 관리자가 직접 `hero_video_url` 설정 |
| **B. 상단에서 3번째 섹션 = Accordion** | 1층→2층→3층(Accordion) 순 | ⭐⭐ 중간 | 🔨 Phase 2 개발 필요 (2시간) |
| **C. GNB + Topbar + Hero를 합한 3개 층** | 전체 상단부 | ⭐ 낮음 | UI/UX 비표준 → 비추천 |

→ 현재 v39.13 보고서 기준으로는 **해석 A가 가장 타당**합니다(원본 koist.kr의 MP4 배치와 일치).

**사용자의 실제 의도를 재확인**하기 위해 다음과 같이 질문을 드립니다:
- **질문 1**: "3층"은 "원본 koist.kr의 Hero 배너와 같은 자리"를 의미합니까? (YES → 해석 A, Phase 2 불필요)
- **질문 2**: 아니면 "2층(사업분야 카드) 아래에 나오는 사업분야 상세 영역"을 의미합니까? (YES → 해석 B, Phase 2 필요)

---

## 5. Phase 2 제안 (구현 계획)

아래는 **승인 시에만** 실행할 계획이며, 본 보고서에서는 **코딩하지 않습니다**.

### Phase 2-A: 2층/3층 배경 이미지 관리자화 (권장 ⭐⭐⭐)

- **목표**: 관리자가 2층 Services, 3층 Accordion 배경 이미지/그라디언트를 수정 가능
- **변경**: `home.tsx:1212, 1282` 2곳 + 관리자 패널 필드 2개 + 마이그레이션 1개
- **공수**: **1시간**
- **리스크**: ⭐ 낮음 (기존 `bgStyle()` 헬퍼 재사용)

### Phase 2-B: koist.kr 원본 MP4 1층에 적용 (권장 ⭐⭐⭐ — 코딩 불필요)

- **목표**: 원본 홈피처럼 Hero 배너에 MP4 재생
- **변경**: **코딩 없음** (관리자 모드에서 업로드+설정만)
- **공수**: 10분 (관리자 작업)
- **리스크**: 거의 없음

### Phase 2-C: 3층에 MP4 배경 추가 (해석 B 확정 시)

- **목표**: Accordion 섹션 배경에 MP4 배경
- **변경**: `home.tsx:1282~` 구조 재작성 + `site_settings` 2개 키 추가 + 관리자 필드 2개 + 모바일 최적화
- **공수**: **2시간**
- **리스크**: ⭐⭐ 중간 (성능/모바일 고려 필요)

### Phase 2-D: 원본 2개 MP4 슬라이드 재현

- **목표**: `main_mov1.mp4` + `main_mov2.mp4` 번갈아 재생
- **변경**: 플레이어 JS 로직 + 2번째 비디오 DB 키 + UI
- **공수**: **4시간**
- **리스크**: ⭐⭐⭐ 높음 (슬라이드 전환 로직 복잡)

### Phase 2-E: 팝업 카드 크기 관리자 UI 추가

- **목표**: `card_width_cm`, `card_height_cm`, `card_image_w`, `card_image_h`를 관리자 팝업 편집 폼에서 수정
- **변경**: `src/routes/admin.ts`의 `popups` POST/PUT fields + 관리자 팝업 편집 HTML 폼 4개 필드 추가
- **공수**: **1.5시간**
- **리스크**: ⭐ 낮음

### Phase 2 우선순위 매트릭스

| 우선순위 | 작업 | ROI (가치/공수) |
|---------|------|----------------|
| 🥇 1순위 | **Phase 2-B** (1층에 koist.kr MP4 적용) | ⭐⭐⭐⭐⭐ (공수 0시간, 가치 매우 높음) |
| 🥈 2순위 | **Phase 2-A** (2·3층 배경 관리자화) | ⭐⭐⭐⭐ |
| 🥉 3순위 | **Phase 2-E** (팝업 카드 크기 UI) | ⭐⭐⭐ |
| 4순위 | Phase 2-C (3층 MP4) — 해석 B 확정 시 | ⭐⭐ |
| 5순위 | Phase 2-D (2개 MP4 슬라이드) | ⭐ |

---

## 6. 최종 결론

### 요청 1 (팝업 높이): ✅ **완료**
- 팝업2 = 12cm, 팝업3 = 6cm, 배경 #ffffff 로 배포 완료
- 로컬/원격 D1 + Cloudflare Pages 3중 동기화 확인

### 요청 2 (1/2/3층 관리자화): ⚠️ **부분 가능**

| 층 | 현재 | 관리자화 가능? | 공수 |
|----|------|----------------|------|
| 1층 Hero | ✅ 완벽 | — | — |
| 2층 Services | ❌ 하드코딩 | ✅ 예 (Phase 2-A) | 30분 |
| 3층 Accordion | ❌ 하드코딩 | ✅ 예 (Phase 2-A) | 30분 |

→ **1시간 내에 2층/3층 모두 관리자 모드로 편집 가능하도록 만들 수 있습니다.** 승인 시 진행.

### 요청 3 (MP4 관리자 연동 + 3층 적용):

- **MP4 관리자 관리 여부**: ✅ **100% 지원됨** — R2 업로드, 20MB 허용, URL 생성, Hero 자동 재생 모두 구현 완료
- **koist.kr 원본 MP4 접근성**: ✅ 공개 URL에서 접근 가능 (총 4.1MB)
- **1층 적용 가능**: ✅ **코딩 없이 관리자 업로드만으로 가능**
- **3층 적용 가능**: ⚠️ **현재 코드 미지원 — Phase 2-C에서 2시간 내 구현 가능**

### 다음 단계 권장 (사용자 승인 대기)

1. ✅ **즉시**: Phase 2-B — 관리자 모드에서 MP4 업로드 → 1층 배너에 반영 (코딩 없음, 10분)
2. 🔨 **승인 후**: Phase 2-A — 2층/3층 배경 관리자화 (1시간)
3. 🔨 **해석 B 확정 시**: Phase 2-C — 3층 MP4 적용 (2시간)

**본 보고서는 코딩을 진행하지 않았습니다.** Phase 2 실행 여부는 사용자의 지시를 기다립니다.

---

**관련 파일**:
- 본 보고서: `docs/V39_13_BACKGROUND_AND_MP4_DETAILED_ANALYSIS_20260424.md`
- 마이그레이션 (요청 1): `migrations/0041_popup_card_height_12_6.sql`
- 홈피 렌더링: `src/templates/home.tsx`
- 관리자 패널: `src/templates/admin/background-media.tsx`
- 관리자 API: `src/routes/admin.ts`
- 팝업 렌더링: `src/templates/home.tsx:269~358, 480~560`

**프로덕션 URL**: https://koist-website.pages.dev/
**미리보기**: https://e8fb5161.koist-website.pages.dev
**GitHub**: https://github.com/wwwkoistkr/HOMEPAGE
