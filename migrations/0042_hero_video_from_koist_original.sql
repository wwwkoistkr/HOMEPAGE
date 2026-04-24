-- v39.14 Phase 2-B: koist.kr 원본 MP4를 1층 Hero에 적용
-- 원본: http://www.koist.kr/sh_img/index/main_banner/main_mov1.mp4 (2.7MB)
--       http://www.koist.kr/sh_img/index/main_banner/main_mov2.mp4 (1.4MB)
-- 배치: public/static/videos/ (Cloudflare Pages 정적 파일 서빙, CDN 자동 캐싱)
-- 서빙 경로: /static/videos/main_mov1.mp4

-- 1. hero_video_url 설정 (main_mov1.mp4 사용 — 더 길고 대표성 있는 영상)
UPDATE site_settings
SET value = '/static/videos/main_mov1.mp4',
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero_video_url';

-- 2. hero_video_opacity 0.3 → 0.45 (오버레이 적정 수준 조정, 원본 느낌)
--    이 값은 영상 위에 올라가는 어두운 오버레이의 투명도이므로
--    낮을수록 영상이 더 밝고 선명하게 보임
UPDATE site_settings
SET value = '0.45',
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero_video_opacity';
