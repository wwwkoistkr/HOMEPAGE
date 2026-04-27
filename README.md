# KOIST Website v39.23

**(주)한국정보보안기술원** 공식 웹사이트 — **koist.kr 원본 디자인 완전 복제** (Scoped Legacy Theme)

## URLs
- **Production**: https://koist-website.pages.dev (메인)
- **v39.23 (Latest)**: /services/readiness 깨진 p40 이미지 6개 처리 (FontAwesome 대체)
- **v39.22**: 레거시 이미지 12종 → 10개 서비스 페이지 삽입
- **v39.21**: HERO/SIM 위치 미세조정 + SIM 반투명도 HERO 동기화
- **v39.20**: HERO↔SIMULATOR 좌우 교체 + 시뮬레이터 패널 70% 불투명 (Glassmorphism)
- **Latest Deploy**: https://1c8cd969.koist-website.pages.dev (v39.7 — 원본 디자인)
- **Previous (v39.6)**: https://4666afa7.koist-website.pages.dev (콘텐츠 마이그레이션)
- **Previous (v39.5)**: https://dab84020.koist-website.pages.dev (슬라이더 폰트)
- **GitHub**: https://github.com/wwwkoistkr/HOMEPAGE
- **관리자**: /admin
- **사업분야 관리**: /admin/departments (v39.7에서 **원본 디자인 토글** + 영문 서브타이틀 + WYSIWYG)
- **슬라이더 UI 설정**: /admin/slider-settings (v39.4)

## 🛠️ v39.23 — /services/readiness 깨진 p40 이미지 6개 처리 (2026-04-27)

### 배경
v39.22 작업 중 발견: `/services/readiness/overview`, `/services/diagnosis/readiness` 두 페이지에 v39.22 이전부터 누락된 이미지 6개(`p40_img.png`, `p40_select1~5.png`)가 깨진 링크로 존재. koist.kr 원본 사이트에서도 이미 404 (사이트 측 삭제) → R2 업로드 불가.

### 처리 전략
1. **`p40_img.png`** (figure '정보보호 준비도 등급 평가서') → **단순 제거**
2. **`p40_select1~5.png`** (icon cards) → **FontAwesome 아이콘으로 대체**
   | 분야 | 아이콘 | 색상 |
   |------|--------|------|
   | 개인정보 보호 | `fa-user-shield` | emerald `#10B981` |
   | 금융분야 | `fa-coins` | amber `#F59E0B` |
   | 의료분야 | `fa-heart-pulse` | red `#EF4444` |
   | 교육분야 | `fa-graduation-cap` | blue `#3B82F6` |
   | 기타 산업별 요구사항 | `fa-industry` | indigo `#6366F1` |

### 검증 결과 (Production)
- p40 깨진 링크: **6 → 0** (양 페이지)
- FontAwesome 아이콘: **5/5** 렌더링
- Playwright 콘솔 JS 에러: **10 → 5** (404 5건 모두 제거; 남은 5건은 Google Ads CSP — 별개 이슈)

### 마이그레이션
- `migrations/0052_v3923_fix_p40_broken_images.sql` (3 commands)
- 멱등 마커: `<!-- KOIST-P40-FIX-v39.23 -->`
- FontAwesome은 `layout.tsx`에 이미 로드되어 있어 추가 의존성 0

---

## 🖼️ v39.22 — KOIST 레거시 이미지 12종 → 10개 서비스 페이지 삽입 (2026-04-27)

### 목표
원본 koist.kr 의 핵심 시각자료(KOLAS 인정마크, 절차 step 아이콘, 등급/분야 다이어그램)를 신규 사이트의 서비스 페이지에 통합 — 사용자 신뢰성 + 정보전달력 향상.

### 작업 내용
1. **슬라이더 우측 1.5cm 이동** — `sim_offset_left_cm: -2.5 → -1.0` (DB만 수정, 즉시 반영)
2. **12개 PNG 이미지 R2 업로드** — `koist-images/legacy-icons/` prefix
3. **10개 서비스 페이지에 이미지 섹션 추가** — `dep_pages.content` UPDATE × 10
4. **멱등 마커**: `<!-- KOIST-LEGACY-IMAGES-v39.22 -->` (재실행 시 중복 방지)

### 페이지별 삽입 결과 (Production 검증 완료)
| 페이지 | 이미지 수 | 출처 |
|--------|----------|------|
| `/services/performance/overview` | 1 (p50_img) | test2/summary |
| `/services/certificate` | 1 (kolas) | test3/page01 |
| `/services/certificate/rnd` | 4 (p48_step1~4) | test3/page02 |
| `/services/certificate/ai` | 4 (p48_step1~4) | test3/page03 |
| `/services/certificate/network` | 4 (p48_step1~4) | test3/page04 |
| `/services/diagnosis/ddos` | 3 (p48_step2~4) | test4/page02 |
| `/services/consulting/cc` | 4 (p48_step1~4) | consulting/cc |
| `/services/consulting/kcmvp` | 4 (p48_step1~4) | consulting/vcm |
| `/services/consulting/isms-p` | 4 (p48_step1~4) | consulting/isms_p |
| `/services/readiness/overview` | 6 (p54_ctf + p55_icon1~5) | test4/page01 |

### 기술 세부사항
- **이미지 서빙**: `/api/images/legacy-icons/{filename}.png` → R2 → 200 OK (캐시 max-age=31536000 immutable)
- **CSS 재활용**: 기존 `.koist-legacy-theme ul.process` 클래스 (style.css 145행)
- **HTML 구조**: 마지막 "문의 및 상담" 섹션 **앞에** 신규 `<section class="service-section">` 삽입
- **Mixed Content 안전**: 모든 URL 같은 도메인 (HTTPS only)
- **DB 변경**: `migrations/0051_v3922_legacy_images.sql` (10 UPDATE문, 696 lines)

### 검증
- ✅ 10/10 페이지 이미지 렌더링 OK (총 35 인스턴스)
- ✅ 12/12 R2 이미지 HTTP 200 OK
- ✅ 멱등성 (마커 중복 방지)

### 백업 / 롤백
- **사전 백업 (v39.21+위치조정 기준)**: https://www.genspark.ai/api/files/s/1fJE1JDT (35.99 MB)
- **사후 백업 (v39.22 완료)**: https://www.genspark.ai/api/files/s/CadpDQkQ (36.02 MB)
- **롤백**: `git revert 69dd0e2` 또는 `migrations/0051_v3922_legacy_images.sql` 역산 SQL 실행

---

## 🎨 v39.7 — koist.kr 원본 디자인 완전 복제 (Scoped Legacy Theme, 2026-04-22)

### 목표
v39.6 에서 콘텐츠 마이그레이션은 완료했으나 "디자인이 원본과 다르다"는 사용자 피드백에 대응.
**원본 koist.kr 의 네이비(`#005f9b`) 기반 정의형 레이아웃** 을 서비스 페이지에 픽셀 단위로 복제.

### 핵심 결과
- **14/14 픽셀 속성 원본과 100% 일치** (section-title 200px, bullet 4×4px #005f9b, image-box 50px padding #f5f5f5 등)
- **Scoped**: `.koist-legacy-theme` 네임스페이스 → 홈/관리자/공지 영향 **0**
- **Feature Flag**: `departments.use_legacy_theme` → 부서별 ON/OFF + 즉시 롤백 가능
- **Admin 호환**: v39.6 HTML 에디터 편집 시 원본 디자인 자동 적용
- **테스트**: 로컬 8/8 + 프로덕션 6/6 + 슬라이더 회귀 6/6 = **20/20 통과**

### 신규/변경 파일 (8개)
- `public/static/style.css` (+594 LoC, `.koist-legacy-theme` 블록)
- `src/templates/layout.tsx` (+4 LoC, `/static/style.css` 링크 추가 + Play 폰트)
- `src/templates/pages.tsx` (±18 LoC, dual-theme 분기 렌더링)
- `src/types.ts`, `src/routes/admin.ts`, `public/static/js/admin-departments.js`
- `migrations/0031_legacy_theme_flag.sql` (use_legacy_theme + english_subtitle)
- `migrations/0032_certificate_overview_hotfix.sql` (고아 `</div>` 제거)

### 🐛 숨겨진 버그 수정
v39.6 이 `public/static/style.css` 에 추가한 `.service-*` CSS 규칙이 **`layout.tsx` 에 `<link>` 태그 부재로 실제 로드되지 않고 있었음** → v39.7에서 `<link href="/static/style.css">` 추가로 해결. **v39.6 의 콘텐츠 마이그레이션도 이제 비로소 시각적으로 반영됨**.

---


## 📄 v39.6 — 원본 koist.kr 25개 사업분야 하위페이지 1회 크롤링 마이그레이션 (2026-04-22)

### 목표
현재 `/services/:dept/:page` 페이지들이 원본 http://www.koist.kr 대비 구조/배열/섹션이 누락되어 단순 텍스트만 표시되던 문제를 해결하기 위해, **원본 사이트에서 25개 하위페이지를 1회 배치 크롤링**하여 DB에 자동 마이그레이션.

### 핵심 숫자
- **25개 페이지** 성공적 크롤링 & 마이그레이션 (27개 대상 중 2개는 원본에 URL 부재)
- **콘텐츠 증가**: 총 1,898 B → **114,176 B (60×)**, 평균 76 B → 4,567 B
- **신규 이미지**: 62개 이미지 모두 **HTTPS 프록시**로 재작성 (Mixed Content 0건)
- **변환 규칙 7종**: `dl.dl_cm`→`section`, `dl.num_dl_cm`→`ol.service-steps`, `ul.ul_dot_cm`→`ul.service-bullets`, `div.img_box`→`figure.service-image`, 기타

### HTTPS 이미지 프록시 라우트 (신규)
`GET /api/images/legacy/*`
- 서버→서버 fetch(`http://www.koist.kr/...`) + Cloudflare Edge Cache 1년
- Path traversal/절대 URL 인젝션 방어 (HTTP 400 반환)
- 예: `/api/images/legacy/sh_page/img/p38_img.png` → 32.6 KB PNG ✅

### 콘텐츠 구조 변환 예시
| 원본 (koist.kr) | v39.6 변환 결과 |
|-|-|
| `<dl class="dl_cm"><dt>개요</dt><dd>…</dd></dl>` | `<section class="service-section"><h3>개요</h3>…</section>` |
| `<ul class="ul_dot_cm">` | `<ul class="service-bullets">` + CSS `::before` 파란 점 |
| `<div class="img_box"><img src="/sh_page/img/x.png"/></div>` | `<figure class="service-image"><img src="/api/images/legacy/sh_page/img/x.png" loading="lazy"></figure>` |

### 관리자 편집 호환성
모든 변환된 HTML은 기존 `sanitizeHtml()` allowlist 내에 있으므로 관리자 WYSIWYG 에디터에서 **자유롭게 수정/저장** 가능.

### 검증 결과
- ✅ **Local Playwright**: 23/23 페이지 통과, Mixed Content 0건, 페이지 에러 0건
- ✅ **Production Playwright**: 5/5 샘플 페이지 통과, Mixed Content 0건
- ✅ **v39.5 슬라이더 회귀**: 6/6 통과 (1920px 폰트 크기 정확)
- ✅ **D1 마이그레이션**: local + production 모두 26 commands OK

## 🔤 v39.5 — AI 시뮬레이터 슬라이더 월수 글자 +50% 확대 (2026-04-21)

### 목표
사용자 요구: **CCRA / KOIST 슬라이더 바에 표시된 준비·평가·총 월수 6개 텍스트의 글자 크기를 50% 확대**하여 가독성을 WCAG 권장 16px 수준으로 개선.

### 변경 사항
| 대상 ID | 위치 | 이전 `clamp()` | 신규 `clamp()` | +50% |
|---------|------|--------------|--------------|:---:|
| `ealGeneralTotal` | CCRA 총월수 | `0.68rem, 0.73vw, 3.5rem` | `1.02rem, 1.095vw, 5.25rem` | ✅ |
| `ealGeneralPrep` | CCRA 준비월수 | `0.6rem, 0.68vw, 3.25rem` | `0.9rem, 1.02vw, 4.875rem` | ✅ |
| `ealGeneralEval` | CCRA 평가월수 | 동일 | 동일 | ✅ |
| `ealKoistTotal` | KOIST 총월수 | `0.68rem, 0.73vw, 3.5rem` | `1.02rem, 1.095vw, 5.25rem` | ✅ |
| `ealKoistPrep` | KOIST 준비월수 | `0.6rem, 0.68vw, 3.25rem` | `0.9rem, 1.02vw, 4.875rem` | ✅ |
| `ealKoistEval` | KOIST 평가월수 | 동일 | 동일 | ✅ |

### 모바일 오버플로우 Guard (신규)
폰트 +50% 확대 시 좁은 모바일(<480px)에서 Prep/Eval 텍스트가 바 폭을 초과 → **3단계 자동 축약**:
1. **1차 축약**: `준비 6개월` → `6개월` (바 폭 < P+E+36px일 때)
2. **2차 축약**: `6개월` → `6` (바 폭 < P+E+24px일 때)
3. **3차 축약**: Eval 숨김 (바 폭 < P+E+12px일 때)

모든 조치는 JS 런타임에서 동작하며, 데스크톱 해상도에서는 영향 없음.

### 검증 결과
- ✅ **폰트 크기**: 375/768/1440/1920px 모두 정확히 **1.500× 확대** 측정
- ✅ **v39.4 정합성 회귀**: 4레벨 × 10포지션 × 3항목 = **120/120 통과** (JS 오류 0)
- ✅ **프로덕션 오버랩 검증**: 3해상도 × 4레벨 × 10포지션 × 2바 = **240/240 통과**
- ✅ **WCAG 1.4.4**: 모바일 최소 폰트 9.6px → **14.4px**로 상승 (16px 근접)

## 🎨 v39.4 — 슬라이더 UI 관리자 제어 (2026-04-21)

### 목표
AI 시뮬레이터 히어로 배너에 표시되는 **모든 숫자 포맷·색상·반올림 정책**을 관리자 모드에서 실시간으로 제어할 수 있도록 통합.

### 신규 기능 (32개 설정 키, category='slider')
| 그룹 | 키 개수 | 대표 키 |
|---|:---:|---|
| 반올림·표시 정책 | 4 | `slider_total_mode` (sum/round/decimal), `slider_round_mode` |
| 텍스트 포맷 템플릿 | 7 | `slider_total_format` ("약 {N}개월") |
| CCRA 바 | 4 | `slider_gen_prep_color`, `slider_gen_eval_color` |
| KOIST 바 | 4 | `slider_koist_prep_color`, `slider_koist_eval_color` |
| 사전준비 트랙 4단계 | 5 | `slider_track_color_1` ~ `_4` |
| 단축률 뱃지 | 3 | `slider_badge_grad_start`/`_end` |
| 분배 비율 & 변환 | 5 | `slider_gen_prep_ratio`, `slider_weeks_per_month` |

### 관리자 UI (`/admin/slider-settings`)
- 🎨 **라이브 프리뷰**: 색상 변경 즉시 샘플 바에 반영
- 🔧 **컬러 피커 + HEX 동기화**: 양방향 입력
- 📦 **4종 프리셋**: 기본 / 모노톤 / 다크 / 파스텔 (1클릭 전체 적용)
- 🔄 **전체 기본값 복원** 버튼
- 💾 **전체 저장** (한 번의 PUT 요청으로 32개 키 일괄 처리)

### API 엔드포인트 (신규)
- `GET  /api/admin/slider-settings` — 전체 조회
- `PUT  /api/admin/slider-settings` — 일괄 저장 `{key: value, ...}`
- `POST /api/admin/slider-settings/reset` — 기본값 복원
- `POST /api/admin/slider-settings/preset/:name` — 프리셋 적용 (default/monotone/dark/pastel)

### 핵심 "합계 정합성" 옵션
- `slider_total_mode = 'sum'` (기본·권장): **round(준비) + round(평가) = 총합** — 108/108 정합
- `slider_total_mode = 'round'`: round(total) — v39.2 이전 방식, ±1개월 오차 허용
- `slider_total_mode = 'decimal'`: 소수 N자리 표시 ("8.3개월") — 정합성 100%

### 검증 결과 (Playwright, 프로덕션)
- CCRA 바 정합성: **36/36 (100%)**
- KOIST 바 정합성: **36/36 (100%)**
- 절감값 정합성: **36/36 (100%)**
- 합계 **108/108 포인트 PASS**, 0 에러
- SLIDER_CFG 주입: 27 keys 정상 로드 확인
- E2E: DB 색상 변경 → 홈페이지 즉시 반영 확인

### 변경 파일
- `migrations/0029_slider_admin_settings.sql` — 신규 32개 키 INSERT
- `src/routes/admin.ts` — slider-settings CRUD + preset + reset API
- `src/templates/admin/index.tsx` — 메뉴에 "슬라이더 UI 설정" 추가
- `src/index.tsx` — `/admin/slider-settings` 페이지 라우트
- `src/templates/home.tsx` — SLIDER_CFG 주입 + 모든 하드코딩 색상을 DB 값으로 대체
- `public/static/js/admin-slider-settings.js` — 관리자 UI (신규, ~500줄)

---

## 🎯 v39.3 — CCRA/KOIST 바 합계 = 준비+평가 정합성 (2026-04-21)

### 문제
EAL2·EAL4 설정 시 "바 위 N개월" ≠ "바 안의 준비 + 평가 개월 합" (±1개월 차이).

### 원인
`Math.round(a) + Math.round(b) ≠ Math.round(a+b)` — 각자 반올림 시 최대 1의 오차 발생.

### 해결 (Option C)
`displayTotal = round(prep) + round(eval)` 강제 → 108/108 포인트 100% 정합.

### 관련 문서
- `docs/FINAL_PRECISION_ANALYSIS_v39.3_EAL2_EAL4_20260421.md`
- `docs/BAR_TOTAL_MISMATCH_ANALYSIS_20260421.md`
- `docs/PRECISION_ANALYSIS_REPORT_v39.2.1_20260421.md`
- `docs/SLIDER_ADMIN_CONTROL_FEASIBILITY_20260421.md`

---

## 🎯 v39.1 AI 시뮬레이터 감도 개선 패치 (2026-04-21)

### 문제 요약
관리자 모드 `/admin/sim-cert-types`에서 CC평가 EAL2/EAL3/EAL4의 **CCRA 평가일수** 및 **KOIST 기간**을 수정해도 홈 Hero의 AI 시뮬레이터에 **반영되지 않는 문제**. 정밀 분석 결과 원인은 렌더링 파이프라인의 **3단계 정수 반올림으로 인한 감도 상실**로 판명.

### 패치 #1+#2 — `simTypeToEal` 전면 재설계 (`src/templates/home.tsx`)
- **W2M 표준화**: 4.33 → 4.345 (52주/12개월)
- **반올림 손실 제거**: 내부 계산은 소수점 1자리(`round1`) 유지, `Math.round()`는 최종 표시 단계(클라이언트 JS)에서만 1회 적용
- **`traditional_min_weeks` 활용**: 일반(CCRA) 기간도 슬라이더 값에 따라 `min ~ max`를 보간하도록 `general.prepMin/prepMax/evalMin/evalMax`를 ealData에 추가 (기존 "유령 필드" 해소)
- **분배 상수 명명**: `G_PREP_RATIO`, `G_EVAL_RATIO`, `K_PREP_RATIO`, `K_EVAL_RATIO` 상수화
- **개선 효과**: EAL2의 `koist_max_weeks`를 16→17주(1주)만 바꿔도 `prepMax`가 1.5→1.6, `evalMax`가 2.2→2.3으로 **즉시 반영** (v39.0은 모두 2/2로 동일)

### 패치 #3 — Hero Badge(%) 초기값 서버사이드 주입 (`src/templates/home.tsx`)
- 기존: `unified_reduction_default || '35'` 고정값 → 슬라이더 움직여야 실제값 표시
- 변경: `unified_reduction_default`가 비어있으면 서버가 `computeReductionAt(entryOverall, 50)`을 실행해 실제 계산값 주입
- **검증**: `unified_reduction_default=''`일 때 Badge에 `70%`(실제 계산값) 자동 표시 확인 ✅

### 패치 #4 — 관리자 UI 안내 강화 (`public/static/js/admin-sim-cert-types.js`)
- CC평가 EAL2/EAL3/EAL4만 홈에 반영됨을 명시
- "최소(사전준비 100%)" vs "최대(사전준비 1%)" 의미 상세 설명
- v39.1 배지 및 개선 사항 안내 박스 추가

### 감도 검증 결과 (EAL2 기준, 슬라이더=50)
| koist_min | koist_max | v39.0 reduction | v39.1 reduction | 비고 |
|---|---|---|---|---|
| 4주 | 16주 (현재) | 62% | 63% | 기준 |
| 4주 | 17주 (+1) | 62% (변화없음) | **62% (변화!)** | ✅ 1주 민감 |
| 5주 | 17주 (+1,+1) | 62% | **60%** | ✅ 즉시 반영 |
| 4주 | 20주 (+4) | 62% | **56%** | ✅ 크게 반영 |
| 20주 | (trad_min=15로) | 63% | **60% (slider=50)** | ✅ trad_min도 반영 |

**테스트 조합 54가지 중 52가지가 변화를 보임** (v39.0은 테스트 전체가 62% 고정).

### End-to-End 프로덕션 검증 (2026-04-21)
```
[EAL2 koist_max: 16 → 17 변경 직후]
Before: koist:{prepMin:0.4, prepMax:1.5, evalMin:0.6, evalMax:2.2}
After:  koist:{prepMin:0.4, prepMax:1.6, evalMin:0.6, evalMax:2.3}  ✅ 즉시 반영
```

### 관련 분석 보고서
- `docs/AI_SIMULATOR_ANALYSIS_REPORT_v2_20260421.md` - 정밀 원인 분석 (반올림 손실 규명)
- `docs/SLIDER_ANALYSIS_REPORT_20260421.md` - 초기 구조 분석

---

## 🔒 v39.0 XSS 긴급 보안 패치 (2026-04-20)

### 보안 점검 결과 대응 (KOIST v38.3 종합분석보고서 기준)

| # | 취약점 | 파일 | 위험도 | 조치 | 상태 |
|---|--------|------|--------|------|------|
| 1 | Stored XSS - site_settings | `layout.tsx` (24곳) | 🔴 Critical | `escapeHtml`/`escapeAttr`/`safeUrl` 적용 | ✅ |
| 2 | Stored XSS - site_settings/popup/notice | `home.tsx` (50+곳) | 🔴 Critical | 전체 이스케이프 + `safeColor`/`safeFaIcon`/`safeOpacity` 적용 | ✅ |
| 3 | Stored XSS - progress_items/dept/notice | `pages.tsx` (DB 필드 다수) | 🔴 Critical | `product_name`, `category`, `assurance_level`, `cert_type`, `eval_type` 등 모두 이스케이프 | ✅ |
| 4 | Reflected XSS - 검색/카테고리 필터 | `pages.tsx` (`q`, `category`, `status` 쿼리) | 🔴 Critical | `escapeHtml`/`escapeAttr` 입력값 이스케이프 | ✅ |
| 5 | HTML 인젝션 - `<source src>` 속성 | `home.tsx` hero_video_url | 🔴 Critical | 화이트리스트 정규식 검증 + `escapeAttr` | ✅ |
| 6 | CSS 인젝션 - `background-image` URL | `home.tsx` hero_bg_url | 🟠 High | `bgStyle()` 탈출문자 검증 + `safeOpacity` | ✅ |
| 7 | CSS 인젝션 - `color`/`background` hex | 모든 템플릿 | 🟠 High | `safeColor()`로 hex/rgb/hsl/named 색상만 허용 | ✅ |
| 8 | Attribute 인젝션 - `fa-` icon class | 모든 템플릿 | 🟠 High | `safeFaIcon()`로 `fa-[a-z0-9\-]+` 패턴만 허용 | ✅ |
| 9 | URL 인젝션 - `javascript:` 프로토콜 | 모든 링크 | 🟠 High | `safeUrl()`로 위험 프로토콜 차단 | ✅ |
| 10 | CSP `unsafe-eval` | `index.tsx` | 🟡 Medium | **연기** - Tailwind CDN JIT 필수 의존 (중기 과제로 분리) | ⏸️ |

### 새로 추가된 보안 유틸리티 (`src/utils/sanitize.ts`)

```typescript
escapeHtml(unknown) → string      // & < > " ' null/undefined 안전
escapeAttr(unknown) → string      // + 백틱(`) 추가 방어
safeUrl(unknown) → string         // javascript: / vbscript: / data:text/* 차단
safeCss(unknown) → string         // {}, /* */, expression(), url(), @import 제거
safeColor(unknown) → string       // #abc / rgb() / rgba() / hsl() / 색상명만 허용
safeFaIcon(unknown) → string      // /^fa-[a-z0-9\-]+$/i 패턴만 허용
safeOpacity(value, fallback)      // 0.0 ~ 1.0 숫자만 (home.tsx 로컬)
safeNum(value, fallback)          // 숫자/숫자문자열만 (home.tsx 로컬)
```

### XSS 방어 테스트 통과

```
Payload                                    → 결과
<script>alert(1)</script>                  → &lt;script&gt;alert(1)&lt;/script&gt;  ✅
"><img src=x onerror=alert(1)>             → &quot;&gt;&lt;img...&gt;               ✅
javascript:alert(1)                        → 링크에 삽입되지 않음 (safeUrl 차단)   ✅
'; alert(1);//                             → &#039;; alert(1);//                    ✅
```

### 수정 파일 (v39.0)
- `src/utils/sanitize.ts` — 보안 유틸리티 6종 추가/강화
- `src/utils/db.ts` — 이스케이프 함수 re-export
- `src/templates/layout.tsx` — 24개 site_settings 이스케이프
- `src/templates/home.tsx` — 50+곳 이스케이프 + hero video/bg URL 검증
- `src/templates/pages.tsx` — Reflected XSS + DB 필드 이스케이프 (progressPage, serviceProgressContent, servicePage, noticeListPage, noticeDetailPage, downloadsPage)

### 롤백 백업
- `/home/user/webapp-backup-20260420-100642/` — 패치 전 스냅샷

### 연기된 중기 과제
- **CSP `unsafe-eval` 제거**: Tailwind CDN(https://cdn.tailwindcss.com) 런타임 JIT 컴파일러가 eval()을 사용하므로, 제거하려면 Tailwind CLI로 CSS를 프리빌드하여 정적으로 서빙하는 리팩터링 필요 (예상 2-3일). 현재는 CSP 다른 레이어(`frame-src 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`)로 공격면 차단.

---

## v38.1 Hero UI 4가지 추가 변경 (2026-04-20)

| # | 항목 | Before | After | 상태 |
|---|------|--------|-------|------|
| 1 | 1층 로고 | 349×71px | 245×50px (30% 축소) | ✅ |
| 2 | 뱃지 텍스트 | 33.12px | 19.87px (60% 축소) | ✅ |
| 3 | CTA 버튼 글자 | 11.14px | 15.59px (40% 확대) | ✅ |
| 4 | 슬라이더 위치 | left 791, right 1772 | left 923 (GNB "시" 정렬), right 1678 (-2.5cm) | ✅ |

## v38.0 Hero UI 6가지 변경 (2026-04-20)

### 변경사항

| # | 항목 | Before | After | 상태 |
|---|------|--------|-------|------|
| 1 | KOLAS 인정마크 | 112×65px | 56×32px (2배 축소) | ✅ |
| 2 | 뱃지 (3층) | 초록점 + 11px 텍스트 | KOIST 로고 + 33px 텍스트 (3배) | ✅ |
| 3 | 히어로 제목/서브타이틀 | h1 88px 제목 + p 12.7px 서브 | 제목 삭제 → 서브타이틀 h1 승격 25.3px | ✅ |
| 4 | CTA 버튼 | 256×37px, 268×37px | 195×37px, 207×37px (가로 30% 축소) | ✅ |
| 5 | 연락처 카드 | 380px 폭, gap 9.4/17.3px | 418px (+1cm), gap 4.8/8.6px (50% 축소) | ✅ |
| 6 | 시뮬레이터 패널 | left 778px, width 1076px | left 891px (GNB "가" 정렬), width 981px (-2.5cm) | ✅ |

### 반응형 지원
- **8K (7680px)**: 전용 미디어쿼리 + 스케일링
- **4K (3840px)**: 전용 미디어쿼리
- **2.5K (2560px)**: 전용 미디어쿼리
- **Tablet (≤1023px)**: 1컬럼 스택
- **Mobile (≤639px)**: 모바일 최적화
- **Small Mobile (≤375px)**: 최소 글꼴 보장

### 수정 파일
- `src/templates/home.tsx` — 히어로 섹션 HTML + CSS
- `src/templates/layout.tsx` — KOLAS 마크 크기
- `public/static/images/koist-circle-logo.png` — 뱃지 로고 (신규)

---

## v37.0 보안 강화 (2026-04-18)

### Security Changes

| # | 항목 | 내용 |
|---|------|------|
| A-1 | Admin 자동생성 제거 | `GET /api/init-db` 삭제, 로그인 시 자동생성 제거. `scripts/init-admin.cjs`로만 생성 |
| A-2 | JWT Secret 강화 | `JWT_SECRET_DEFAULT` 삭제, 32자 미만 거부, 500 반환 |
| A-3 | XSS 차단 | `src/utils/sanitize.ts` 신설, 모든 DB-origin HTML에 sanitizeHtml/escapeHtml 적용, 31개 테스트 |
| A-4 | Cookie 기반 인증 | HttpOnly Set-Cookie, logout API (`POST /api/admin/logout`), 클라이언트 cookie 제거 |
| A-5 | Security Headers & CSRF | CSP, X-Frame-Options: DENY, HSTS, Referrer-Policy, Permissions-Policy. Double-submit CSRF cookie |
| A-6 | Rate Limiting | KV 기반 rate limiter: 로그인 5회/5분, 문의 3회/1시간 |
| A-7 | Upload 검증 | Magic bytes 검증 (JPEG/PNG/GIF/WebP), SVG 차단, SSRF 방지 (private IP 차단) |
| A-8 | Migration 정리 | `migrations/NOTES.md` 문서화, 중복번호/누락 기록 |
| A-9 | UI Migration 아카이브 | 팝업 크기조정 마이그레이션 6개 → `migrations/archive/` 이동 |
| A-10 | 데이터 일관성 | `0025_normalize_defaults.sql` - status 기본값 설정 |
| A-11 | 템플릿 리팩터 | layout.tsx CSS → `partials/layout-css.ts` 분리 (2111 → 986 LOC) |
| A-12 | Tailwind 빌드 | Deferred — Tailwind v4 CSS-first 방식, CDN 유지 |

### 관리자 계정 설정

하드코딩된 기본 관리자(`admin/admin1234`)가 **제거**되었습니다.

```bash
# 로컬 개발
ADMIN_USERNAME=myadmin ADMIN_PASSWORD='SecurePass123!' npm run db:init-admin:local

# 프로덕션
ADMIN_USERNAME=myadmin ADMIN_PASSWORD='SecurePass123!' npm run db:init-admin
```

첫 로그인 시 비밀번호 변경이 강제됩니다.

### JWT Secret 설정 (필수)

```bash
# 프로덕션 (Cloudflare Secret)
npx wrangler secret put JWT_SECRET --project-name koist-website
# 32자 이상 랜덤 문자열 입력

# 로컬 개발 (.dev.vars 파일)
echo 'JWT_SECRET=your-local-secret-at-least-32-characters-long' > .dev.vars
```

### KV Rate Limiter 설정

```bash
# KV namespace 생성
npx wrangler kv namespace create RATE_LIMIT_KV
# 출력된 ID를 wrangler.jsonc에 반영
```

## 주요 기능

### 10개 사업 평가현황 (각 사업별 독립 현황)
| # | 카테고리 | 동적 필드 |
|---|---------|----------|
| 1 | CC평가 | 보증등급 / 인증구분 / 신청구분 |
| 2 | 보안기능확인서 | 확인서등급 / 발급구분 / 시험유형 |
| 3 | KCMVP | 검증등급 / 모듈유형 / 알고리즘 |
| 4 | 성능평가 | 성능등급 / 평가구분 / 평가항목 |
| 5 | 보안적합성검증 | 적합등급 / 검증구분 / 검증기준 |
| 6 | 취약점분석평가 | 위험등급 / 분석유형 / 평가범위 |
| 7 | 정보보호제품평가 | 평가등급 / 제품유형 / 평가기준 |
| 8 | 클라우드보안인증 | 인증등급 / 서비스유형 / 인증기준 |
| 9 | IoT보안인증 | 인증등급 / 기기유형 / 인증기준 |
| 10 | 기타시험평가 | 등급 / 유형 / 기준 |

### 보안 아키텍처
- **인증**: HttpOnly Cookie + JWT (PBKDF2-SHA256, 100K iterations)
- **CSRF**: Double-submit cookie (`koist_csrf`)
- **XSS**: Allowlist-based HTML sanitiser (script/iframe/event handler 제거)
- **Headers**: CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy
- **Rate Limit**: Cloudflare KV 기반 (로그인 5/5min, 문의 3/1h)
- **Upload**: Magic bytes 검증, SVG 차단, SSRF 방지

## 기술 스택
- **Backend**: Hono 4.x + Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (이미지)
- **KV**: Cloudflare KV (rate limiting)
- **Frontend**: Tailwind CSS (CDN) + FontAwesome + AOS Animation
- **Build**: Vite 6 + @hono/vite-build/cloudflare-pages
- **Deploy**: Cloudflare Pages

## 개발 환경
```bash
npm install
npm run build
npm run dev:sandbox  # 로컬 개발 서버 (wrangler pages dev)
```

## 배포
```bash
npm run build
npx wrangler d1 migrations apply koist-website-db
npx wrangler pages deploy dist --project-name koist-website
```

## 데이터 아키텍처
- **progress_items**: 평가현황 (category, product_name, company, status, ...)
- **departments**: 사업분야
- **dep_pages**: 사업분야 하위 페이지
- **notices**: 공지사항
- **faqs**: FAQ
- **inquiries**: 상담문의
- **popups**: 팝업
- **site_settings**: 사이트 설정 (key-value)
- **admin_users**: 관리자 계정 (PBKDF2 해시)
- **images**: R2 이미지 메타데이터
- **about_pages**: 소개 페이지
- **sim_cert_types**: AI 시뮬레이터 인증유형

## 프로젝트 구조
```
src/
├── index.tsx                    # Hono 앱 엔트리, 라우팅, 미들웨어 체인
├── types.ts                     # TypeScript 타입 정의 (Bindings, Variables, 엔티티)
├── middleware/
│   ├── auth.ts                  # JWT 인증 미들웨어 (cookie + bearer)
│   ├── csrf.ts                  # CSRF double-submit cookie
│   └── rate-limit.ts            # KV 기반 rate limiter
├── routes/
│   ├── admin.ts                 # 관리자 CRUD API
│   └── api.ts                   # 공개 API
├── utils/
│   ├── crypto.ts                # PBKDF2 해시, JWT 생성/검증
│   ├── db.ts                    # DB 헬퍼 (settings, departments)
│   └── sanitize.ts              # XSS 방지 HTML sanitiser
├── templates/
│   ├── layout.tsx               # 메인 레이아웃 (986 LOC)
│   ├── home.tsx                 # 홈페이지 템플릿
│   ├── pages.tsx                # 서비스/공지/FAQ/문의/평가현황/다운로드
│   ├── admin/index.tsx          # 관리자 로그인/대시보드 템플릿
│   └── partials/
│       ├── layout-css.ts        # CSS 디자인 시스템 (1134 LOC)
│       └── index.ts             # 배럴 export
├── __tests__/
│   └── xss.test.ts              # XSS sanitiser 테스트 (31개)
scripts/
└── init-admin.cjs               # 관리자 계정 생성 스크립트
migrations/
├── 0001-0023                    # 스키마 마이그레이션
├── 0024_admin_seed_guard.sql    # admin_users UNIQUE index
├── 0025_normalize_defaults.sql  # 데이터 정합성
├── archive/                     # 아카이브된 UI 조정 마이그레이션
└── NOTES.md                     # 마이그레이션 문서
```

## 배포 상태
- **Platform**: Cloudflare Pages
- **Status**: Active
- **D1 DB**: koist-website-db (91f1eb2f-e9fa-45e8-8bea-4958ce74727a)
- **Version**: v37.0 (Security Hardening)
- **Last Updated**: 2026-04-18
