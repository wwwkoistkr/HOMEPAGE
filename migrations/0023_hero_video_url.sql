-- v36.0.0: Hero video background support (R2 Storage MP4)
-- Adds hero_video_url setting for R2-served video backgrounds

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_url', '', 'hero', '히어로 배경 비디오 URL (R2 Storage MP4). 비어있으면 기존 그라디언트/이미지 배경 사용');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_poster', '', 'hero', '히어로 비디오 포스터 이미지 URL (비디오 로딩 전 표시)');

INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_opacity', '0.3', 'hero', '히어로 비디오 오버레이 불투명도 (0.0~1.0)');
