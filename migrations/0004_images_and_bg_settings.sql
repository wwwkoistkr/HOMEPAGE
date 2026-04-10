-- Migration 0004: Images Management & Background/Text Settings
-- 이미지 관리 테이블 + 배경 이미지/텍스트 설정 확장

-- 이미지 저장소 (메타데이터 - 실제 파일은 R2에 저장)
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    r2_key TEXT NOT NULL UNIQUE,
    mime_type TEXT NOT NULL,
    file_size INTEGER DEFAULT 0,
    width INTEGER DEFAULT 0,
    height INTEGER DEFAULT 0,
    category TEXT DEFAULT 'general',
    alt_text TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_images_r2_key ON images(r2_key);

-- departments 테이블에 배경 이미지 컬럼 추가
ALTER TABLE departments ADD COLUMN header_bg_url TEXT DEFAULT '';

-- 배경 이미지 설정 키 추가 (site_settings)
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
    ('hero_bg_url', '', 'background', '히어로 배경 이미지 URL'),
    ('hero_overlay_opacity', '0.85', 'background', '히어로 오버레이 투명도 (0~1)'),
    ('services_bg_url', '', 'background', '사업분야 섹션 배경 이미지'),
    ('notice_progress_bg_url', '', 'background', '공지/현황 섹션 배경 이미지'),
    ('cta_bg_url', '', 'background', 'CTA 섹션 배경 이미지'),
    ('footer_bg_url', '', 'background', '푸터 배경 이미지'),
    ('page_header_bg_url', '', 'background', '서브페이지 헤더 배경 이미지'),
    ('gnb_bg_url', '', 'background', '내비게이션 배경 이미지'),
    ('dept_bg_default', '', 'background', '사업분야 기본 헤더 배경 이미지');

-- 홈페이지 텍스트 콘텐츠 설정 키 추가 (site_settings)
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
    ('hero_badge_text', '국가 공인 정보보안 시험·평가 전문기관', 'content', '히어로 배지 텍스트'),
    ('hero_btn_primary', '온라인 상담', 'content', '히어로 메인 버튼 텍스트'),
    ('hero_btn_secondary', '사업분야 보기', 'content', '히어로 보조 버튼 텍스트'),
    ('hero_quick_badge', 'CC평가 신청 즉시 착수 가능', 'content', '히어로 빠른 배지 텍스트'),
    ('services_title', '핵심 사업분야', 'content', '사업분야 섹션 제목'),
    ('services_subtitle', 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요', 'content', '사업분야 섹션 부제목'),
    ('cta_subtitle', '전문 상담 안내', 'content', 'CTA 섹션 소제목'),
    ('cta_title', '정보보안 시험·인증이 필요하신가요?', 'content', 'CTA 섹션 제목'),
    ('cta_description', '전문 상담원이 빠르고 정확하게 안내해 드립니다', 'content', 'CTA 섹션 설명');
