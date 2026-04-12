-- 0010: Unified Hero+Simulator Layout Settings
-- 히어로+시뮬레이터 통합 레이아웃에 필요한 관리자 편집 키

INSERT OR IGNORE INTO site_settings (key, value, description, category) VALUES
  ('unified_panel_title', 'KOIST와 함께라면 평가기간을 <span class="text-cyan-300">대폭 단축</span>합니다', '통합패널 헤더 타이틀', 'content'),
  ('unified_panel_subtitle', '사전준비 수준에 따라 실시간으로 기간을 산출합니다', '통합패널 헤더 부제', 'content'),
  ('unified_reduction_default', '35', '헤더 기본 단축률(%)', 'content'),
  ('unified_reduction_label', '평균 단축', '단축률 라벨', 'content');
