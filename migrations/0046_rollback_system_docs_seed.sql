-- v39.17 롤백: 마이그레이션 0045에서 시드된 'system-docs' 카테고리 데이터 제거
-- /support/documents 페이지가 다시 하드코딩 2개 문서만 표시하도록 복구

DELETE FROM downloads
WHERE category = 'system-docs'
  AND file_url IN (
    '/static/docs/architecture-diagram.html',
    '/static/docs/development-guide.html'
  );
