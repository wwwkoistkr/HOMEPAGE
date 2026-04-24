-- v39.16 Phase 2-A: 2층(Services)/3층(Accordion) 배경 관리자 편집 가능화
-- 하드코딩된 #FFFFFF 배경을 site_settings 키로 분리

-- 2층(Services) 배경 설정
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_url', '', 'background', '2층(Services) 배경 이미지/비디오 URL - 비어있으면 services_bg_color 사용');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_color', '#FFFFFF', 'background', '2층(Services) 배경 색상 (배경 URL이 비어있을 때 사용)');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('services_bg_opacity', '0.85', 'background', '2층(Services) 배경 이미지 오버레이 투명도 (0~1)');

-- 3층(Accordion) 배경 설정
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_url', '', 'background', '3층(Accordion) 배경 이미지/비디오 URL - 비어있으면 accordion_bg_color 사용');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_color', '#FFFFFF', 'background', '3층(Accordion) 배경 색상 (배경 URL이 비어있을 때 사용)');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_bg_opacity', '0.85', 'background', '3층(Accordion) 배경 이미지 오버레이 투명도 (0~1)');

-- v39.16 Phase 2-C: 3층(Accordion) MP4 배경 비디오
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_video_url', '', 'background', '3층(Accordion) 배경 MP4 비디오 URL - 설정 시 이미지/색상 대신 비디오 재생');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('accordion_video_opacity', '0.75', 'background', '3층(Accordion) 배경 비디오 오버레이 투명도 (0~1)');
