# KOIST Website v24.0

**(주)한국정보보안기술원** 공식 웹사이트 - 8K 울트라샤프 + 관리자 인라인 편집 시스템

## URLs
- **Sandbox**: https://3000-i0chksvz2v05lxmcn60fh-3c7ff1b5.sandbox.novita.ai
- **Production**: https://koist-website.pages.dev
- **관리자**: /admin (admin / admin1234)

## v24.0 업데이트 내역 (2026-04-14)

### 1. 헤더 레이아웃 재설계
- KOLAS 로고 → 사이트 로고 → GNB 12개 메뉴 → 전화버튼, 왼쪽 끝부터 일자 배치
- 요소 간 0.5cm(19px) 균일 간격
- GNB 폰트 자동 축소로 12개 메뉴 1920px 뷰포트 내 완전 표시
- 전화번호 버튼 xl(1280px) 이상에서만 표시

### 2. 히어로 영역 50:50 완벽 분할
- CSS Grid `1fr 1fr`로 정확한 50% 분할
- 왼쪽: 배지 + 대제목 + 부제 + CTA 버튼 + 연락처 카드
- 오른쪽: 인터랙티브 시뮬레이터 패널 (중앙 정렬, max-width 제한)
- AOS 애니메이션 fade-up 전환 (translateX 충돌 방지)

### 3. 관리자 인라인 편집 모드 (신규)
- 로그인한 관리자에게 하단 고정 툴바 표시
- 편집모드 토글 → 모든 `data-admin-edit` 요소에 점선 테두리
- 텍스트: contentEditable로 직접 편집
- 이미지: 클릭 → URL 입력 다이얼로그
- 변경사항 카운트 표시 → 일괄 API 저장
- 편집 가능 요소: 배지, 제목, 부제, 버튼, 연락처, 시뮬레이터 타이틀, 서비스 섹션 등

### 4. 8K 해상도 및 반응형
- 모든 크기에 CSS clamp() 기반 유체 타이포그래피
- 320px(모바일) ~ 7680px(8K) 전 범위 지원
- 모바일: 1열 스택 레이아웃
- 태블릿: 1열 + 풀폭 시뮬레이터
- 4K/8K: 확대 스케일링 자동 적용

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
