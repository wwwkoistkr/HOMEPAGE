# KOIST Website v39.0

**(주)한국정보보안기술원** 공식 웹사이트 - XSS Hardening + 8K Ultra Sharp

## URLs
- **Production**: https://koist-website.pages.dev
- **GitHub**: https://github.com/wwwkoistkr/HOMEPAGE
- **관리자**: /admin (스크립트로 생성, 아래 "관리자 계정 설정" 참조)

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
