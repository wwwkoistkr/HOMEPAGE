# KOIST Website v11.0

**(주)한국정보보안기술원** 공식 웹사이트 - 10개 사업 평가현황 통합 관리 시스템

## URLs
- **Production**: https://koist-website.pages.dev
- **평가현황**: https://koist-website.pages.dev/support/progress
- **시스템 문서**: https://koist-website.pages.dev/support/documents
- **관리자**: https://koist-website.pages.dev/admin (admin / admin1234)

## v11.0 업데이트 내역 (2026-04-11)

### 원본 koist.kr 콘텐츠 완전 복원
- **히어로 배너**: 원본 메인 문구 복원
  - "정보보안을 완성하는 기업 / 한국정보보안기술원"
  - "성실과 신뢰를 바탕으로 최고의 보안서비스를 제공합니다."
  - 영문 라벨 "Korean Information Security Technology"
  - 부가 메시지 "최상의 시험·인증 서비스로 정보보안 기술을 완성"
- **핵심가치 4패널**: Expert / One-Stop / Quality / Reliability (원본 #inc01 복원)
- **KOLAS 인증 마크**: 헤더에 국제공인시험기관 마크 추가
- **사업분야 이미지 카드**: 원본 5개 사업분야 (CC평가, 보안기능시험, 성능평가, 시험성적서, 정보보안진단)
  - 원본 koist.kr 이미지 미러링 및 적용
- **평가기간 비교 바 차트**: 일반 24개월 vs KOIST 15개월 (37.5% 단축) CSS 애니메이션

### 디자인 & UI
- Premium Glassmorphism Design System v11.0
- 4K/8K HiDPI 최적화 (fluid typography + spacing)
- AOS scroll 애니메이션
- 리플 버튼 효과, 플로팅 파티클
- 반응형 모바일 팝업 시스템

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
