-- v39.21: HERO/SIMULATOR 위치 미세조정 + 슬라이더(SIM) 반투명도를 HERO contact card 와 동일하게
-- 작업 목적:
--   1) SIM(좌측 패널) 좌측으로 -1.5cm, 위로 -1cm 이동
--   2) HERO(우측 패널) 우측으로 +3cm 이동
--   3) SIM 패널 반투명도를 HERO 의 hero-contact-card 와 동일한 시각감으로 적용
--      - HERO contact card: rgba(255,255,255,0.03) + backdrop-filter: blur(16px)
--      - 즉 본문 알파 0.03 (3% 불투명, 97% 투명)
--      - 헤더는 검정 계열이므로 알파 0.85 (강한 어둠 - HERO 오버레이와 동일)
--      - 가독성 보호를 위해 본문 0.03은 너무 투명할 수 있어 사용자 검증 필요

-- ============================================================
-- (1) SIM 좌측 시프트 (cm 단위)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('sim_offset_left_cm', '-1.5', 'layout', '시뮬레이터 패널 좌측 시프트 (cm). 음수=좌측 이동. v39.21 추가');

-- ============================================================
-- (2) SIM 위쪽 시프트 (cm 단위, 음수=위로)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('sim_offset_top_cm', '-1.0', 'layout', '시뮬레이터 패널 상단 시프트 (cm). 음수=위로 이동. v39.21 추가');

-- ============================================================
-- (3) HERO 우측 시프트 (cm 단위, 양수=우측)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_offset_right_cm', '3.0', 'layout', 'HERO 텍스트 우측 시프트 (cm). 양수=우측 이동. v39.21 추가');

-- ============================================================
-- (4) SIM 패널 반투명도를 HERO contact card 와 동일하게 적용
-- ============================================================
-- HERO contact card 값: rgba(255,255,255,0.03) + blur(16px)
-- → SIM 본문 알파 0.03, 블러는 16px 로 통일
-- → SIM 헤더는 검정 그라디언트이므로 hero_overlay_opacity (0.85) 와 동일 적용
UPDATE site_settings SET value = '0.03' WHERE key = 'sim_panel_opacity';
UPDATE site_settings SET value = '0.85' WHERE key = 'sim_header_opacity';
UPDATE site_settings SET value = '16'   WHERE key = 'sim_panel_blur';
