-- 사업분야별 담당자 연락처 (departments 테이블)
ALTER TABLE departments ADD COLUMN contact_dept TEXT DEFAULT '';
ALTER TABLE departments ADD COLUMN contact_name TEXT DEFAULT '';
ALTER TABLE departments ADD COLUMN contact_phone TEXT DEFAULT '';

-- 하위 페이지별 개별 배경 이미지 (dep_pages 테이블)
ALTER TABLE dep_pages ADD COLUMN header_bg_url TEXT DEFAULT '';
