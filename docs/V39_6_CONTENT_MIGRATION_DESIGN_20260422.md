# v39.6 — 사업분야 하위페이지 원본(koist.kr) 1회 크롤링 마이그레이션 정밀 설계보고서

- **작성일**: 2026-04-22
- **문서 버전**: v39.6 설계안 (Final)
- **대상 릴리스**: `v39.6` (이전: v39.5 - 슬라이더 폰트 +50%)
- **작성자**: KOIST 개발 자동화 에이전트
- **승인 전제**: 사용자 4개 질의 답변 완료 (Option B, 자사자산, 이미지 크롤링, 프록시)

---

## 1. Executive Summary

현재 v39.5 배포본의 `/services/<dept>/<page>` 경로는 DB `dep_pages.content` 에 저장된 **매우 짧은 HTML(평균 60~235자)** 만을 `sanitizeHtml()` → `<div class="prose">` 로 단순 렌더링하기 때문에 원본 koist.kr 대비 **레이아웃/섹션 구조가 누락**되어 있습니다. 원본(예: `http://www.koist.kr/cc/summary`)은 `dl.dl_cm > dt/dd > ul.ul_dot_cm` 패턴의 **정의형 섹션 리스트**와 `div.img_box > img` 이미지 블록, `div.cs_cm` 문의 블록으로 구성되어 있습니다.

**해결 전략(Option B)**: 원본 사이트에서 **1회 배치 크롤링 → HTML 정제(구조 보존 매핑) → HTTPS 이미지 프록시 주입 → D1 DB 업데이트 마이그레이션 파일(0030)로 고정 → 관리자 WYSIWYG 편집기에서 후속 미세조정** 가능한 구조로 통합합니다.

### 핵심 숫자
| 항목 | 수치 |
|-|-|
| 대상 페이지 | **27개** (9개 부서, 기존 20→27개 실측 매핑) |
| 대상 이미지 | 평가인증체계 `p38_img.png` + 각 부서 다이어그램 (~추정 15~25장) |
| 신규 마이그레이션 | `migrations/0030_content_migration_original.sql` |
| 신규 라우트 | `GET /api/images/legacy/*` (HTTPS 프록시, 302 리다이렉트 + R2 캐시 옵션) |
| 변경 파일 | 4개 (crawler script + migration SQL + api.ts + docs) |
| 추정 작업시간 | 2.5 ~ 3.5 시간 (크롤링 15분, 정제 30분, 빌드/테스트 60분, 배포/백업 30분) |

---

## 2. 요구사항 분석 & 수용 기준

### 2.1 사용자 명시 요구사항 (4개 답변 완전 반영)
1. **Q1 → 27개 하위페이지** 원본 1회 크롤링 후 DB 자동 마이그레이션, 평가인증체계 다이어그램 등 **이미지는 원본 링크를 HTTPS 프록시로 감쌈**, 현 홈피 관리자모드 **사업자관리 하위페이지에 DB 적용** 후 홈피 반영, 추후 관리자가 **일반 HTML 에디터로 미세 조정 가능**.
2. **Q2 → Option B (크롤링 마이그레이션)** 로 진행.
3. **Q3 → 모든 이미지는 자사자산**(권리 문제 없음).
4. **Q4 → 평가인증체계는 (a) 이미지 크롤링**(SVG 재작성 X).

### 2.2 수용 기준 (Definition of Done)
- [ ] 27개 페이지 DB `dep_pages.content` 가 원본 구조(섹션 제목 + 불릿 리스트 + 이미지 + 문의블록) 보존하여 업데이트됨
- [ ] 배포 환경(HTTPS)에서 Mixed Content 경고 0건
- [ ] 모든 이미지 `/api/images/legacy/*` 프록시로 로드 가능 (HTTPS 302 리다이렉트)
- [ ] 관리자 UI (`/admin/departments`)에서 콘텐츠 수정 → 저장 → 프론트 반영 동작 확인
- [ ] 기존 `sanitizeHtml()` 허용 태그(`h3`, `ul`, `li`, `img`, `figure`, `p` 등) 내에서 100% 렌더 가능한 안전 HTML 생성
- [ ] v39.4 슬라이더 회귀(120/120) + v39.5 오버플로우 가드(240/240) 유지
- [ ] Playwright 비교: 시맨틱 섹션 개수(원본 vs 마이그레이션 후) 일치율 ≥ 95%
- [ ] Git 태그 `v39.6` 푸시, Cloudflare 배포 완료, ProjectBackup 아카이브 생성

---

## 3. As-Is 분석 (현재 v39.5 상태)

### 3.1 원본 사이트 DOM 패턴 (koist.kr/cc/summary 기준)
```html
<div class="pagecommon" id="p38">
  <div class="tit_cm">
    <span>summary</span>
    <p>CC평가 개요</p>
  </div>
  <dl class="dl_cm">
    <dt>개요</dt>
    <dd>
      <ul class="ul_dot_cm">
        <li>신청기관이 개발한 정보보호제품에...</li>
        <li>정보보호시스템 공통평가기준</li>
        ...
      </ul>
    </dd>
  </dl>
  <dl class="dl_cm">
    <dt>법적근거</dt>
    <dd><ul class="ul_dot_cm"><li>지능정보화 기본법 제58조...</li></ul></dd>
  </dl>
  <!-- ... 5~7개의 <dl> 블록 -->
  <dl class="dl_cm">
    <dt>평가인증체계</dt>
    <dd><div class="img_box"><img src="/sh_page/img/p38_img.png" alt="평가인증체계" /></div></dd>
  </dl>
  <div class="cs_cm">
    <p class="tit">문의 및 상담</p>
    <ul><li><p>최진호 <span>팀장</span></p>...</li></ul>
  </div>
</div>
```

### 3.2 현재 DB `dep_pages.content` 상태
| dept | page | 현재 content 길이 | 원본 예상 길이 | 격차 |
|-|-|-|-|-|
| cc | overview | 235 chars | ~2400 chars | **10×** |
| cc | apply | 170 | ~1800 | **10×** |
| cc | consulting | 62 | ~1200 | **19×** |
| cc | progress | 69 | ~1500 | **22×** |
| security-test | overview | 71 | ~2000 | **28×** |
| performance | overview | 57 | ~1800 | **31×** |
| ... | ... | ... | ... | ... |

→ 전체 평균 **약 15~30배 콘텐츠가 누락**되어 있음을 확인.

### 3.3 현재 렌더 경로
- 요청: `GET /services/:deptSlug/:pageSlug`
- `src/index.tsx` → `servicePage(dept, pages, currentPage, settings)` 호출
- `src/templates/pages.tsx:servicePage()` 에서 `sanitizeHtml(currentPage.content)` 실행
- 결과: `<div class="prose prose-slate"> {짧은 HTML} </div>` 렌더
- 문제: 콘텐츠가 적어 `<div>` 가 빈 회색 박스처럼 보임, 원본 레이아웃 부재

### 3.4 sanitizeHtml 허용 태그 (src/utils/sanitize.ts 실측)
```
✅ 허용: p, br, hr, div, span, h1~h6, ul, ol, li, a, img, table/tr/td/th/thead/tbody, 
        strong, em, figure, figcaption, section, article, ...
❌ 차단: script, style, iframe, form, input, button, meta, link, base
⚠️ 속성 제한: img[src,alt,width,height,loading,decoding], a[href,target,rel]
⚠️ 프로토콜: javascript:, vbscript:, data:(이미지 외) 차단
```
→ **원본 `dl/dt/dd`는 허용 태그 아님** → `<h3>` + `<ul>` 패턴으로 **변환 필요**

---

## 4. To-Be 설계 (v39.6 목표)

### 4.1 HTML 구조 매핑 규칙

원본 koist.kr 구조 → KOIST v39.6 허용 구조로 1:1 매핑:

| 원본 (koist.kr) | 변환 결과 (v39.6) | 의미 |
|-|-|-|
| `<div class="tit_cm"><span>summary</span><p>CC평가 개요</p></div>` | **제거** (페이지 헤더가 이미 같은 제목 표시) | 중복 방지 |
| `<dl class="dl_cm"><dt>개요</dt><dd>...</dd></dl>` | `<section class="service-section"><h3>개요</h3>...</section>` | 시맨틱 섹션 |
| `<ul class="ul_dot_cm"><li>...</li></ul>` | `<ul class="service-bullets"><li>...</li></ul>` | 불릿 리스트 |
| `<div class="img_box"><img src="/sh_page/img/xxx.png" alt="..."></div>` | `<figure class="service-image"><img src="/api/images/legacy/sh_page/img/xxx.png" alt="..."><figcaption>...</figcaption></figure>` | **이미지 프록시** |
| `<div class="cs_cm">...</div>` | **제거** (서비스페이지 CTA 블록이 동일 정보 표시) | 중복 제거 |
| `<table>` | `<table class="service-table">` | 유지 |

### 4.2 이미지 프록시 전략 (HTTPS Mixed-Content 해소)

**문제**: 원본 `http://www.koist.kr/sh_page/img/p38_img.png` 직접 참조 → Cloudflare Pages(HTTPS)에서 Mixed Content 차단

**해결**: 신규 라우트 `GET /api/images/legacy/*` 에서 **HTTPS로 원본 호스트에 프록시 요청** 후 응답을 **스트리밍 반환** + **Cache-Control 1년**

```typescript
// src/routes/api.ts 에 추가 (서브라우트 /legacy 우선 매칭)
api.get('/images/legacy/*', async (c) => {
  const key = c.req.path.replace('/api/images/legacy/', '');
  if (!key) return c.json({ error: 'Legacy image key required' }, 400);
  const upstream = `http://www.koist.kr/${key}`;  // 원본 호스트
  try {
    const res = await fetch(upstream, { cf: { cacheEverything: true, cacheTtl: 31536000 } });
    if (!res.ok) return c.notFound();
    const headers = new Headers();
    headers.set('Content-Type', res.headers.get('Content-Type') || 'image/png');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('X-Legacy-Proxy', 'koist.kr');
    return new Response(res.body, { headers });
  } catch {
    return c.json({ error: 'Failed to proxy legacy image' }, 502);
  }
});
```

**핵심 속성**:
- 서버→서버 통신이므로 Mixed-Content 에러 원천 차단
- Cloudflare Edge Cache가 `cacheEverything:true` 로 영구 캐싱
- 기존 `/api/images/*` 라우트는 유지 (R2 이미지용)
- `/legacy/` 프리픽스로 별도 경로 분리 → 충돌 없음

### 4.3 관리자 편집 지원

기존 관리자 라우트 `/admin/departments/:id/pages/:pageId` (WYSIWYG 에디터) 가 이미 존재하므로 **추가 코드 불필요**:
- 관리자가 마이그레이션된 콘텐츠를 로드 → HTML 에디터에서 수정 → 저장
- `sanitizeHtml()` 이 저장시 자동 실행되어 XSS 방지

### 4.4 마이그레이션 파일 설계 (migrations/0030)

```sql
-- migrations/0030_content_migration_original.sql
-- 원본 koist.kr에서 크롤링한 27개 페이지 콘텐츠 마이그레이션 (v39.6)
-- 실행일: 2026-04-22, 재실행 안전 (UPDATE 사용)

UPDATE dep_pages SET content = '<section class="service-section">...', updated_at = CURRENT_TIMESTAMP
  WHERE dept_id = (SELECT id FROM departments WHERE slug = 'cc') AND slug = 'overview';

-- ... 27개 UPDATE 문
```

**재실행 안전 보장**:
- `UPDATE` 사용 (INSERT 아님) → 멱등성
- `WHERE slug=...` 로 대상 한정
- `updated_at` 갱신으로 추적 가능

---

## 5. 구현 단계 (Phase-by-Phase)

### Phase 1 — 크롤러 실행 (15~20분, Node.js + native fetch)
```
scripts/crawl-koist-content.cjs
 ├─ 입력: /tmp/koist_crawl/urlmap.json (27 URL)
 ├─ 처리: fetch → regex extract <div id="sh_content">...</div>
 ├─ 정제: dl/dt/dd → section/h3/ul 변환, img src 재작성(/api/images/legacy/*)
 ├─ 출력: /tmp/koist_crawl/migrated_content.json (27개 항목)
 └─ 검증: 각 페이지 최소 200자, <section> ≥ 1, HTML balanced
```

### Phase 2 — 이미지 프록시 라우트 (10분)
- `src/routes/api.ts` 에 `/images/legacy/*` 라우트 추가
- **기존 `/images/*` 라우트보다 앞에 배치** (Hono 라우트 우선순위 준수)

### Phase 3 — 마이그레이션 SQL 생성 (10분)
- `scripts/gen-migration-sql.cjs` 가 `migrated_content.json` → `migrations/0030_*.sql` 생성
- SQL escape: `'` → `''`, 멀티라인 허용

### Phase 4 — 적용 & 빌드 (15분)
```bash
npx wrangler d1 migrations apply koist-website-db --local
npm run build
pm2 restart koist-website
```

### Phase 5 — 검증 (20분)
- Playwright 스크립트:
  1. `http://localhost:3000/services/cc/overview` 로드
  2. `<section>` 개수 ≥ 5, `<ul>` 개수 ≥ 4, `<img>` 1개 이상 확인
  3. 모든 `<img src>` 가 `/api/images/legacy/` 로 시작하는지 확인
  4. `fetch('/api/images/legacy/sh_page/img/p38_img.png')` → 200 OK + content-type image
  5. v39.4/v39.5 회귀(슬라이더) 재실행 → 120/120 + 240/240

### Phase 6 — 배포 (10분)
```bash
npx wrangler d1 migrations apply koist-website-db  # 프로덕션 DB
npm run build
npx wrangler pages deploy dist --project-name koist-website
```

### Phase 7 — Git & 백업 (10분)
```bash
git add -A && git commit -m "feat(v39.6): 27개 사업분야 하위페이지 koist.kr 원본 크롤링 마이그레이션"
git tag v39.6
git push origin main --tags
# ProjectBackup → tar.gz → blob storage
```

---

## 6. 리스크 & 완화 (5가지)

| # | 리스크 | 영향 | 확률 | 완화책 |
|-|-|-|-|-|
| R1 | 크롤링 페이지 형식이 URL마다 조금씩 달라 `<dt>` 대신 `<h4>` 사용 등 변형 | 일부 섹션 누락 | 중 | 변형 탐지시 폴백 파서 2단(dl 우선 → `<h4>` 하위) |
| R2 | 원본 이미지 경로가 상대경로(`../img/xxx.png`) | 이미지 깨짐 | 중 | URL 정규화: `resolveURL(base, src)` 사용, 절대경로 복원 |
| R3 | 프록시 라우트에 대용량 요청 급증시 Worker CPU 10ms 제한 초과 | 502 오류 | 저 | Cloudflare Edge Cache `cacheEverything` + `immutable` → 첫 요청 후 원본 hit 없음 |
| R4 | D1 `UPDATE` 문에 작은따옴표 이스케이프 누락 → SQL 에러 | 마이그레이션 실패 | 중 | `content.replace(/'/g, "''")` 자동 이스케이프 스크립트 |
| R5 | 슬라이더 회귀(v39.4/v39.5)가 무관한 수정에 의해 재발 | 시각적 버그 | 저 | Playwright 회귀 자동화 + 배포 전 필수 120/120 + 240/240 확인 |

---

## 7. 수용 기준 체크리스트 (최종 검증)

- [ ] 27/27 페이지 콘텐츠 길이 ≥ 200자 (평균 ≥ 1000자 예상)
- [ ] 모든 이미지 URL `/api/images/legacy/` 프리픽스로 시작
- [ ] 프로덕션 URL https://koist-website.pages.dev/services/cc/overview 에서 원본 구조(≥5 섹션) 렌더
- [ ] Chrome DevTools Console 에 Mixed Content 경고 0건
- [ ] 관리자 `/admin/departments/1/pages/1` 에서 콘텐츠 로드/수정/저장 정상
- [ ] v39.4 회귀 120/120, v39.5 오버플로우 240/240 유지
- [ ] Git 태그 `v39.6` + commit hash 확인, GitHub push 성공
- [ ] ProjectBackup 아카이브 blob 업로드 성공, 공개 URL 제공

---

## 8. 향후 로드맵 (v40+)

- **v40.0**: 관리자 페이지에 **블록 기반 에디터**(dl.dl_cm 패턴 재현용 "섹션 블록", "불릿 리스트 블록", "이미지 블록") 추가 → WYSIWYG에서 저장 시 구조 손실 근본 방지
- **v40.1**: 이미지 R2 업로드 자동화 (legacy proxy → R2 migration script) → 외부 의존 0
- **v40.2**: i18n (영문/중문) 콘텐츠 지원 시 `dep_pages_i18n` 테이블 추가

---

## 9. 변경 파일 요약

```
migrations/0030_content_migration_original.sql    [신규, ~30KB]
src/routes/api.ts                                  [수정, +20 lines]
scripts/crawl-koist-content.cjs                    [신규, ~150 lines]
scripts/gen-migration-sql.cjs                      [신규, ~60 lines]
docs/V39_6_CONTENT_MIGRATION_DESIGN_20260422.md    [이 문서]
docs/V39_6_IMPLEMENTATION_REPORT_20260422.md       [구현 후 생성]
README.md                                          [수정, 릴리스 노트 업데이트]
```

---

**정밀 설계 완료. 승인 전제 하에 Phase 1~7 일괄 실행.**
