# v39.8 13개 서비스 페이지 원본 복제 작업 — 사전 분석보고서

**작성일**: 2026-04-22
**작성자**: Genspark 코딩 전문가
**대상 브랜치**: main
**문서 상태**: **분석/타당성 검토만 수행 — 코딩은 착수하지 않음**

---

## 1. 결론(TL;DR)

| 항목 | 결과 |
|---|---|
| **기술적 실행 가능 여부** | ✅ **전부 구현 가능** (9개 고유 URL, 13개 요청 = 중복 4건) |
| **해결해야 할 **중대** 문제** | 🚨 **요청 #9 `/services/mock-test/overview`는 존재하지 않는 URL** — 사용자 확인 필요 |
| **재사용 가능한 기반** | ✅ v39.7 `.koist-legacy-theme` + v39.7.1 굵은체 + `.cc-apply-flex`/`.cc-eal-table` 전부 재사용 가능 |
| **신규 필요 컴포넌트** | 2개 — 품질특성 그리드(`quality-grid`, test3/page01), 준비도 등급 카드(`grade-card`, test4/page01) |
| **예상 작업 시간** | **3~4시간** (마이그레이션 1개 파일, CSS +150~200줄, 검증 포함) |
| **신규 크롤링 필요 여부** | ❌ 불필요 (본 보고서에 9개 원본 전체 텍스트/이미지 URL 확보 완료) |
| **신규 이미지 다운로드 필요 여부** | ❌ 불필요 (`/api/images/legacy/*` 프록시가 전부 커버) |
| **의존성 변경** | ❌ 없음 |
| **DB 스키마 변경** | ❌ 없음 (기존 `dep_pages.content` UPDATE만 사용) |

---

## 2. 요청 사항 정리 — 중복 제거 후 실제 작업 건수

사용자가 13개 요청으로 표기했으나, URL 매핑을 정리하면 **원본 URL 9개 → 대상 URL 13개 (7·1번, 13·6번 중복)**입니다.

| # | 요청 대상 URL (신규) | 원본 URL (구) | 현재 DB 페이지 | 현재 길이 | 상태 |
|---|---|---|---|---|---|
| 1 | `/services/performance/overview` | `/test2/summary` | `performance/overview` | 2,515 B | ✅ 업데이트 필요 |
| 2 | `/services/certificate` | `/test3/page01` | `certificate/overview` (기본 페이지) | 5,557 B | ✅ 업데이트 필요 |
| 3 | `/services/certificate/rnd` | `/test3/page02` | `certificate/rnd` | 2,069 B | ✅ 업데이트 필요 |
| 4 | `/services/certificate/ai` | `/test3/page03` | `certificate/ai` | 2,156 B | ✅ 업데이트 필요 |
| 5 | `/services/certificate/network` | `/test3/page04` | `certificate/network` | 2,470 B | ✅ 업데이트 필요 |
| 6 | `/services/readiness` | `/test4/page01` | `readiness/overview` | **66 B** (사실상 빈 페이지) | ⚠️ 대폭 추가 필요 |
| 7 | `/services/performance` | `/test2/summary` | `performance/overview` (기본 페이지) | 2,515 B | 🔁 **#1과 동일** |
| 8 | `/services/enterprise-security/info` | `/indsecconsult/info` | `enterprise-security/info` | 1,852 B | ✅ 업데이트 필요 |
| 9 | `/services/mock-test/overview` | `/test4/page02` | **❌ 존재하지 않음 (302 → /)** | — | 🚨 **라우팅 이슈** |
| 10 | `/services/consulting/cc` | `/consulting/cc` | `consulting/cc` | 1,904 B | ✅ 업데이트 필요 |
| 11 | `/services/consulting/kcmvp` | `/consulting/vcm` | `consulting/kcmvp` | 1,760 B | ✅ 업데이트 필요 |
| 12 | `/services/consulting/isms-p` | `/consulting/isms_p` | `consulting/isms-p` | 2,750 B | ✅ 업데이트 필요 |
| 13 | `/services/diagnosis/readiness` | `/test4/page01` | `diagnosis/readiness` | 7,654 B | 🔁 **#6과 동일 원본** |

**정리**:
- **실질 원본 URL 9개** (중복 제거)
- **업데이트 대상 DB 페이지 10개** (요청 #6·#13, #1·#7 중복 제거)
- **라우팅 생성/확인 필요 대상 1개** (요청 #9)

---

## 3. 🚨 사전 해결이 필요한 이슈 1건

### Issue A — `/services/mock-test/overview`가 존재하지 않음

```
GET http://localhost:3000/services/mock-test/overview
→ HTTP 302 Found
→ Location: /
```

- DB에 `mock-test` 슬러그를 가진 부서(department)가 없음.
- 사용자가 요청한 원본 `/test4/page02`는 **"DDoS모의훈련"** 내용이며, 현재 시스템에서 이 내용이 있어야 할 위치는 `/services/diagnosis/ddos` (실제로 존재, HTTP 200).

#### 처리 방안(작업 착수 시 사용자 승인 필요)

| 옵션 | 설명 | 난이도 | 권장 |
|---|---|---|---|
| **A-1** | 신규 부서 `mock-test` 생성 + `overview` 페이지 생성, 기존 `diagnosis/ddos`와는 별개 운영 | 중 | ⭐ **권장하지 않음** (중복 데이터 발생) |
| **A-2** | `/services/mock-test/overview` → `/services/diagnosis/ddos` 301 리다이렉트 추가 + 기존 `diagnosis/ddos` 내용을 원본 수준으로 업그레이드 | 하 | ⭐⭐ 권장 |
| **A-3** | 사용자 의도 확인 후 선택 | — | **현재 상태 (보고서 단계)** |

**현재 상태**: A-3 (사용자 재확인 대기) — 본 보고서로 확정 후 코딩 착수 시 반영.

---

## 4. 원본 페이지별 콘텐츠 분석 (9개 URL)

### 4.1 `test2/summary` (요청 #1, #7 공통) — 성능평가 개요

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | "정보보호제품이 운영환경에서…" |
| 섹션: "정보보호제품 성능평가" | **이미지 1장** | `/api/images/legacy/...` 프록시 재사용 |
| 섹션: 목적 | `ul` 3개 bullet | 표준 `.service-bullets` |
| 섹션: 법적근거 | `ul` 3개 bullet | 표준 `.service-bullets` |
| 섹션: "정보보호제품 성능평가 가능제품" | **2단 테이블 + 구분+목록 셀** | 복잡한 중첩 구조 |
| PS 주석 2개 (※) | `p.ps` | 기존 CSS 재사용 |

**난이도**: 中 — 복잡한 중첩 테이블(분류/목록, 첫 셀 rowspan) 정확한 재현 필요. 기존 `.cc-eal-table` 스타일을 범용 `.koist-data-table`로 확장 권장.

---

### 4.2 `test3/page01` (요청 #2) — 시험성적서 개요

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 | 텍스트 + KOLAS 로고 이미지 | 이미지 프록시 재사용 |
| 섹션: 목적 | `ul` 10개 bullet | 표준 `.service-bullets` |
| 섹션: 소프트웨어 품질특성 | **2×카드 + 9개 품질특성 그리드** | 🆕 **신규 컴포넌트 필요 (quality-grid)** |
| 섹션: 소프트웨어 시험대상 | 2단 테이블 (분류·목록) | 4.1 테이블과 동일 패턴 |
| 섹션: 시험 절차 | **4-step 프로세스 이미지** | v39.6 `.process` 재사용 |
| PS 주석 | `p.ps` | 재사용 |

**난이도**: 中上 — "소프트웨어 품질특성" 섹션은 원본에서 9개 품질 그룹(기능적합성·성능효율성·호환성·사용성·신뢰성·보안성·유지보수성·이식성·일반적 요구사항)이 태그형/뱃지형으로 병렬 배치. **v39.8에서 신규 `.koist-quality-grid` CSS 정의 필요** (예상 60~80줄).

---

### 4.3 `test3/page02` (요청 #3) — R&D과제검증

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 목적 | `ul` 4개 | 표준 |
| 섹션: 소프트웨어 시험대상 | `ul` 2개 | 표준 |
| 섹션: 시험 절차 | 4-step 프로세스 | 4.2와 동일 |
| 하단 PS 2개 | `ul` | 표준 |

**난이도**: **下 (매우 낮음)** — 완전히 기존 컴포넌트만 사용.

---

### 4.4 `test3/page03` (요청 #4) — AI 성능시험

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 목적 | `ul` 4개 | 표준 |
| 섹션: 소프트웨어 시험대상 | `ul` 1개 + 설명 2줄 | 표준 |
| 섹션: 시험 절차 | 4-step 프로세스 | 재사용 |

**난이도**: **下** — 완전히 기존 컴포넌트만 사용. 4.3과 거의 동일 구조.

---

### 4.5 `test3/page04` (요청 #5) — NW 성능시험

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 목적 | `ul` 1개 | 표준 |
| 섹션: 시험 대상 | `ul` 3개 (colon 구분) | 표준 |
| 섹션: 시험 범위 | `ul` 6개 | 표준 |
| 섹션: 시험 절차 | 4-step 프로세스 | 재사용 |
| 하단 PS 2개 | `ul` | 표준 |

**난이도**: **下** — 완전히 기존 컴포넌트만 사용.

---

### 4.6 `test4/page01` (요청 #6, #13 공통) — 준비도평가

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 도입 배경 / 관련 근거 / 평가 대상 | `ul` 각 1개 | 표준 |
| 섹션: 평가 등급 | **5단계 등급 카드 (AAA, AA, A, BB, B)** | 🆕 **신규 컴포넌트 필요 (grade-card)** |
| 섹션: (평가 등급 사진) | 이미지 1장 | 프록시 재사용 |
| 섹션: 맞춤형 가이드 / 평가 기준 | `ul` | 표준 |
| 섹션: 필수항목 (기반/활동 지표 그리드) | **2×4 중첩 리스트** | 약간의 CSS 추가 |
| 섹션: 선택항목 (5개 아이콘 카드) | **아이콘+이름 그리드 5개** | 🆕 또는 기존 `.process` 변형 |
| 섹션: 주요 내용 표 (3행) | 2단 테이블 | 기존 스타일 |
| 섹션: 세부 평가지표 표 (5행, rowspan) | **복잡한 rowspan 테이블** | 중상 난이도 |
| 섹션: 문의 및 상담 | 전화·이메일 | 표준 |

**난이도**: **上 (가장 높음)** — 현재 DB `readiness/overview`는 66 B (거의 빈 상태)이므로 **완전히 새로 작성**. 등급 카드 + 복잡한 rowspan 테이블 필요. 기존 `dep_pages` 2건(#6 `readiness/overview`, #13 `diagnosis/readiness`) 모두 같은 원본으로 업데이트.

---

### 4.7 `test4/page02` (요청 #9) — DDoS모의훈련

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 훈련 대상 | `ul` 1개 | 표준 |
| 섹션: 훈련 내용 | `ul` 5개 | 표준 |
| 섹션: 훈련 절차 | **3-step 프로세스** (4-step 아님 주의) | `.process` 재사용 |
| 하단 PS 2개 | `ul` | 표준 |
| 섹션: 문의 및 상담 | 담당자 카드 | 표준 |

**난이도**: **下** — 컴포넌트 전부 재사용. 단, Issue A(mock-test 라우팅) 선결 필요.

---

### 4.8 `consulting/cc` (요청 #10) — CC 컨설팅

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 | |
| 섹션: 주요 서비스 | `ul` 4개 | 표준 |
| 섹션: 수행절차 | **3-step 프로세스 + 각 단계 내 세부 bullet 블록** | 기존 `.process` 소폭 확장 필요 |
| 섹션: 문의 및 상담 | 담당자 카드 | 표준 |

**난이도**: **中** — 프로세스 단계마다 추가 상세 불릿(`· 대상제품 유형 확인 · 보증 등급 결정 …`)이 있어, 기존 `.process li > p` 하단에 `<ul class="process-detail">` 추가 스타일 정의 필요 (약 20줄).

---

### 4.9 `consulting/vcm` (요청 #11) — 검증필암호모듈 컨설팅

동일 구조 (3-step 프로세스 + 각 단계 상세). 4.8과 동일 CSS 재사용. **난이도 下**.

---

### 4.10 `consulting/isms_p` (요청 #12) — ISMS-P 보안 컨설팅

동일 구조 (5-step 프로세스 + 각 단계 상세). 4.8 패턴 확장, 단 5-step이므로 `.process` 그리드 템플릿을 5 columns로 자동 조정(기존 CSS 이미 `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`로 설계되어 있으면 자동 대응). **난이도 下**.

---

### 4.11 `indsecconsult/info` (요청 #8) — 산업(기업)보안 컨설팅

| 블록 | 타입 | 비고 |
|---|---|---|
| 히어로 소개문 | 텍스트 2줄 | |
| 섹션: 강점 | `ul` 4개 | 표준 |
| 섹션: 업무 범위 | **4개 하위 제목 + 각각 3~4개 bullet** | 중첩 구조, `dl` 또는 `h4 + ul` 반복 |
| 섹션: 문의 및 상담 | 전화·이메일 | 표준 |

**난이도**: **中** — "업무 범위"의 4×(제목+bullet) 그룹은 **기존 `.cc-apply-dl` 또는 `.service-section` 하위 `<h4>` + `<ul>` 쌍 반복**으로 해결 가능. 신규 컴포넌트 불필요.

---

## 5. 현재 프로젝트에서 재사용 가능한 자산

### 5.1 v39.7 / v39.7.1 이미 확보된 CSS 컴포넌트 (재사용 100%)

| 클래스 | 용도 | 재사용 페이지 |
|---|---|---|
| `.koist-legacy-theme` | 네임스페이스 스코핑 래퍼 | **전체 10건** |
| `.tit_cm` (hero title) | 페이지 상단 라벨+제목 | **전체 10건** (자동 생성) |
| `.service-section` + `-title`/`-body` | 기본 섹션 flex 200px 레이아웃 | **전체 10건** |
| `.service-bullets` | 4×4px 네이비 도트 불릿 `ul` | **전체 10건** |
| `.process` (grid, step 이미지) | 시험·훈련·수행 절차 step 카드 | #2,3,4,5,9,10,11,12 (8건) |
| `.service-image` / `figure` | 이미지 박스 + 캡션 | #1, #2, #6 (3건) |
| `.cc-apply-flex`+`.cc-apply-dl` | 2-column 대칭 레이아웃 | #8 (업무 범위) 참고 |
| `.ps` | 파란 배경 ※ 주석 블록 | #1, #3, #5, #9 (4건) |
| `/api/images/legacy/*` 프록시 | HTTPS 이미지 프록시 | 이미지 있는 모든 페이지 |
| Bold 강조 (v39.7.1) | 전체 글자 font-weight 상향 | **전체 10건 자동 적용** |

### 5.2 신규로 필요한 CSS (v39.8 추가분, 예상 +150~200줄)

| 신규 클래스 | 대상 | 예상 줄수 |
|---|---|---|
| `.koist-data-table` (`.cc-eal-table`의 범용판) | #1 성능평가 대상제품, #2 시험대상, #6 지표 표 | ~50줄 (기존 `.cc-eal-table`에서 복사 후 범용화) |
| `.koist-quality-grid` | #2 소프트웨어 품질특성 9개 그룹 카드 | ~50줄 |
| `.koist-grade-cards` | #6 AAA~B 5단계 등급 카드 | ~40줄 |
| `.process-detail` (내부 불릿) | #10 CC 컨설팅 단계별 상세 | ~15줄 |
| `.contact-card` (문의 담당자 박스) | #9, #10, #11 | ~20줄 |

**총 신규 CSS**: 약 **175줄** (기존 1,082줄 → 1,257줄, +16%)

---

## 6. 구현 계획(7 Phase 예상)

> 코딩 착수는 **본 보고서에 대한 사용자 승인 후** 진행합니다.

| Phase | 작업 내용 | 예상 시간 | 산출물 |
|---|---|---|---|
| **1** | Issue A 처리 방안 사용자 승인 (#9 mock-test 라우팅) | 5분 | 승인 결정 |
| **2** | 신규 CSS 4개 컴포넌트 작성 (`public/static/style.css` 추가) | 40분 | style.css +~175줄 |
| **3** | `migrations/0034_v398_10pages_original_replica.sql` 작성 — 10건 `UPDATE dep_pages SET content=…` | 60분 | 마이그레이션 1개 파일, 약 500~700줄 SQL |
| **4** | (Issue A-2 선택 시) `/services/mock-test/overview` → `/services/diagnosis/ddos` 301 리다이렉트 추가 (`src/index.tsx`) | 10분 | src/index.tsx 패치 |
| **5** | 로컬 빌드 + PM2 재기동 + Playwright 8/8 이상 검증 + 스크린샷 비교 | 30분 | 검증 스크립트 |
| **6** | 원격 D1 마이그레이션 적용 + Cloudflare Pages 배포 + 프로덕션 검증 | 20분 | deploy URL |
| **7** | Git 커밋 `v39.8` + 태그 + push + README 업데이트 + 프로젝트 백업 | 15분 | Git tag, 백업 tar.gz |

**총 예상 시간**: **약 3시간** (Issue A-2 선택 기준)

---

## 7. 품질·안정성 리스크 분석

| 리스크 | 가능성 | 영향 | 완화 방안 |
|---|---|---|---|
| **R1**: 이미지 프록시 URL 누락으로 404 | 낮음 | 중 | 기존 v39.6에서 `sh_page/img/*` 프록시 검증됨, 동일 패턴 재사용 |
| **R2**: sanitizer가 `<table colspan/rowspan>` 속성 차단 | 중간 | 중 | 사전에 `src/utils/sanitize.ts` ALLOWED_ATTRS 확인 — 필요 시 `colspan`,`rowspan`,`scope` 명시 추가 |
| **R3**: `.process` 3-step/4-step/5-step 레이아웃 깨짐 | 낮음 | 낮 | `grid-template-columns: repeat(auto-fit, minmax(...))` 자동 대응 확인 |
| **R4**: 관리자 WYSIWYG 에디터에서 신규 클래스 편집 시 유실 | 중간 | 중 | v39.7에서 `class` 속성 sanitizer 허용 이미 적용됨, 운영 매뉴얼에 "클래스 제거 금지" 명시 권장 |
| **R5**: v39.7.1 bold가 신규 테이블/카드에도 자동 적용되어 디자인 과잉 | 중간 | 하 | 신규 CSS에서 필요 시 `font-weight: 500` 로컬 오버라이드 |
| **R6**: #6 readiness의 복잡한 rowspan 테이블 sanitizer에서 `<thead><tbody>` 구조 변형 | 낮음 | 중 | `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td rowspan="3">...` 표준 HTML 사용 + 사전 테스트 |
| **R7**: 크롤링된 원본 텍스트에 HTML 엔티티 깨짐 (`·`, `※`, `&middot;` 등) | 낮음 | 하 | 원본 스크래핑 이미 완료, 본 보고서에 정제된 텍스트 확보 |

**전반 리스크 등급**: 🟢 **낮음** — v39.6/v39.7 기반이 안정적이며 유사 패턴의 #1(CC), #7(CC apply) 성공 사례 존재.

---

## 8. 원본 이미지 자산 목록 (프록시 URL)

모두 기존 `/api/images/legacy/sh_page/img/*` 프록시로 처리 가능, **신규 다운로드 불필요**.

| 페이지 | 이미지 | 프록시 URL (예상) |
|---|---|---|
| #1 test2/summary | 성능평가 다이어그램 | `/api/images/legacy/sh_page/img/p33_img.png` (추정) |
| #2 test3/page01 | KOLAS 로고 + 4 step | `/api/images/legacy/sh_page/img/p37_kolas.png`, `p37_step1~4.png` |
| #3~#5 test3/page02~04 | 4 step 프로세스 | `p37_step1~4.png` 동일 재사용 |
| #6 test4/page01 | 준비도 등급 평가서 + 5 아이콘 | `/api/images/legacy/sh_page/img/p40_*.png` |
| #9 test4/page02 | 3 step 프로세스 | `p37_step1,2,3.png` 재사용 |
| #10~#12 consulting/* | 3~5 step 프로세스 | `p37_step*.png` 재사용 |

실제 파일명은 크롤링 시 `<img src="…">` 속성에서 확정 (본 보고서의 추정 경로는 안전 fallback 목적).

---

## 9. 최종 Definition of Done

작업 완료 기준:

- [ ] 10개 `dep_pages` 레코드 `content` 필드가 원본 koist.kr 구조·텍스트·이미지와 **95% 이상 일치** (Playwright 시각 검증)
- [ ] 모든 이미지 HTTPS 프록시 경유, Mixed Content 0건
- [ ] 전체 13개 요청 URL이 HTTP 200 반환 (Issue A-2 선택 시 #9 301 리다이렉트 포함)
- [ ] 관리자 WYSIWYG에서 각 페이지 내용 정상 편집/저장 가능
- [ ] v39.7.1 Bold 효과 유지 (EAL1 800, 본문 500+)
- [ ] 슬라이더 회귀 6/6 통과 (v39.4)
- [ ] Cloudflare Pages 배포 성공, Production 13/13 URL 검증
- [ ] Git 태그 `v39.8` 푸시 완료, 프로젝트 백업 tar.gz 업로드

---

## 10. 승인 요청 체크리스트

코딩 착수 전 사용자에게 확인드리는 항목:

1. **[필수]** Issue A (`/services/mock-test/overview`) 처리 방안:
   - [ ] **A-1**: 신규 `mock-test` 부서 생성 (중복 데이터 허용)
   - [ ] **A-2**: `/services/mock-test/overview` → `/services/diagnosis/ddos` 301 리다이렉트 (**권장**)
   - [ ] **A-3**: 요청 #9만 제외하고 나머지 12개만 진행
2. **[확인]** 요청 #1과 #7은 원본 동일(`test2/summary`) → 동일 페이지 1회 업데이트로 처리 OK?
3. **[확인]** 요청 #6과 #13은 원본 동일(`test4/page01`) → DB 2개 레코드(`readiness/overview`, `diagnosis/readiness`) 모두 동일 내용으로 업데이트 OK?
4. **[확인]** Bold 폰트(v39.7.1) 정책을 신규 페이지에도 동일하게 적용 OK?
5. **[확인]** 예상 배포 URL = `https://koist-website.pages.dev/services/...`

---

## 11. 한 줄 요약

> **13개 요청 모두 구현 가능합니다. 중복 제거 후 실질 10건이며, 기존 v39.7/v39.7.1 CSS 자산의 90% 이상을 재사용합니다. 단 `/services/mock-test/overview` 라우팅 문제(Issue A) 1건만 사용자 확인 후 코딩 착수하면 됩니다. 예상 작업 시간은 약 3시간입니다.**

---

**문서 끝 — v39.8 코딩 착수 대기 중**
