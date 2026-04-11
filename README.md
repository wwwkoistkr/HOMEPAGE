# KOIST Website v13.0

**(주)한국정보보안기술원** 공식 웹사이트 - 10개 사업 평가현황 통합 관리 시스템

## URLs
- **Production**: https://koist-website.pages.dev
- **평가현황**: https://koist-website.pages.dev/support/progress
- **시스템 문서**: https://koist-website.pages.dev/support/documents
- **관리자**: https://koist-website.pages.dev/admin (admin / admin1234)

## v13.0 업데이트 내역 (2026-04-11)

### 1. 10개 카테고리 서비스 카드 3배 확대
- **그리드**: 5열 -> 4열 (데스크톱), 3열(태블릿), 2열(모바일)
- **아이콘**: 36-48px -> 56-76px (약 2배)
- **제목**: f-text-sm(13px) -> clamp(0.95rem~1.2rem) (약 2.5배 체감)
- **설명**: f-text-xs(11px) -> clamp(0.72rem~0.88rem) (약 2배)
- **카드 패딩**: 확대 (1.2rem ~ 1.8rem), 텍스트 중앙 정렬
- **간격 최적화**: gap 축소로 화면 높이 증가 방지
- 새로운 CSS 클래스 `.card-service-xl` 도입

### 2. EAL별 인터랙티브 바 그래프
- **EAL 탭 전환**: EAL2 / EAL3 / EAL4 탭 클릭으로 데이터 전환
- **데이터 근거** (NIAP/NIST, UT Austin, CCLab 2024, KOIST DB):
  - EAL2: 일반 14개월 -> KOIST 8개월 (43% 단축)
  - EAL3: 일반 18개월 -> KOIST 11개월 (39% 단축)
  - EAL4: 일반 26개월 -> KOIST 15개월 (42% 단축)
- **CSS 애니메이션**: 바 width transition 0.8s, 탭 active gradient
- **KOIST 실적**: EAL2=68건, EAL3=25건, EAL4=47건 표시
- 순수 CSS + Vanilla JS (외부 라이브러리 없음)

### 3. 대시보드 통합
- 기존 우측 대시보드(카테고리 건수)를 **평가현황 패널에 통합**
- 상단 4개 카테고리 미니 카드 + 하단 태그 + 총 실적 + 테이블
- EAL 인터랙티브 그래프가 바 차트 섹션 우측에 배치

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

### 홈페이지 구성 (v11.0)
1. **히어로 섹션**: 원본 배너 문구 + 영문 라벨 + CTA 버튼 + 상담 카드
2. **핵심가치 섹션**: Expert/One-Stop/Quality/Reliability 4패널 (다크 테마)
3. **사업분야 Bento Grid**: 10개 사업분야 아이콘 카드
4. **주요 사업 소개**: 원본 5개 사업분야 이미지 카드 (CC평가, 보안기능시험, 성능평가, 시험성적서, 정보보안진단)
5. **평가기간 비교**: 바 차트 CSS 애니메이션 (37.5% 단축 강조)
6. **공지사항/평가현황 패널**: 최신 공지 + 최근 평가 테이블
7. **CTA 섹션**: 상담 안내 + 전화/온라인 상담 버튼
8. **KOLAS 인증 마크**: 헤더 + 핵심가치 섹션

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
- **Frontend**: Tailwind CSS (CDN) + FontAwesome + AOS Animation
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

## 정적 이미지 자산
- `/static/images/kolas.png`: KOLAS 국제공인시험기관 마크 (원본 koist.kr)
- `/static/images/logo-original.png`: 원본 KOIST 로고 (원본 koist.kr)
- `/static/images/logo-circle.png`: 원형 로고 (favicon)
- `/static/images/logo-horizontal.png`: 가로형 로고 (푸터)
- `/static/images/services/cc-evaluation.jpg`: CC평가 이미지
- `/static/images/services/security-test.jpg`: 보안기능시험 이미지
- `/static/images/services/performance.jpg`: 성능평가 이미지
- `/static/images/services/test-report.jpg`: 시험성적서 이미지
- `/static/images/services/security-diagnosis.jpg`: 정보보안진단 이미지

## 배포 상태
- **Platform**: Cloudflare Pages
- **Status**: Active
- **D1 DB**: koist-website-db (91f1eb2f-e9fa-45e8-8bea-4958ce74727a)
- **Last Updated**: 2026-04-11
