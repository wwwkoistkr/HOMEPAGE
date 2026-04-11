-- Migration 0005: 준비도 레벨(상/중/하)별 평가기간 세분화
-- 기존 eval_{level}_koist_prep/eval 값은 "중(mid)" 레벨 기본값으로 유지
-- 상(high): 준비가 잘 된 경우 → 기간 단축
-- 중(mid): 일반적인 경우 (기존 값)
-- 하(low): 준비가 부족한 경우 → 기간 증가

-- 전체평균 (overall) - 준비도별 KOIST 기간
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
('eval_overall_koist_prep_high', '4', 'evaluation', '전체평균 KOIST 준비기간 - 준비도 상(개월)'),
('eval_overall_koist_eval_high', '7', 'evaluation', '전체평균 KOIST 평가기간 - 준비도 상(개월)'),
('eval_overall_koist_prep_mid', '6', 'evaluation', '전체평균 KOIST 준비기간 - 준비도 중(개월)'),
('eval_overall_koist_eval_mid', '9', 'evaluation', '전체평균 KOIST 평가기간 - 준비도 중(개월)'),
('eval_overall_koist_prep_low', '9', 'evaluation', '전체평균 KOIST 준비기간 - 준비도 하(개월)'),
('eval_overall_koist_eval_low', '11', 'evaluation', '전체평균 KOIST 평가기간 - 준비도 하(개월)');

-- EAL2 - 준비도별 KOIST 기간
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
('eval_eal2_koist_prep_high', '2', 'evaluation', 'EAL2 KOIST 준비기간 - 준비도 상(개월)'),
('eval_eal2_koist_eval_high', '3', 'evaluation', 'EAL2 KOIST 평가기간 - 준비도 상(개월)'),
('eval_eal2_koist_prep_mid', '4', 'evaluation', 'EAL2 KOIST 준비기간 - 준비도 중(개월)'),
('eval_eal2_koist_eval_mid', '4', 'evaluation', 'EAL2 KOIST 평가기간 - 준비도 중(개월)'),
('eval_eal2_koist_prep_low', '6', 'evaluation', 'EAL2 KOIST 준비기간 - 준비도 하(개월)'),
('eval_eal2_koist_eval_low', '5', 'evaluation', 'EAL2 KOIST 평가기간 - 준비도 하(개월)');

-- EAL3 - 준비도별 KOIST 기간
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
('eval_eal3_koist_prep_high', '4', 'evaluation', 'EAL3 KOIST 준비기간 - 준비도 상(개월)'),
('eval_eal3_koist_eval_high', '4', 'evaluation', 'EAL3 KOIST 평가기간 - 준비도 상(개월)'),
('eval_eal3_koist_prep_mid', '6', 'evaluation', 'EAL3 KOIST 준비기간 - 준비도 중(개월)'),
('eval_eal3_koist_eval_mid', '5', 'evaluation', 'EAL3 KOIST 평가기간 - 준비도 중(개월)'),
('eval_eal3_koist_prep_low', '8', 'evaluation', 'EAL3 KOIST 준비기간 - 준비도 하(개월)'),
('eval_eal3_koist_eval_low', '7', 'evaluation', 'EAL3 KOIST 평가기간 - 준비도 하(개월)');

-- EAL4 - 준비도별 KOIST 기간
INSERT OR IGNORE INTO site_settings (key, value, category, description) VALUES
('eval_eal4_koist_prep_high', '5', 'evaluation', 'EAL4 KOIST 준비기간 - 준비도 상(개월)'),
('eval_eal4_koist_eval_high', '5', 'evaluation', 'EAL4 KOIST 평가기간 - 준비도 상(개월)'),
('eval_eal4_koist_prep_mid', '8', 'evaluation', 'EAL4 KOIST 준비기간 - 준비도 중(개월)'),
('eval_eal4_koist_eval_mid', '7', 'evaluation', 'EAL4 KOIST 평가기간 - 준비도 중(개월)'),
('eval_eal4_koist_prep_low', '11', 'evaluation', 'EAL4 KOIST 준비기간 - 준비도 하(개월)'),
('eval_eal4_koist_eval_low', '10', 'evaluation', 'EAL4 KOIST 평가기간 - 준비도 하(개월)');
