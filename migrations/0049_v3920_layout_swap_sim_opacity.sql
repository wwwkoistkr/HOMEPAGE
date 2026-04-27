-- v39.20: HERO ↔ SIMULATOR 좌우 위치 교체 + 시뮬레이터 패널 70% 불투명 (Glassmorphism)
-- 작업 목적:
--   1) 1층 .unified-hero-section의 HERO(좌)와 SIMULATOR(우) 위치 교체
--   2) 상단 정렬(align-items:start) 적용 - 두 패널 상단을 맞춤
--   3) 시뮬레이터 패널을 30% 반투명(=70% 불투명)으로 만들고 배경 블러 적용
-- 모든 키는 INSERT OR IGNORE - 이미 존재하면 무시 (재실행 안전)

-- ============================================================
-- (1) 좌우 위치 교체 토글 (관리자가 끄고 켤 수 있도록)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('hero_layout_swap', '1', 'layout', '1층 HERO/SIMULATOR 좌우 교체 (1=교체, 0=원래대로). v39.20 기본 1');

-- ============================================================
-- (2) 시뮬레이터 패널 본문 불투명도 (70% = 0.70)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('sim_panel_opacity', '0.70', 'design', '시뮬레이터 패널 본문(흰색 영역) 불투명도 (0.0~1.0). 1=완전 불투명, 0.7=30% 반투명. v39.20 추가');

-- ============================================================
-- (3) 시뮬레이터 패널 헤더 불투명도 (70% = 0.70)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('sim_header_opacity', '0.70', 'design', '시뮬레이터 패널 헤더(검정 그라디언트) 불투명도 (0.0~1.0). v39.20 추가');

-- ============================================================
-- (4) 시뮬레이터 패널 backdrop-filter blur 강도 (px)
-- ============================================================
INSERT OR IGNORE INTO site_settings (key, value, category, description)
VALUES ('sim_panel_blur', '20', 'design', '시뮬레이터 패널 backdrop-filter blur 강도 (px). 0=블러 없음. v39.20 추가');
