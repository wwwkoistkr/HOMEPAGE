-- departments 테이블에 아이콘 이미지 URL 컬럼 추가 (v27)
ALTER TABLE departments ADD COLUMN image_url TEXT DEFAULT '';

-- 기본 아이콘 이미지 설정 (slug 기반 매핑)
UPDATE departments SET image_url = '/static/images/dept-icons/cc.png' WHERE slug = 'cc';
UPDATE departments SET image_url = '/static/images/dept-icons/security-test.png' WHERE slug = 'security-test';
UPDATE departments SET image_url = '/static/images/dept-icons/kcmvp.png' WHERE slug = 'kcmvp';
UPDATE departments SET image_url = '/static/images/dept-icons/performance.png' WHERE slug = 'performance';
UPDATE departments SET image_url = '/static/images/dept-icons/certificate.png' WHERE slug = 'certificate';
UPDATE departments SET image_url = '/static/images/dept-icons/diagnosis.png' WHERE slug = 'diagnosis';
UPDATE departments SET image_url = '/static/images/dept-icons/consulting.png' WHERE slug = 'consulting';
UPDATE departments SET image_url = '/static/images/dept-icons/enterprise-security.png' WHERE slug = 'enterprise-security';
UPDATE departments SET image_url = '/static/images/dept-icons/readiness.png' WHERE slug = 'readiness';
UPDATE departments SET image_url = '/static/images/dept-icons/mock-test.png' WHERE slug = 'mock-test';
