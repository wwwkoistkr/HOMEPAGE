-- v39.16 롤백: Phase 2-A/2-E/2-C에서 추가된 site_settings 키 8개 삭제
-- 팝업 card_width_cm / card_height_cm 컬럼은 v39.13에 추가되었으므로 유지 (값만 남음)

-- Phase 2-A: 2층(Services) 배경 관련 3개 키
DELETE FROM site_settings WHERE key = 'services_bg_url';
DELETE FROM site_settings WHERE key = 'services_bg_color';
DELETE FROM site_settings WHERE key = 'services_bg_opacity';

-- Phase 2-A: 3층(Accordion) 배경 관련 3개 키
DELETE FROM site_settings WHERE key = 'accordion_bg_url';
DELETE FROM site_settings WHERE key = 'accordion_bg_color';
DELETE FROM site_settings WHERE key = 'accordion_bg_opacity';

-- Phase 2-C: 3층 MP4 배경 관련 2개 키
DELETE FROM site_settings WHERE key = 'accordion_video_url';
DELETE FROM site_settings WHERE key = 'accordion_video_opacity';
