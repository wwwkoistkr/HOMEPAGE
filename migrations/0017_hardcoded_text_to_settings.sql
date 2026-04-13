-- Migration 0017: Move hardcoded text from home.tsx into site_settings
-- This allows admin to edit ALL visible text on the homepage

-- Simulator UI labels
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES 
  ('sim_tab_overall', '전체평균', 'simulator', 'EAL Tab: 전체평균 버튼 라벨'),
  ('sim_tab_eal2', 'EAL2', 'simulator', 'EAL Tab: EAL2 버튼 라벨'),
  ('sim_tab_eal3', 'EAL3', 'simulator', 'EAL Tab: EAL3 버튼 라벨'),
  ('sim_tab_eal4', 'EAL4', 'simulator', 'EAL Tab: EAL4 버튼 라벨'),
  ('sim_label_prep', '사전준비', 'simulator', '시뮬레이터 사전준비 라벨'),
  ('sim_label_traditional', '전통 CCRA 평가 프로세스', 'simulator', '시뮬레이터 전통 프로세스 라벨'),
  ('sim_label_koist', 'KOIST 평가 프로세스', 'simulator', '시뮬레이터 KOIST 프로세스 라벨');

-- Accordion section labels
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES 
  ('accordion_title', '공지사항 / 자료실 / 시스템문서 / 오시는길', 'content', '아코디언 섹션 트리거 제목'),
  ('accordion_expand_label', '펼쳐보기', 'content', '아코디언 펼쳐보기 버튼 라벨');

-- Company name (used in multiple places: location tab, etc.)
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES 
  ('company_name', '(주)한국정보보안기술원', 'general', '회사 공식 명칭');

-- Progress section label
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES 
  ('progress_title', '평가현황', 'content', '평가현황 섹션 제목'),
  ('progress_total_label', '총 시험·평가 실적', 'content', '평가현황 총 실적 라벨');

-- Services section badge
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES 
  ('services_badge', 'KOIST 사업분야', 'content', '사업분야 섹션 배지 텍스트');
