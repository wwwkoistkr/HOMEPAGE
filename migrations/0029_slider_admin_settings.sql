-- ============================================================================
-- Migration 0029: AI 시뮬레이터 슬라이더 관리자 제어 설정
-- ============================================================================
-- 목적:
--   홈페이지 AI 시뮬레이터 히어로 배너의 모든 슬라이더 관련 숫자·색상·텍스트를
--   관리자 모드에서 통제 가능하도록 site_settings 테이블에 신규 설정 키를
--   일괄 추가한다. 전용 테이블을 별도로 만들지 않고 기존 site_settings를
--   확장함으로써 관리자 API(재사용) · 백업 · 캐시 정책을 그대로 활용한다.
--
-- 추가 카테고리: 'slider' (AI 시뮬레이터 슬라이더 전용)
--
-- 반영 버전: v39.4 (2026-04-21)
-- ============================================================================

-- ──────────────────────────────────────────────────────────────────────────
-- 1) 반올림·표시 정책 (4키)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_total_mode',        'sum',            'slider', '총합 표시 모드: sum=준비+평가의 합(Option C, 권장) / round=round(total) / decimal=소수1자리'),
  ('slider_round_mode',        'round',          'slider', '반올림 모드: round / ceil / floor'),
  ('slider_decimal_places',    '0',              'slider', '표시 소수 자리 수 (0=정수, 1=소수1자리)'),
  ('slider_number_unit',       '개월',           'slider', '숫자 단위 문자열 (예: 개월, 월, months)');

-- ──────────────────────────────────────────────────────────────────────────
-- 2) 텍스트 포맷 템플릿 (7키) — {N} 자리에 숫자 치환
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_total_format',      '약 {N}개월',     'slider', '바 위 총합 포맷 (예: "약 {N}개월")'),
  ('slider_prep_format',       '준비 {N}개월',   'slider', '준비 개월 포맷'),
  ('slider_eval_format',       '평가 {N}개월',   'slider', '평가 개월 포맷'),
  ('slider_reduction_format',  '{N}%',           'slider', '단축률 뱃지 포맷'),
  ('slider_saving_format',     '약 {N}개월 절감', 'slider', '절감 개월 포맷'),
  ('slider_prep_label',        '준비',            'slider', '준비 결과 라벨'),
  ('slider_eval_label',        '평가',            'slider', '평가 결과 라벨');

-- ──────────────────────────────────────────────────────────────────────────
-- 3) CCRA(일반) 바 색상 (4키)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_gen_prep_color',    '#F59E0B',        'slider', 'CCRA 바 준비 구간 색상 (왼쪽)'),
  ('slider_gen_eval_color',    '#94A3B8',        'slider', 'CCRA 바 평가 구간 색상 (오른쪽)'),
  ('slider_gen_min_width',     '15',             'slider', 'CCRA 바 최소 너비 % (시각적 가독성 보장)'),
  ('slider_gen_transition',    '0.7',            'slider', 'CCRA 바 애니메이션 지속 시간(초)');

-- ──────────────────────────────────────────────────────────────────────────
-- 4) KOIST 바 색상 (4키)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_koist_prep_color',  '#F59E0B',        'slider', 'KOIST 바 준비 구간 색상'),
  ('slider_koist_eval_color',  '#3B82F6',        'slider', 'KOIST 바 평가 구간 색상'),
  ('slider_koist_min_width',   '8',              'slider', 'KOIST 바 최소 너비 %'),
  ('slider_koist_transition',  '0.5',            'slider', 'KOIST 바 애니메이션 지속 시간(초)');

-- ──────────────────────────────────────────────────────────────────────────
-- 5) 사전준비 슬라이더 트랙 색상 (5키) — 4단계 그라데이션
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_track_color_1',     '#EF4444',        'slider', '사전준비 1단계 색상 (0~25%, 빨강: 저조)'),
  ('slider_track_color_2',     '#F59E0B',        'slider', '사전준비 2단계 색상 (26~50%, 주황: 보통)'),
  ('slider_track_color_3',     '#10B981',        'slider', '사전준비 3단계 색상 (51~75%, 초록: 양호)'),
  ('slider_track_color_4',     '#3B82F6',        'slider', '사전준비 4단계 색상 (76~100%, 파랑: 우수)'),
  ('slider_track_opacity',     '0.20',           'slider', '사전준비 트랙 배경 투명도 (0.0~1.0)');

-- ──────────────────────────────────────────────────────────────────────────
-- 6) 단축률(Reduction) 뱃지 색상 (3키)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_badge_grad_start',  '#10B981',        'slider', '단축률 뱃지 그라데이션 시작 색상 (왼쪽)'),
  ('slider_badge_grad_end',    '#059669',        'slider', '단축률 뱃지 그라데이션 끝 색상 (오른쪽)'),
  ('slider_badge_text_color',  '#FFFFFF',        'slider', '단축률 뱃지 글자 색상');

-- ──────────────────────────────────────────────────────────────────────────
-- 7) 분배 비율 (4키) — 준비 vs 평가 비율 (0~100)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_gen_prep_ratio',    '55',             'slider', 'CCRA 준비 비율(%) (예: 55 → 준비 55% / 평가 45%)'),
  ('slider_gen_eval_ratio',    '45',             'slider', 'CCRA 평가 비율(%)'),
  ('slider_koist_prep_ratio',  '40',             'slider', 'KOIST 준비 비율(%) (예: 40 → 준비 40% / 평가 60%)'),
  ('slider_koist_eval_ratio',  '60',             'slider', 'KOIST 평가 비율(%)');

-- ──────────────────────────────────────────────────────────────────────────
-- 8) 주→월 변환 상수 (1키)
-- ──────────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
  ('slider_weeks_per_month',   '4.345',          'slider', '주(week) → 개월(month) 변환 계수 (기본 4.345 = 52주/12개월)');

-- ──────────────────────────────────────────────────────────────────────────
-- 인덱스 (카테고리 검색 성능)
-- ──────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_site_settings_slider ON site_settings(category) WHERE category = 'slider';

-- ============================================================================
-- 검증 쿼리 (마이그레이션 후 실행)
--   SELECT COUNT(*) FROM site_settings WHERE category = 'slider';   -- 기대: 32
--   SELECT key, value FROM site_settings WHERE category = 'slider' ORDER BY key;
-- ============================================================================
