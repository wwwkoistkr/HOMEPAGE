# KOIST Website v8.0

**(주)한국정보보안기술원** 공식 웹사이트 - 10개 사업 평가현황 통합 관리 시스템

## URLs
- **Production**: https://koist-website.pages.dev
- **평가현황**: https://koist-website.pages.dev/support/progress
- **시스템 문서**: https://koist-website.pages.dev/support/documents
- **관리자**: https://koist-website.pages.dev/admin (admin / admin1234)

## 주요 기능

### 10개 사업 평가현황 (각 사업별 독립 현황)
| # | 카테고리 | 동적 필드 (등급/구분/유형) |
|---|---------|------------------------|
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

### 프론트엔드
- 카테고리 탭으로 사업별 필터링
- 카테고리별 동적 컬럼 헤더 (선택한 사업에 맞게 변경)
- 검색/상태 필터 + 페이지네이션 (15건/페이지)
- 홈페이지에 카테고리별 요약 카드 표시

### 관리자 모드
- 사업별 건수 카드 + 카테고리 필터링
- **동적 폼**: 카테고리 변경 시 등급/구분/유형 옵션 자동 변경
- 전체 CRUD: 추가/수정/삭제

### 다운로드 가능 문서
- 설계서 (Architecture Diagram): `/static/docs/architecture-diagram.html`
- 개발지침서 (Development Guide): `/static/docs/development-guide.html`
- 문서 페이지: `/support/documents`

## 기술 스택
- **Backend**: Hono + Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (이미지, 미활성)
- **Frontend**: Tailwind CSS (CDN) + FontAwesome
- **Build**: Vite + @hono/vite-cloudflare-pages
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
npx wrangler d1 migrations apply koist-website-db --remote
npx wrangler d1 execute koist-website-db --remote --file=./seed-progress-v2.sql
npx wrangler pages deploy dist --project-name koist-website
```

## 데이터 아키텍처
- **progress_items**: 평가현황 (category, product_name, company, status, assurance_level, cert_type, eval_type)
- **departments**: 사업분야
- **notices**: 공지사항
- **faqs**: FAQ
- **inquiries**: 상담문의
- **popups**: 팝업
- **site_settings**: 사이트 설정 (key-value)
- **admin_users**: 관리자 계정

## 배포 상태
- **Platform**: Cloudflare Pages
- **Status**: Active
- **D1 DB**: koist-website-db (91f1eb2f-e9fa-45e8-8bea-4958ce74727a)
- **Last Updated**: 2026-04-10
