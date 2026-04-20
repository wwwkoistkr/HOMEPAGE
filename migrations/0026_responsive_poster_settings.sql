-- v36.1.1: Responsive poster settings for hero video background
-- Mobile devices cannot play video — show poster images instead
-- Provides 4K, FHD, and Mobile optimized poster URLs

-- 4K poster (3840x2160, WebP recommended, ~400-800KB)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_poster_4k', '', 'hero', '히어로 포스터 4K (3840x2160 WebP, 데스크탑 HiDPI용)');

-- FHD poster (1920x1080, WebP recommended, ~200-400KB)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_poster_fhd', '', 'hero', '히어로 포스터 FHD (1920x1080 WebP, 데스크탑 표준용)');

-- Mobile poster (1080x607 or 1080x1920 portrait, WebP recommended, ~100-300KB)
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_video_poster_mobile', '', 'hero', '히어로 포스터 모바일 (1080p WebP, 모바일/태블릿용)');
