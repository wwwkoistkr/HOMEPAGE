-- Migration 0019: v35.3 Hero/Slider Admin-Editable Settings Keys
-- 히어로 및 슬라이더의 모든 텍스트/수치를 관리자 모드에서 편집 가능하도록 설정 키 추가

-- ═══ 시뮬레이터 탭 라벨 ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('sim_tab_overall', '전체평균', 'simulator', '시뮬레이터 탭: 전체평균'),
  ('sim_tab_eal2', 'EAL2', 'simulator', '시뮬레이터 탭: EAL2'),
  ('sim_tab_eal3', 'EAL3', 'simulator', '시뮬레이터 탭: EAL3'),
  ('sim_tab_eal4', 'EAL4', 'simulator', '시뮬레이터 탭: EAL4');

-- ═══ 시뮬레이터 슬라이더 레벨 라벨 ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('sim_slider_level1', '미흡', 'simulator', '슬라이더 레벨1 라벨 (빨강)'),
  ('sim_slider_level2', '보통', 'simulator', '슬라이더 레벨2 라벨 (노랑)'),
  ('sim_slider_level3', '양호', 'simulator', '슬라이더 레벨3 라벨 (초록)'),
  ('sim_slider_level4', '우수', 'simulator', '슬라이더 레벨4 라벨 (파랑)');

-- ═══ 시뮬레이터 바 차트 라벨 ═══
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('sim_label_prep', '사전준비', 'simulator', '사전준비 슬라이더 라벨'),
  ('sim_label_traditional', '전통 CCRA 평가 프로세스', 'simulator', 'CCRA 바 차트 라벨'),
  ('sim_label_koist', 'KOIST 평가 프로세스', 'simulator', 'KOIST 바 차트 라벨');
