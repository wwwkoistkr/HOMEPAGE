-- v39.17: 시스템 문서를 downloads 테이블의 'system-docs' 카테고리로 통합
-- /support/documents 페이지가 DB 기반으로 동작하도록 기존 하드코딩된 2개 문서를 시드

-- 기존 시드 데이터가 있다면 중복 방지
DELETE FROM downloads WHERE category = 'system-docs' AND file_url IN (
  '/static/docs/architecture-diagram.html',
  '/static/docs/development-guide.html'
);

-- 1. 시스템 설계서 (Architecture Diagram)
INSERT INTO downloads (title, description, file_url, file_name, file_size, category, download_count, created_at)
VALUES (
  '시스템 설계서 (Architecture Diagram)',
  'v8.0 | 시스템 아키텍처, 10개 사업 카테고리, DB 스키마, API 설계',
  '/static/docs/architecture-diagram.html',
  'architecture-diagram.html',
  0,
  'system-docs',
  0,
  CURRENT_TIMESTAMP
);

-- 2. 개발지침서 (Development Guide)
INSERT INTO downloads (title, description, file_url, file_name, file_size, category, download_count, created_at)
VALUES (
  '개발지침서 (Development Guide)',
  'v8.0 | 기술 스택, 디렉터리 구조, API 가이드, 배포 절차, 테스트',
  '/static/docs/development-guide.html',
  'development-guide.html',
  0,
  'system-docs',
  0,
  CURRENT_TIMESTAMP
);
