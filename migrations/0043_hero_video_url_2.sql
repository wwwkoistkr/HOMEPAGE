-- v39.15 Phase 2-D: Hero 영상 2개 번갈아 재생 기능 추가
-- 원본 koist.kr는 main_mov1.mp4와 main_mov2.mp4를 슬라이드로 교대 재생함
-- 동일한 UX를 신규 홈피에도 구현하기 위해 두 번째 비디오 URL 키를 추가함

-- 1. hero_video_url_2 키 추가 (site_settings에 예약)
INSERT OR IGNORE INTO site_settings (key, value, category, description, updated_at)
VALUES (
  'hero_video_url_2',
  '',
  'background',
  '1층 Hero 두 번째 영상 URL (비어있으면 단일 영상 재생, 있으면 두 영상 번갈아 재생)',
  CURRENT_TIMESTAMP
);

-- 2. main_mov2.mp4 URL 설정 (v39.14에서 이미 public/static/videos/ 에 업로드됨)
UPDATE site_settings
SET value = '/static/videos/main_mov2.mp4',
    updated_at = CURRENT_TIMESTAMP
WHERE key = 'hero_video_url_2';
