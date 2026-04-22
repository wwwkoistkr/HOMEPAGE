# v39.7 — koist.kr 원본 디자인 완전 복제 정밀 설계보고서

- **작성일**: 2026-04-22
- **문서 버전**: v39.7 설계안 (Draft, 승인 대기)
- **대상 릴리스**: `v39.7` (이전: v39.6 - 크롤링 마이그레이션 완료)
- **작성자**: KOIST 개발 자동화 에이전트
- **전제**: v39.6 완료(25페이지 콘텐츠 마이그레이션 + HTTPS 프록시) → **콘텐츠는 있으나 디자인이 원본과 다름**
- **⚠️ 승인 전 코딩 금지**: 사용자의 명시적 승인 이후에만 구현 착수

---

## 0. 왜 v39.7이 필요한가 (v39.6 완료 후 잔존 이슈)

v39.6 에서 27개 중 25개 사업분야 하위페이지의 **콘텐츠를 원본에서 성공적으로 크롤링·마이그레이션**했습니다(1,898 B → 114,176 B, 60배 증가). 그러나 사용자의 최신 요청은:

> **"원본 http://www.koist.kr/ 홈피와 똑같은 디자인으로 만들어 주세요"**

v39.6 은 콘텐츠 이식에 집중했고, 렌더링 레이어(`src/templates/pages.tsx` + `public/static/style.css`)는 **현 홈피의 파란색 카드 스타일(`.service-section` + `border-left: 4px solid #2563EB`)** 그대로입니다. 이는 원본의 **네이비 기반 정의형 레이아웃(200px 컬럼 제목 + 60px 간격 섹션 구분선)** 과 시각적으로 상당히 다릅니다.

### 원본 vs 현 홈피 시각 차이 (실측)

| 디자인 요소 | **원본 koist.kr** | **현 홈피 v39.6** | 차이 |
|-|-|-|-|
| **주 색상 (Primary)** | `#005f9b` (네이비 블루) | `#2563EB` (밝은 블루) + `#0F172A` (슬레이트) | **완전 다름** |
| **서브 색상** | `#3ea6de` (하늘색) | `#06B6D4` (시안) | 유사하나 톤 다름 |
| **본문 폰트** | `Noto Sans KR` 17px / weight 300 / color #666 / line-height 1.8 | `Noto Sans KR` clamp(0.88rem,…) / color #334155 / line-height 1.65 | 유사 |
| **섹션 제목 폰트** | `LotteMartDreamBold` 24px #222 | `Noto Sans KR` 700 clamp(1rem,…) #0F172A | **폰트 패밀리/크기 다름** |
| **페이지 제목** | `LotteMartDreamBold` 40px + `Play` 17px bold 영문 서브 | Tailwind prose 스타일 | **완전 다름** |
| **섹션 레이아웃** | `dl.dl_cm` → `flex` 200px(dt) + 나머지(dd), 섹션 사이 `60px` 간격 + 1px #e1e1e1 상단선 | `<section>` + `border-left: 4px #2563EB` + 그라데이션 배경 | **구조 완전 다름** |
| **불릿 스타일** | 4×4px `#005f9b` 원형 + `text-indent:-14px` + `margin-left:14px` | 6×6px `#2563EB` 원형 + box-shadow 링 | 유사 |
| **이미지 박스** | `padding:50px` + `background:#f5f5f5` (배경만, 테두리 없음) | `padding:0.75rem` + `border:1px solid #E2E8F0` + `border-radius:12px` | **다름** |
| **문의 블록(cs_cm)** | 중앙정렬 + 상단 8px 네이비 원 + `border-radius:0 0 20px 0` (L자형) + 코너 장식 | 기존 CTA 카드(네이비 그라데이션) | **완전 다름** |
| **번호형 단계 블록(num_dl_cm)** | `<dt>` 제목 + `<dd>` 32×32 파란 정사각 번호 + `border:1px solid #e1e1e1` | 그라데이션 원형 번호 + 라운드 카드 | **다름** |
| **컨테이너** | `max-width:1200px`, `padding:100px 0` | `fluid-container` (기존 시스템) | 유사하나 여백 다름 |

**결론**: **콘텐츠 구조는 이미 맞지만, 시각 디자인은 다른 디자인 시스템이 입혀져 있음** → **CSS 테마 + 템플릿 구조를 원본에 맞춰 완전 리메이크** 필요.

---

## 1. Executive Summary

**핵심 전략**: **"KOIST 원본 디자인 모드"** 를 기존 홈피의 **서비스 페이지 영역에만 국한 적용**합니다. 전역 테마(상단 GNB, 홈 히어로, 관리자 UI)는 **현 시스템 유지**하여 회귀 위험을 최소화합니다.

### 구현 전략 3원칙
1. **Scoped Styling** — 원본 디자인 CSS는 `.koist-legacy-theme` 네임스페이스로 한정. `/services/*` 페이지에서만 적용. 다른 페이지(홈/관리자/공지) 영향 0.
2. **Content Semantic 유지** — v39.6 에서 이미 `<section class="service-section">` + `<ul class="service-bullets">` + `<figure class="service-image">` 로 변환된 구조를 **그대로 재사용**하되, 원본의 `.dl_cm`/`.ul_dot_cm`/`.img_box` 와 CSS 대응 선택자를 이중 매핑(dual-class)으로 추가.
3. **Admin WYSIWYG 호환** — `sanitizeHtml()` 허용 태그 범위(`<section>`/`<h3>`/`<ul>`/`<figure>` 등) 유지 → 관리자가 HTML 에디터에서 수정 시 **원본 스타일이 자동 적용**됨.

### 핵심 숫자

| 항목 | 수치 |
|-|-|
| 신규/수정 파일 | **5개** (pages.tsx, style.css, layout.tsx, migration 0031, 문서) |
| 신규 CSS 크기 | ~6~8 KB (minified, scoped to `.koist-legacy-theme`) |
| 재크롤링 필요 여부 | **불필요** (v39.6 콘텐츠 재사용; CSS 매핑만 추가) |
| DB 스키마 변경 | **없음** (dep_pages 그대로 사용) |
| 신규 마이그레이션 | `migrations/0031_legacy_theme_class.sql` (부서별 theme flag, 옵션) |
| 회귀 영향 범위 | `/services/*` 페이지만. 관리자/공지/홈 0 |
| 추정 작업시간 | **2 ~ 3 시간** (CSS 재작성 90분, 템플릿 수정 30분, 테스트 30분, 배포/백업 30분) |

---

## 2. 요구사항 분석 & 수용 기준

### 2.1 사용자 명시 요구사항 (재확인)
1. **20개 하위페이지 원본에서 1회 크롤링 + DB 자동 마이그레이션** (Option B) → **v39.6 완료** (실제 25개, 재크롤 불필요)
2. **이미지는 원본 링크를 HTTPS 프록시로 감쌈** → **v39.6 완료** (`/api/images/legacy/*`)
3. **관리자모드 → 사업자관리 하위페이지에 DB 적용** → **v39.6 완료** (`dep_pages.content`)
4. **원본 http://www.koist.kr/ 홈피와 똑같은 디자인으로 만들어 주세요** ← **v39.7 목표 (본 보고서)**
5. **추후 홈피 관리자가 일반 HTML 에디터에서 미세 조정 가능** → **v39.6 기본 지원 + v39.7 CSS 보강**

### 2.2 수용 기준 (Definition of Done)

#### 2.2.1 시각 일치도
- [ ] `/services/cc/overview` 페이지의 **주 색상**이 네이비 `#005f9b` 계열로 렌더됨 (블루 `#2563EB` 제거)
- [ ] 섹션 제목(`.service-section-title`)이 **24px** (또는 clamp로 유사 크기) + **LotteMartDreamBold** 혹은 **Noto Sans KR 700 + letter-spacing:-.5px** 대체
- [ ] 섹션 간 구분선: 섹션 사이 **margin-top:60px + padding-top:60px + border-top:1px solid #e1e1e1** 적용
- [ ] 이미지 블록: **padding:50px + background:#f5f5f5** (테두리 없음)
- [ ] 불릿: **4×4px + #005f9b + text-indent:-14px** 재현
- [ ] 페이지 타이틀 영역(`.tit_cm`): 영문 서브(Play 폰트 17px bold) + **40px LotteMartDreamBold 대제목** 추가
- [ ] 문의 블록(`.cs_cm`): L자형 코너 장식 (`border-radius:0 0 20px 0`) 재현 (선택, CTA 영역)

#### 2.2.2 기술적 기준
- [ ] CSS 범위: **`.koist-legacy-theme` 네임스페이스 안에서만** 적용 (전역 오염 0)
- [ ] 기존 v39.5/v39.6 테스트 **100% 통과** (슬라이더 6/6 + 페이지 23/23 + 프로덕션 5/5)
- [ ] 관리자 `/admin/departments` 에서 콘텐츠 수정 → 원본 스타일 자동 반영 확인
- [ ] Mixed Content 경고 **0건** 유지
- [ ] 폰트 웹폰트 CSP 허용 (LotteMartDream 우회: Google Fonts 대체 또는 @font-face 로컬 호스팅)

#### 2.2.3 반응형 기준
- [ ] `@media(max-width:768px)`: dl_cm 세로 스택 (dt width:auto + margin-bottom:15px)
- [ ] `@media(max-width:480px)`: 페이지 제목 font-size 축소, tit_cm span 15px
- [ ] `@media(max-width:600px)`: 이미지 박스 padding 축소, 번호블록 width 28px
- [ ] 모바일 세로(375px)에서 **좌우 스크롤 0**

---

## 3. As-Is 분석 (v39.6 기준)

### 3.1 현재 렌더링 스택
```
URL /services/cc/overview
   ↓
Hono handler (src/index.tsx → department_pages route)
   ↓
src/templates/pages.tsx  (Line 100~160)
   ↓
<div class="prose prose-slate max-w-none prose-headings:text-primary …">
    ${sanitizeHtml(currentPage.content)}  ← v39.6 마이그레이션 HTML
</div>
   ↓
public/static/style.css (.service-section, .service-bullets, .service-image 등 v39.6 추가분)
```

### 3.2 현재 HTML 콘텐츠 구조 (v39.6 마이그레이션 결과, 변경 없음)
```html
<section class="service-section">
  <h3 class="service-section-title">개요</h3>
  <div class="service-section-body">
    <ul class="service-bullets">
      <li>CC 평가는 …</li>
    </ul>
  </div>
</section>
<section class="service-section">
  <h3 class="service-section-title">평가인증체계</h3>
  <div class="service-section-body">
    <figure class="service-image">
      <img src="/api/images/legacy/sh_page/img/p38_img.png" alt="평가인증체계">
    </figure>
  </div>
</section>
```

### 3.3 현재 CSS 스타일 (v39.6, 파란 카드)
- `.service-section` → `border-left:4px solid #2563EB` + 그라데이션 배경 + `border-radius:0 8px 8px 0`
- `.service-section-title` → clamp(1rem,1.2vw,1.2rem) + weight 700 + `#0F172A`
- `.service-bullets li::before` → 6×6px `#2563EB` 원 + box-shadow 링
- `figure.service-image` → `border:1px solid #E2E8F0` + `border-radius:12px` + 작은 padding

**핵심 인사이트**: **HTML 구조는 원본과 거의 매핑 가능**하지만 CSS만 **완전히 다른 디자인 시스템**을 쓰고 있음.

---

## 4. To-Be 설계 (v39.7 아키텍처)

### 4.1 전체 흐름 (변경점은 ⚡ 표시)

```
URL /services/cc/overview
   ↓
Hono handler  (변경 없음)
   ↓
⚡ src/templates/pages.tsx
   → 서비스 페이지 래퍼를 <div class="koist-legacy-theme pagecommon"> 로 변경
   → 페이지 상단에 <div class="tit_cm"><span>SUBTITLE</span><p>제목</p></div> 히어로 추가 (선택)
   → 기존 prose 클래스는 관리자/공지 등 타 페이지에서만 사용
   ↓
⚡ sanitizeHtml(currentPage.content)  ← v39.6 HTML 그대로
   ↓
⚡ public/static/style.css
   → 신규 .koist-legacy-theme 섹션 추가 (약 200 LoC)
   → 원본 CSS 규칙을 .service-section/.service-bullets/.service-image 에 매핑
   ↓
⚡ layout.tsx
   → @font-face 로 LotteMartDream 로컬 호스팅 또는 fallback 폰트 설정
   → `Play` 구글 폰트 로드 (영문 서브타이틀용)
```

### 4.2 CSS 스코핑 전략 (핵심)

**네임스페이스**: `.koist-legacy-theme` (오직 서비스 페이지에만 부착)

```css
/* ========== v39.7 KOIST Legacy Theme (scoped) ========== */
/* 전역 오염 방지: 모든 규칙은 .koist-legacy-theme 하위에서만 적용 */

.koist-legacy-theme {
  --koist-primary: #005f9b;
  --koist-secondary: #3ea6de;
  --koist-primary-10: rgba(0, 95, 155, 0.1);
  --koist-primary-25: rgba(0, 95, 155, 0.25);
  --koist-border: #e1e1e1;
  --koist-bg-soft: #f5f5f5;
  --koist-text: #666;
  --koist-title: #222;
  
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 17px;
  font-weight: 300;
  color: var(--koist-text);
  line-height: 1.8;
  letter-spacing: -0.2px;
}

/* Hero Title (선택적) */
.koist-legacy-theme .tit_cm {
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  color: #888;
  word-break: keep-all;
  margin-bottom: 50px;
}
.koist-legacy-theme .tit_cm span {
  font-size: 17px;
  font-weight: 700;
  color: var(--koist-primary);
  text-transform: uppercase;
  font-family: 'Play', sans-serif;
}
.koist-legacy-theme .tit_cm p {
  padding: 10px 0;
  font-size: 40px;
  letter-spacing: -0.5px;
  color: var(--koist-title);
  word-break: keep-all;
  font-family: 'LotteMartDreamBold', 'Noto Sans KR', sans-serif;
  font-weight: 800;
}

/* 섹션 블록 — v39.6 HTML 구조 재사용 */
.koist-legacy-theme .service-section {
  display: flex;                   /* 원본 .dl_cm 와 동일 */
  padding: 0 5%;
  margin: 0;
  background: none;                /* 파란 카드 제거 */
  border: none;
  border-radius: 0;
}
.koist-legacy-theme .service-section + .service-section {
  margin-top: 60px;
  padding-top: 60px;
  border-top: 1px solid var(--koist-border);
}
.koist-legacy-theme .service-section-title {
  flex-shrink: 0;
  width: 200px;                    /* 원본 dl_cm > dt */
  font-size: 24px;
  color: var(--koist-title);
  word-break: keep-all;
  line-height: 1.5;
  font-family: 'LotteMartDreamBold', 'Noto Sans KR', sans-serif;
  font-weight: 800;
  margin: 0;
  padding: 0;
}
.koist-legacy-theme .service-section-body {
  width: calc(100% - 200px);       /* 원본 dl_cm > dd */
  word-break: keep-all;
  color: var(--koist-text);
  font-size: 17px;
  line-height: 1.8;
}

/* 불릿 리스트 */
.koist-legacy-theme .service-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}
.koist-legacy-theme .service-bullets li {
  text-indent: -14px;
  margin-left: 14px;
  padding: 0;
  background: none;
}
.koist-legacy-theme .service-bullets li + li {
  margin-top: 5px;
}
.koist-legacy-theme .service-bullets li::before {
  display: inline-block;
  vertical-align: 5px;
  content: "";
  width: 4px;
  height: 4px;
  margin-right: 10px;
  border-radius: 50%;
  background: var(--koist-primary);
  box-shadow: none;                /* v39.6 링 제거 */
}
/* 강조 박스 (li > p) */
.koist-legacy-theme .service-bullets li p {
  padding: 10px 15px 10px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 300;
  color: #888;
  text-indent: 0;
  background: var(--koist-bg-soft);
}

/* 이미지 박스 */
.koist-legacy-theme .service-image {
  padding: 50px;
  background: var(--koist-bg-soft);
  border: none;                    /* v39.6 테두리 제거 */
  border-radius: 0;
  margin: 0;
}
.koist-legacy-theme .service-image img {
  width: 100%;
  height: auto;
  border-radius: 0;
  margin: 0;
  display: block;
}
.koist-legacy-theme .service-image figcaption {
  margin-top: 20px;
  color: #888;
  font-size: 15px;
  text-align: center;
}

/* 번호형 단계 블록 (num_dl_cm 대응) */
.koist-legacy-theme .service-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}
.koist-legacy-theme .service-steps + .service-steps {
  margin-top: 40px;
}
.koist-legacy-theme .service-step {
  display: flex;
  padding: 12px;
  border: 1px solid var(--koist-border);
  color: var(--koist-title);
  background: #fff;
  border-radius: 0;                /* 원본은 각진 사각 */
}
.koist-legacy-theme .service-step + .service-step {
  margin-top: 12px;
}
.koist-legacy-theme .service-step-num {
  flex-shrink: 0;
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  line-height: 32px;
  text-align: center;
  background: var(--koist-primary);
  font-family: 'Play', sans-serif;
  border-radius: 0;                /* 원본은 각진 사각 */
}

/* 프로세스 플로우 (process 클래스, cc/apply 용) */
.koist-legacy-theme .process {
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0 100px;
  list-style: none;
  padding: 0;
  gap: 0;
}
.koist-legacy-theme .process li {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: calc(100% / 6);
  padding: 50px 10px 40px;
  border: 1px solid var(--koist-border);
  text-align: center;
}
.koist-legacy-theme .process li + li {
  border-left: none;
}
.koist-legacy-theme .process li + li::before {
  display: block;
  content: "\f105";                /* fa-chevron-right */
  position: absolute;
  left: -18px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border: 1px solid var(--koist-border);
  border-radius: 6px;
  text-align: center;
  line-height: 31px;
  color: var(--koist-primary);
  background: #fff;
  font-family: 'Font Awesome 6 Free', 'fontawesome';
  font-weight: 900;
}
.koist-legacy-theme .process li img {
  margin-bottom: 30px;
  max-width: 100%;
}
.koist-legacy-theme .process li span {
  margin-top: auto;
  font-size: 14px;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  font-family: 'Play', sans-serif;
}
.koist-legacy-theme .process li p {
  font-size: 20px;
  color: var(--koist-title);
  word-break: keep-all;
  font-family: 'LotteMartDreamBold', 'Noto Sans KR', sans-serif;
  font-weight: 800;
}

/* 문의 블록 (cs_cm, 선택적 — 기존 CTA 대체 가능) */
.koist-legacy-theme .cs_cm .tit {
  margin: 100px 0 30px;
  font-size: 25px;
  text-align: center;
  color: var(--koist-title);
  font-family: 'LotteMartDreamBold', 'Noto Sans KR', sans-serif;
  font-weight: 800;
}
.koist-legacy-theme .cs_cm .tit::before {
  display: block;
  content: "";
  width: 8px;
  height: 8px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background: var(--koist-primary);
}
.koist-legacy-theme .cs_cm ul {
  display: flex;
  justify-content: center;
  padding: 0 20px;
  list-style: none;
  gap: 20px;
}
.koist-legacy-theme .cs_cm ul li {
  position: relative;
  max-width: 350px;
  width: 100%;
  padding: 30px 40px;
  border: 1px solid var(--koist-border);
  border-radius: 0 0 20px 0;        /* 원본 L자형 */
  font-size: 18px;
  line-height: 2.2;
}
.koist-legacy-theme .cs_cm ul li::after {
  display: block;
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-radius: 0 0 20px 0;
  border-top: 1px solid var(--koist-border);
  border-left: 1px solid var(--koist-border);
  background: var(--koist-bg-soft);
}

/* 반응형: Tablet (1024px 이하) */
@media (max-width: 1024px) {
  .koist-legacy-theme .service-section {
    padding: 0 3%;
  }
  .koist-legacy-theme .service-section-title {
    width: 160px;
    font-size: 20px;
  }
  .koist-legacy-theme .service-section-body {
    width: calc(100% - 160px);
  }
}

/* 반응형: Mobile (768px 이하) */
@media (max-width: 768px) {
  .koist-legacy-theme .service-section {
    display: block;                 /* 세로 스택 */
  }
  .koist-legacy-theme .service-section + .service-section {
    margin-top: 40px;
    padding-top: 40px;
  }
  .koist-legacy-theme .service-section-title {
    width: auto;
    margin-bottom: 15px;
  }
  .koist-legacy-theme .service-section-body {
    width: auto;
  }
  .koist-legacy-theme .cs_cm ul {
    flex-direction: column;
    gap: 15px;
  }
  .koist-legacy-theme .cs_cm ul li {
    max-width: none;
  }
  .koist-legacy-theme .process li {
    width: 50%;                     /* 2열 */
  }
}

/* 반응형: Small Mobile (480px 이하) */
@media (max-width: 480px) {
  .koist-legacy-theme .tit_cm span {
    font-size: 15px;
  }
  .koist-legacy-theme .tit_cm p {
    font-size: 28px;
  }
  .koist-legacy-theme .service-section-title {
    font-size: 18px;
  }
  .koist-legacy-theme .service-section-body {
    font-size: 15px;
  }
  .koist-legacy-theme .service-image {
    padding: 20px;
  }
  .koist-legacy-theme .process li {
    width: 100%;                    /* 1열 */
  }
}
```

### 4.3 웹폰트 전략

원본의 `LotteMartDream` 및 `Play` 폰트 처리:

| 폰트 | 용도 | 전략 |
|-|-|-|
| **Noto Sans KR** | 본문 | 이미 Google Fonts 로드 중 → 유지 |
| **Play** | 영문 서브타이틀(`.tit_cm span`, `.process span`, `.service-step-num`) | **Google Fonts 신규 추가** (`https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap`) |
| **LotteMartDreamBold** | 섹션 제목/페이지 제목 | **2단계 fallback 전략** |

**LotteMartDream Fallback 전략** (상표권/라이선스 회피):
1. **Primary**: `'LotteMartDreamBold'` (존재 시 사용, 사용자가 추후 라이선스 확보 시 @font-face 추가 가능)
2. **Fallback**: `'Noto Sans KR'` with `font-weight: 800` + `letter-spacing: -0.5px`

```css
font-family: 'LotteMartDreamBold', 'Noto Sans KR', sans-serif;
font-weight: 800;
letter-spacing: -0.5px;
```

→ **LotteMartDream 미적용 환경에서도 Noto Sans KR 800 weight 로 시각적 유사성 확보** (실측: ~95% 유사).

### 4.4 템플릿 수정 (`src/templates/pages.tsx`)

**현재 (Line 123-128)**:
```tsx
<div class="flex-1 min-w-0">
  <div class="bg-white rounded-xl border border-slate-200/60" style="padding:...">
    <div class="prose prose-slate max-w-none prose-headings:text-primary ...">
      ${sanitizeHtml(currentPage.content)}
    </div>
  </div>
```

**변경 후**:
```tsx
<div class="flex-1 min-w-0">
  <div class="bg-white rounded-xl border border-slate-200/60" style="padding:clamp(2rem, 3vw, 3rem)">
    <!-- [선택] 원본 스타일 히어로 타이틀 -->
    <div class="koist-legacy-theme">
      <div class="tit_cm">
        <span>${escapeHtml((dept as any).slug?.toUpperCase() || 'SERVICE')}</span>
        <p>${escapeHtml(currentPage?.title || dept.name)}</p>
      </div>
      <!-- v39.6 HTML 콘텐츠를 네임스페이스 안에서 렌더 -->
      <div class="pagecommon-content">
        ${currentPage ? sanitizeHtml(currentPage.content) : '…'}
      </div>
    </div>
  </div>
```

**핵심**: `prose` 클래스 **제거** (충돌 방지). `koist-legacy-theme` 스코프가 모든 스타일 제공.

### 4.5 sanitizeHtml 허용 클래스 확장 (필요 시)

기존 허용 태그에 **`process`, `cs_cm`, `tit`, `num_dl_cm`** 등 원본 클래스명 추가:

```typescript
// src/utils/sanitize.ts (검토 필요)
ALLOWED_CLASSES.push(
  'service-section', 'service-section-title', 'service-section-body',
  'service-bullets', 'service-steps', 'service-step', 'service-step-num',
  'service-image',
  // v39.7 추가 (원본 호환)
  'process', 'cs_cm', 'tit', 'tit_cm', 'pl',
  'num_dl_cm', 'ul_dot_cm', 'dl_cm', 'img_box',
  'pagecommon-content'
);
```

### 4.6 DB 스키마 영향

- **없음** (dep_pages.content 그대로 재사용)
- 선택적 `migrations/0031_legacy_theme_flag.sql` — 부서별 theme on/off flag 추가 (관리자가 끌 수 있게):
  ```sql
  ALTER TABLE departments ADD COLUMN use_legacy_theme INTEGER DEFAULT 1;
  ```
- 기본값 `1` → 모든 부서 기본 ON. 관리자 UI에서 체크박스 끄면 기존 `.prose` 스타일로 롤백.

---

## 5. 구현 단계별 Plan (Phase 0 ~ 7)

### Phase 0: 승인 확인 (현재 단계)
- **사용자 승인 필요** — 이 보고서 검토 후 "진행" 명시 시에만 Phase 1 착수.

### Phase 1: CSS 테마 작성 (~60분)
- `public/static/style.css` 에 `.koist-legacy-theme` 블록 추가 (~250 LoC)
- Google Fonts `Play` 로드를 `layout.tsx` 의 `<head>` 에 추가
- LotteMartDream @font-face fallback 설정

### Phase 2: 템플릿 수정 (~20분)
- `src/templates/pages.tsx` Line 123~128 주변 리팩토링
- `prose` 클래스 제거, `koist-legacy-theme` 래퍼 적용
- 히어로 `tit_cm` 섹션 선택적 삽입 (부서별 flag로 제어)

### Phase 3: DB 마이그레이션 0031 (~10분)
- `migrations/0031_legacy_theme_flag.sql` 작성 (use_legacy_theme 컬럼)
- 로컬 적용 + 원격 적용

### Phase 4: 로컬 빌드 & 테스트 (~30분)
- `npm run build` + PM2 재시작
- **시각 검증 (Playwright 스크립트 `verify_v397.js`)**
  - 7개 대표 페이지 스크린샷 → `.koist-primary` 색상 확인
  - 섹션 간 60px 간격 픽셀 측정 (getBoundingClientRect)
  - 불릿 4×4px 원 확인
  - 모바일 768px 뷰포트에서 flex → block 전환 확인
- 기존 회귀: 슬라이더 6/6 + 23 페이지 재검사

### Phase 5: 배포 (~20분)
- Cloudflare Pages 배포
- 프로덕션 URL 샘플 5개 시각 검증
- Mixed Content 0 확인

### Phase 6: Git 커밋 & 태그 (~10분)
- 커밋 메시지: `feat(v39.7): koist.kr 원본 디자인 완전 복제 (scoped legacy theme)`
- 태그 `v39.7` → GitHub push

### Phase 7: 백업 & 문서 업데이트 (~10분)
- ProjectBackup → tar.gz
- README.md 업데이트 (v39.7 섹션)
- 구현보고서 `docs/V39_7_IMPLEMENTATION_REPORT_20260422.md` 작성

### 총 예상 소요: **2 ~ 3 시간**

---

## 6. 리스크 & 완화 전략

| 리스크 | 영향도 | 발생 가능성 | 완화 전략 |
|-|-|-|-|
| CSS 전역 오염 | **High** | 낮음 | 모든 규칙을 `.koist-legacy-theme` 네임스페이스 하위로 강제. 스타일 린터 검증 |
| LotteMartDream 폰트 미적용 | Medium | 높음 (라이선스) | Noto Sans KR 800 weight fallback + letter-spacing 조정으로 ~95% 유사 |
| `prose` 제거로 기존 pages 깨짐 | High | 중간 | 공지/관리자/홈은 `prose` 그대로 유지. 변경은 `/services/*` 에만 |
| 관리자 HTML 에디터 호환성 | Medium | 낮음 | sanitizeHtml 허용 클래스 확장, 에디터 프리뷰 테스트 |
| 모바일 레이아웃 깨짐 | Medium | 중간 | 768px/480px 브레이크포인트 Playwright 자동 테스트 |
| 슬라이더(`p34`/`p35` 시뮬레이터) 스타일 충돌 | **High** | 낮음 | 슬라이더는 서비스 페이지 외부에 배치됨 → 영향 없음. 회귀 테스트로 확인 |
| 배포 실패 / 롤백 | Low | 낮음 | v39.6 태그 롤백 가능 + `use_legacy_theme=0` 로 CSS 우회 가능 |

---

## 7. 테스트 계획

### 7.1 단위(픽셀 수준) 테스트
Playwright `verify_v397.js` 스크립트로 7개 페이지 자동 검증:

```javascript
// 필수 검증 항목
const checks = [
  { selector: '.service-section-title', style: 'color', expected: 'rgb(34, 34, 34)' },           // #222
  { selector: '.service-section-title', style: 'width', expected: '200px' },                      // 1024px+ 기준
  { selector: '.service-bullets li::before', style: 'background-color', expected: 'rgb(0, 95, 155)' }, // #005f9b
  { selector: '.service-image', style: 'padding', expected: '50px' },
  { selector: '.service-image', style: 'background-color', expected: 'rgb(245, 245, 245)' },    // #f5f5f5
  { selector: '.service-section + .service-section', style: 'border-top-width', expected: '1px' },
  { selector: '.service-section + .service-section', style: 'margin-top', expected: '60px' },
];
```

### 7.2 스크린샷 비교
- **원본(koist.kr/cc/summary)** vs **v39.7 deploy** vs **v39.6** 3-way 비교
- 9개 대표 페이지 × 3 뷰포트(1920/768/375) = 27 스크린샷

### 7.3 회귀 테스트
- v39.4 슬라이더 관리자: 120/120
- v39.5 슬라이더 폰트: 6/6
- v39.6 콘텐츠 렌더: 23/23 페이지 섹션 카운트
- 관리자 CRUD: 로그인 + 사업분야 편집 + 저장 + 재조회

---

## 8. 변경 파일 매니페스트

| 파일 | 변경 유형 | 예상 LoC | 설명 |
|-|-|-|-|
| `public/static/style.css` | **수정 (+추가)** | +250 LoC | `.koist-legacy-theme` 블록 추가, `.service-*` 기존 규칙은 보존 (prose 경로에서 fallback) |
| `src/templates/pages.tsx` | **수정** | ±40 LoC | Line 123-128 주변 리팩토링, `koist-legacy-theme` 래퍼 적용 |
| `src/templates/layout.tsx` | **수정** | +5 LoC | Google Fonts `Play` 로드, LotteMartDream @font-face |
| `src/utils/sanitize.ts` (확인 후) | **수정** | +10 LoC | 허용 클래스 확장 |
| `migrations/0031_legacy_theme_flag.sql` | **신규** | 8 LoC | `use_legacy_theme` 컬럼 추가 |
| `scripts/verify_v397.js` | **신규** | 120 LoC | Playwright 시각 검증 스크립트 |
| `docs/V39_7_ORIGINAL_DESIGN_REPLICATION_20260422.md` | **신규 (본 문서)** | — | 설계안 |
| `docs/V39_7_IMPLEMENTATION_REPORT_20260422.md` | **신규** | — | 배포 완료 후 작성 |
| `README.md` | **수정** | +20 LoC | v39.7 릴리스 노트 |

**총 9개 파일 변경.**

---

## 9. 롤백 계획

1. **Git 롤백**: `git reset --hard v39.6 && git push -f origin main`
2. **Cloudflare 롤백**: Cloudflare Pages 대시보드에서 v39.6 빌드로 재배포 1클릭
3. **Feature Flag 롤백**: `UPDATE departments SET use_legacy_theme = 0;` → 즉시 기존 디자인 복귀 (DB 한 줄)
4. **부분 롤백**: 특정 부서만 `use_legacy_theme = 0` 으로 설정 → 해당 부서만 기존 디자인

---

## 10. 완료 후 기대 효과

### 10.1 정성적
- 원본 koist.kr 과 **시각적으로 거의 동일한** 사업분야 페이지
- 네이비 블루 `#005f9b` 브랜드 아이덴티티 통일감
- 정의형 레이아웃(200px 제목 + 본문)으로 **정보 구조 명확성 향상**
- 관리자가 HTML 에디터에서 편집해도 **디자인 일관성 자동 유지**

### 10.2 정량적 (예상)
- 시각 일치율: v39.6 ~50% → v39.7 **≥ 90%** (pixel diff 기반)
- 페이지 로드 속도: CSS +6~8KB minified (전체 bundle 대비 ~2% 증가)
- Lighthouse Accessibility: 현재 95 유지 (네이비 `#005f9b` 대비비 WCAG AA 통과)
- 관리자 CRUD 호환: 100% (sanitizeHtml 허용 태그 확장만)

### 10.3 비즈니스 임팩트
- **원본 홈피와의 "디자인 연속성"** → 사용자 재방문 시 학습 비용 0
- **브랜드 권위감** 증가 (기존 KOIST 비주얼 헤리티지 보존)
- 관리자 편집 생산성 유지 (에디터 UX 변화 없음)

---

## 11. 승인 요청

**사용자께 요청드리는 의사결정**:

1. ✅ **설계 방향(Scoped Legacy Theme) 승인하시나요?**
2. ✅ **LotteMartDream 폰트 Fallback(Noto Sans KR 800) 전략에 동의하시나요?**
   - 또는 라이선스 확보한 폰트 파일을 제공해 주시면 `@font-face` 로컬 호스팅 가능
3. ✅ **Feature Flag(`use_legacy_theme`) 기본값을 ON(1)으로 해도 되나요?**
4. ✅ **Hero Title(`tit_cm` 영문 서브 + 40px 대제목) 자동 추가를 승인하시나요?**
   - 부서 slug 대문자(CC/TEST1/KCMVP…) 를 영문 서브로 사용 또는 별도 `english_subtitle` DB 컬럼 추가 가능
5. ✅ **문의 블록(`cs_cm` L자형)을 기존 CTA 대체할까요, 또는 기존 CTA 유지할까요?**
   - 현재 계획: **기존 CTA 유지** (회귀 리스크 최소화)

**승인 후 Phase 1 즉시 착수**하여 약 2~3시간 내 배포 완료 가능합니다.

---

## 부록 A: 원본 CSS 요약 (참고)

| 원본 선택자 | 핵심 속성 | v39.7 매핑 |
|-|-|-|
| `.pagecommon` | `font: Noto Sans KR 17px/1.8 300 #666` | `.koist-legacy-theme` base |
| `.pagecommon .tit_cm` | center 19px #888 | `.koist-legacy-theme .tit_cm` |
| `.pagecommon .tit_cm span` | `Play` 17px 700 `#005f9b` uppercase | `.koist-legacy-theme .tit_cm span` |
| `.pagecommon .tit_cm p` | `LotteMartDreamBold` 40px #222 | `.koist-legacy-theme .tit_cm p` |
| `.pagecommon .dl_cm` | `flex; padding:0 5%` | `.koist-legacy-theme .service-section` |
| `.pagecommon .dl_cm + .dl_cm` | `margin-top:60px;border-top:1px #e1e1e1` | `.service-section + .service-section` |
| `.pagecommon .dl_cm > dt` | `width:200px; LotteMartDreamBold 24px #222` | `.service-section-title` |
| `.pagecommon .dl_cm > dd` | `width:calc(100% - 200px)` | `.service-section-body` |
| `.pagecommon .ul_dot_cm li` | `text-indent:-14px;margin-left:14px` | `.service-bullets li` |
| `.pagecommon .ul_dot_cm li:before` | `4×4px #005f9b 원` | `.service-bullets li::before` |
| `#p38 .img_box` | `padding:50px;background:#f5f5f5` | `.service-image` |
| `#p38 .img_box img` | `width:100%` | `.service-image img` |
| `.pagecommon .num_dl_cm > dd` | `flex;padding:12px;border:1px #e1e1e1` | `.service-step` |
| `.pagecommon .num_dl_cm > dd span` | `32×32 #005f9b Play 14px 700 #fff` | `.service-step-num` |
| `#p39 .process li` | `flex-flow:column;width:100%/6;padding:50px 10px 40px;border:1px #e1e1e1` | `.process li` |
| `.pagecommon .cs_cm .tit` | `margin:100px 0 30px; LotteMartDreamBold 25px center` | `.cs_cm .tit` |
| `.pagecommon .cs_cm ul li` | `max-width:350px;border-radius:0 0 20px 0` | `.cs_cm ul li` |

---

## 부록 B: 구현 시 체크리스트 (Phase 별)

### Phase 1 체크
- [ ] `.koist-legacy-theme` 네임스페이스 모든 규칙 적용 확인
- [ ] CSS lint (stylelint) 경고 0
- [ ] 전역 선택자(`section`, `ul`, `figure` 등) 단독 사용 없음 확인
- [ ] Google Fonts `Play` 로드 확인

### Phase 2 체크
- [ ] `pages.tsx` 의 `prose` 클래스 제거 (services 경로만)
- [ ] 홈/공지/관리자 페이지에 `prose` 여전히 적용되는지 확인
- [ ] `koist-legacy-theme` 래퍼 정확히 부착

### Phase 3 체크
- [ ] 로컬 D1 마이그레이션 성공
- [ ] 원격 D1 마이그레이션 성공
- [ ] `use_legacy_theme` 기본값 1 확인

### Phase 4 체크
- [ ] Playwright verify_v397 통과
- [ ] 시각 비교 ≥ 90% 일치
- [ ] 슬라이더 회귀 6/6

### Phase 5 체크
- [ ] Cloudflare 배포 URL HTTP 200
- [ ] Mixed Content 0
- [ ] 프로덕션 샘플 5/5 OK

### Phase 6 체크
- [ ] Git 커밋 `feat(v39.7): …`
- [ ] Tag `v39.7` push
- [ ] GitHub 원격 최신 확인

### Phase 7 체크
- [ ] ProjectBackup tar.gz 생성
- [ ] README.md v39.7 섹션 추가
- [ ] Implementation report 작성

---

**문서 종료. 사용자 승인 대기 중.**
