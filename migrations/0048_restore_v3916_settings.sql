-- v39.16 롤백 되돌림: 0047에서 DELETE된 site_settings 8개 키 복원
-- 원본 0044_floor23_bg_admin.sql 과 동일한 기본값으로 재삽입
-- INSERT OR IGNORE: 이미 존재하면 무시 (안전)

-- Phase 2-A: 2층(Services) 배경 3개 키
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_url', '', 'background', '2층(Services) 배경 이미지/비디오 URL - 비어있으면 services_bg_color 사용');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_color', '#FFFFFF', 'background', '2층(Services) 배경 색상 (hex)');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_opacity', '0.85', 'background', '2층(Services) 배경 오버레이 투명도 (0.0 ~ 1.0)');

-- Phase 2-A: 3층(Accordion) 배경 3개 키
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_url', '', 'background', '3층(Accordion) 배경 이미지 URL - 비어있으면 accordion_bg_color 사용');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_color', '#FFFFFF', 'background', '3층(Accordion) 배경 색상 (hex)');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_opacity', '0.85', 'background', '3층(Accordion) 배경 오버레이 투명도 (0.0 ~ 1.0)');

-- Phase 2-C: 3층 MP4 배경 2개 키
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_video_url', '', 'background', '3층(Accordion) MP4 배경 비디오 URL - 비어있으면 비디오 비활성');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_video_opacity', '0.75', 'background', '3층(Accordion) 비디오 위 화이트 오버레이 투명도 (0.0 ~ 1.0)');
