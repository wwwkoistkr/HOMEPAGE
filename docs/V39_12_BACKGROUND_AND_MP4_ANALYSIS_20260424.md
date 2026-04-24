# KOIST 홈페이지 배경 관리 및 MP4 동영상 분석 보고서

**버전**: v39.12
**작성일**: 2026-04-24
**대상 환경**: https://koist-website.pages.dev/
**원본 참조**: http://www.koist.kr/
**작성 범위**: (A) 팝업 배경 + 홈페이지 각 섹션 배경의 관리자 모드 편집 가능성 분석 / (B) 원본 koist.kr의 MP4 Hero 배경 조사 및 관리자 모드 연동 가능성

---

## 0. TL;DR (요약)

| 항목 | 관리자 모드 편집 | 비고 |
|------|-----------------|------|
| 팝업 1·2·3 배경색 (`bg_color`) | ✅ **가능** | `/admin → 팝업 관리` UI에 컬러 입력 필드 존재 |
| 팝업 `card_height_cm` (카드 높이) | ⚠️ **API 미노출** | DB에는 컬럼 존재, 관리자 UI에는 입력 칸 없음 |
| 1층 (Hero 배너) 배경 이미지 | ✅ **가능** | `hero_bg_url` — 배경/미디어 관리 탭 |
| 1층 (Hero 배너) 배경 **MP4 동영상** | ✅ **이미 구현됨** | `hero_video_url` + poster 4종, opacity 슬라이더 |
| 1층 그라디언트 5색 | ✅ **가능** | `hero_gradient_color1~5` |
| 2층 (Services 사업분야) 배경 | ❌ **불가 (하드코딩)** | `src/templates/home.tsx:1212` `background: #FFFFFF` |
| 3층 (Accordion 사업분야 상세) 배경 | ❌ **불가 (하드코딩)** | `src/templates/home.tsx:1282` `background:#FFFFFF` |
| 4층 (Notices/Progress) 배경 | ❌ **불가 (하드코딩)** | `var(--grad-surface)` |
| 5층 (CTA 행동유도) 배경 | ✅ **가능** | `cta_bg_url` |
| Footer 배경 | ✅ **가능** | `footer_bg_url` |
| GNB / 상단바 배경 | ✅ **가능** | `gnb_bg_url` · `gnb_bar_bg_color` · `topbar_bg_color` |
| 페이지 헤더 배경 | ✅ **가능** | `page_header_bg_url` |
| **koist.kr 원본 MP4** | 📦 `main_mov1.mp4`(2.7 MB) + `main_mov2.mp4`(1.4 MB) | 총 4.1 MB, Apache 서버, 공개 접근 가능 |
| **koist.kr MP4 → KOIST 홈피 1층에 삽입** | ✅ **기술적으로 즉시 가능** | 기존 `hero_video_url` 시스템 재사용, R2 업로드 권장 |

---

## 1. 팝업 배경 관리 현황

### 1.1 DB 스키마 (`popups` 테이블)

**관련 컬럼**:
| 컬럼 | 타입 | 관리자 UI 노출 | 비고 |
|------|------|----------------|------|
| `bg_color` | TEXT | ✅ `admin.post /popups` 바디에 포함 | 팝업 전체 배경 |
| `title_bg_color` | TEXT | ✅ 포함 | 제목 영역 배경 |
| `text_color` | TEXT | ✅ 포함 | 본문 텍스트 색상 |
| `title_color` | TEXT | ✅ 포함 | 제목 색상 |
| `font_size` / `title_font_size` | INT | ✅ 포함 | 폰트 크기 |
| `padding` / `line_height` | INT/REAL | ✅ 포함 | 여백·행간 |
| `card_height_cm` | REAL | ❌ **누락** | INSERT/UPDATE 바디에 미포함 |
| `card_width_cm` | REAL | ❌ **누락** | 동일 |
| `card_image_w` / `card_image_h` | INT | ❌ **누락** | 이미지 크기 미노출 |

### 1.2 관리 라우트 (src/routes/admin.ts)
- `GET /api/admin/popups` (L215) — 전체 조회
- `POST /api/admin/popups` (L220) — 신규 생성 (20개 필드)
- `PUT /api/admin/popups/:id` (L229) — 수정 (동일 20개 필드)
- `DELETE /api/admin/popups/:id` (L245)

### 1.3 v39.12 적용 후 현재 팝업 상태
```
id=1 (CC평가 대기기간 안내)         bg_color=#ffffff   card_height_cm=NULL  ✅ 사용자 최신 요청 반영
id=2 (KCMVP 민간시험 기관 지정)     bg_color=#ffffff   card_height_cm=NULL  ✅ 사용자 최신 요청 반영
id=3 (국가 공인 CCTV,IPTV 시험기관) bg_color=#0a1628   card_height_cm=NULL
```

### 1.4 발견된 관리 공백
- **카드 크기(`card_width_cm`, `card_height_cm`) 및 이미지 크기는 관리자 UI에서 직접 편집 불가**. 현재는 SQL 마이그레이션으로만 변경 가능합니다.
- 권장: `admin.post /popups` / `admin.put /popups/:id`의 fields 배열에 `card_width_cm`, `card_height_cm`, `card_image_w`, `card_image_h` 추가 → 팝업 관리 UI에 4개 숫자 입력 필드 추가.

---

## 2. 홈페이지 1층~5층 배경 관리 현황

### 2.1 섹션 구조 (src/templates/home.tsx 기준)

| 층 | 섹션 | 라인 | 현재 배경 처리 | 관리자 편집 |
|----|------|------|---------------|-------------|
| **1층** | Hero 배너 (`.unified-hero-section`) | 627 | `hero_video_url`(우선) → `hero_bg_url` → 그라디언트 5색 + overlay opacity | ✅ **전체 편집 가능** |
| **2층** | Services 사업분야 (`id="services"`) | 1212 | `background: #FFFFFF` (하드코딩) | ❌ 불가 |
| **3층** | Accordion 사업분야 상세 (`id="homeAccordionSection"`) | 1282 | `background:#FFFFFF` (하드코딩) | ❌ 불가 |
| 4층 | Notices / Progress | 1603 | `background: var(--grad-surface)` (하드코딩) | ❌ 불가 |
| 5층 | CTA 행동유도 | 1826 | `bgStyle(s.cta_bg_url, ...)` | ✅ 가능 |
| GNB | 상단 메뉴 | — | `gnb_bg_url`, `gnb_bar_bg_color` | ✅ 가능 |
| Footer | 최하단 | — | `footer_bg_url` | ✅ 가능 |

### 2.2 관리자 배경 관리 패널 (src/templates/admin/background-media.tsx)

이미 구현된 입력 필드 (`data-key=` 기준):

**히어로 그라디언트 (1층)**
- `hero_gradient_color1` = `#070B14`
- `hero_gradient_color2` = `#0A1128`
- `hero_gradient_color3` = `#0F1E3D`
- `hero_gradient_color4` = `#162D5A`
- `hero_gradient_color5` = `#1A3A6E`

**히어로 이미지 (1층)**
- `hero_bg_url` (이미지 URL)
- `hero_overlay_opacity` (0~1 슬라이더, 기본 0.85)

**히어로 비디오 (1층) — ⭐ 핵심**
- `hero_video_url` (MP4 URL)
- `hero_video_opacity` (0~1 슬라이더, 기본 0.65)
- `hero_video_poster` (일반 포스터)
- `hero_video_poster_4k` (3840×2160)
- `hero_video_poster_fhd` (1920×1080)
- `hero_video_poster_mobile` (768p)

**기타 섹션**
- `cta_bg_url` (5층 CTA)
- `footer_bg_url` (푸터)
- `gnb_bg_url` (GNB)
- `page_header_bg_url` (페이지 헤더)
- `topbar_bg_color`, `gnb_bar_bg_color` (색상)

### 2.3 ⚠️ 관리되지 않는 구간 (하드코딩)

```
home.tsx:1212  <section id="services" ... style="background: #FFFFFF;">          ← 2층
home.tsx:1282  <section id="homeAccordionSection" ... style="background:#FFFFFF;"> ← 3층
home.tsx:1603  <section ... style="background: var(--grad-surface);">             ← 4층
```

**권장**: `services_bg_url`, `main_bg_url`, `notice_progress_bg_url` 키는 이미 `site_settings`에 준비되어 있으나 home.tsx에서 참조되지 않음 → **Phase 2에서 `bgStyle()` 헬퍼로 교체 필요**.

---

## 3. koist.kr 원본 MP4 배경 조사

### 3.1 실측 데이터 (2026-04-24 기준)

| 파일 | URL | 크기 | Content-Type | Last-Modified |
|------|-----|------|--------------|---------------|
| `main_mov1.mp4` | http://www.koist.kr/sh_img/index/main_banner/main_mov1.mp4 | **2,715,858 byte (≈2.7 MB)** | `video/mp4` | 2023-03-02 |
| `main_mov2.mp4` | http://www.koist.kr/sh_img/index/main_banner/main_mov2.mp4 | **1,398,676 byte (≈1.4 MB)** | `video/mp4` | 2023-02-28 |

**합계**: 약 **4.1 MB** (경량, Cloudflare R2 저장 비용 거의 무시 가능)

### 3.2 원본 HTML 구조

```html
<li class="slide01">
  <div class="bg bg01">
    <video autoplay="autoplay" muted="muted" playsinline>
      <source src="/sh_img/index/main_banner/main_mov1.mp4" type="video/mp4">
    </video>
  </div>
</li>
<li class="slide02">
  <div class="bg bg02">
    <video autoplay="autoplay" muted="muted" playsinline>
      <source src="/sh_img/index/main_banner/main_mov2.mp4" type="video/mp4">
    </video>
  </div>
</li>
```

→ **원본은 MP4 2개를 번갈아 재생하는 슬라이드 구조**.
현재 KOIST 신규 홈피는 `hero_video_url` 단일 URL만 지원 (1개).

---

## 4. 관리자 모드 MP4 관리 현황

### 4.1 이미 구현된 기능

| 기능 | 구현 위치 | 상태 |
|------|----------|------|
| MP4 파일 업로드 API | `src/routes/admin.ts:529` `POST /api/admin/images` | ✅ **video/mp4, video/webm 허용** (L548) |
| R2 비디오 저장 | 동일 파일 L570 `videos/` 디렉토리 prefix | ✅ 구현 |
| 최대 업로드 크기 | L555 `20 MB` (MP4 전용) | ✅ koist 원본 4 MB에 충분 |
| Hero 비디오 URL 설정 | `hero_video_url` via `/admin → 배경·미디어` | ✅ |
| 비디오 투명도 슬라이더 | `hero_video_opacity` (0~1) | ✅ |
| 포스터 이미지 4종 (반응형) | `hero_video_poster_*` | ✅ |
| 렌더링 로직 | `home.tsx:620~660` | ✅ `<video>` + `<picture>` 포스터 + overlay |
| URL Sanitization | `home.tsx:622` XSS 방지 정규식 | ✅ v39.0 보안 패치 |

### 4.2 렌더링 파이프라인 (완성됨)

```
관리자 페이지 (/admin → 배경·미디어)
        │
        │ (1) MP4 선택·업로드 → images 테이블 + R2 `videos/` 저장
        │
        │ (2) hero_video_url 필드에 R2 URL 입력
        │
        │ (3) hero_video_opacity / poster 4종 설정
        ▼
site_settings 테이블 (DB)
        │
        │ (4) 홈 / 페이지 로드 시 home.tsx:620 에서 읽음
        ▼
<section class="unified-hero-section">
  <video autoplay muted loop playsinline poster="...">
    <source src="hero_video_url" type="video/mp4">
  </video>
  <div style="background:rgba(10,15,30, ${opacity});"></div>  ← overlay
</section>
```

### 4.3 **결론**: 3층(1층 = Hero)에 MP4 삽입 가능 여부

> **✅ 이미 100% 구현되어 있음. 코딩 없이 관리자 모드에서 즉시 사용 가능.**

사용자가 할 일:
1. `/admin` 로그인 → 좌측 **이미지 관리** 메뉴
2. `main_mov1.mp4`, `main_mov2.mp4` 업로드 (Cloudflare R2 자동 저장)
3. 업로드 후 반환되는 URL 복사
4. 좌측 **배경·미디어 관리** 메뉴 → **히어로 비디오 URL** 필드에 붙여넣기
5. 저장 → 즉시 Hero 배너에 MP4 자동 재생

---

## 5. 사용자 질문 "상단의 3층" 해석 옵션

사용자가 "홈피 상단의 3층"이라고 말했을 때 3가지 해석이 가능합니다:

| 해석 | 의미 | 결론 |
|------|------|------|
| **A. Hero = 1층** (본 보고서 채택) | 맨 위 큰 배너 = 1층 | ✅ 이미 MP4 지원됨 (hero_video_url) |
| **B. 상단 3개 층 = GNB + Topbar + Hero** | 네비게이션까지 포함 | ⚠️ GNB에 MP4는 UI/UX 비표준 |
| **C. 3번째 섹션(Accordion) 배경에 MP4** | 3번째 구역 (id=homeAccordionSection) | ⚠️ 현재 `#FFFFFF` 하드코딩, Phase 2 코딩 필요 |

**권장 해석: A**. 사용자의 실제 의도가 "원본 koist.kr 홈피처럼 첫 화면에 MP4 영상 재생"이라면 A가 정답입니다.

만약 **C 의미**라면: home.tsx:1282의 Accordion 섹션에 `hero_video_url` 독립 설정(`accordion_video_url` 신규 키)을 추가해야 합니다. 이는 **Phase 2 코딩 작업**으로 분리하는 것이 안전합니다.

---

## 6. 권장 Phase 분리

### Phase 1 (현재 v39.12 — 코딩 없음, DB만)
- ✅ 팝업2 `card_height_cm=NULL` 적용 (완료)
- ✅ 팝업3 `card_height_cm=NULL` 적용 (완료)

### Phase 2 (추후 — 승인 필요)
추후 승인 시 아래 항목을 선택적으로 구현:

1. **koist.kr 원본 MP4를 R2에 업로드 후 `hero_video_url` 설정**
   - 난이도: ⭐ (1시간)
   - 작업: `main_mov1.mp4` 업로드 → URL 저장
   - 결과: 홈피 1층에 원본 koist.kr와 동일한 MP4 재생

2. **하드코딩된 2층/3층/4층 배경을 site_settings 연동**
   - 난이도: ⭐⭐ (2시간)
   - 작업: `home.tsx:1212, 1282, 1603` 3곳을 `bgStyle(s.services_bg_url, ...)` 형태로 교체
   - 결과: 관리자가 2층·3층·4층 배경 이미지 업로드 가능

3. **팝업 카드 크기 관리자 UI 추가**
   - 난이도: ⭐⭐ (1.5시간)
   - 작업: `admin.post/put /popups`에 `card_width_cm`, `card_height_cm`, `card_image_w`, `card_image_h` 필드 추가 + 팝업 관리 HTML 폼 4개 입력 칸
   - 결과: 팝업 카드 크기를 UI에서 cm 단위로 조정 가능

4. **koist.kr 원본 2개 MP4 슬라이드 구조 재현**
   - 난이도: ⭐⭐⭐ (4시간)
   - 작업: `hero_video_url_2` 신규 키 + JS로 번갈아 재생
   - 결과: 원본 koist.kr과 완전 동일한 2개 MP4 슬라이드

---

## 7. 최종 결론

**질문 1: "팝업들과 홈피의 1층/2층/3층 배경이 모두 관리자 모드에서 관리되는가?"**
- ✅ 팝업 배경색: **가능**
- ✅ 1층 (Hero) 배경: **가능** (이미지/비디오/그라디언트 모두)
- ❌ 2층 (Services): **불가** — 하드코딩 `#FFFFFF`
- ❌ 3층 (Accordion): **불가** — 하드코딩 `#FFFFFF`
- ✅ 5층 (CTA), GNB, Footer: **가능**

**질문 2: "koist.kr 원본 MP4가 관리자 모드에서 관리되는가?"**
- 📦 koist.kr 원본 MP4 2개: `main_mov1.mp4`(2.7 MB) + `main_mov2.mp4`(1.4 MB), 총 4.1 MB, 공개 접근 가능
- ✅ **관리자 모드에서 MP4 업로드·적용 기능 100% 구현 완료** (R2 저장, 최대 20 MB, `hero_video_url` 설정, 포스터 4종, 투명도 조절 모두 지원)
- ✅ **홈피 상단 Hero(1층)에 MP4 삽입 가능 여부: 즉시 가능** (코딩 불필요)

**질문 3: 코딩 여부**
- 사용자 지시대로 **Phase 2 코딩은 진행하지 않음**.
- 본 보고서는 분석만 수행했으며, 추가 실행 여부는 사용자의 승인을 기다립니다.

---

**관련 파일**:
- 마이그레이션: `migrations/0040_popup_card_height_null.sql`
- 관리자 배경 패널: `src/templates/admin/background-media.tsx`
- 홈피 렌더링: `src/templates/home.tsx:606~1876`
- 관리자 API: `src/routes/admin.ts`

**배포 URL**: https://koist-website.pages.dev/
**GitHub**: https://github.com/wwwkoistkr/HOMEPAGE
